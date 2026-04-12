import type { VocabEntry } from './types';

export interface TextSegment {
  text: string;
  vocab: VocabEntry | undefined;
}

/**
 * Segment Chinese text against a vocabulary dictionary.
 * Uses greedy longest-match scanning from left to right.
 */
export function segmentChineseText(
  text: string,
  dict: Record<string, VocabEntry>,
): TextSegment[] {
  if (!text) return [];

  const words = Object.keys(dict);
  if (words.length === 0) return [{ text, vocab: undefined }];

  const maxLen = Math.max(...words.map((w) => w.length));
  const segments: TextSegment[] = [];
  let plainBuf = '';
  let i = 0;

  while (i < text.length) {
    let matched = false;

    // Try longest match first
    for (let len = Math.min(maxLen, text.length - i); len >= 1; len--) {
      const candidate = text.slice(i, i + len);
      if (dict[candidate]) {
        if (plainBuf) {
          segments.push({ text: plainBuf, vocab: undefined });
          plainBuf = '';
        }
        segments.push({ text: candidate, vocab: dict[candidate] });
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      plainBuf += text[i];
      i++;
    }
  }

  if (plainBuf) {
    segments.push({ text: plainBuf, vocab: undefined });
  }

  return segments;
}
