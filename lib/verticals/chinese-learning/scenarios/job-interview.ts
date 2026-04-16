import type { ScenarioTemplate } from '../types';

export const jobInterview: ScenarioTemplate = {
  id: 'job-interview',
  name: {
    en: 'Job Interview',
    zh: '求职面试',
  },
  description: {
    en: 'Navigate a professional job interview in Chinese — introduce yourself, discuss your experience and skills, and make a strong impression on the hiring panel.',
    zh: '用中文应对职场面试——自我介绍、谈经验与能力，给面试官留下深刻印象。',
  },
  difficulty: 'intermediate',
  icon: '💼',
  setting:
    'A sleek modern conference room on the 15th floor of a downtown office tower. Floor-to-ceiling windows look out over the city skyline. A polished oval table holds two glasses of water, a notepad, and a printed copy of the candidate\'s résumé. The air is slightly cool and the room is quiet except for the distant hum of city traffic. A company logo banner hangs on the wall behind the interviewers.',
  agents: [
    {
      role: 'HR manager',
      name: '林经理',
      personality:
        'A composed and professional HR manager in her early 40s who has conducted hundreds of interviews. She is methodical and fair, always following the structured interview guide. She listens attentively, takes brief notes, and gives candidates enough space to express themselves fully before asking the next question. Warm but formal, she puts candidates at ease without lowering the professional bar.',
      speakingStyle:
        'Clear, measured Mandarin with standard pronunciation. Uses formal interview vocabulary naturally. Asks open-ended questions and follows up with clarifying probes. Avoids rushing but maintains a steady pace through the agenda.',
    },
  ],
  targetVocabulary: [
    '面试',
    '简历',
    '经验',
    '专业',
    '毕业',
    '公司',
    '职位',
    '工资',
    '优点',
    '缺点',
    '团队',
    '项目',
    '因为',
    '所以',
    '希望',
    '能力',
  ],
  vocabularyDict: {
    '面试': { pinyin: 'miànshì', meaning: 'job interview' },
    '简历': { pinyin: 'jiǎnlì', meaning: 'résumé / CV' },
    '经验': { pinyin: 'jīngyàn', meaning: 'experience' },
    '专业': { pinyin: 'zhuānyè', meaning: 'major / specialization' },
    '毕业': { pinyin: 'bìyè', meaning: 'to graduate' },
    '公司': { pinyin: 'gōngsī', meaning: 'company' },
    '职位': { pinyin: 'zhíwèi', meaning: 'position / job title' },
    '工资': { pinyin: 'gōngzī', meaning: 'salary / wage' },
    '优点': { pinyin: 'yōudiǎn', meaning: 'strengths / advantages' },
    '缺点': { pinyin: 'quēdiǎn', meaning: 'weaknesses / shortcomings' },
    '团队': { pinyin: 'tuánduì', meaning: 'team' },
    '项目': { pinyin: 'xiàngmù', meaning: 'project' },
    '因为': { pinyin: 'yīnwèi', meaning: 'because' },
    '所以': { pinyin: 'suǒyǐ', meaning: 'therefore / so' },
    '希望': { pinyin: 'xīwàng', meaning: 'to hope / to wish' },
    '能力': { pinyin: 'nénglì', meaning: 'ability / capability' },
  },
  targetGrammar: [
    '因为...所以...（expressing cause and effect）',
    'Duration statements with 了（e.g. 我工作了三年）',
    'Describing strengths with 我的优点是...（my strength is...）',
    'Hypotheticals with 如果...我会...（if... I would...）',
  ],
  learnerRole: {
    en: 'A job candidate interviewing for a marketing position at the company',
    zh: '正在应聘该公司市场营销职位的求职者',
  },
  successCriteria: [
    'Greet the interviewers politely and introduce yourself by name',
    'Describe your educational background and major using 专业 and 毕业',
    'Talk about at least one past work experience using duration statements',
    'Answer a question about your strengths using 我的优点是...',
    'Use 因为...所以... at least once to explain a decision or choice',
    'Ask a thoughtful closing question about the role or team',
  ],
  difficultyScaling: {
    beginner:
      'Lin Jing Li speaks slowly with simple vocabulary, asks only basic self-introduction questions, and accepts short phrase answers. Zhang Zong does not interject. Salary and role details are stated clearly.',
    intermediate:
      'Both interviewers speak at a natural business pace, ask open-ended questions about experience and skills, and expect full-sentence responses. Minor follow-up questions are posed to test clarity.',
    advanced:
      'Zhang Zong challenges answers with scenario-based probes and asks for concrete examples. Both interviewers speak simultaneously at times, salary negotiation is introduced, and the learner must handle unexpected curve-ball questions in real time.',
  },
};
