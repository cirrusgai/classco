const TAG = '[SUGGESTIONS';

/**
 * Strip [SUGGESTIONS...] content and any partial prefix of the tag from text.
 * Used during streaming to hide the tag as it arrives character-by-character.
 */
export function stripSuggestionsTag(text: string): string {
  // Strip everything after full [SUGGESTIONS marker
  const fullIdx = text.indexOf(TAG);
  if (fullIdx !== -1) {
    return text.slice(0, fullIdx).trimEnd();
  }

  // Strip partial tag prefix at the end (e.g., "[", "[S", "[SU", ...)
  for (let i = TAG.length - 1; i >= 1; i--) {
    if (text.endsWith(TAG.slice(0, i))) {
      return text.slice(0, text.length - i);
    }
  }

  return text;
}
