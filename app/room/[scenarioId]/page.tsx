'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';
import { ConversationRoom } from '@/components/chinese-learning/conversation-room';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useI18n();
  const scenarioId = params?.scenarioId as string;
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground">
            {t('chineseLearning.room.scenarioNotFound')}
          </p>
          <Button variant="ghost" className="mt-6" onClick={() => router.push('/lobby')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('chineseLearning.room.backToLobby')}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <ConversationRoom
      scenario={scenario}
      difficulty={scenario.difficulty}
      onBack={() => router.push('/lobby')}
    />
  );
}
