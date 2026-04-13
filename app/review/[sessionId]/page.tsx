'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';
import { getCurrentModelConfig } from '@/lib/utils/model-config';
import { ReviewTranscript } from '@/components/chinese-learning/review-transcript';
import { ReviewVocabulary } from '@/components/chinese-learning/review-vocabulary';
import type { SavedSession, SessionReview } from '@/lib/verticals/chinese-learning/types';

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useI18n();
  const lang = locale === 'zh-CN' ? 'zh' : 'en';
  const sessionId = params?.sessionId as string;

  const [session, setSession] = useState<SavedSession | null>(null);
  const [review, setReview] = useState<SessionReview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState(false);

  useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch(`/api/sessions/${sessionId}`);
        if (!res.ok) {
          setError('Session not found');
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        // apiSuccess wraps data as { success: true, session: {...} }
        setSession(data.session as SavedSession);
      } catch {
        setError('Failed to load session');
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  const generateReview = useCallback(async () => {
    if (!session) return;
    setIsAnalyzing(true);

    try {
      const mc = getCurrentModelConfig();
      const res = await fetch(`/api/sessions/${sessionId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: mc.apiKey,
          baseUrl: mc.baseUrl || undefined,
          model: mc.modelString,
          providerType: mc.providerType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // apiSuccess wraps as { success: true, review: {...} }
        setReview(data.review as SessionReview);
      }
    } catch {
      setReviewError(true);
    } finally {
      setIsAnalyzing(false);
    }
  }, [session, sessionId]);

  useEffect(() => {
    if (session) generateReview();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">{t('chineseLearning.review.loading')}</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">{error || t('chineseLearning.room.scenarioNotFound')}</p>
          <Button variant="ghost" className="mt-4" onClick={() => router.push('/lobby')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('chineseLearning.room.backToLobby')}
          </Button>
        </div>
      </div>
    );
  }

  const scenario = getScenarioById(session.scenarioId);

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b px-4 py-3"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push('/lobby')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-xl">{scenario?.icon || '📝'}</span>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-semibold">
              {t('chineseLearning.review.title')}
            </h1>
            <p className="text-xs text-muted-foreground">
              {scenario?.name[lang] || session.scenarioId}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/room/${session.scenarioId}`)}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t('chineseLearning.review.tryAgain')}
          </Button>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-auto max-w-3xl space-y-6 px-4 py-6"
      >
        {review?.summary && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <h2 className="mb-1 text-sm font-semibold">
              {t('chineseLearning.review.summaryTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">{review.summary}</p>
          </div>
        )}

        {reviewError && !review && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{t('chineseLearning.review.analysisFailed')}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => { setReviewError(false); generateReview(); }}>
              {t('chineseLearning.review.retry')}
            </Button>
          </div>
        )}

        <ReviewVocabulary
          vocabulary={review?.vocabulary || []}
          isLoading={isAnalyzing}
        />

        <ReviewTranscript messages={session.messages} />

        <div className="flex justify-center pb-8">
          <Button onClick={() => router.push('/lobby')}>
            {t('chineseLearning.room.backToLobby')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
