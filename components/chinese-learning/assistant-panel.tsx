'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { ConversationMessage } from '@/lib/verticals/chinese-learning/hooks/use-conversation';

interface AssistantPanelProps {
  messages: ConversationMessage[];
}

export function AssistantPanel({ messages }: AssistantPanelProps) {
  const { t } = useI18n();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex h-full w-72 flex-col border-l bg-muted/30">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{t('chineseLearning.room.assistantTitle')}</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-3 p-3">
          {messages.length === 0 && (
            <p className="px-2 py-8 text-center text-xs text-muted-foreground">
              {t('chineseLearning.room.assistantEmpty')}
            </p>
          )}
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border bg-background p-3 shadow-sm"
              >
                <div className="mb-1 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[10px] font-medium text-muted-foreground">Tip</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
