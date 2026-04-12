'use client';

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cl-session-history';

export interface SessionHistoryEntry {
  sessionId: string;
  scenarioId: string;
  completedAt: string;
}

function loadHistory(): SessionHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useSessionHistory() {
  const [history, setHistory] = useState<SessionHistoryEntry[]>(loadHistory);

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
