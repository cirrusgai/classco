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
 */
export function parseSuggestions(content: string): ParseResult {
  const match = content.match(/\[SUGGESTIONS\]([\s\S]*?)\[\/SUGGESTIONS\]/);

  if (!match) {
    return { cleanContent: content, replies: [] };
  }

  const cleanContent = content
    .replace(/\[SUGGESTIONS\][\s\S]*?\[\/SUGGESTIONS\]/, '')
    .trim();

  try {
    const parsed = JSON.parse(match[1]);
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
      return { cleanContent, replies };
    }
  } catch {
    // Invalid JSON
  }

  return { cleanContent, replies: [] };
}
