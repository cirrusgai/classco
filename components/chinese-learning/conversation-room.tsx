'use client';

import { useCallback, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useConversation } from '@/lib/verticals/chinese-learning/hooks/use-conversation';
import { MessageList } from './message-list';
import { AssistantPanel } from './assistant-panel';
import { ChatInput } from './chat-input';
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

  const {
    sceneMessages,
    assistantMessages,
    isStreaming,
    isThinking,
    error,
    sendMessage,
    startConversation,
    stopStreaming,
  } = useConversation(scenario, difficulty);

  useEffect(() => {
    startConversation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback(
    (content: string) => { sendMessage(content); },
    [sendMessage],
  );

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
      </motion.header>

      {error && (
        <div className="border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {isConfigError ? t('chineseLearning.room.configureProvider') : error}
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <MessageList messages={sceneMessages} isThinking={isThinking} />
          <ChatInput onSend={handleSend} onStop={stopStreaming} isStreaming={isStreaming} disabled={isConfigError} />
        </div>
        <div className="hidden md:block">
          <AssistantPanel messages={assistantMessages} />
        </div>
      </div>
    </div>
  );
}
