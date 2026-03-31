'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useI18n();
  const scenarioId = params?.scenarioId as string;
  const scenario = getScenarioById(scenarioId);
  const lang = locale === 'zh-CN' ? 'zh' : 'en';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mx-auto max-w-md px-4 text-center"
      >
        {scenario ? (
          <>
            <span className="text-6xl">{scenario.icon}</span>
            <h1 className="mt-4 text-2xl font-bold">{scenario.name[lang]}</h1>
            <p className="mt-2 text-muted-foreground">{scenario.description[lang]}</p>
            <div className="mt-6 rounded-lg border border-dashed border-muted-foreground/30 px-6 py-8">
              <p className="text-muted-foreground">
                {t('chineseLearning.room.comingSoon')}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-muted-foreground">
              {t('chineseLearning.room.scenarioNotFound')}
            </p>
          </>
        )}
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => router.push('/lobby')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('chineseLearning.room.backToLobby')}
        </Button>
      </motion.div>
    </div>
  );
}
