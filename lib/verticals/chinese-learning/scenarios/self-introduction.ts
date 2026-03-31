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
    {
      role: 'curious colleague',
      name: '张华',
      personality:
        'Enthusiastic and talkative, Zhang Hua is a graduate student in linguistics who is fascinated by different cultures. She loves sharing facts about China and is eager to learn about other countries. Very supportive and positive.',
      speakingStyle:
        'Speaks with natural enthusiasm, often expressing excitement or surprise. Uses slightly more varied vocabulary than Li Ming but still keeps things accessible. Tends to echo back what she hears to confirm understanding.',
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
