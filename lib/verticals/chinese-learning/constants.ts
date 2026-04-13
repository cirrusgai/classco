import type { Difficulty } from './types';

export const DIFFICULTY_VARIANT: Record<Difficulty, 'secondary' | 'default' | 'destructive'> = {
  beginner: 'secondary',
  intermediate: 'default',
  advanced: 'destructive',
};
