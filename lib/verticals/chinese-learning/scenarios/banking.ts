import type { ScenarioTemplate } from '../types';

export const banking: ScenarioTemplate = {
  id: 'banking',
  name: {
    en: 'At the Bank',
    zh: '银行办理业务',
  },
  description: {
    en: 'Open a bank account and exchange foreign currency at a state-owned branch — fill out forms, provide documents, and navigate formal banking procedures in Chinese.',
    zh: '在国有银行开户并兑换外币——填写表格、提供证件，用中文完成正式银行业务。',
  },
  difficulty: 'advanced',
  icon: '🏦',
  setting:
    'A large state-owned bank branch on a busy Monday morning. The lobby smells faintly of ink and recycled air. Numbered tickets are dispensed at the entrance, and a digital board above the teller windows announces queue numbers in a robotic voice. Customers sit in rows of plastic chairs clutching forms and ID cards. The teller windows are separated by thick glass with a small metal slot for documents and cash. The bank opens at 9 AM and is already crowded.',
  agents: [
    {
      role: 'bank teller',
      name: '周姐',
      personality:
        'A meticulous bank teller in her 30s who has worked at this branch for eight years. She follows procedure to the letter — not out of rigidity but because she has seen what happens when steps are skipped. She is efficient and professional, and genuinely helpful to customers who come prepared. She has limited patience for incomplete documentation but will explain clearly what is missing and what the next step is.',
      speakingStyle:
        'Formal, precise Mandarin with standard Beijing pronunciation. Uses banking terminology naturally and without explanation unless asked. Speaks in complete, well-structured sentences. Uses polite forms consistently: 请您、请问、您好. Will slow down and repeat if the customer clearly does not understand, but does not condescend.',
    },
  ],
  targetVocabulary: [
    '银行',
    '开户',
    '账户',
    '存款',
    '取款',
    '转账',
    '汇率',
    '外汇',
    '身份证',
    '护照',
    '密码',
    '签名',
    '表格',
    '手续费',
    '余额',
    '排队',
  ],
  vocabularyDict: {
    '银行': { pinyin: 'yínháng', meaning: 'bank' },
    '开户': { pinyin: 'kāi hù', meaning: 'to open an account' },
    '账户': { pinyin: 'zhànghù', meaning: 'account' },
    '存款': { pinyin: 'cúnkuǎn', meaning: 'to deposit money / savings' },
    '取款': { pinyin: 'qǔkuǎn', meaning: 'to withdraw money' },
    '转账': { pinyin: 'zhuǎnzhàng', meaning: 'to transfer money' },
    '汇率': { pinyin: 'huìlǜ', meaning: 'exchange rate' },
    '外汇': { pinyin: 'wàihuì', meaning: 'foreign exchange / foreign currency' },
    '身份证': { pinyin: 'shēnfènzhèng', meaning: 'national ID card' },
    '护照': { pinyin: 'hùzhào', meaning: 'passport' },
    '密码': { pinyin: 'mìmǎ', meaning: 'password / PIN' },
    '签名': { pinyin: 'qiānmíng', meaning: 'signature / to sign' },
    '表格': { pinyin: 'biǎogé', meaning: 'form / table' },
    '手续费': { pinyin: 'shǒuxùfèi', meaning: 'handling fee / service charge' },
    '余额': { pinyin: 'yú\'é', meaning: 'balance (in account)' },
    '排队': { pinyin: 'páiduì', meaning: 'to queue / to line up' },
  },
  targetGrammar: [
    '被-construction（passive: 表格被填完了）',
    'Formal requests with 请您...（please kindly...）',
    'Requirements with 需要...才能...（you need... before you can...）',
    'Sequential instructions with 先...然后...再...（first... then... next...）',
  ],
  learnerRole: {
    en: 'A foreigner visiting the branch to open an account and exchange currency',
    zh: '前来开户并兑换外币的外国人',
  },
  successCriteria: [
    'State your purpose at the window clearly using 开户 or 外汇',
    'Present the correct document (护照) when asked for identification',
    'Ask about the current exchange rate using 汇率',
    'Ask whether there is a service charge using 手续费',
    'Correctly follow at least two sequential instructions from the teller',
    'Confirm the account balance or transaction amount using 余额 or the correct figure',
  ],
  difficultyScaling: {
    beginner:
      'Zhou Jie speaks slowly and uses simplified vocabulary, guides the learner step by step through each action, and repeats key terms such as 护照 and 表格 with patient elaboration. No unexpected complications arise.',
    intermediate:
      'Zhou Jie speaks at a natural teller pace, uses standard banking vocabulary without explanation, and expects the learner to fill out a form and ask clarifying questions independently. One minor complication is introduced (e.g. the form is incomplete).',
    advanced:
      'Zhou Jie follows strict procedure at full speed, asks the learner to set a PIN and sign documents in rapid succession, introduces a complication (e.g. the passport copy is missing or the exchange amount exceeds the daily limit), and uses passive constructions and formal register throughout. The learner must manage the queue number system and handle the unexpected.',
  },
};
