'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const TTS_PROVIDER = 'minimax-tts';
const TTS_VOICE = 'Calm_Woman';

/**
 * Simple TTS hook — play/pause button per message. No auto-play.
 * User clicks to hear, clicks again to stop.
 */
export function useConversationTTS() {
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchTTS = useCallback(async (text: string): Promise<string | null> => {
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
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.base64) {
        console.error('[TTS] No base64 in response', data);
        return null;
      }
      // Decode base64 — strip any whitespace/newlines first
      const cleanBase64 = data.base64.replace(/\s/g, '');
      const binary = atob(cleanBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: `audio/${data.format || 'mp3'}` });
      const url = URL.createObjectURL(blob);
      console.log(`[TTS] Audio ready: ${bytes.length} bytes, format=${data.format}`);
      return url;
    } catch {
      return null;
    }
  }, []);

  // Toggle play/pause for a message
  const togglePlay = useCallback(async (msgId: string, text: string) => {
    // If this message is currently playing, pause it
    if (playingId === msgId && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setPlayingId(null);
      return;
    }

    // Stop any other playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setPlayingId(null);
    }

    // Check cache
    const cached = audioCacheRef.current.get(msgId);
    if (cached) {
      // Play from cache
      const audio = new Audio(cached);
      currentAudioRef.current = audio;
      setPlayingId(msgId);
      audio.onended = () => { setPlayingId(null); currentAudioRef.current = null; };
      audio.onerror = () => { setPlayingId(null); currentAudioRef.current = null; };
      audio.play().catch(() => { setPlayingId(null); currentAudioRef.current = null; });
      return;
    }

    // Fetch and play
    setLoadingId(msgId);
    const blobUrl = await fetchTTS(text);
    setLoadingId(null);
    if (!blobUrl) return;
    audioCacheRef.current.set(msgId, blobUrl);

    // Play
    const audio = new Audio(blobUrl);
    currentAudioRef.current = audio;
    setPlayingId(msgId);
    audio.onended = () => {
      setPlayingId(null);
      currentAudioRef.current = null;
    };
    audio.onerror = (e) => {
      console.error('[TTS] Audio error:', e);
      setPlayingId(null);
      currentAudioRef.current = null;
    };
    audio.play().catch((err) => {
      console.error('[TTS] Play failed:', err);
      setPlayingId(null);
      currentAudioRef.current = null;
    });
  }, [playingId, fetchTTS]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      currentAudioRef.current?.pause();
      audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return { playingId, loadingId, togglePlay };
}
