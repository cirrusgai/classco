'use client';

import { useState, useCallback, type KeyboardEvent } from 'react';
import { Send, Mic, MicOff, Loader2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/lib/hooks/use-i18n';
import { useAudioRecorder } from '@/lib/hooks/use-audio-recorder';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (content: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isStreaming, disabled }: ChatInputProps) {
  const { t } = useI18n();
  const [value, setValue] = useState('');

  const handleTranscription = useCallback(
    (text: string) => {
      if (text.trim()) onSend(text.trim());
    },
    [onSend],
  );

  const { isRecording, isProcessing, startRecording, stopRecording } = useAudioRecorder({
    onTranscription: handleTranscription,
  });

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming) return;
    onSend(trimmed);
    setValue('');
  }, [value, isStreaming, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="border-t bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chineseLearning.room.typeMessage')}
          disabled={isStreaming || disabled}
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isStreaming || isProcessing || disabled}
          className={cn(isRecording && 'text-red-500')}
          title={t('chineseLearning.room.voiceInput')}
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isRecording ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        {isStreaming ? (
          <Button variant="ghost" size="icon" onClick={onStop}>
            <Square className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            title={t('chineseLearning.room.sendMessage')}
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
