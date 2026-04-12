import { describe, it, expect } from 'vitest';
import { parseSuggestions } from '@/lib/verticals/chinese-learning/parse-suggestions';

describe('parseSuggestions', () => {
  it('returns empty replies when no tag present', () => {
    const result = parseSuggestions('你好！我叫李明。');
    expect(result.cleanContent).toBe('你好！我叫李明。');
    expect(result.replies).toEqual([]);
  });

  it('parses valid suggestions and strips tag from content', () => {
    const content =
      '你好！你叫什么名字？\n[SUGGESTIONS]{"replies":[{"text":"我叫____","pinyin":"wǒ jiào ____"},{"text":"很高兴认识你","pinyin":"hěn gāoxìng rènshi nǐ"}]}[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.cleanContent).toBe('你好！你叫什么名字？');
    expect(result.replies).toHaveLength(2);
    expect(result.replies[0]).toEqual({ text: '我叫____', pinyin: 'wǒ jiào ____' });
    expect(result.replies[1]).toEqual({ text: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ' });
  });

  it('handles suggestions with 3 replies', () => {
    const content =
      '你从哪里来？\n[SUGGESTIONS]{"replies":[{"text":"我是美国人","pinyin":"wǒ shì Měiguó rén"},{"text":"我从中国来","pinyin":"wǒ cóng Zhōngguó lái"},{"text":"我是____人","pinyin":"wǒ shì ____ rén"}]}[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.replies).toHaveLength(3);
    expect(result.cleanContent).toBe('你从哪里来？');
  });

  it('limits to 3 replies even if more provided', () => {
    const content =
      '你好\n[SUGGESTIONS]{"replies":[{"text":"a","pinyin":"a"},{"text":"b","pinyin":"b"},{"text":"c","pinyin":"c"},{"text":"d","pinyin":"d"}]}[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.replies).toHaveLength(3);
  });

  it('returns empty replies on invalid JSON', () => {
    const content = '你好\n[SUGGESTIONS]not valid json[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.cleanContent).toBe('你好');
    expect(result.replies).toEqual([]);
  });

  it('returns empty replies when replies field is missing', () => {
    const content = '你好\n[SUGGESTIONS]{"other":"data"}[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.cleanContent).toBe('你好');
    expect(result.replies).toEqual([]);
  });

  it('filters out malformed reply objects', () => {
    const content =
      '你好\n[SUGGESTIONS]{"replies":[{"text":"好的","pinyin":"hǎo de"},{"text":123},{"notext":true}]}[/SUGGESTIONS]';
    const result = parseSuggestions(content);
    expect(result.replies).toHaveLength(1);
    expect(result.replies[0]).toEqual({ text: '好的', pinyin: 'hǎo de' });
  });

  it('handles tag in middle of content', () => {
    const content =
      '你好！[SUGGESTIONS]{"replies":[{"text":"你好","pinyin":"nǐ hǎo"}]}[/SUGGESTIONS]欢迎！';
    const result = parseSuggestions(content);
    expect(result.cleanContent).toBe('你好！欢迎！');
    expect(result.replies).toHaveLength(1);
  });

  it('handles empty content', () => {
    const result = parseSuggestions('');
    expect(result.cleanContent).toBe('');
    expect(result.replies).toEqual([]);
  });

  it('handles multiline suggestions block', () => {
    const content = `你好！
[SUGGESTIONS]{"replies":[
  {"text":"我叫____","pinyin":"wǒ jiào ____"},
  {"text":"你好","pinyin":"nǐ hǎo"}
]}[/SUGGESTIONS]`;
    const result = parseSuggestions(content);
    expect(result.cleanContent).toBe('你好！');
    expect(result.replies).toHaveLength(2);
  });
});
