import type { ScenarioTemplate } from '../types';

export const takingATaxi: ScenarioTemplate = {
  id: 'taking-a-taxi',
  name: {
    en: 'Taking a Taxi',
    zh: '打出租车',
  },
  description: {
    en: 'Hail a taxi in Beijing, give directions to your destination, and navigate the journey with a chatty local driver.',
    zh: '在北京打出租车，给司机指路，和健谈的本地司机交流。',
  },
  difficulty: 'intermediate',
  icon: '🚕',
  setting:
    'A busy street corner in central Beijing on a weekday afternoon. Taxis and e-bikes weave through moderate traffic. You have just flagged down an aging yellow taxi. The driver has a dashboard charm swinging from the rearview mirror, a half-finished bottle of water in the cupholder, and Beijing traffic radio playing softly. The city outside moves at a bustling urban pace.',
  agents: [
    {
      role: 'taxi driver',
      name: '老张',
      personality:
        'A chatty, experienced Beijing taxi driver in his 40s who has seen every corner of the city. He is proud of his local knowledge and loves to share opinions on traffic, Beijing life, and current events. Good-natured and humorous, he uses authentic Beijing dialect expressions and is patient when passengers struggle to communicate — though he will not slow down his speech unless explicitly asked.',
      speakingStyle:
        'Speaks with a slight Beijing "er-hua" accent and uses colloquial expressions naturally. Delivers directions and commentary in quick, confident bursts. Often asks rhetorical questions or makes jokes. Mixes formal destination vocabulary with casual chit-chat.',
    },
  ],
  targetVocabulary: [
    '出租车',
    '司机',
    '师傅',
    '去',
    '到',
    '路',
    '左转',
    '右转',
    '直走',
    '红绿灯',
    '路口',
    '多远',
    '多久',
    '堵车',
    '到了',
    '停',
    '付款',
  ],
  targetGrammar: [
    '请去...（giving destination）',
    '在...左转/右转（giving directions）',
    '到...要多久？（asking duration）',
    '离...远不远？（asking distance）',
  ],
  learnerRole: {
    en: 'A tourist needing to get to a specific landmark or hotel across the city',
    zh: '需要打车去城市另一侧某个地标或酒店的游客',
  },
  successCriteria: [
    'Successfully hail and greet the driver using 师傅',
    'State the destination clearly using 请去...',
    'Ask how long the journey will take',
    'Give at least one directional instruction during the ride',
    'Ask about or comment on the traffic',
    'Complete the journey and pay correctly',
  ],
  difficultyScaling: {
    beginner:
      'Lao Zhang speaks slowly and uses simple vocabulary, confirms the destination by repeating it back, keeps chit-chat minimal, and provides clear prompts when the learner needs to respond.',
    intermediate:
      'Lao Zhang speaks at a normal conversational pace, introduces some Beijing expressions, engages in brief small talk about traffic or Beijing life, and expects the learner to initiate payment and farewells.',
    advanced:
      'Full Beijing dialect speed with er-hua pronunciation, extended opinionated conversation about city life and current events, unexpected detours requiring direction negotiation, and idiomatic expressions throughout.',
  },
};
