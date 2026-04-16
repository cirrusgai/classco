import type { ScenarioTemplate } from '../types';

export const seeingADoctor: ScenarioTemplate = {
  id: 'seeing-a-doctor',
  name: {
    en: 'Visiting the Doctor',
    zh: '看病',
  },
  description: {
    en: 'Navigate a community clinic visit — register at reception, describe your symptoms to the doctor, and understand the treatment plan.',
    zh: '完成一次社区门诊——挂号、向医生描述症状、听懂治疗方案。',
  },
  difficulty: 'intermediate',
  icon: '🏥',
  setting:
    'A busy but orderly community clinic on a weekday morning. Fluorescent lights hum above rows of plastic chairs where patients clutch registration slips. The reception window has a sign listing departments in red and black, and a hand-sanitizer dispenser stands at every door. The examination room smells faintly of antiseptic, and a blood-pressure cuff hangs on the wall next to a laminated human-anatomy chart. Outside, a queue slowly shuffles forward as the number display board clicks to the next patient.',
  agents: [
    {
      role: 'doctor',
      name: '陈医生',
      personality:
        'A calm, methodical doctor in his 50s with three decades of clinical experience. He believes patients understand their own bodies and asks thorough questions before drawing conclusions. Measured in speech and never rushed, he makes patients feel heard even on a busy morning. He prefers plain language over medical jargon when talking to patients.',
      speakingStyle:
        'Speaks in a steady, unhurried Mandarin with clear diction. Asks short, direct diagnostic questions one at a time. Uses common words for body parts and symptoms rather than clinical terms. Often confirms with phrases like "是这里吗？" while indicating location. Ends explanations with "明白了吗？" to check comprehension.',
    },
  ],
  targetVocabulary: [
    '头疼',
    '发烧',
    '咳嗽',
    '肚子疼',
    '感冒',
    '过敏',
    '药',
    '吃药',
    '休息',
    '检查',
    '挂号',
    '体温',
    '嗓子',
    '不舒服',
    '几天了',
    '严重',
  ],
  vocabularyDict: {
    '头疼': { pinyin: 'tóuténg', meaning: 'headache' },
    '发烧': { pinyin: 'fāshāo', meaning: 'to have a fever' },
    '咳嗽': { pinyin: 'késou', meaning: 'to cough / cough' },
    '肚子疼': { pinyin: 'dùzi téng', meaning: 'stomachache' },
    '感冒': { pinyin: 'gǎnmào', meaning: 'cold / flu' },
    '过敏': { pinyin: 'guòmǐn', meaning: 'allergy / allergic reaction' },
    '药': { pinyin: 'yào', meaning: 'medicine / medication' },
    '吃药': { pinyin: 'chī yào', meaning: 'to take medicine' },
    '休息': { pinyin: 'xiūxi', meaning: 'to rest / rest' },
    '检查': { pinyin: 'jiǎnchá', meaning: 'to examine / checkup' },
    '挂号': { pinyin: 'guàhào', meaning: 'to register (at a clinic)' },
    '体温': { pinyin: 'tǐwēn', meaning: 'body temperature' },
    '嗓子': { pinyin: 'sǎngzi', meaning: 'throat' },
    '不舒服': { pinyin: 'bù shūfu', meaning: 'to feel unwell / uncomfortable' },
    '几天了': { pinyin: 'jǐ tiān le', meaning: 'how many days has it been?' },
    '严重': { pinyin: 'yánzhòng', meaning: 'serious / severe' },
  },
  targetGrammar: [
    '我感觉...（describing symptoms — using 感觉 + adjective or clause）',
    '咳嗽了三天了（duration with 了...了 to express ongoing state）',
    '哪里不舒服？/ 嗓子疼不疼？（asking about symptoms with V不V pattern）',
    '一天吃三次（medication frequency with time + 次 measure words）',
  ],
  learnerRole: {
    en: 'A patient who has had a cold and sore throat for several days',
    zh: '因感冒和嗓子疼来就诊的患者，已持续几天',
  },
  successCriteria: [
    'Complete the registration process by telling 小王 the department needed and basic personal information',
    'Describe the main symptoms (cold, sore throat) to 陈医生 using correct vocabulary',
    'Answer how many days the symptoms have persisted using the duration pattern',
    'Respond correctly when the doctor asks about additional symptoms like fever or cough',
    'Ask whether the condition is serious using 严重',
    'Understand and repeat back the medication instructions including frequency',
  ],
  difficultyScaling: {
    beginner:
      '小王 walks the learner through registration step by step with simple prompts. 陈医生 asks one symptom at a time with yes/no questions and accepts single-word answers. Medication instructions are given slowly with visual gestures described in text.',
    intermediate:
      'Agents speak at a natural clinic pace. The learner must initiate symptom descriptions rather than just answering questions. 陈医生 asks follow-up questions about duration and severity, and the learner must form grammatical responses about onset and progression.',
    advanced:
      'The consultation moves quickly. 陈医生 uses some medical terminology and expects the learner to ask for clarification when needed. 小王 gives multi-step registration instructions without repetition. The learner must also navigate a brief discussion about drug allergies.',
  },
};
