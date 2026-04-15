'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, Volume2, VolumeX } from 'lucide-react';
import { useConversationTTS, TTS_MUTE_KEY } from '@/lib/verticals/chinese-learning/hooks/use-conversation-tts';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useConversation } from '@/lib/verticals/chinese-learning/hooks/use-conversation';
import { useSessionHistory } from '@/lib/hooks/use-session-history';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { SuggestedReplies } from './suggested-replies';
import type { ScenarioTemplate, Difficulty } from '@/lib/verticals/chinese-learning/types';
import { DIFFICULTY_VARIANT } from '@/lib/verticals/chinese-learning/constants';

interface ConversationRoomProps {
  scenario: ScenarioTemplate;
  difficulty: Difficulty;
  onBack: () => void;
}

export function ConversationRoom({ scenario, difficulty, onBack }: ConversationRoomProps) {
  const { t, locale } = useI18n();
  const lang = locale === 'zh-CN' ? 'zh' : 'en';
  const router = useRouter();

  const {
    sceneMessages,
    assistantMessages,
    suggestedReplies,
    isStreaming,
    isThinking,
    error,
    sendMessage,
    startConversation,
    stopStreaming,
    endSession,
  } = useConversation(scenario, difficulty);

  const { addEntry } = useSessionHistory();

  const [ttsMuted, setTtsMuted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(TTS_MUTE_KEY) === 'true';
  });

  const toggleMute = useCallback(() => {
    setTtsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(TTS_MUTE_KEY, String(next));
      return next;
    });
  }, []);

  const { playingId, loadingId, replayMessage, stopPlayback } = useConversationTTS(sceneMessages, ttsMuted);

  const [inputPrefill, setInputPrefill] = useState('');
  const [showContext, setShowContext] = useState(true);

  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startConversation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback(
    (content: string) => {
      setShowContext(false);
      sendMessage(content);
    },
    [sendMessage],
  );

  const handleEnd = useCallback(async () => {
    const sessionId = await endSession();
    if (sessionId) {
      addEntry({
        sessionId,
        scenarioId: scenario.id,
        completedAt: new Date().toISOString(),
      });
      router.push(`/review/${sessionId}`);
    }
  }, [endSession, router, addEntry, scenario.id]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 border-b px-4 py-2.5"
      >
        <Button variant="ghost" size="icon" onClick={onBack} aria-label={t('chineseLearning.room.backToLobby')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-xl">{scenario.icon}</span>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold">{scenario.name[lang]}</h1>
        </div>
        <Badge variant={DIFFICULTY_VARIANT[difficulty]} className="hidden sm:flex">
          {t(`chineseLearning.difficulty.${difficulty}`)}
        </Badge>
        <Button
          variant={ttsMuted ? 'ghost' : 'secondary'}
          size="icon"
          onClick={toggleMute}
          aria-label={ttsMuted ? 'Unmute' : 'Mute'}
        >
          {ttsMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEnd}
          disabled={isStreaming || sceneMessages.length === 0}
          className="gap-1.5"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('chineseLearning.room.endAndReview')}</span>
        </Button>
      </motion.header>

      {error && (
        <div className="border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      {showContext && sceneMessages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b bg-muted/30 px-4 py-2.5"
        >
          <p className="text-xs text-muted-foreground">
            <span className="mr-1.5">{scenario.icon}</span>
            {t('chineseLearning.scenario.role')}: {scenario.learnerRole[lang]}
          </p>
        </motion.div>
      )}

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <MessageList
            messages={sceneMessages}
            isThinking={isThinking}
            vocabularyDict={scenario.vocabularyDict}
            showHints={true}
            playingId={playingId}
            loadingId={loadingId}
            onReplay={replayMessage}
          />
          <SuggestedReplies
              replies={suggestedReplies}
              onSelect={setInputPrefill}
              disabled={isStreaming}
          />
          <ChatInput
            onSend={handleSend}
            onStop={stopStreaming}
            isStreaming={isStreaming}
            disabled={false}
            prefill={inputPrefill}
            onPrefillConsumed={() => setInputPrefill('')}
          />
        </div>
        {/* Assistant panel hidden — tips replaced by inline suggestions from scene agents */}
      </div>
    </div>
  );
}
