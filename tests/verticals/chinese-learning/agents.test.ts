import { describe, it, expect } from 'vitest';
import { scenarioToAgents } from '@/lib/verticals/chinese-learning/agents';
import { getScenarioById, getAllScenarios } from '@/lib/verticals/chinese-learning/scenarios';

describe('scenarioToAgents', () => {
  const scenario = getScenarioById('restaurant-ordering')!;

  it('creates scene agents matching scenario.agents count', () => {
    const { sceneAgents } = scenarioToAgents(scenario, 'beginner');
    expect(sceneAgents).toHaveLength(scenario.agents.length);
  });

  it('creates one assistant agent with assistant in its ID', () => {
    const { assistantAgent } = scenarioToAgents(scenario, 'beginner');
    expect(assistantAgent.id).toContain('assistant');
  });

  it('all agent IDs are unique', () => {
    const { allAgentIds } = scenarioToAgents(scenario, 'beginner');
    expect(new Set(allAgentIds).size).toBe(allAgentIds.length);
  });

  it('allAgentIds includes scene + assistant', () => {
    const { allAgentIds, sceneAgents, assistantAgent } = scenarioToAgents(scenario, 'beginner');
    expect(allAgentIds).toHaveLength(sceneAgents.length + 1);
    expect(allAgentIds).toContain(assistantAgent.id);
  });

  it('triggerAgentId is the first scene agent', () => {
    const { triggerAgentId, sceneAgents } = scenarioToAgents(scenario, 'beginner');
    expect(triggerAgentId).toBe(sceneAgents[0].id);
  });

  it('scene agents have higher priority than assistant', () => {
    const { sceneAgents, assistantAgent } = scenarioToAgents(scenario, 'beginner');
    for (const sa of sceneAgents) {
      expect(sa.priority).toBeGreaterThan(assistantAgent.priority);
    }
  });

  it('all agents have empty allowedActions', () => {
    const { allAgentConfigs } = scenarioToAgents(scenario, 'beginner');
    for (const agent of allAgentConfigs) {
      expect(agent.allowedActions).toEqual([]);
    }
  });

  it('scene agent names match scenario template', () => {
    const { sceneAgents } = scenarioToAgents(scenario, 'beginner');
    expect(sceneAgents[0].name).toBe('王阿姨');
  });

  it('passes difficulty to persona builder', () => {
    const beginner = scenarioToAgents(scenario, 'beginner');
    const advanced = scenarioToAgents(scenario, 'advanced');
    expect(beginner.sceneAgents[0].persona).toContain(scenario.difficultyScaling.beginner);
    expect(advanced.sceneAgents[0].persona).toContain(scenario.difficultyScaling.advanced);
  });

  it('works for all scenarios', () => {
    for (const s of getAllScenarios()) {
      const result = scenarioToAgents(s, 'intermediate');
      expect(result.sceneAgents.length).toBeGreaterThanOrEqual(1);
      expect(result.allAgentIds.length).toBe(s.agents.length + 1);
    }
  });

  it('agent configs have required fields for API request', () => {
    const { allAgentConfigs } = scenarioToAgents(scenario, 'beginner');
    for (const agent of allAgentConfigs) {
      expect(agent.id).toBeTruthy();
      expect(agent.name).toBeTruthy();
      expect(agent.role).toBeTruthy();
      expect(agent.persona).toBeTruthy();
      expect(agent.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(typeof agent.priority).toBe('number');
    }
  });
});
