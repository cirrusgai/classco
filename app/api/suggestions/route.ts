import { NextRequest } from 'next/server';
import { generateText } from 'ai';
import { resolveModel } from '@/lib/server/resolve-model';
import { apiError, apiSuccess, API_ERROR_CODES } from '@/lib/server/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lastAgentMessage, apiKey, baseUrl, model, providerType } = body as {
      lastAgentMessage: string;
      apiKey?: string;
      baseUrl?: string;
      model?: string;
      providerType?: string;
    };

    if (!lastAgentMessage) {
      return apiError(API_ERROR_CODES.MISSING_REQUIRED_FIELD, 400, 'Missing lastAgentMessage');
    }

    const { model: resolvedModel } = resolveModel({
      modelString: model,
      apiKey,
      baseUrl,
      providerType,
    });

    const { text } = await generateText({
      model: resolvedModel,
      prompt: `The Chinese speaker just said: "${lastAgentMessage}"

Suggest 2-3 short Chinese replies a language learner could say in response.

Rules:
- Each reply must be natural and contextually appropriate
- Keep each reply under 15 Chinese characters
- Include accurate pinyin with tone marks
- Respond ONLY with valid JSON, no other text:
{"replies":[{"text":"中文回复","pinyin":"pīnyīn"},{"text":"中文回复2","pinyin":"pīnyīn"}]}`,
    });

    try {
      const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return apiSuccess({ replies: parsed.replies || [] });
    } catch {
      return apiSuccess({ replies: [] });
    }
  } catch (error) {
    return apiError(
      API_ERROR_CODES.INTERNAL_ERROR,
      500,
      error instanceof Error ? error.message : 'Failed to generate suggestions',
    );
  }
}
