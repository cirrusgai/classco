'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { getAllScenarios } from '@/lib/verticals/chinese-learning/scenarios';
import { ScenarioCard } from '@/components/chinese-learning/scenario-card';
import { useSessionHistory } from '@/lib/hooks/use-session-history';

export default function LobbyPage() {
  const router = useRouter();
  const { t } = useI18n();
  const scenarios = getAllScenarios();
  const { getScenarioSessions } = useSessionHistory();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            {t('chineseLearning.lobby.title')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('chineseLearning.lobby.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario, i) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              index={i}
              onSelect={(id) => router.push(`/room/${id}`)}
              completedCount={getScenarioSessions(scenario.id).length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
