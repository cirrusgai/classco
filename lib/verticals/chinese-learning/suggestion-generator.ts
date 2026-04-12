import type { ScenarioTemplate, VocabEntry } from './types';
import type { ConversationMessage } from './hooks/use-conversation';

export interface SuggestedReply {
  text: string;
  pinyin: string;
}

/** Context-specific reply patterns keyed by detection regex */
const CONTEXTUAL_REPLIES: Array<{
  detect: RegExp;
  replies: SuggestedReply[];
}> = [
  {
    detect: /名字|叫什么|你叫/,
    replies: [
      { text: '我叫____', pinyin: 'wǒ jiào ____' },
      { text: '你可以叫我____', pinyin: 'nǐ kěyǐ jiào wǒ ____' },
    ],
  },
  {
    detect: /哪个国家|哪里来|从哪/,
    replies: [
      { text: '我是____人', pinyin: 'wǒ shì ____ rén' },
      { text: '我从____来', pinyin: 'wǒ cóng ____ lái' },
    ],
  },
  {
    detect: /学什么|什么专业|专业/,
    replies: [
      { text: '我学____', pinyin: 'wǒ xué ____' },
      { text: '我的专业是____', pinyin: 'wǒ de zhuānyè shì ____' },
    ],
  },
  {
    detect: /喜欢|爱好|兴趣/,
    replies: [
      { text: '我喜欢运动', pinyin: 'wǒ xǐhuān yùndòng' },
      { text: '我喜欢音乐', pinyin: 'wǒ xǐhuān yīnyuè' },
      { text: '我喜欢旅游', pinyin: 'wǒ xǐhuān lǚyóu' },
    ],
  },
  {
    detect: /多少钱|价格|几块/,
    replies: [
      { text: '太贵了', pinyin: 'tài guì le' },
      { text: '便宜一点吧', pinyin: 'piányi yīdiǎn ba' },
      { text: '好的，我要', pinyin: 'hǎo de, wǒ yào' },
    ],
  },
  {
    detect: /要什么|想吃|点什么|想要/,
    replies: [
      { text: '我想要____', pinyin: 'wǒ xiǎng yào ____' },
      { text: '有什么推荐？', pinyin: 'yǒu shénme tuījiàn?' },
      { text: '菜单在哪里？', pinyin: 'càidān zài nǎlǐ?' },
    ],
  },
  {
    detect: /去哪|到哪|在哪/,
    replies: [
      { text: '我想去____', pinyin: 'wǒ xiǎng qù ____' },
      { text: '请带我去____', pinyin: 'qǐng dài wǒ qù ____' },
    ],
  },
  {
    detect: /怎么样|好不好|觉得/,
    replies: [
      { text: '我觉得很好', pinyin: 'wǒ juéde hěn hǎo' },
      { text: '不太好', pinyin: 'bú tài hǎo' },
      { text: '还可以', pinyin: 'hái kěyǐ' },
    ],
  },
  {
    detect: /吗[？?]?\s*$/,
    replies: [
      { text: '是的', pinyin: 'shì de' },
      { text: '不是', pinyin: 'bú shì' },
      { text: '对', pinyin: 'duì' },
    ],
  },
];

/** Fallback replies when no context matches */
const FALLBACK_REPLIES: SuggestedReply[] = [
  { text: '好的', pinyin: 'hǎo de' },
  { text: '谢谢', pinyin: 'xièxie' },
  { text: '请再说一遍', pinyin: 'qǐng zài shuō yī biàn' },
  { text: '什么意思？', pinyin: 'shénme yìsi?' },
  { text: '我不知道', pinyin: 'wǒ bù zhīdào' },
];

/** First-greeting replies (only for the very first agent message) */
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
  if (!text) return [];

  const userMessages = messages.filter((m) => m.role === 'user');
  const alreadySaid = new Set(userMessages.map((m) => m.content));

  // First greeting: show greeting replies only if user hasn't spoken yet
  if (userMessages.length === 0) {
    return GREETING_REPLIES.filter((r) => !alreadySaid.has(r.text)).slice(0, 3);
  }

  // Match contextual patterns against the last agent message
  const suggestions: SuggestedReply[] = [];
  for (const { detect, replies } of CONTEXTUAL_REPLIES) {
    if (detect.test(text)) {
      for (const r of replies) {
        if (!alreadySaid.has(r.text)) suggestions.push(r);
      }
      break; // Use the first matching context only
    }
  }

  // Add scenario vocab suggestions
  const vocabSuggestions = buildVocabSuggestions(scenario.vocabularyDict, text, alreadySaid);
  suggestions.push(...vocabSuggestions);

  // Deduplicate and limit to 3
  const seen = new Set<string>();
  const unique: SuggestedReply[] = [];
  for (const s of suggestions) {
    if (!seen.has(s.text)) {
      seen.add(s.text);
      unique.push(s);
    }
    if (unique.length >= 3) break;
  }

  // Pad with fallbacks if needed
  if (unique.length < 2) {
    for (const r of FALLBACK_REPLIES) {
      if (!seen.has(r.text) && !alreadySaid.has(r.text)) {
        unique.push(r);
        seen.add(r.text);
      }
      if (unique.length >= 3) break;
    }
  }

  return unique.slice(0, 3);
}

/**
 * Build suggestions from scenario vocabulary relevant to the agent's last message.
 */
function buildVocabSuggestions(
  dict: Record<string, VocabEntry>,
  lastAgentText: string,
  alreadySaid: Set<string>,
): SuggestedReply[] {
  const results: SuggestedReply[] = [];

  for (const [word, entry] of Object.entries(dict)) {
    if (word.length < 2) continue;
    if (alreadySaid.has(word)) continue;
    // Include words that share characters with the agent's message
    const shares = [...word].some((ch) => lastAgentText.includes(ch));
    if (shares) {
      results.push({ text: word, pinyin: entry.pinyin });
    }
  }

  return results.slice(0, 2);
}
