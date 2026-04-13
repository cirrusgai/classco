/**
 * User Profile Store
 * Persists avatar, nickname & bio to localStorage
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  detectLearnerLanguage,
  LEARNER_LANGUAGES,
} from '@/lib/verticals/chinese-learning/language-config';

/** Predefined avatar options */
export const AVATAR_OPTIONS = [
  '/avatars/user.png',
  '/avatars/teacher-2.png',
  '/avatars/assist-2.png',
  '/avatars/clown-2.png',
  '/avatars/curious-2.png',
  '/avatars/note-taker-2.png',
  '/avatars/thinker-2.png',
] as const;

/** Re-export for use in language selector components */
export { LEARNER_LANGUAGES };
export type { };

export interface UserProfileState {
  /** Local avatar path or data-URL (for custom uploads) */
  avatar: string;
  nickname: string;
  bio: string;
  /** BCP-47 locale mapped to display name, e.g. "English", "日本語" */
  learnerLanguage: string;
  setAvatar: (avatar: string) => void;
  setNickname: (nickname: string) => void;
  setBio: (bio: string) => void;
  setLearnerLanguage: (lang: string) => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      avatar: AVATAR_OPTIONS[0],
      nickname: '',
      bio: '',
      learnerLanguage: detectLearnerLanguage(),
      setAvatar: (avatar) => set({ avatar }),
      setNickname: (nickname) => set({ nickname }),
      setBio: (bio) => set({ bio }),
      setLearnerLanguage: (lang) => set({ learnerLanguage: lang }),
    }),
    {
      name: 'user-profile-storage',
    },
  ),
);
