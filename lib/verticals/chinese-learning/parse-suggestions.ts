export interface SuggestedReply {
  text: string;
  pinyin: string;
}

export interface ParseResult {
  cleanContent: string;
  replies: SuggestedReply[];
}

/**
 * Parse [SUGGESTIONS] JSON block from agent message content.
 * Returns cleaned content (tag stripped) and parsed replies.
 *
 * Handles cases where the orchestration re-emits text chunks,
 * causing duplicate [SUGGESTIONS] markers in accumulated content.
 * Takes the clean text before the first marker, and tries to parse
 * JSON from any [SUGGESTIONS]...[/SUGGESTIONS] block found.
 */
export function parseSuggestions(content: string): ParseResult {
  // Clean content = everything before the first [SUGGESTIONS marker
  const markerIdx = content.indexOf('[SUGGESTIONS]');
  if (markerIdx === -1) {
    return { cleanContent: content, replies: [] };
  }

  const cleanContent = content.slice(0, markerIdx).trim();

  // Extract JSON from the suggestions region (everything after first [SUGGESTIONS] marker)
  const suggestionsRegion = content.slice(markerIdx);
  // Find valid JSON object containing "replies" array
  const jsonMatch = suggestionsRegion.match(/(\{"replies"\s*:\s*\[[\s\S]*?\]\s*\})/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (Array.isArray(parsed.replies)) {
        const replies = parsed.replies
          .filter(
            (r: unknown): r is SuggestedReply =>
              typeof r === 'object' &&
              r !== null &&
              typeof (r as SuggestedReply).text === 'string' &&
              typeof (r as SuggestedReply).pinyin === 'string',
          )
          .slice(0, 3);
        if (replies.length > 0) {
          return { cleanContent, replies };
        }
      }
    } catch {
      // Invalid JSON
    }
  }

  return { cleanContent, replies: [] };
}
