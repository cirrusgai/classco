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
}

export function MessageList({ messages, isThinking, vocabularyDict, showHints }: MessageListProps) {
  const { t } = useI18n();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, messages[messages.length - 1]?.content, isThinking]);

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-4">
        {messages.map((msg) => (
          <MessageBubble
              key={msg.id}
              message={msg}
              vocabularyDict={vocabularyDict}
              showHints={showHints}
            />
        ))}
        {isThinking && (
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
