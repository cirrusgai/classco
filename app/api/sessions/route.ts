import { NextRequest } from 'next/server';
import { saveSession, listSessionsByScenario, isValidSessionId } from '@/lib/server/session-storage';
import { apiError, apiSuccess, API_ERROR_CODES } from '@/lib/server/api-response';
import type { SavedSession } from '@/lib/verticals/chinese-learning/types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SavedSession;

    if (!isValidSessionId(body.id)) {
      return apiError(API_ERROR_CODES.INVALID_REQUEST, 400, 'Invalid session ID format');
    }

    if (!body.id || !body.scenarioId || !body.messages) {
      return apiError(
        API_ERROR_CODES.MISSING_REQUIRED_FIELD,
        400,
        'Missing id, scenarioId, or messages',
      );
    }

    await saveSession(body);
    return apiSuccess({ id: body.id }, 201);
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to save session',
    );
  }
}

export async function GET(req: NextRequest) {
  const scenarioId = req.nextUrl.searchParams.get('scenarioId');
  if (!scenarioId) {
    return apiError(
      API_ERROR_CODES.MISSING_REQUIRED_FIELD,
      400,
      'Missing scenarioId query param',
    );
  }

  try {
    const sessions = await listSessionsByScenario(scenarioId);
    return apiSuccess({ sessions });
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to list sessions',
    );
  }
}
