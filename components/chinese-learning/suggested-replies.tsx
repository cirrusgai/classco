'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { SuggestedReply } from '@/lib/verticals/chinese-learning/parse-suggestions';

interface SuggestedRepliesProps {
  replies: SuggestedReply[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export function SuggestedReplies({ replies, onSelect, disabled }: SuggestedRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="border-t bg-muted/20 px-4 py-2">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {replies.map((reply, i) => (
            <motion.button
              key={`${reply.text}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(reply.text)}
              disabled={disabled}
              className="rounded-full border bg-background px-3 py-1.5 text-left text-xs transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:opacity-50"
            >
              <span className="font-medium">{reply.text}</span>
              <span className="ml-1.5 text-[10px] text-muted-foreground">{reply.pinyin}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
