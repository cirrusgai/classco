'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18n } from '@/lib/hooks/use-i18n';
import { MessageBubble } from './message-bubble';
import type { ConversationMessage } from '@/lib/verticals/chinese-learning/hooks/use-conversation';
import type { VocabEntry } from '@/lib/verticals/chinese-learning/types';

interface MessageListProps {
  messages: ConversationMessage[];
  isThinking: boolean;
  vocabularyDict: Record<string, VocabEntry>;
  showHints: boolean;
  playingId?: string | null;
  loadingId?: string | null;
  onReplay?: (id: string) => void;
}

export function MessageList({ messages, isThinking, vocabularyDict, showHints, playingId, loadingId, onReplay }: MessageListProps) {
  const { t } = useI18n();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, messages[messages.length - 1]?.content, isThinking]);

  if (messages.length === 0 && isThinking) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            {t('chineseLearning.room.startingConversation')}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-4">
        {messages.map((msg) => (
          <MessageBubble
              key={msg.id}
              message={msg}
              vocabularyDict={vocabularyDict}
              showHints={showHints}
              isPlaying={msg.id === playingId}
              isLoadingAudio={msg.id === loadingId}
              onReplay={onReplay}
            />
        ))}
        {isThinking && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Loader2 className="h-3 w-3 animate-spin" />
            {t('chineseLearning.room.thinking')}
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
