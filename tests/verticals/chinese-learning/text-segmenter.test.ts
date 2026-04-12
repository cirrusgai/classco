import { describe, it, expect } from 'vitest';
import { segmentChineseText, type TextSegment } from '@/lib/verticals/chinese-learning/text-segmenter';
import type { VocabEntry } from '@/lib/verticals/chinese-learning/types';

const dict: Record<string, VocabEntry> = {
  '你好': { pinyin: 'nǐ hǎo', meaning: 'hello' },
  '菜单': { pinyin: 'càidān', meaning: 'menu' },
  '点菜': { pinyin: 'diǎn cài', meaning: 'to order food' },
  '好吃': { pinyin: 'hǎochī', meaning: 'delicious' },
  '多少钱': { pinyin: 'duōshao qián', meaning: 'how much?' },
};

describe('segmentChineseText', () => {
  it('returns single plain segment for text with no matches', () => {
    const result = segmentChineseText('这是一段话', dict);
    expect(result).toEqual([{ text: '这是一段话', vocab: undefined }]);
  });

  it('matches a single vocabulary word', () => {
    const result = segmentChineseText('我想看菜单', dict);
    expect(result).toEqual([
      { text: '我想看', vocab: undefined },
      { text: '菜单', vocab: { pinyin: 'càidān', meaning: 'menu' } },
    ]);
  });

  it('matches multiple vocabulary words', () => {
    const result = segmentChineseText('你好，我要点菜', dict);
    expect(result).toEqual([
      { text: '你好', vocab: { pinyin: 'nǐ hǎo', meaning: 'hello' } },
      { text: '，我要', vocab: undefined },
      { text: '点菜', vocab: { pinyin: 'diǎn cài', meaning: 'to order food' } },
    ]);
  });

  it('matches longer words first (greedy)', () => {
    const result = segmentChineseText('多少钱？', dict);
    expect(result).toEqual([
      { text: '多少钱', vocab: { pinyin: 'duōshao qián', meaning: 'how much?' } },
      { text: '？', vocab: undefined },
    ]);
  });

  it('handles word at start of text', () => {
    const result = segmentChineseText('菜单在这里', dict);
    expect(result).toEqual([
      { text: '菜单', vocab: { pinyin: 'càidān', meaning: 'menu' } },
      { text: '在这里', vocab: undefined },
    ]);
  });

  it('handles word at end of text', () => {
    const result = segmentChineseText('给我菜单', dict);
    expect(result).toEqual([
      { text: '给我', vocab: undefined },
      { text: '菜单', vocab: { pinyin: 'càidān', meaning: 'menu' } },
    ]);
  });

  it('handles empty text', () => {
    const result = segmentChineseText('', dict);
    expect(result).toEqual([]);
  });

  it('handles empty dictionary', () => {
    const result = segmentChineseText('你好世界', {});
    expect(result).toEqual([{ text: '你好世界', vocab: undefined }]);
  });

  it('handles adjacent vocabulary words', () => {
    const result = segmentChineseText('你好菜单', dict);
    expect(result).toEqual([
      { text: '你好', vocab: { pinyin: 'nǐ hǎo', meaning: 'hello' } },
      { text: '菜单', vocab: { pinyin: 'càidān', meaning: 'menu' } },
    ]);
  });
});
