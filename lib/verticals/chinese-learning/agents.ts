import type { AgentConfig } from '@/lib/orchestration/registry/types';
import type { ScenarioTemplate, Difficulty } from './types';
import { buildCharacterPersona, buildAssistantPersona } from './prompts';

const AGENT_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
const ASSISTANT_COLOR = '#6366f1';

export interface ConversationAgents {
  sceneAgents: AgentConfig[];
  assistantAgent: AgentConfig;
  allAgentIds: string[];
  allAgentConfigs: AgentConfig[];
  triggerAgentId: string;
}

export function scenarioToAgents(
  scenario: ScenarioTemplate,
  difficulty: Difficulty,
): ConversationAgents {
  const now = new Date();

  const sceneAgents: AgentConfig[] = scenario.agents.map((agent, index) => ({
    id: `cl-${scenario.id}-${index}`,
    name: agent.name,
    role: agent.role,
    persona: buildCharacterPersona(agent, scenario, difficulty),
    avatar: scenario.icon,
    color: AGENT_COLORS[index % AGENT_COLORS.length],
    allowedActions: [],
    priority: 8 - index,
    createdAt: now,
    updatedAt: now,
    isDefault: false,
    isGenerated: true,
  }));

  const assistantAgent: AgentConfig = {
    id: `cl-${scenario.id}-assistant`,
    name: 'Learning Assistant',
    role: 'learning assistant',
    persona: buildAssistantPersona(scenario),
    avatar: '📖',
    color: ASSISTANT_COLOR,
    allowedActions: [],
    priority: 3,
    createdAt: now,
    updatedAt: now,
    isDefault: false,
    isGenerated: true,
  };

  const allAgentConfigs = [...sceneAgents, assistantAgent];
  const allAgentIds = allAgentConfigs.map((a) => a.id);

  return {
    sceneAgents,
    assistantAgent,
    allAgentIds,
    allAgentConfigs,
    triggerAgentId: sceneAgents[0].id,
  };
}
