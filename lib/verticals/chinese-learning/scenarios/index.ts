import type { ScenarioTemplate } from '../types';
import { selfIntroduction } from './self-introduction';
import { restaurantOrdering } from './restaurant-ordering';
import { takingATaxi } from './taking-a-taxi';
import { groceryShopping } from './grocery-shopping';
import { seeingADoctor } from './seeing-a-doctor';
import { casualHangout } from './casual-hangout';
import { jobInterview } from './job-interview';
import { rentingApartment } from './renting-apartment';
import { banking } from './banking';
import { phoneComplaint } from './phone-complaint';

const scenarios: ScenarioTemplate[] = [
  selfIntroduction,
  restaurantOrdering,
  takingATaxi,
  groceryShopping,
  seeingADoctor,
  jobInterview,
  casualHangout,
  rentingApartment,
  banking,
  phoneComplaint,
];

export function getAllScenarios(): ScenarioTemplate[] {
  return scenarios;
}

export function getScenarioById(id: string): ScenarioTemplate | undefined {
  return scenarios.find((s) => s.id === id);
}
