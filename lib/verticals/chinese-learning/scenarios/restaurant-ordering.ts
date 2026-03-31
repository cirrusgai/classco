import type { ScenarioTemplate } from '../types';

export const restaurantOrdering: ScenarioTemplate = {
  id: 'restaurant-ordering',
  name: {
    en: 'Ordering at a Restaurant',
    zh: '餐厅点菜',
  },
  description: {
    en: 'Navigate a real Chinese restaurant experience — read the menu, order dishes, ask about prices, and pay the bill.',
    zh: '体验真实的中餐厅——看菜单、点菜、询问价格、结账付款。',
  },
  difficulty: 'beginner',
  icon: '🍜',
  setting:
    'A cozy neighborhood Chinese restaurant during a busy lunch hour. The walls are decorated with red lanterns and calligraphy scrolls. The smell of sizzling garlic and fresh dumplings fills the air. A handwritten specials board hangs near the entrance. Tables are covered with plastic floral tablecloths, and the background buzz of other diners and clinking bowls creates an authentic atmosphere.',
  agents: [
    {
      role: 'waitress',
      name: '王阿姨',
      personality:
        'A warm, motherly woman in her 50s who has worked at this family restaurant for over twenty years. She takes pride in the food and genuinely wants every customer to have a great meal. Patient with indecisive customers but cheerfully brisk when the restaurant gets busy. She loves chatting with regulars and newcomers alike.',
      speakingStyle:
        'Speaks in a friendly, slightly sing-song Mandarin with occasional informal expressions. Uses food-related vocabulary naturally and explains dishes briefly when asked. Repeats orders back to confirm accuracy. Uses polite but casual register.',
    },
    {
      role: 'regular customer',
      name: '陈先生',
      personality:
        'A friendly regular in his 30s who comes for lunch almost every day. Happy to share recommendations and point out his favorite dishes on the menu. Enjoys chatting with new faces and is enthusiastic about the restaurant\'s dumplings.',
      speakingStyle:
        'Relaxed conversational tone, uses some food slang and descriptors. Speaks naturally and does not slow down unless asked. Good-natured and easy to talk to.',
    },
  ],
  targetVocabulary: [
    '菜单',
    '点菜',
    '服务员',
    '好吃',
    '辣',
    '甜',
    '米饭',
    '面条',
    '饺子',
    '汤',
    '茶',
    '水',
    '多少钱',
    '买单',
    '一个',
    '两个',
    '碗',
    '杯',
  ],
  targetGrammar: [
    '我想要...（expressing wants）',
    '来一个/两个...（ordering with measure words）',
    '多少钱？（asking price）',
    '有没有...？（asking availability）',
  ],
  learnerRole: {
    en: 'A hungry tourist visiting the restaurant for the first time',
    zh: '第一次来这家餐厅用餐的游客',
  },
  successCriteria: [
    'Greet the waitress appropriately when seated',
    'Ask for the menu',
    'Order at least two dishes using correct measure words',
    'Ask about the price of at least one item',
    'Inquire about a dish using 有没有...?',
    'Successfully request the bill using 买单',
  ],
  difficultyScaling: {
    beginner:
      'Wang Ayi speaks slowly, points to menu items when describing them, uses only basic vocabulary, and accepts gestured or single-word orders. Prices and totals are stated clearly and repeated.',
    intermediate:
      'Agents speak at a natural pace, describe dishes with more detail including taste and ingredients, and expect the learner to form complete ordering sentences. Small talk about food preferences is included.',
    advanced:
      'Full natural-speed conversation with regional expressions, discussion of cooking methods and ingredients, spontaneous changes to the order, and negotiating substitutions or special requests.',
  },
};
