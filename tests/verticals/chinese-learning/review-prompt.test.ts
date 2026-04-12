import { describe, it, expect } from 'vitest';
import { buildReviewPrompt } from '@/lib/verticals/chinese-learning/prompts';
import type { SessionMessage } from '@/lib/verticals/chinese-learning/types';

describe('buildReviewPrompt', () => {
  const messages: SessionMessage[] = [
    {
      id: 'msg-1',
      role: 'assistant',
      content: '你好！欢迎光临。请问几位？',
      agentId: 'a1',
      agentName: '王阿姨',
      timestamp: 1712880000000,
    },
    {
      id: 'msg-2',
      role: 'user',
      content: '你好，两个人。',
      timestamp: 1712880010000,
    },
    {
      id: 'msg-3',
      role: 'assistant',
      content: '好的，请跟我来。这是菜单。',
      agentId: 'a1',
      agentName: '王阿姨',
      timestamp: 1712880020000,
    },
  ];

  const targetVocabulary = ['欢迎', '菜单', '请'];

  it('includes conversation transcript', () => {
    const prompt = buildReviewPrompt(messages, targetVocabulary);
    expect(prompt).toContain('你好！欢迎光临。');
    expect(prompt).toContain('两个人');
  });

  it('includes target vocabulary', () => {
    const prompt = buildReviewPrompt(messages, targetVocabulary);
    expect(prompt).toContain('欢迎');
    expect(prompt).toContain('菜单');
  });

  it('instructs JSON output format', () => {
    const prompt = buildReviewPrompt(messages, targetVocabulary);
    expect(prompt).toContain('JSON');
    expect(prompt).toContain('pinyin');
    expect(prompt).toContain('meaning');
  });

  it('labels speakers by name or "Learner"', () => {
    const prompt = buildReviewPrompt(messages, targetVocabulary);
    expect(prompt).toContain('王阿姨');
    expect(prompt).toContain('Learner');
  });
});
