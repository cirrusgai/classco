import { NextRequest } from 'next/server';
import { readSession, isValidSessionId } from '@/lib/server/session-storage';
import { apiError, apiSuccess, API_ERROR_CODES } from '@/lib/server/api-response';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!isValidSessionId(id)) {
    return apiError(API_ERROR_CODES.INVALID_REQUEST, 400, 'Invalid session ID format');
  }

  try {
    const session = await readSession(id);
    if (!session) {
      return apiError(API_ERROR_CODES.NOT_FOUND, 404, 'Session not found');
    }
    return apiSuccess({ session });
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to read session',
    );
  }
}
