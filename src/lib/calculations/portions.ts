import type { PortionResult } from '@/lib/types/calculator';

export function roundToMeasurableCups(cups: number): string {
  const fractions = [
    { value: 0.125, label: '1/8' },
    { value: 0.25, label: '1/4' },
    { value: 0.333, label: '1/3' },
    { value: 0.5, label: '1/2' },
    { value: 0.667, label: '2/3' },
    { value: 0.75, label: '3/4' },
  ];
  
  const wholeCups = Math.floor(cups);
  const remainder = cups - wholeCups;
  
  // Find closest fraction
  const closest = fractions.reduce((prev, curr) => 
    Math.abs(curr.value - remainder) < Math.abs(prev.value - remainder) ? curr : prev
  );
  
  if (wholeCups === 0) return closest.label + ' cup';
  if (remainder < 0.0625) return wholeCups + ' cup' + (wholeCups > 1 ? 's' : '');
  return wholeCups + ' ' + closest.label + ' cups';
}

export function calculatePortions(
  dailyKcal: number,
  mealsPerDay: number,
  kcalPerCup: number
): PortionResult {
  const cupsPerDay = dailyKcal / kcalPerCup;
  const cupsPerMeal = cupsPerDay / mealsPerDay;
  
  return {
    cupsPerDay,
    cupsPerMeal,
    cupsPerMealRounded: roundToMeasurableCups(cupsPerMeal),
    gramsPerDay: Math.round(cupsPerDay * 240), // ~240g per cup dry food
    gramsPerMeal: Math.round(cupsPerMeal * 240),
    gramsPerMealRounded: Math.round((cupsPerMeal * 240) / 5) * 5,
  };
}

