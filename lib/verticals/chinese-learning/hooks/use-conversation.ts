'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import type { UIMessage } from 'ai';
import type { ChatMessageMetadata, DirectorState, StatelessEvent } from '@/lib/types/chat';
import type { ScenarioTemplate, Difficulty } from '../types';
import { scenarioToAgents } from '../agents';
import { getCurrentModelConfig } from '@/lib/utils/model-config';
import { useUserProfileStore } from '@/lib/store/user-profile';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentId?: string;
  agentName?: string;
  agentColor?: string;
  agentAvatar?: string;
  timestamp: number;
}

interface UseConversationReturn {
  sceneMessages: ConversationMessage[];
  assistantMessages: ConversationMessage[];
  isStreaming: boolean;
  isThinking: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  startConversation: () => Promise<void>;
  stopStreaming: () => void;
  endSession: () => Promise<string | null>;
}

export function useConversation(
  scenario: ScenarioTemplate,
  difficulty: Difficulty,
): UseConversationReturn {
  const [displayMessages, setDisplayMessages] = useState<ConversationMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rawMessagesRef = useRef<UIMessage<ChatMessageMetadata>[]>([]);
  const directorStateRef = useRef<DirectorState | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const startedAtRef = useRef<string>(new Date().toISOString());

  const agents = useMemo(() => scenarioToAgents(scenario, difficulty), [scenario, difficulty]);
  const assistantAgentId = agents.assistantAgent.id;

  const sceneMessages = useMemo(
    () => displayMessages.filter((m) => m.role === 'user' || m.agentId !== assistantAgentId),
    [displayMessages, assistantAgentId],
  );
  const assistantMessages = useMemo(
    () => displayMessages.filter((m) => m.role === 'assistant' && m.agentId === assistantAgentId),
    [displayMessages, assistantAgentId],
  );

  const streamRequest = useCallback(
    async (messages: UIMessage<ChatMessageMetadata>[], isInitial: boolean) => {
      const mc = getCurrentModelConfig();
      if (!mc.apiKey && mc.requiresApiKey !== false && !mc.isServerConfigured) {
        setError('configureProvider');
        return;
      }

      // Serialize agent configs for inline transport (strip Date/boolean fields not in API schema)
      const agentConfigs = agents.allAgentConfigs.map(
        ({ createdAt: _c, updatedAt: _u, isDefault: _d, ...rest }) => rest,
      );

      const requestBody = {
        messages,
        storeState: {
          stage: null,
          scenes: [],
          currentSceneId: null,
          mode: 'autonomous' as const,
          whiteboardOpen: false,
        },
        config: {
          agentIds: agents.allAgentIds,
          agentConfigs,
          sessionType: 'discussion' as const,
          discussionTopic: scenario.setting,
          ...(isInitial ? { triggerAgentId: agents.triggerAgentId } : {}),
        },
        directorState: directorStateRef.current,
        userProfile: { nickname: useUserProfileStore.getState().nickname || undefined },
        apiKey: mc.apiKey,
        baseUrl: mc.baseUrl || undefined,
        model: mc.modelString,
        providerType: mc.providerType,
        requiresApiKey: mc.requiresApiKey,
      };

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsStreaming(true);
      setIsThinking(true);
      setError(null);

      let currentMsgId: string | null = null;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`API error ${response.status}: ${errText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let sseBuffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          sseBuffer += decoder.decode(value, { stream: true });

          const parts = sseBuffer.split('\n\n');
          sseBuffer = parts.pop() || '';

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith('data: ')) continue;

            let event: StatelessEvent;
            try {
              event = JSON.parse(line.slice(6));
            } catch {
              continue;
            }

            switch (event.type) {
              case 'thinking':
                setIsThinking(true);
                break;

              case 'agent_start':
                setIsThinking(false);
                currentMsgId = event.data.messageId;
                setDisplayMessages((prev) => [
                  ...prev,
                  {
                    id: event.data.messageId,
                    role: 'assistant',
                    content: '',
                    agentId: event.data.agentId,
                    agentName: event.data.agentName,
                    agentColor: event.data.agentColor || undefined,
                    agentAvatar: event.data.agentAvatar || undefined,
                    timestamp: Date.now(),
                  },
                ]);
                break;

              case 'text_delta': {
                const targetId = event.data.messageId ?? currentMsgId;
                if (!targetId) break;
                setDisplayMessages((prev) =>
                  prev.map((m) =>
                    m.id === targetId ? { ...m, content: m.content + event.data.content } : m,
                  ),
                );
                break;
              }

              case 'agent_end': {
                const msgId = event.data.messageId;
                const agentId = event.data.agentId;
                setDisplayMessages((prev) => {
                  const sealed = prev.find((m) => m.id === msgId);
                  if (sealed && sealed.content.trim()) {
                    rawMessagesRef.current = [
                      ...rawMessagesRef.current,
                      {
                        id: msgId,
                        role: 'assistant' as const,
                        parts: [{ type: 'text' as const, text: sealed.content }],
                        metadata: { agentId, senderName: sealed.agentName, agentColor: sealed.agentColor },
                      },
                    ];
                  }
                  return prev;
                });
                currentMsgId = null;
                break;
              }

              case 'cue_user':
                setIsThinking(false);
                break;

              case 'done':
                if (event.data.directorState) {
                  directorStateRef.current = event.data.directorState;
                }
                break;

              case 'error':
                setError(event.data.message);
                break;
            }
          }
        }
        reader.releaseLock();
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // User cancelled — not an error
        } else {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        setIsStreaming(false);
        setIsThinking(false);
        abortControllerRef.current = null;
      }
    },
    [agents, scenario.setting],
  );

  const startConversation = useCallback(async () => {
    rawMessagesRef.current = [];
    directorStateRef.current = undefined;
    setDisplayMessages([]);
    await streamRequest([], true);
  }, [streamRequest]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      const userMsgId = `user-${Date.now()}`;

      rawMessagesRef.current = [
        ...rawMessagesRef.current,
        { id: userMsgId, role: 'user' as const, parts: [{ type: 'text' as const, text: content }] },
      ];

      setDisplayMessages((prev) => [
        ...prev,
        { id: userMsgId, role: 'user', content, timestamp: Date.now() },
      ]);

      await streamRequest(rawMessagesRef.current, false);
    },
    [streamRequest],
  );

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const endSession = useCallback(async (): Promise<string | null> => {
    abortControllerRef.current?.abort();

    const allMessages = displayMessages;
    if (allMessages.length === 0) return null;

    const sessionId = sessionIdRef.current;

    const sessionData = {
      id: sessionId,
      scenarioId: scenario.id,
      difficulty,
      messages: allMessages.map(({ agentAvatar: _a, ...rest }) => rest),
      startedAt: startedAtRef.current,
      endedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      });
      if (!res.ok) throw new Error('Failed to save session');
      return sessionId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save session');
      return null;
    }
  }, [displayMessages, scenario.id, difficulty]);

  return {
    sceneMessages,
    assistantMessages,
    isStreaming,
    isThinking,
    error,
    sendMessage,
    startConversation,
    stopStreaming,
    endSession,
  };
}
