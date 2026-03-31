import type { ScenarioTemplate } from '../types';
import { selfIntroduction } from './self-introduction';
import { restaurantOrdering } from './restaurant-ordering';
import { takingATaxi } from './taking-a-taxi';

const scenarios: ScenarioTemplate[] = [
  selfIntroduction,
  restaurantOrdering,
  takingATaxi,
];

export function getAllScenarios(): ScenarioTemplate[] {
  return scenarios;
}

export function getScenarioById(id: string): ScenarioTemplate | undefined {
  return scenarios.find((s) => s.id === id);
}
