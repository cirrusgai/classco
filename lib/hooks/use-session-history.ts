'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'cl-session-history';

export interface SessionHistoryEntry {
  sessionId: string;
  scenarioId: string;
  completedAt: string;
}

export function useSessionHistory() {
  const [history, setHistory] = useState<SessionHistoryEntry[]>([]);

  // Sync from localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw)); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      // ignore
    }
  }, []);

  const addEntry = useCallback((entry: SessionHistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getScenarioSessions = useCallback(
    (scenarioId: string) => history.filter((e) => e.scenarioId === scenarioId),
    [history],
  );

  return { history, addEntry, getScenarioSessions };
}
