export type Species = 'dog' | 'cat';
export type LifeStage = 'puppy' | 'adult' | 'senior' | 'kitten';
export type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'very-active';
export type FeedingFrequency = 'SID' | 'BID' | 'TID';
export type ReproductiveStatus = 'intact' | 'neutered';

export interface FeedingCalculatorInput {
  species: Species;
  targetWeight: number;
  weightUnit: 'kg' | 'lb';
  lifeStage: LifeStage;
  activityLevel: ActivityLevel;
  reproductiveStatus: ReproductiveStatus;
  feedingFrequency: FeedingFrequency;
}

export interface FeedingCalculatorResult {
  rerKcal: number;
  merKcal: number;
  dailyKcal: number;
  perMealKcal: number;
  mealsPerDay: number;
}

export interface PortionResult {
  cupsPerDay: number;
  cupsPerMeal: number;
  cupsPerMealRounded: string;
  gramsPerDay: number;
  gramsPerMeal: number;
  gramsPerMealRounded: number;
}

