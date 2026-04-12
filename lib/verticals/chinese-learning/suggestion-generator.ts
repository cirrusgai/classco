import type { ScenarioTemplate, VocabEntry } from './types';
import type { ConversationMessage } from './hooks/use-conversation';

export interface SuggestedReply {
  text: string;
  pinyin: string;
}

/**
 * Common conversational replies grouped by context.
 * These are universal responses that work across scenarios.
 */
const COMMON_REPLIES: SuggestedReply[] = [
  { text: '你好！', pinyin: 'nǐ hǎo!' },
  { text: '谢谢', pinyin: 'xièxie' },
  { text: '好的', pinyin: 'hǎo de' },
  { text: '是的', pinyin: 'shì de' },
  { text: '不是', pinyin: 'bú shì' },
  { text: '我不知道', pinyin: 'wǒ bù zhīdào' },
  { text: '请再说一遍', pinyin: 'qǐng zài shuō yī biàn' },
  { text: '什么意思？', pinyin: 'shénme yìsi?' },
  { text: '可以', pinyin: 'kěyǐ' },
  { text: '不用了', pinyin: 'bú yòng le' },
];

/** Replies for when someone asks your name */
const NAME_REPLIES: SuggestedReply[] = [
  { text: '我叫...', pinyin: 'wǒ jiào...' },
  { text: '你好，我是学生', pinyin: 'nǐ hǎo, wǒ shì xuéshēng' },
  { text: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ' },
];

/** Replies for questions (你...吗?, ...吗?, 什么, 哪) */
const QUESTION_REPLIES: SuggestedReply[] = [
  { text: '是的', pinyin: 'shì de' },
  { text: '不是', pinyin: 'bú shì' },
  { text: '对', pinyin: 'duì' },
];

/** Replies for greetings */
const GREETING_REPLIES: SuggestedReply[] = [
  { text: '你好！', pinyin: 'nǐ hǎo!' },
  { text: '你好，很高兴认识你', pinyin: 'nǐ hǎo, hěn gāoxìng rènshi nǐ' },
  { text: '大家好！', pinyin: 'dàjiā hǎo!' },
];

/**
 * Generate contextual reply suggestions based on the last agent message
 * and the scenario's vocabulary.
 */
export function generateSuggestions(
  scenario: ScenarioTemplate,
  messages: ConversationMessage[],
): SuggestedReply[] {
  const lastAgentMsg = [...messages].reverse().find((m) => m.role === 'assistant');
  if (!lastAgentMsg) return [];

  const text = lastAgentMsg.content;
  const suggestions: SuggestedReply[] = [];

  // Detect greeting (first message or 你好/欢迎)
  const agentMessages = messages.filter((m) => m.role === 'assistant');
  if (agentMessages.length <= 1 || /你好|欢迎|认识/.test(text)) {
    suggestions.push(...GREETING_REPLIES);
  }

  // Detect name question
  if (/名字|叫什么|你叫/.test(text)) {
    suggestions.push(...NAME_REPLIES);
  }

  // Detect yes/no question (吗?, 吧?)
  if (/吗[？?]?$|吧[？?]?$/.test(text.trim())) {
    suggestions.push(...QUESTION_REPLIES);
  }

  // Add scenario-specific vocabulary as reply fragments
  const dict = scenario.vocabularyDict;
  const vocabSuggestions = buildVocabSuggestions(dict, text, messages);
  suggestions.push(...vocabSuggestions);

  // Deduplicate by text and limit to 3
  const seen = new Set<string>();
  const unique: SuggestedReply[] = [];
  for (const s of suggestions) {
    if (!seen.has(s.text)) {
      seen.add(s.text);
      unique.push(s);
    }
    if (unique.length >= 3) break;
  }

  // If we have fewer than 2, pad with common replies not yet used
  if (unique.length < 2) {
    const userTexts = new Set(messages.filter((m) => m.role === 'user').map((m) => m.content));
    for (const r of COMMON_REPLIES) {
      if (!seen.has(r.text) && !userTexts.has(r.text)) {
        unique.push(r);
        seen.add(r.text);
      }
      if (unique.length >= 3) break;
    }
  }

  return unique.slice(0, 3);
}

/**
 * Build suggestions from scenario vocabulary that's relevant to the current context.
 */
function buildVocabSuggestions(
  dict: Record<string, VocabEntry>,
  lastAgentText: string,
  messages: ConversationMessage[],
): SuggestedReply[] {
  const results: SuggestedReply[] = [];
  const alreadySaid = new Set(
    messages.filter((m) => m.role === 'user').map((m) => m.content),
  );

  for (const [word, entry] of Object.entries(dict)) {
    // Skip single-character words (too vague as standalone replies)
    if (word.length < 2) continue;
    // Skip words the user already said
    if (alreadySaid.has(word)) continue;
    // Prefer words that relate to what the agent just said
    // (simple heuristic: share at least one character)
    const shares = [...word].some((ch) => lastAgentText.includes(ch));
    if (shares) {
      results.push({ text: word, pinyin: entry.pinyin });
    }
  }

  return results.slice(0, 2);
}
