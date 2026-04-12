import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import {
  saveSession,
  readSession,
  listSessionsByScenario,
  SESSIONS_DIR,
} from '@/lib/server/session-storage';
import type { SavedSession, SessionReview } from '@/lib/verticals/chinese-learning/types';
import { saveReview, readReview } from '@/lib/server/session-storage';

const TEST_SESSION: SavedSession = {
  id: 'test-session-001',
  scenarioId: 'restaurant-ordering',
  difficulty: 'beginner',
  messages: [
    {
      id: 'msg-1',
      role: 'assistant',
      content: '你好！欢迎光临。',
      agentId: 'agent-1',
      agentName: '王阿姨',
      timestamp: 1712880000000,
    },
    {
      id: 'msg-2',
      role: 'user',
      content: '你好，我想点菜。',
      timestamp: 1712880010000,
    },
  ],
  startedAt: '2026-04-12T00:00:00.000Z',
  endedAt: '2026-04-12T00:10:00.000Z',
};

const TEST_REVIEW: SessionReview = {
  sessionId: 'test-session-001',
  vocabulary: [
    {
      word: '点菜',
      pinyin: 'diǎn cài',
      meaning: 'to order food',
      exampleFromChat: '我想点菜。',
    },
  ],
  summary: 'Good first attempt at restaurant ordering.',
  generatedAt: '2026-04-12T00:11:00.000Z',
};

describe('session-storage', () => {
  afterEach(async () => {
    try {
      await fs.rm(path.join(SESSIONS_DIR, `${TEST_SESSION.id}.json`), { force: true });
      await fs.rm(path.join(SESSIONS_DIR, `${TEST_SESSION.id}.review.json`), { force: true });
    } catch {
      // ignore
    }
  });

  describe('saveSession + readSession', () => {
    it('saves and reads a session', async () => {
      await saveSession(TEST_SESSION);
      const result = await readSession(TEST_SESSION.id);
      expect(result).toEqual(TEST_SESSION);
    });

    it('returns null for non-existent session', async () => {
      const result = await readSession('does-not-exist');
      expect(result).toBeNull();
    });
  });

  describe('listSessionsByScenario', () => {
    it('lists sessions for a given scenario', async () => {
      await saveSession(TEST_SESSION);
      const sessions = await listSessionsByScenario('restaurant-ordering');
      expect(sessions.some((s) => s.id === TEST_SESSION.id)).toBe(true);
    });

    it('returns empty array when no sessions exist for scenario', async () => {
      const sessions = await listSessionsByScenario('nonexistent-scenario');
      expect(sessions).toEqual([]);
    });
  });

  describe('saveReview + readReview', () => {
    it('saves and reads a review', async () => {
      await saveReview(TEST_REVIEW);
      const result = await readReview(TEST_REVIEW.sessionId);
      expect(result).toEqual(TEST_REVIEW);
    });

    it('returns null for non-existent review', async () => {
      const result = await readReview('does-not-exist');
      expect(result).toBeNull();
    });
  });
});
