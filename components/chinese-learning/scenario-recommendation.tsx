'use client';

import { useMemo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { ScenarioTemplate, Difficulty } from '@/lib/verticals/chinese-learning/types';

const DIFFICULTY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
const DIFFICULTY_VARIANT: Record<Difficulty, 'secondary' | 'default' | 'destructive'> = {
  beginner: 'secondary',
  intermediate: 'default',
  advanced: 'destructive',
};

interface ScenarioRecommendationProps {
  scenarios: ScenarioTemplate[];
  completedScenarioIds: Set<string>;
  onSelect: (id: string) => void;
}

export function ScenarioRecommendation({
  scenarios,
  completedScenarioIds,
  onSelect,
}: ScenarioRecommendationProps) {
  const { t, locale } = useI18n();
  const lang = locale === 'zh-CN' ? 'zh' : 'en';

  const recommended = useMemo(() => {
    for (const diff of DIFFICULTY_ORDER) {
      const unplayed = scenarios.filter(
        (s) => s.difficulty === diff && !completedScenarioIds.has(s.id),
      );
      if (unplayed.length > 0) return unplayed[0];
    }
    return null;
  }, [scenarios, completedScenarioIds]);

  if (!recommended) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 rounded-xl border bg-muted/30 p-4"
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="h-4 w-4 text-amber-500" />
        {t('chineseLearning.lobby.recommendedTitle')}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-2xl">{recommended.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{recommended.name[lang]}</span>
            <Badge variant={DIFFICULTY_VARIANT[recommended.difficulty]} className="text-[10px]">
              {t(`chineseLearning.difficulty.${recommended.difficulty}`)}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {recommended.description[lang]}
          </p>
        </div>
        <Button size="sm" onClick={() => onSelect(recommended.id)} className="gap-1.5 shrink-0">
          {t('chineseLearning.lobby.startPractice')}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}
