export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface SuggestedReply {
  text: string;
  pinyin: string;
}

export interface VocabEntry {
  pinyin: string;
  meaning: string;
}

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
  vocabularyDict: Record<string, VocabEntry>;
  targetGrammar: string[];
  learnerRole: { en: string; zh: string };
  successCriteria: string[];
  difficultyScaling: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

export interface SessionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentId?: string;
  agentName?: string;
  agentColor?: string;
  timestamp: number;
}

export interface SavedSession {
  id: string;
  scenarioId: string;
  difficulty: Difficulty;
  messages: SessionMessage[];
  startedAt: string;
  endedAt: string;
}

export interface VocabularyItem {
  word: string;
  pinyin: string;
  meaning: string;
  exampleFromChat: string;
}

export interface SessionReview {
  sessionId: string;
  vocabulary: VocabularyItem[];
  summary: string;
  generatedAt: string;
}
