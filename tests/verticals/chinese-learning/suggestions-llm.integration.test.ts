/**
 * LLM integration test — verifies the scene agent actually outputs [SUGGESTIONS].
 *
 * This test calls the real LLM API, so it's:
 * - Slow (~10-20s)
 * - Costs API credits
 * - Requires a configured provider in .env.local
 *
 * Run manually: npx vitest run tests/verticals/chinese-learning/suggestions-llm.integration.test.ts
 * Skipped by default in CI (no LLM_INTEGRATION_TEST env var).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { generateText } from 'ai';
import { getModel, parseModelString } from '@/lib/ai/providers';
import { buildCharacterPersona } from '@/lib/verticals/chinese-learning/prompts';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';
import { parseSuggestions } from '@/lib/verticals/chinese-learning/parse-suggestions';

// Load API keys from .env.local
try {
  const envContent = readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && vals.length > 0) process.env[key.trim()] = vals.join('=').trim();
  }
} catch {
  // No .env.local
}

const SKIP = !process.env.LLM_INTEGRATION_TEST;

describe.skipIf(SKIP)('LLM suggestions integration', () => {
  const scenario = getScenarioById('self-introduction')!;
  const agent = scenario.agents[0]; // 李明

  it(
    'scene agent includes [SUGGESTIONS] in response',
    async () => {
      const persona = buildCharacterPersona(agent, scenario, 'beginner');

      // Resolve model from env
      const modelString = process.env.TEST_MODEL || 'kimi:kimi-k2.5';
      const { providerId, modelId } = parseModelString(modelString);
      const apiKey = process.env.KIMI_API_KEY || process.env.OPENAI_API_KEY || '';
      if (!apiKey) throw new Error('No API key found in .env.local (KIMI_API_KEY or OPENAI_API_KEY)');
      const { model } = getModel({ providerId, modelId, apiKey });

      // Simulate the orchestration: system prompt + user message
      const { text } = await generateText({
        model,
        system: persona,
        prompt: '你好！我叫Tom，我是美国人。',
      });

      console.log('Agent raw output:', text);

      // Verify [SUGGESTIONS] tag is present
      expect(text).toContain('[SUGGESTIONS]');
      expect(text).toContain('[/SUGGESTIONS]');

      // Verify it parses correctly
      const { cleanContent, replies } = parseSuggestions(text);
      expect(cleanContent.length).toBeGreaterThan(0);
      expect(replies.length).toBeGreaterThanOrEqual(1);
      expect(replies.length).toBeLessThanOrEqual(3);

      // Verify each reply has text and pinyin
      for (const reply of replies) {
        expect(reply.text).toBeTruthy();
        expect(reply.pinyin).toBeTruthy();
      }

      console.log('Parsed replies:', replies);
    },
    60000, // 60s timeout — LLM calls can be slow with retries
  );
});
