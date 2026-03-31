export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface AgentTemplate {
  role: string;
  name: string;
  personality: string;
  speakingStyle: string;
}

export interface ScenarioTemplate {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  difficulty: Difficulty;
  icon: string;
  setting: string;
  agents: AgentTemplate[];
  targetVocabulary: string[];
  targetGrammar: string[];
  learnerRole: { en: string; zh: string };
  successCriteria: string[];
  difficultyScaling: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}
