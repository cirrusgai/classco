import type { ScenarioTemplate } from '../types';

export const selfIntroduction: ScenarioTemplate = {
  id: 'self-introduction',
  name: {
    en: 'Self Introduction',
    zh: '自我介绍',
  },
  description: {
    en: 'Practice introducing yourself at a casual social gathering — share your name, nationality, occupation, and hobbies.',
    zh: '在轻松的社交场合练习自我介绍——分享你的名字、国籍、职业和爱好。',
  },
  difficulty: 'beginner',
  icon: '👋',
  setting:
    'A casual welcome gathering for new students at a university common room. Students and faculty mingle over tea and snacks, making small talk and getting to know each other. The atmosphere is relaxed and friendly, with soft background chatter.',
  agents: [
    {
      role: 'friendly student',
      name: '李明',
      personality:
        'Warm, outgoing, and genuinely curious about new people. Li Ming is a third-year computer science student who loves meeting international students. He is patient and encouraging when others are learning Chinese, and quickly makes people feel at ease.',
      speakingStyle:
        'Speaks at a measured pace with clear pronunciation. Uses simple vocabulary and short sentences when chatting with beginners. Asks follow-up questions to keep the conversation flowing naturally. Occasionally uses light humor.',
    },
  ],
  targetVocabulary: [
    '你好',
    '名字',
    '叫',
    '国家',
    '美国',
    '英国',
    '工作',
    '学生',
    '老师',
    '喜欢',
    '爱好',
    '运动',
    '音乐',
    '旅游',
    '家',
    '人',
  ],
  vocabularyDict: {
    '你好': { pinyin: 'nǐ hǎo', meaning: 'hello' },
    '名字': { pinyin: 'míngzi', meaning: 'name' },
    '叫': { pinyin: 'jiào', meaning: 'to be called' },
    '国家': { pinyin: 'guójiā', meaning: 'country' },
    '美国': { pinyin: 'Měiguó', meaning: 'USA' },
    '英国': { pinyin: 'Yīngguó', meaning: 'UK' },
    '工作': { pinyin: 'gōngzuò', meaning: 'work/job' },
    '学生': { pinyin: 'xuéshēng', meaning: 'student' },
    '老师': { pinyin: 'lǎoshī', meaning: 'teacher' },
    '喜欢': { pinyin: 'xǐhuān', meaning: 'to like' },
    '爱好': { pinyin: 'àihào', meaning: 'hobby' },
    '运动': { pinyin: 'yùndòng', meaning: 'sports' },
    '音乐': { pinyin: 'yīnyuè', meaning: 'music' },
    '旅游': { pinyin: 'lǚyóu', meaning: 'travel' },
    '家': { pinyin: 'jiā', meaning: 'home/family' },
    '人': { pinyin: 'rén', meaning: 'person' },
  },
  targetGrammar: [
    '我是...（是-sentences）',
    '我叫...（introducing name）',
    '我在...工作/学习（location + activity）',
    '我喜欢...（expressing preferences）',
  ],
  learnerRole: {
    en: 'A new international student attending a welcome gathering for the first time',
    zh: '第一次参加欢迎聚会的新留学生',
  },
  successCriteria: [
    'Successfully introduce your name using 我叫... or 我是...',
    'State your country of origin',
    'Describe your occupation or field of study',
    'Share at least one hobby or interest',
    'Respond to at least two questions from the agents',
    'Use appropriate greetings and farewells',
  ],
  difficultyScaling: {
    beginner:
      'Agents speak slowly and clearly, use only target vocabulary, repeat phrases if needed, and accept single-word or short-phrase responses. Provide gentle corrections by modeling correct usage.',
    intermediate:
      'Agents speak at natural conversational pace, introduce a few new words in context, ask more detailed follow-up questions, and expect fuller sentence responses.',
    advanced:
      'Agents engage in multi-turn rapid conversation, use colloquialisms and regional expressions, ask abstract questions about preferences and opinions, and expect the learner to elaborate without prompting.',
  },
};
