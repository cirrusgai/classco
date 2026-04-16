'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ConversationMessage } from './use-conversation';

const TTS_PROVIDER = 'minimax-tts';
const TTS_VOICE = 'Calm_Woman';

export const TTS_MUTE_KEY = 'cl-tts-muted';

export function useConversationTTS(messages: ConversationMessage[], muted: boolean) {
  const playedIdsRef = useRef<Set<string>>(new Set());
  const audioCacheRef = useRef<Map<string, string>>(new Map()); // msgId -> blob URL
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fetch TTS audio for a given text
  const fetchTTS = useCallback(async (text: string, signal?: AbortSignal): Promise<string | null> => {
    try {
      const res = await fetch('/api/generate/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          audioId: `tts-${Date.now()}`,
          ttsProviderId: TTS_PROVIDER,
          ttsVoice: TTS_VOICE,
        }),
        signal,
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.base64) return null;
      // Decode base64 to blob URL
      const binary = atob(data.base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: `audio/${data.format || 'mp3'}` });
      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }, []);

  // Play audio from a blob URL
  const playAudio = useCallback((blobUrl: string, msgId: string) => {
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    const audio = new Audio(blobUrl);
    currentAudioRef.current = audio;
    setPlayingId(msgId);
    audio.onended = () => {
      setPlayingId(null);
      currentAudioRef.current = null;
    };
    audio.onerror = () => {
      setPlayingId(null);
      currentAudioRef.current = null;
    };
    audio.play().catch(() => {
      setPlayingId(null);
      currentAudioRef.current = null;
    });
  }, []);

  // Play TTS for a specific message (called externally when agent_end fires)
  const playMessageTTS = useCallback((msgId: string, text: string) => {
    if (muted) return;
    if (playedIdsRef.current.has(msgId)) return;
    if (!text.trim()) return;

    playedIdsRef.current.add(msgId);

    const cached = audioCacheRef.current.get(msgId);
    if (cached) {
      playAudio(cached, msgId);
      return;
    }

    setLoadingId(msgId);
    fetchTTS(text).then((blobUrl) => {
      setLoadingId(null);
      if (blobUrl) {
        audioCacheRef.current.set(msgId, blobUrl);
        if (!currentAudioRef.current) {
          playAudio(blobUrl, msgId);
        }
      }
    });
  }, [muted, fetchTTS, playAudio]);

  // Manual replay
  const replayMessage = useCallback(async (msgId: string) => {
    const msg = messages.find((m) => m.id === msgId);
    if (!msg) return;

    const cached = audioCacheRef.current.get(msgId);
    if (cached) {
      playAudio(cached, msgId);
      return;
    }

    setLoadingId(msgId);
    const blobUrl = await fetchTTS(msg.content);
    setLoadingId(null);
    if (blobUrl) {
      audioCacheRef.current.set(msgId, blobUrl);
      playAudio(blobUrl, msgId);
    }
  }, [messages, fetchTTS, playAudio]);

  // Stop playback
  const stopPlayback = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setPlayingId(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      currentAudioRef.current?.pause();
      // Revoke blob URLs
      audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return { playingId, loadingId, playMessageTTS, replayMessage, stopPlayback };
}
