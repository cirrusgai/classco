import type { ScenarioTemplate } from '../types';

export const rentingApartment: ScenarioTemplate = {
  id: 'renting-apartment',
  name: {
    en: 'Renting an Apartment',
    zh: '租房',
  },
  description: {
    en: 'View a walk-up apartment and negotiate with the landlord — ask about rent, deposit, utilities, and what furniture is included before signing a lease.',
    zh: '看房并与房东协商——了解租金、押金、水电费和家具情况，做好签约准备。',
  },
  difficulty: 'advanced',
  icon: '🏠',
  setting:
    'A sixth-floor walk-up apartment in an older residential compound built in the 1990s. The stairwell smells faintly of cooking oil and laundry. The apartment itself is modest but habitable: original tile floors, a small balcony overlooking the courtyard, and a cramped but functional kitchen. The landlord has just unlocked the door and is standing in the living room, keys in hand, ready to show the place.',
  agents: [
    {
      role: 'landlord',
      name: '房东李叔',
      personality:
        'A practical man in his 60s who inherited this apartment from his parents and has rented it out for over a decade. He is not unkind but he is firm on price — he has seen too many tenants try to negotiate him down only to cause problems later. He prefers tenants who are quiet, pay on time, and do not host loud gatherings. He will answer questions honestly but does not volunteer information that might give the tenant more negotiating power.',
      speakingStyle:
        'Gruff, no-frills Mandarin with occasional northern dialect flavor. Uses short declarative sentences and practical vocabulary. He does not sugarcoat the apartment\'s limitations but will defend its merits when pushed. Patient enough to repeat himself but grows visibly impatient with prolonged back-and-forth over already-stated terms.',
    },
  ],
  targetVocabulary: [
    '租',
    '房租',
    '押金',
    '水电费',
    '合同',
    '签',
    '家具',
    '空调',
    '网络',
    '搬',
    '修',
    '邻居',
    '安静',
    '交通',
    '方便',
    '月',
  ],
  vocabularyDict: {
    '租': { pinyin: 'zū', meaning: 'to rent' },
    '房租': { pinyin: 'fángzū', meaning: 'rent (monthly payment)' },
    '押金': { pinyin: 'yājīn', meaning: 'security deposit' },
    '水电费': { pinyin: 'shuǐdiànfèi', meaning: 'water and electricity fees' },
    '合同': { pinyin: 'hétong', meaning: 'contract / lease agreement' },
    '签': { pinyin: 'qiān', meaning: 'to sign' },
    '家具': { pinyin: 'jiājù', meaning: 'furniture' },
    '空调': { pinyin: 'kōngtiáo', meaning: 'air conditioner' },
    '网络': { pinyin: 'wǎngluò', meaning: 'internet / network' },
    '搬': { pinyin: 'bān', meaning: 'to move (to a new place)' },
    '修': { pinyin: 'xiū', meaning: 'to repair / to fix' },
    '邻居': { pinyin: 'línjū', meaning: 'neighbor(s)' },
    '安静': { pinyin: 'ānjìng', meaning: 'quiet / peaceful' },
    '交通': { pinyin: 'jiāotōng', meaning: 'transportation / traffic' },
    '方便': { pinyin: 'fāngbiàn', meaning: 'convenient' },
    '月': { pinyin: 'yuè', meaning: 'month' },
  },
  targetGrammar: [
    '如果...就...（conditional: if... then...）',
    'Asking what is included with 包括什么？（what does it include?）',
    'Polite requests with 能不能...？（is it possible to...?）',
    'Monthly amounts with 每个月...元（... yuan per month）',
  ],
  learnerRole: {
    en: 'A prospective tenant viewing the apartment for the first time',
    zh: '第一次来看房的租房者',
  },
  successCriteria: [
    'Ask about the monthly rent and confirm the figure using 每个月',
    'Ask how many months of deposit are required using 押金',
    'Inquire whether water and electricity fees are included using 包括',
    'Ask about at least two items of furniture or appliances (e.g. 空调, 家具)',
    'Use a conditional 如果...就... sentence during negotiation',
    'Ask a question about the lease contract using 合同 or 签',
  ],
  difficultyScaling: {
    beginner:
      'Li Shu speaks slowly and uses simple vocabulary, states all key figures (rent, deposit, fees) clearly upfront, and patiently answers each question with short sentences. Negotiation is minimal.',
    intermediate:
      'Li Shu speaks at a natural conversational pace, mentions utilities in passing and expects the tenant to ask for clarification, and introduces a brief negotiation over a small repair or furnishing.',
    advanced:
      'Li Shu speaks quickly with northern dialect flavor, does not volunteer information, pushes back on any negotiation attempts, and introduces a competing interested tenant to create urgency. The learner must ask follow-up questions and navigate mild pressure to sign on the spot.',
  },
};
