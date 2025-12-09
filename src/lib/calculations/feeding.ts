import type { FeedingCalculatorInput, FeedingCalculatorResult } from '@/lib/types/calculator';
import { MER_MULTIPLIERS } from './constants';

/**
 * RER = 70 * (weight in kg)^0.75
 * Resting Energy Requirement - base metabolic energy needs
 */
export function calculateRER(weightKg: number): number {
  return 70 * Math.pow(weightKg, 0.75);
}

/**
 * Convert pounds to kilograms
 */
export function lbToKg(lb: number): number {
  return lb * 0.453592;
}

/**
 * Get the MER multiplier for a given pet configuration
 */
export function getMERMultiplier(input: FeedingCalculatorInput): number {
  const multipliers = MER_MULTIPLIERS[input.species] as any;

  if (input.lifeStage === 'puppy' && input.species === 'dog') {
    return multipliers.puppy as number;
  }

  if (input.lifeStage === 'kitten' && input.species === 'cat') {
    return multipliers.kitten as number;
  }

  if (input.lifeStage === 'adult') {
    const adultMultipliers = multipliers.adult;
    const activityMultipliers = adultMultipliers[input.reproductiveStatus];
    return activityMultipliers[input.activityLevel] as number;
  }

  if (input.lifeStage === 'senior') {
    const seniorMultipliers = multipliers.senior;
    return seniorMultipliers[input.reproductiveStatus] as number;
  }

  // Fallback
  return 1.6;
}

/**
 * Calculate complete feeding requirements based on pet characteristics
 */
export function calculateFeeding(input: FeedingCalculatorInput): FeedingCalculatorResult {
  const weightKg = input.weightUnit === 'lb' ? lbToKg(input.targetWeight) : input.targetWeight;
  const rerKcal = calculateRER(weightKg);
  const multiplier = getMERMultiplier(input);
  const merKcal = rerKcal * multiplier;
  const dailyKcal = Math.round(merKcal);
  
  const mealsPerDay =
    input.feedingFrequency === 'SID' ? 1 : input.feedingFrequency === 'BID' ? 2 : 3;

  return {
    rerKcal: Math.round(rerKcal),
    merKcal: Math.round(merKcal),
    dailyKcal,
    perMealKcal: Math.round(dailyKcal / mealsPerDay),
    mealsPerDay
  };
}

