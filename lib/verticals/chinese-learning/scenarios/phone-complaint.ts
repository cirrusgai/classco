import type { ScenarioTemplate } from '../types';

export const phoneComplaint: ScenarioTemplate = {
  id: 'phone-complaint',
  name: {
    en: 'Phone Complaint',
    zh: '电话投诉',
  },
  description: {
    en: 'Call a delivery company hotline to complain about a delayed package — escalate from a frontline agent to a supervisor and negotiate compensation in Chinese.',
    zh: '致电快递公司客服热线投诉包裹延误——从一线客服升级到主管，用中文协商赔偿方案。',
  },
  difficulty: 'advanced',
  icon: '📞',
  setting:
    'You are at home, phone pressed to your ear, on hold for the third time today. A tinny hold melody plays before cutting off abruptly. The delivery company\'s hotline auto-attendant has already disconnected you twice. The package — ordered a week ago and promised within two business days — still shows "in transit" on the tracking page. You have screenshot evidence and an order number ready. The stakes feel low but your patience is genuinely exhausted.',
  agents: [
    {
      role: 'customer service representative',
      name: '客服小张',
      personality:
        'A script-following frontline CSR in his mid-20s who reads from a standardized response handbook. He is not unkind but is trained to de-escalate without committing to anything. He genuinely has limited authority — he cannot issue refunds or compensation himself — and he knows it. He will apologize sincerely, check the tracking system, and offer to escalate if the customer requests it, but he will also try to resolve the call at his level first to avoid transfers.',
      speakingStyle:
        'Polished but slightly robotic call-center Mandarin. Uses formulaic phrases such as 非常抱歉给您带来不便 and 请您稍等. Speaks at a measured pace with a customer-service tone. Avoids colloquialisms. Will repeat scripted apologies if pushed but eventually runs out of answers and escalates.',
    },
    {
      role: 'supervisor',
      name: '王主管',
      personality:
        'A pragmatic supervisor in her 30s who has the authority to offer compensation — vouchers, partial refunds, or expedited reshipping. She is more direct than the frontline agent and less scripted. She will listen to the complaint summary, acknowledge the failure, and make a concrete offer. However, she will not exceed her compensation ceiling without a fight, and she expects the customer to be specific about what they want.',
      speakingStyle:
        'Direct, efficient Mandarin with a professional but warmer tone than the frontline agent. Uses fewer filler phrases and gets to the point quickly. Asks clarifying questions about what resolution the customer expects. Will push back on unreasonable demands with polite firmness.',
    },
  ],
  targetVocabulary: [
    '投诉',
    '快递',
    '包裹',
    '订单',
    '退款',
    '赔偿',
    '解决',
    '等待',
    '跟踪',
    '客服',
    '主管',
    '抱歉',
    '满意',
    '负责',
    '处理',
    '承诺',
  ],
  vocabularyDict: {
    '投诉': { pinyin: 'tóusù', meaning: 'to complain / complaint' },
    '快递': { pinyin: 'kuàidì', meaning: 'express delivery / courier' },
    '包裹': { pinyin: 'bāoguǒ', meaning: 'package / parcel' },
    '订单': { pinyin: 'dìngdān', meaning: 'order (purchase)' },
    '退款': { pinyin: 'tuìkuǎn', meaning: 'refund' },
    '赔偿': { pinyin: 'péicháng', meaning: 'compensation / indemnity' },
    '解决': { pinyin: 'jiějué', meaning: 'to resolve / to solve' },
    '等待': { pinyin: 'děngdài', meaning: 'to wait / waiting' },
    '跟踪': { pinyin: 'gēnzōng', meaning: 'to track / tracking' },
    '客服': { pinyin: 'kèfú', meaning: 'customer service' },
    '主管': { pinyin: 'zhǔguǎn', meaning: 'supervisor / manager' },
    '抱歉': { pinyin: 'bàoqiàn', meaning: 'sorry / to apologize' },
    '满意': { pinyin: 'mǎnyì', meaning: 'satisfied / satisfactory' },
    '负责': { pinyin: 'fùzé', meaning: 'responsible / to be in charge of' },
    '处理': { pinyin: 'chǔlǐ', meaning: 'to handle / to deal with' },
    '承诺': { pinyin: 'chéngnuò', meaning: 'promise / commitment' },
  },
  targetGrammar: [
    '虽然...但是...（concession: although... but...）',
    '已经...了（completed action: I have already waited five days）',
    'Polite escalation with 我想请您的主管来处理（I would like your supervisor to handle this）',
    'Conditional ultimatum with 如果...的话，我就...（if... I will...）',
  ],
  learnerRole: {
    en: 'A customer calling to complain about a package delayed by five days',
    zh: '因包裹延误五天而致电投诉的客户',
  },
  successCriteria: [
    'Clearly state the problem including the order number and delay duration using 订单 and 已经...了',
    'Express dissatisfaction politely but firmly using 不满意 or 抱歉 in response',
    'Use 虽然...但是... at least once to acknowledge the agent\'s apology while pressing for a solution',
    'Successfully request to speak to a supervisor using 主管',
    'State a specific resolution you want (退款 or 赔偿) to the supervisor',
    'Use a conditional ultimatum to conclude the negotiation',
  ],
  difficultyScaling: {
    beginner:
      'Xiao Zhang speaks slowly and clearly, immediately escalates to the supervisor without resistance, and Wang Zhu Guan proactively offers a full refund with minimal pushback. The learner only needs to describe the problem and accept the offer.',
    intermediate:
      'Xiao Zhang follows the script and requires the learner to explicitly request escalation. Wang Zhu Guan makes an initial low offer (voucher) and the learner must counter with a specific request. Both agents speak at natural pace with standard vocabulary.',
    advanced:
      'Xiao Zhang delays the escalation with scripted apologies and the learner must politely but firmly insist. Wang Zhu Guan offers only a voucher initially, pushes back on refund requests, and requires the learner to use a conditional ultimatum. Both agents speak quickly, use overlapping phrases, and the learner must manage hold time and interruptions.',
  },
};
