import type { PetFood } from '@/lib/types/food';
import type { TransitionPlan, TransitionDay } from '@/lib/types/transition';
import { roundToMeasurableCups } from './portions';

export function calculateTransition(
  currentFood: PetFood,
  newFood: PetFood,
  currentPortionCups: number,
  transitionDays: number
): TransitionPlan {
  const days: TransitionDay[] = [];

  for (let day = 1; day <= transitionDays; day++) {
    const newPercent = Math.round((day / transitionDays) * 100);
    const oldPercent = 100 - newPercent;

    days.push({
      day,
      oldFoodPercent: oldPercent,
      newFoodPercent: newPercent,
      oldFoodCups: roundToMeasurableCups((oldPercent / 100) * currentPortionCups),
      newFoodCups: roundToMeasurableCups((newPercent / 100) * currentPortionCups),
    });
  }

  return { days, currentFood, newFood };
}

