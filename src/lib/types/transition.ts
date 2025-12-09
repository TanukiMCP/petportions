import type { PetFood } from './food';

export interface TransitionPlan {
  days: TransitionDay[];
  currentFood: PetFood;
  newFood: PetFood;
}

export interface TransitionDay {
  day: number;
  oldFoodPercent: number;
  newFoodPercent: number;
  oldFoodCups: string;
  newFoodCups: string;
}

