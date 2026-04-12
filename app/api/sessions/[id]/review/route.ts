import { NextRequest } from 'next/server';
import { generateText } from 'ai';
import { readSession, readReview, saveReview } from '@/lib/server/session-storage';
import { apiError, apiSuccess, API_ERROR_CODES } from '@/lib/server/api-response';
import { buildReviewPrompt } from '@/lib/verticals/chinese-learning/prompts';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';
import { getModel } from '@/lib/ai/providers';
import type { SessionReview, VocabularyItem } from '@/lib/verticals/chinese-learning/types';
import type { ProviderId, ProviderType } from '@/lib/types/provider';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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
    const { apiKey, baseUrl, model, providerType } = body as {
      apiKey?: string;
      baseUrl?: string;
      model?: string;
      providerType?: string;
    };

    // Split "providerId:modelId" format (e.g. "openai:gpt-4o-mini")
    const [providerId, ...modelParts] = (model || 'openai:gpt-4o-mini').split(':');
    const modelId = modelParts.join(':');

    const { model: resolvedModel } = getModel({
      providerId: providerId as ProviderId,
      modelId,
      apiKey: apiKey || '',
      baseUrl,
      providerType: providerType as ProviderType | undefined,
    });

    const prompt = buildReviewPrompt(session.messages, targetVocabulary);

    const { text } = await generateText({
      model: resolvedModel,
      prompt,
      temperature: 0.3,
    });

    let parsed: { vocabulary: VocabularyItem[]; summary: string };
    try {
      const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
      parsed = JSON.parse(cleaned) as { vocabulary: VocabularyItem[]; summary: string };
    } catch {
      parsed = { vocabulary: [], summary: text.slice(0, 200) };
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
