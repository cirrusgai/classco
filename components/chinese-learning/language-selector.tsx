'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserProfileStore } from '@/lib/store/user-profile';
import { LEARNER_LANGUAGES } from '@/lib/verticals/chinese-learning/language-config';

export function LanguageSelector() {
  const { learnerLanguage, setLearnerLanguage } = useUserProfileStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs">{learnerLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(LEARNER_LANGUAGES).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLearnerLanguage(lang)}
            className={lang === learnerLanguage ? 'font-medium bg-accent' : ''}
          >
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
