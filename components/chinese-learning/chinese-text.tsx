'use client';

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { segmentChineseText } from '@/lib/verticals/chinese-learning/text-segmenter';
import type { VocabEntry } from '@/lib/verticals/chinese-learning/types';

interface ChineseTextProps {
  text: string;
  vocabularyDict: Record<string, VocabEntry>;
  showHints: boolean;
}

export function ChineseText({ text, vocabularyDict, showHints }: ChineseTextProps) {
  if (!showHints || !text) {
    return <>{text}</>;
  }

  const segments = segmentChineseText(text, vocabularyDict);

  return (
    <>
      {segments.map((seg, i) =>
        seg.vocab ? (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span className="underline decoration-primary/30 decoration-dotted underline-offset-4 cursor-help">
                {seg.text}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="text-center">
                <div className="font-medium">{seg.vocab.pinyin}</div>
                <div className="text-[10px] opacity-80">{seg.vocab.meaning}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}
