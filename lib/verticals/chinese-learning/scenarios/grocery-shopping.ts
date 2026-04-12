import type { ScenarioTemplate } from '../types';

export const groceryShopping: ScenarioTemplate = {
  id: 'grocery-shopping',
  name: {
    en: 'Shopping at the Wet Market',
    zh: '菜市场买菜',
  },
  description: {
    en: 'Haggle for fresh produce at a bustling wet market — ask about prices, compare weights, and leave with a full basket.',
    zh: '在热闹的菜市场讨价还价——询问价格、称重比较，满载而归。',
  },
  difficulty: 'intermediate',
  icon: '🥬',
  setting:
    'A bustling wet market on Saturday morning, alive with shouting vendors, the thwack of cleavers, and the bright colors of seasonal produce heaped in bamboo baskets. Mist from the vegetable sprinklers keeps the greens glistening. The narrow aisles are crowded with weekend shoppers pushing little trolleys. Hand-written price signs dangle from the canopy poles, and the cheerful chaos feels like the beating heart of the neighborhood.',
  agents: [
    {
      role: 'fruit vendor',
      name: '刘大姐',
      personality:
        'A loud, cheerful woman in her 40s who has run this fruit stall for fifteen years. She takes fierce pride in the freshness of her produce and will boast about it unprompted. Generous with samples — she will slice open a piece of fruit to prove a point. Enjoys bantering with regular customers and loves giving new residents a friendly welcome to the neighborhood.',
      speakingStyle:
        'High-energy, projecting voice over the market noise. Uses market-specific expressions like 称一下 and 便宜卖 naturally. Throws in exclamations like 哎呀！ and 对对对！. Occasionally repeats the price twice for emphasis. Warm and persuasive — every item is "今天特别新鲜".',
    },
    {
      role: 'fellow shopper',
      name: '赵奶奶',
      personality:
        'A retired grandmother in her late 60s who shops at this market every morning. She has strong opinions about which stalls have the best produce and is happy to share unsolicited but genuine advice. Suspicious of overpricing and will whisper comparisons to the learner like a seasoned insider.',
      speakingStyle:
        'Speaks in a calm, measured tone with a grandmotherly warmth. Uses older, slightly formal expressions mixed with neighborhood slang. Pauses to reflect before giving advice. Occasionally complains gently about rising prices while still buying enthusiastically.',
    },
  ],
  targetVocabulary: [
    '苹果',
    '香蕉',
    '西瓜',
    '葡萄',
    '白菜',
    '西红柿',
    '鸡蛋',
    '豆腐',
    '斤',
    '两',
    '多少钱',
    '便宜',
    '贵',
    '新鲜',
    '称一下',
    '够了',
  ],
  vocabularyDict: {
    '苹果': { pinyin: 'píngguǒ', meaning: 'apple' },
    '香蕉': { pinyin: 'xiāngjiāo', meaning: 'banana' },
    '西瓜': { pinyin: 'xīguā', meaning: 'watermelon' },
    '葡萄': { pinyin: 'pútao', meaning: 'grapes' },
    '白菜': { pinyin: 'báicài', meaning: 'Chinese cabbage / bok choy' },
    '西红柿': { pinyin: 'xīhóngshì', meaning: 'tomato' },
    '鸡蛋': { pinyin: 'jīdàn', meaning: 'egg' },
    '豆腐': { pinyin: 'dòufu', meaning: 'tofu' },
    '斤': { pinyin: 'jīn', meaning: 'jin (0.5 kg unit of weight)' },
    '两': { pinyin: 'liǎng', meaning: 'two; also a sub-unit of 斤 (50 g)' },
    '多少钱': { pinyin: 'duōshao qián', meaning: 'how much (money)?' },
    '便宜': { pinyin: 'piányí', meaning: 'cheap / inexpensive' },
    '贵': { pinyin: 'guì', meaning: 'expensive' },
    '新鲜': { pinyin: 'xīnxiān', meaning: 'fresh' },
    '称一下': { pinyin: 'chēng yīxià', meaning: 'weigh it / give it a weigh' },
    '够了': { pinyin: 'gòu le', meaning: "that's enough / that will do" },
  },
  targetGrammar: [
    '把...称一下（把-construction for directing an action onto an object）',
    '这个比那个新鲜（比-comparisons to evaluate quality or price）',
    '多少钱一斤？（price-per-unit questions with measure words）',
    '能不能便宜一点？（bargaining with 能不能 + adjective + 一点）',
  ],
  learnerRole: {
    en: 'A new resident shopping at the wet market for the very first time',
    zh: '第一次来菜市场买菜的新居民',
  },
  successCriteria: [
    'Greet the vendor and ask for the price of at least two items using 多少钱一斤？',
    'Use a 比-comparison to comment on price or freshness',
    'Ask the vendor to weigh a chosen item using 称一下',
    'Attempt to bargain using 能不能便宜一点？',
    'Use 够了 to stop the vendor at the right quantity',
    'Converse with 赵奶奶 about at least one item, taking or giving a shopping tip',
  ],
  difficultyScaling: {
    beginner:
      '刘大姐 speaks slowly and announces prices clearly, repeating numbers and pointing at items. 赵奶奶 uses simple sentences and gives direct tips. Bargaining is optional and vendors accept the first offer gracefully.',
    intermediate:
      'Agents speak at a natural market pace. 刘大姐 uses full market expressions and expects the learner to form price-inquiry and bargaining sentences. 赵奶奶 compares stalls and draws the learner into brief comparisons. Measure words are used throughout.',
    advanced:
      'Full rapid-fire market conversation: stall-holders use regional slang, quote prices in informal shorthand, and the learner must handle simultaneous input from both agents. Bargaining requires multiple exchanges, and 赵奶奶 introduces names of less common vegetables.',
  },
};
