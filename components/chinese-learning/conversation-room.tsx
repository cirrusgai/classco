'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useConversation } from '@/lib/verticals/chinese-learning/hooks/use-conversation';
import { useSessionHistory } from '@/lib/hooks/use-session-history';
import { MessageList } from './message-list';
import { AssistantPanel } from './assistant-panel';
import { ChatInput } from './chat-input';
import { SuggestedReplies } from './suggested-replies';
import type { ScenarioTemplate, Difficulty } from '@/lib/verticals/chinese-learning/types';

const DIFFICULTY_VARIANT: Record<Difficulty, 'secondary' | 'default' | 'destructive'> = {
  beginner: 'secondary',
  intermediate: 'default',
  advanced: 'destructive',
};

interface ConversationRoomProps {
  scenario: ScenarioTemplate;
  difficulty: Difficulty;
  onBack: () => void;
}

export function ConversationRoom({ scenario, difficulty, onBack }: ConversationRoomProps) {
  const { t, locale } = useI18n();
  const lang = locale === 'zh-CN' ? 'zh' : 'en';
  const router = useRouter();

  const {
    sceneMessages,
    assistantMessages,
    suggestedReplies,
    isStreaming,
    isThinking,
    error,
    sendMessage,
    startConversation,
    stopStreaming,
    endSession,
  } = useConversation(scenario, difficulty);

  const { addEntry } = useSessionHistory();

  const [showHints, setShowHints] = useState(true);

  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startConversation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback(
    (content: string) => { sendMessage(content); },
    [sendMessage],
  );

  const handleEnd = useCallback(async () => {
    const sessionId = await endSession();
    if (sessionId) {
      addEntry({
        sessionId,
        scenarioId: scenario.id,
        completedAt: new Date().toISOString(),
      });
      router.push(`/review/${sessionId}`);
    }
  }, [endSession, router, addEntry, scenario.id]);

  const isConfigError = error === 'configureProvider';

  return (
    <div className="flex h-screen flex-col bg-background">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 border-b px-4 py-2.5"
      >
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-xl">{scenario.icon}</span>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold">{scenario.name[lang]}</h1>
        </div>
        <Badge variant={DIFFICULTY_VARIANT[difficulty]}>
          {t(`chineseLearning.difficulty.${difficulty}`)}
        </Badge>
        <Button
          variant={showHints ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setShowHints((v) => !v)}
          title={t('chineseLearning.room.pinyinToggle')}
        >
          <Languages className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEnd}
          disabled={isStreaming || sceneMessages.length === 0}
          className="gap-1.5"
        >
          <LogOut className="h-3.5 w-3.5" />
          {t('chineseLearning.room.endAndReview')}
        </Button>
      </motion.header>

      {error && (
        <div className="border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {isConfigError ? t('chineseLearning.room.configureProvider') : error}
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <MessageList
            messages={sceneMessages}
            isThinking={isThinking}
            vocabularyDict={scenario.vocabularyDict}
            showHints={showHints}
          />
          <SuggestedReplies
              replies={suggestedReplies}
              onSelect={handleSend}
              disabled={isStreaming}
          />
          <ChatInput onSend={handleSend} onStop={stopStreaming} isStreaming={isStreaming} disabled={isConfigError} />
        </div>
        {/* Assistant panel hidden — tips replaced by inline suggestions from scene agents */}
      </div>
    </div>
  );
}
