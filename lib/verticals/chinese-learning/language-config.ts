export const LEARNER_LANGUAGES: Record<string, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  ar: 'العربية',
  de: 'Deutsch',
  ru: 'Русский',
  th: 'ไทย',
  vi: 'Tiếng Việt',
};

export function detectLearnerLanguage(): string {
  if (typeof window === 'undefined') return 'English';
  const locale = navigator.language?.slice(0, 2) || 'en';
  return LEARNER_LANGUAGES[locale] || 'English';
}
