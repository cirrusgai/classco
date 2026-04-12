'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { SessionMessage } from '@/lib/verticals/chinese-learning/types';

interface ReviewTranscriptProps {
  messages: SessionMessage[];
}

export function ReviewTranscript({ messages }: ReviewTranscriptProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">
        {t('chineseLearning.review.transcript')}
      </h2>
      <ScrollArea className="h-80 rounded-lg border bg-muted/30 p-4">
        <div className="space-y-3">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className="text-sm">
                <span
                  className="font-medium"
                  style={{ color: isUser ? undefined : msg.agentColor || undefined }}
                >
                  {isUser ? t('chineseLearning.review.you') : (msg.agentName || 'Agent')}:
                </span>{' '}
                <span className={isUser ? 'text-muted-foreground' : ''}>
                  {msg.content}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
