import type { ScenarioTemplate } from '../types';

export const casualHangout: ScenarioTemplate = {
  id: 'casual-hangout',
  name: {
    en: 'Hanging Out with Friends',
    zh: '朋友聚会',
  },
  description: {
    en: 'Join a relaxed Friday afternoon hangout — make plans, share opinions about movies and weekend activities, and get comfortable with casual Chinese.',
    zh: '加入周五下午的轻松聚会——制定计划、分享对电影和周末活动的看法，练习地道的日常中文。',
  },
  difficulty: 'intermediate',
  icon: '🧋',
  setting:
    'A trendy bubble tea shop on Friday afternoon, filled with the hiss of shakers and the sweet smell of taro and jasmine. Pastel-colored walls are covered in chalkboard menus and polaroid photo strips. A playlist of Mandopop hums beneath the chatter of students and young professionals unwinding after the week. The long communal table by the window is the perfect spot to watch the street outside while deciding what to do with the weekend.',
  agents: [
    {
      role: 'social friend',
      name: '小美',
      personality:
        "A bubbly, social media-savvy young woman in her early 20s who always has a plan — or three. She collects recommendations for cafés, concerts, and pop-up events and loves introducing new places to friends. Enthusiastic and expressive, she uses current slang naturally and her excitement is contagious. She tends to ask everyone's opinion before deciding anything.",
      speakingStyle:
        'Fast-paced and animated, peppered with contemporary internet slang like 绝绝子 and 好耶. Uses 语气词 such as 呀, 啊, 嘛, and 吧 constantly. Asks questions in rapid succession when excited. Occasionally switches a single English loanword into a sentence (e.g., "太cute了") — though she keeps it mostly Chinese.',
    },
  ],
  targetVocabulary: [
    '周末',
    '计划',
    '电影',
    '好玩',
    '无聊',
    '约',
    '一起',
    '怎么样',
    '随便',
    '算了',
    '太棒了',
    '开心',
    '聊天',
    '逛街',
    '奶茶',
    '请客',
  ],
  vocabularyDict: {
    '周末': { pinyin: 'zhōumò', meaning: 'weekend' },
    '计划': { pinyin: 'jìhuà', meaning: 'plan / to plan' },
    '电影': { pinyin: 'diànyǐng', meaning: 'movie / film' },
    '好玩': { pinyin: 'hǎowán', meaning: 'fun / entertaining' },
    '无聊': { pinyin: 'wúliáo', meaning: 'boring / bored' },
    '约': { pinyin: 'yuē', meaning: 'to make plans with / to invite out' },
    '一起': { pinyin: 'yīqǐ', meaning: 'together' },
    '怎么样': { pinyin: 'zěnmeyàng', meaning: 'how about it? / what do you think?' },
    '随便': { pinyin: 'suíbiàn', meaning: "whatever / up to you / doesn't matter" },
    '算了': { pinyin: 'suàn le', meaning: 'forget it / never mind' },
    '太棒了': { pinyin: 'tài bàng le', meaning: "that's awesome / great!" },
    '开心': { pinyin: 'kāixīn', meaning: 'happy / to have fun' },
    '聊天': { pinyin: 'liáotiān', meaning: 'to chat / to have a conversation' },
    '逛街': { pinyin: 'guàngjiē', meaning: 'to go window shopping / to stroll around' },
    '奶茶': { pinyin: 'nǎichá', meaning: 'milk tea / bubble tea' },
    '请客': { pinyin: 'qǐngkè', meaning: "to treat someone / it's my treat" },
  },
  targetGrammar: [
    '我们去看电影怎么样？（suggesting activities with V + 怎么样？）',
    '我觉得这个电影不太好看（expressing opinions with 我觉得 + clause）',
    '要不我们...吧（casual proposals with 要不 to float an alternative）',
    '啊、嘛、吧、呀（语气词 — sentence-final particles that soften or warm tone）',
  ],
  learnerRole: {
    en: 'A new friend joining the group at the bubble tea shop for the first time',
    zh: '第一次加入这个朋友圈、一起在奶茶店聚会的新朋友',
  },
  successCriteria: [
    'Introduce yourself briefly and order a bubble tea using natural phrasing',
    'Suggest at least one weekend activity using 怎么样 or 要不',
    'Express an opinion about a movie or activity using 我觉得',
    "Respond to 大伟's dry humor with an appropriate casual reaction",
    'Use at least two 语气词 (啊, 嘛, 吧, or 呀) naturally in conversation',
    'Accept or gracefully decline when someone offers 请客',
  ],
  difficultyScaling: {
    beginner:
      '小美 slows down and introduces topics one at a time, using simple vocabulary. 大伟 softens his dry humor and gives clear, direct answers. Both agents offer sentence starters to help the learner contribute, and 语气词 usage is minimal.',
    intermediate:
      'Agents converse at a natural, slightly overlapping pace. The learner must initiate suggestions and respond to opinions without heavy scaffolding. 小美 uses common contemporary expressions and expects the learner to keep up. 语气词 appear regularly and the learner is encouraged to mirror them.',
    advanced:
      'Full-speed casual conversation including current slang, sarcasm, and rapid topic switching. 大伟 goes deeper into deadpan humor that requires reading between the lines. The learner must navigate overlapping suggestions and negotiate a final plan, including handling 请客 gracefully.',
  },
};
