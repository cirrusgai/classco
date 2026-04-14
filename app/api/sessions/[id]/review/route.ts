import { NextRequest } from 'next/server';
import { generateText } from 'ai';
import { readSession, readReview, saveReview, isValidSessionId } from '@/lib/server/session-storage';
import { apiError, apiSuccess, API_ERROR_CODES } from '@/lib/server/api-response';
import { buildReviewPrompt } from '@/lib/verticals/chinese-learning/prompts';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';
import { resolveModel } from '@/lib/server/resolve-model';
import type { SessionReview, VocabularyItem } from '@/lib/verticals/chinese-learning/types';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!isValidSessionId(id)) {
    return apiError(API_ERROR_CODES.INVALID_REQUEST, 400, 'Invalid session ID format');
  }

  try {
    const existing = await readReview(id);
    if (existing) {
      return apiSuccess({ review: existing });
    }
    return apiError(API_ERROR_CODES.NOT_FOUND, 404, 'Review not yet generated');
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to read review',
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!isValidSessionId(id)) {
    return apiError(API_ERROR_CODES.INVALID_REQUEST, 400, 'Invalid session ID format');
  }

  try {
    const existing = await readReview(id);
    if (existing) {
      return apiSuccess({ review: existing });
    }

    const session = await readSession(id);
    if (!session) {
      return apiError(API_ERROR_CODES.NOT_FOUND, 404, 'Session not found');
    }

    const scenario = getScenarioById(session.scenarioId);
    const targetVocabulary = scenario?.targetVocabulary ?? [];

    const body = await req.json().catch(() => ({}));
    const { learnerLanguage } = body as { learnerLanguage?: string };

    // Use server-configured model (DEFAULT_MODEL + server API keys)
    const { model: resolvedModel } = resolveModel({});

    const prompt = buildReviewPrompt(session.messages, targetVocabulary, learnerLanguage);

    const { text } = await generateText({
      model: resolvedModel,
      prompt,
    });

    let parsed: { vocabulary: VocabularyItem[]; summary: string };
    try {
      // Strip markdown fences, leading/trailing text outside JSON
      let cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
      // Find the JSON object — look for first { and last }
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.slice(firstBrace, lastBrace + 1);
      }
      parsed = JSON.parse(cleaned) as { vocabulary: VocabularyItem[]; summary: string };
    } catch {
      parsed = { vocabulary: [], summary: 'Review generation failed. Please try again.' };
    }

    const review: SessionReview = {
      sessionId: id,
      vocabulary: parsed.vocabulary || [],
      summary: parsed.summary || '',
      generatedAt: new Date().toISOString(),
    };

    await saveReview(review);
    return apiSuccess({ review }, 201);
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to generate review',
    );
  }
}
