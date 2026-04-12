'use client';

import { Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { VocabularyItem } from '@/lib/verticals/chinese-learning/types';

interface ReviewVocabularyProps {
  vocabulary: VocabularyItem[];
  isLoading: boolean;
}

export function ReviewVocabulary({ vocabulary, isLoading }: ReviewVocabularyProps) {
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t('chineseLearning.review.analyzing')}
      </div>
    );
  }

  if (vocabulary.length === 0) {
    return (
      <p className="py-4 text-sm text-muted-foreground">
        {t('chineseLearning.review.noVocabulary')}
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">
        {t('chineseLearning.review.vocabularyTitle')}
      </h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left font-medium">
                {t('chineseLearning.review.word')}
              </th>
              <th className="px-3 py-2 text-left font-medium">
                {t('chineseLearning.review.pinyinLabel')}
              </th>
              <th className="px-3 py-2 text-left font-medium">
                {t('chineseLearning.review.meaning')}
              </th>
              <th className="hidden px-3 py-2 text-left font-medium md:table-cell">
                {t('chineseLearning.review.example')}
              </th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-2 font-medium">{item.word}</td>
                <td className="px-3 py-2 text-muted-foreground">{item.pinyin}</td>
                <td className="px-3 py-2">{item.meaning}</td>
                <td className="hidden px-3 py-2 text-xs text-muted-foreground md:table-cell">
                  {item.exampleFromChat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
