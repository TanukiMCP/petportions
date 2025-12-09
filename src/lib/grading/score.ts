import type { PetFood } from '@/lib/types/food';
import type { Species, LifeStage } from '@/lib/types/calculator';
import type { GradingResult, GradingCategory } from '@/lib/types/grading';
import { GRADING_CRITERIA } from './criteria';

/**
 * Grade pet food based on AAFCO guidelines and nutritional standards
 * This is a simplified scoring algorithm. A full implementation would
 * analyze guaranteed_analysis, ingredient lists, and other factors.
 */
export function gradeFood(
  food: PetFood,
  species: Species,
  lifeStage: LifeStage
): GradingResult {
  // For now, generate scores based on food properties
  // Real implementation would analyze guaranteed_analysis, ingredients, etc.

  // AAFCO Compliance - assume most commercial foods are compliant
  const aafcoScore = 85;

  // Protein Quality - check if food matches species
  const proteinScore = food.species === species ? 80 : 70;

  // Ingredient Quality - simplified scoring
  // Higher quality brands get better scores (this is a placeholder)
  const ingredientScore = 75;

  // Nutritional Balance - check if kcal values are reasonable
  const nutritionalScore =
    food.kcalPerCup > 0 && food.kcalPerKg > 0 ? 80 : 60;

  // Safety Flags - assume no major safety issues for now
  const safetyScore = 90;

  const categories: GradingCategory[] = [
    {
      name: 'AAFCO Compliance',
      score: aafcoScore,
      weight: GRADING_CRITERIA.aafcoCompliance.weight,
    },
    {
      name: 'Protein Quality',
      score: proteinScore,
      weight: GRADING_CRITERIA.proteinQuality.weight,
    },
    {
      name: 'Ingredient Quality',
      score: ingredientScore,
      weight: GRADING_CRITERIA.ingredientQuality.weight,
    },
    {
      name: 'Nutritional Balance',
      score: nutritionalScore,
      weight: GRADING_CRITERIA.nutritionalBalance.weight,
    },
    {
      name: 'Safety Flags',
      score: safetyScore,
      weight: GRADING_CRITERIA.safetyFlags.weight,
    },
  ];

  // Calculate weighted overall score
  const overallScore = categories.reduce(
    (sum, cat) => sum + (cat.score * cat.weight) / 100,
    0
  );

  // Determine letter grade
  const overallGrade =
    overallScore >= 90
      ? 'A'
      : overallScore >= 80
      ? 'B'
      : overallScore >= 70
      ? 'C'
      : overallScore >= 60
      ? 'D'
      : 'F';

  // Generate concerns and positives based on scores
  const concerns: string[] = [];
  const positives: string[] = [];

  if (proteinScore < 75) {
    concerns.push('Protein quality may not be optimal for this species');
  }
  if (ingredientScore < 70) {
    concerns.push('Ingredient quality could be improved');
  }
  if (nutritionalScore < 75) {
    concerns.push('Nutritional balance may need review');
  }

  if (proteinScore >= 80) {
    positives.push('Good protein quality for species');
  }
  if (safetyScore >= 90) {
    positives.push('No major safety concerns identified');
  }
  if (aafcoScore >= 85) {
    positives.push('Meets AAFCO compliance standards');
  }

  return {
    overallGrade,
    overallScore: Math.round(overallScore),
    categories,
    concerns,
    positives,
  };
}

