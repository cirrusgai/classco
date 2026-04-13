import { describe, it, expect } from 'vitest';
import { buildCharacterPersona, buildAssistantPersona } from '@/lib/verticals/chinese-learning/prompts';
import { getScenarioById } from '@/lib/verticals/chinese-learning/scenarios';

describe('buildCharacterPersona', () => {
  const scenario = getScenarioById('restaurant-ordering')!;
  const agent = scenario.agents[0];

  it('includes agent name and personality', () => {
    const persona = buildCharacterPersona(agent, scenario, 'beginner');
    expect(persona).toContain(agent.name);
    expect(persona).toContain(agent.personality);
  });

  it('includes scenario setting and learner role', () => {
    const persona = buildCharacterPersona(agent, scenario, 'beginner');
    expect(persona).toContain(scenario.setting);
    expect(persona).toContain(scenario.learnerRole.en);
  });

  it('includes difficulty-appropriate scaling', () => {
    const beginner = buildCharacterPersona(agent, scenario, 'beginner');
    expect(beginner).toContain(scenario.difficultyScaling.beginner);
    const advanced = buildCharacterPersona(agent, scenario, 'advanced');
    expect(advanced).toContain(scenario.difficultyScaling.advanced);
  });

  it('includes target vocabulary and grammar', () => {
    const persona = buildCharacterPersona(agent, scenario, 'beginner');
    expect(persona).toContain(scenario.targetVocabulary[0]);
    expect(persona).toContain(scenario.targetGrammar[0]);
  });

  it('includes Chinese-only language rule', () => {
    const persona = buildCharacterPersona(agent, scenario, 'beginner');
    expect(persona).toContain('Chinese');
    expect(persona).toContain('Mandarin');
  });
});

describe('buildAssistantPersona', () => {
  const scenario = getScenarioById('restaurant-ordering')!;

  it('states assistant role and non-participation', () => {
    const persona = buildAssistantPersona(scenario);
    expect(persona).toContain('learning assistant');
    expect(persona).toContain('do NOT participate');
  });

  it('includes scenario context and target content', () => {
    const persona = buildAssistantPersona(scenario);
    expect(persona).toContain(scenario.setting);
    expect(persona).toContain(scenario.targetVocabulary[0]);
    expect(persona).toContain(scenario.targetGrammar[0]);
  });

  it('instructs tips in learner language', () => {
    const persona = buildAssistantPersona(scenario);
    expect(persona).toContain('English');
  });

  it('uses provided learnerLanguage in tips instruction', () => {
    const persona = buildAssistantPersona(scenario, 'French');
    expect(persona).toContain('French');
  });
});
