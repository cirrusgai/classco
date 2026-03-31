'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { ConversationMessage } from '@/lib/verticals/chinese-learning/hooks/use-conversation';

interface MessageBubbleProps {
  message: ConversationMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {!isUser && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
          style={{ backgroundColor: message.agentColor ? `${message.agentColor}20` : undefined }}
        >
          {message.agentAvatar || '🗣️'}
        </div>
      )}

      <div className={cn('max-w-[75%] space-y-1', isUser ? 'items-end' : 'items-start')}>
        {!isUser && message.agentName && (
          <span className="text-xs font-medium" style={{ color: message.agentColor || undefined }}>
            {message.agentName}
          </span>
        )}
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted rounded-bl-md',
          )}
        >
          {message.content || <span className="animate-pulse text-muted-foreground">...</span>}
        </div>
      </div>

      {isUser && <div className="w-8 shrink-0" />}
    </motion.div>
  );
}
