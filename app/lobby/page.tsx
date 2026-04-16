'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { Difficulty } from '@/lib/verticals/chinese-learning/types';
import { DIFFICULTY_VARIANT } from '@/lib/verticals/chinese-learning/constants';
import { Badge } from '@/components/ui/badge';
import { getAllScenarios } from '@/lib/verticals/chinese-learning/scenarios';
import { ScenarioCard } from '@/components/chinese-learning/scenario-card';
import { ScenarioRecommendation } from '@/components/chinese-learning/scenario-recommendation';
import { LanguageSelector } from '@/components/chinese-learning/language-selector';
import { UserMenu } from '@/components/chinese-learning/user-menu';
import { useSessionHistory } from '@/lib/hooks/use-session-history';

export default function LobbyPage() {
  const router = useRouter();
  const { t } = useI18n();
  const scenarios = getAllScenarios();
  const { getScenarioSessions, history } = useSessionHistory();

  const completedIds = useMemo(
    () => new Set(history.map((e) => e.scenarioId)),
    [history],
  );

  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const FILTERS: Array<{ value: Difficulty | 'all'; key: string }> = [
    { value: 'all', key: 'chineseLearning.lobby.allLevels' },
    { value: 'beginner', key: 'chineseLearning.difficulty.beginner' },
    { value: 'intermediate', key: 'chineseLearning.difficulty.intermediate' },
    { value: 'advanced', key: 'chineseLearning.difficulty.advanced' },
  ];
  const filteredScenarios = difficultyFilter === 'all'
    ? scenarios
    : scenarios.filter((s) => s.difficulty === difficultyFilter);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {t('chineseLearning.lobby.title')}
            </h1>
            <LanguageSelector />
            <UserMenu />
          </div>
          <p className="mt-2 text-muted-foreground">
            {t('chineseLearning.lobby.subtitle')}
          </p>
        </motion.div>

        <ScenarioRecommendation
          scenarios={scenarios}
          completedScenarioIds={completedIds}
          onSelect={(id) => router.push(`/room/${id}`)}
        />

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {FILTERS.map(({ value, key }) => (
            <Badge
              key={value}
              variant={difficultyFilter === value ? (value === 'all' ? 'default' : DIFFICULTY_VARIANT[value as Difficulty]) : 'outline'}
              className="cursor-pointer px-3 py-1 text-xs"
              onClick={() => setDifficultyFilter(value)}
            >
              {t(key)}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScenarios.map((scenario, i) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              index={i}
              onSelect={(id) => router.push(`/room/${id}`)}
              completedCount={getScenarioSessions(scenario.id).length}
            />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {filteredScenarios.length} {t('chineseLearning.lobby.scenariosAvailable')}
        </p>
      </div>
    </div>
  );
}
