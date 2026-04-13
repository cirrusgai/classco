import { describe, it, expect } from 'vitest';
import { stripSuggestionsTag } from '@/lib/verticals/chinese-learning/strip-suggestions-tag';

describe('stripSuggestionsTag', () => {
  it('returns text unchanged when no tag present', () => {
    expect(stripSuggestionsTag('你好！我叫李明。')).toBe('你好！我叫李明。');
  });

  it('strips full [SUGGESTIONS...] block', () => {
    expect(stripSuggestionsTag('你好！[SUGGESTIONS]{"replies":[]}[/SUGGESTIONS]'))
      .toBe('你好！');
  });

  it('strips from [SUGGESTIONS marker onward', () => {
    expect(stripSuggestionsTag('你好！[SUGGESTIONS{"replies"'))
      .toBe('你好！');
  });

  it('strips partial prefix [ at end', () => {
    expect(stripSuggestionsTag('你好！[')).toBe('你好！');
  });

  it('strips partial prefix [S at end', () => {
    expect(stripSuggestionsTag('你好！[S')).toBe('你好！');
  });

  it('strips partial prefix [SU at end', () => {
    expect(stripSuggestionsTag('你好！[SU')).toBe('你好！');
  });

  it('strips partial prefix [SUG at end', () => {
    expect(stripSuggestionsTag('你好！[SUG')).toBe('你好！');
  });

  it('strips partial prefix [SUGGEST at end', () => {
    expect(stripSuggestionsTag('你好！[SUGGEST')).toBe('你好！');
  });

  it('strips partial prefix [SUGGESTION at end', () => {
    expect(stripSuggestionsTag('你好！[SUGGESTION')).toBe('你好！');
  });

  it('strips partial prefix [SUGGESTIONS at end', () => {
    expect(stripSuggestionsTag('你好！[SUGGESTIONS')).toBe('你好！');
  });

  it('does not strip [ in middle of text', () => {
    expect(stripSuggestionsTag('价格[含税]已更新')).toBe('价格[含税]已更新');
  });

  it('handles empty string', () => {
    expect(stripSuggestionsTag('')).toBe('');
  });

  // Simulate full streaming sequence
  it('handles progressive streaming of tag', () => {
    const base = '你好！你叫什么名字？';
    expect(stripSuggestionsTag(base)).toBe(base);
    expect(stripSuggestionsTag(base + '[')).toBe(base);
    expect(stripSuggestionsTag(base + '[S')).toBe(base);
    expect(stripSuggestionsTag(base + '[SU')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUG')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGG')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGE')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGES')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGEST')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTI')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTIO')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTION')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTIONS')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTIONS]')).toBe(base);
    expect(stripSuggestionsTag(base + '[SUGGESTIONS]{"replies":[]}')).toBe(base);
  });
});
