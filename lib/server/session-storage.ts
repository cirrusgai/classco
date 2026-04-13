import { promises as fs } from 'fs';
import path from 'path';
import { writeJsonFileAtomic } from './classroom-storage';
import type { SavedSession, SessionReview } from '@/lib/verticals/chinese-learning/types';

export const SESSIONS_DIR = path.join(process.cwd(), 'data', 'sessions');

const SESSION_ID_PATTERN = /^session-\d+-[a-z0-9]+$/;

export function isValidSessionId(id: string): boolean {
  return SESSION_ID_PATTERN.test(id);
}

async function ensureSessionsDir() {
  await fs.mkdir(SESSIONS_DIR, { recursive: true });
}

export async function saveSession(session: SavedSession): Promise<void> {
  await ensureSessionsDir();
  const filePath = path.join(SESSIONS_DIR, `${session.id}.json`);
  await writeJsonFileAtomic(filePath, session);
}

export async function readSession(id: string): Promise<SavedSession | null> {
  const filePath = path.join(SESSIONS_DIR, `${id}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as SavedSession;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export async function listSessionsByScenario(
  scenarioId: string,
): Promise<SavedSession[]> {
  await ensureSessionsDir();
  const files = await fs.readdir(SESSIONS_DIR);
  const sessions: SavedSession[] = [];

  for (const file of files) {
    if (!file.endsWith('.json') || file.endsWith('.review.json')) continue;
    try {
      const content = await fs.readFile(path.join(SESSIONS_DIR, file), 'utf-8');
      const session = JSON.parse(content) as SavedSession;
      if (session.scenarioId === scenarioId) {
        sessions.push(session);
      }
    } catch {
      continue;
    }
  }

  return sessions.sort(
    (a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime(),
  );
}

export async function saveReview(review: SessionReview): Promise<void> {
  await ensureSessionsDir();
  const filePath = path.join(SESSIONS_DIR, `${review.sessionId}.review.json`);
  await writeJsonFileAtomic(filePath, review);
}

export async function readReview(sessionId: string): Promise<SessionReview | null> {
  const filePath = path.join(SESSIONS_DIR, `${sessionId}.review.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as SessionReview;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}
