import { describe, it, expect } from 'vitest';
import {
  getAllScenarios,
  getScenarioById,
} from '@/lib/verticals/chinese-learning/scenarios';

describe('chinese-learning scenarios', () => {
  const scenarios = getAllScenarios();

  it('returns exactly 3 scenarios', () => {
    expect(scenarios).toHaveLength(3);
  });

  it('every scenario has required display fields', () => {
    for (const s of scenarios) {
      expect(s.id).toBeTruthy();
      expect(s.name.en).toBeTruthy();
      expect(s.name.zh).toBeTruthy();
      expect(s.description.en).toBeTruthy();
      expect(s.description.zh).toBeTruthy();
      expect(s.icon).toBeTruthy();
      expect(['beginner', 'intermediate', 'advanced']).toContain(s.difficulty);
    }
  });

  it('all scenario IDs are unique', () => {
    const ids = scenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getScenarioById returns correct scenario', () => {
    const result = getScenarioById('self-introduction');
    expect(result).toBeDefined();
    expect(result!.id).toBe('self-introduction');
  });

  it('getScenarioById returns undefined for unknown id', () => {
    expect(getScenarioById('nonexistent')).toBeUndefined();
  });

  it('every scenario has at least 1 agent with name and role', () => {
    for (const s of scenarios) {
      expect(s.agents.length).toBeGreaterThanOrEqual(1);
      for (const agent of s.agents) {
        expect(agent.name).toBeTruthy();
        expect(agent.role).toBeTruthy();
      }
    }
  });

  it('every scenario has targetVocabulary and targetGrammar', () => {
    for (const s of scenarios) {
      expect(s.targetVocabulary.length).toBeGreaterThanOrEqual(1);
      expect(s.targetGrammar.length).toBeGreaterThanOrEqual(1);
    }
  });
});
