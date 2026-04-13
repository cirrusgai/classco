'use client';

import { motion } from 'motion/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { ScenarioTemplate } from '@/lib/verticals/chinese-learning/types';
import { DIFFICULTY_VARIANT } from '@/lib/verticals/chinese-learning/constants';
import { SessionBadge } from './session-badge';

interface ScenarioCardProps {
  scenario: ScenarioTemplate;
  index: number;
  onSelect: (id: string) => void;
  completedCount?: number;
}

export function ScenarioCard({ scenario, index, onSelect, completedCount = 0 }: ScenarioCardProps) {
  const { t, locale } = useI18n();
  const lang = locale === 'zh-CN' ? 'zh' : 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
    >
      <Card
        className="h-full cursor-pointer transition-shadow hover:shadow-lg"
        role="button"
        tabIndex={0}
        onClick={() => onSelect(scenario.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(scenario.id);
          }
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{scenario.icon}</span>
            <div className="min-w-0 flex-1">
              <CardTitle>{scenario.name[lang]}</CardTitle>
              <div className="mt-1">
                <Badge variant={DIFFICULTY_VARIANT[scenario.difficulty]}>
                  {t(`chineseLearning.difficulty.${scenario.difficulty}`)}
                </Badge>
                <SessionBadge count={completedCount} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription className="mb-3">{scenario.description[lang]}</CardDescription>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium">{t('chineseLearning.scenario.agents')}:</span>{' '}
              {scenario.agents.map((a) => a.name).join(', ')}
            </div>
            <div>
              <span className="font-medium">{t('chineseLearning.scenario.grammar')}:</span>{' '}
              {scenario.targetGrammar.slice(0, 2).map((g) => g.split('（')[0]).join(', ')}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={(e) => { e.stopPropagation(); onSelect(scenario.id); }}>
            {t('chineseLearning.lobby.startPractice')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
