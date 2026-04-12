'use client';

import { CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';

interface SessionBadgeProps {
  count: number;
}

export function SessionBadge({ count }: SessionBadgeProps) {
  const { t } = useI18n();

  if (count === 0) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-emerald-600">
      <CheckCircle2 className="h-3.5 w-3.5" />
      <span>
        {count === 1
          ? t('chineseLearning.lobby.completedOnce')
          : t('chineseLearning.lobby.completedTimes').replace('{count}', String(count))}
      </span>
    </div>
  );
}
