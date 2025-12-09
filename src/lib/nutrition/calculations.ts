/**
 * Nutritional Calculation Utilities
 * 
 * Functions to derive missing nutritional data from guaranteed analysis values.
 * Based on AAFCO standards and Modified Atwater formulas.
 */

export interface GuaranteedAnalysis {
  protein: number; // % as-fed
  fat: number; // % as-fed
  fiber: number; // % as-fed
  moisture: number; // % as-fed
  ash?: number; // % as-fed (optional, will estimate if missing)
}

export interface DryMatterBasis {
  protein: number; // % dry matter
  fat: number; // % dry matter
  fiber: number; // % dry matter
  carbohydrates: number; // % dry matter
  ash: number; // % dry matter
}

export interface CalorieWeightedBasis {
  protein: number; // % of calories from protein
  fat: number; // % of calories from fat
  carbohydrates: number; // % of calories from carbs
}

export interface MetabolizableEnergy {
  kcalPer100g: number;
  kcalPerKg: number;
  kcalPerCup?: number; // Requires cup weight
}

/**
 * Convert nutrient to Dry Matter Basis
 * Formula: DMB% = (Nutrient% / (100 - Moisture%)) × 100
 */
export function convertToDryMatterBasis(
  nutrientPercent: number,
  moisturePercent: number
): number {
  const dryMatter = 100 - moisturePercent;
  if (dryMatter <= 0) return 0;
  return (nutrientPercent / dryMatter) * 100;
}

/**
 * Estimate ash content if not provided
 * Average values based on food type
 */
export function estimateAsh(
  foodType: 'dry' | 'wet' | 'raw',
  moisturePercent: number
): number {
  // Dry food: ~5-8% ash
  // Wet food: ~2-3% ash
  // Raw food: ~1-2% ash
  if (moisturePercent > 70) return 2.5; // Wet
  if (moisturePercent > 40) return 4.0; // Semi-moist
  return 6.5; // Dry
}

/**
 * Calculate carbohydrate content
 * Formula: Carbs% = 100 - (Protein% + Fat% + Fiber% + Moisture% + Ash%)
 */
export function calculateCarbohydrates(ga: GuaranteedAnalysis): number {
  const ash = ga.ash ?? estimateAsh('dry', ga.moisture);
  const carbs = 100 - (ga.protein + ga.fat + ga.fiber + ga.moisture + ash);
  return Math.max(0, carbs); // Ensure non-negative
}

/**
 * Calculate complete Dry Matter Basis nutritional profile
 */
export function calculateDryMatterBasis(ga: GuaranteedAnalysis): DryMatterBasis {
  const ash = ga.ash ?? estimateAsh('dry', ga.moisture);
  const carbs = calculateCarbohydrates(ga);
  
  return {
    protein: convertToDryMatterBasis(ga.protein, ga.moisture),
    fat: convertToDryMatterBasis(ga.fat, ga.moisture),
    fiber: convertToDryMatterBasis(ga.fiber, ga.moisture),
    carbohydrates: convertToDryMatterBasis(carbs, ga.moisture),
    ash: convertToDryMatterBasis(ash, ga.moisture),
  };
}

/**
 * Calculate Metabolizable Energy using Modified Atwater factors
 * Protein: 3.5 kcal/g
 * Fat: 8.5 kcal/g
 * Carbohydrates: 3.5 kcal/g
 * 
 * Formula: ME (kcal/100g) = (3.5 × Protein%) + (8.5 × Fat%) + (3.5 × Carbs%)
 */
export function calculateMetabolizableEnergy(
  ga: GuaranteedAnalysis,
  cupWeightGrams?: number
): MetabolizableEnergy {
  const carbs = calculateCarbohydrates(ga);
  
  // Calculate kcal per 100g (as-fed basis)
  const kcalPer100g = (3.5 * ga.protein) + (8.5 * ga.fat) + (3.5 * carbs);
  
  // Convert to kcal/kg
  const kcalPerKg = kcalPer100g * 10;
  
  // Calculate kcal/cup if cup weight is known
  const kcalPerCup = cupWeightGrams 
    ? (kcalPerKg * cupWeightGrams) / 1000 
    : undefined;
  
  return {
    kcalPer100g,
    kcalPerKg,
    kcalPerCup,
  };
}

/**
 * Calculate Calorie-Weighted Basis (percentage of calories from each macronutrient)
 * Shows energy distribution from protein, fat, and carbohydrates
 */
export function calculateCalorieWeightedBasis(ga: GuaranteedAnalysis): CalorieWeightedBasis {
  const carbs = calculateCarbohydrates(ga);
  
  // Calculate calories from each macronutrient
  const proteinKcal = 3.5 * ga.protein;
  const fatKcal = 8.5 * ga.fat;
  const carbsKcal = 3.5 * carbs;
  
  const totalKcal = proteinKcal + fatKcal + carbsKcal;
  
  if (totalKcal === 0) {
    return { protein: 0, fat: 0, carbohydrates: 0 };
  }
  
  return {
    protein: (proteinKcal / totalKcal) * 100,
    fat: (fatKcal / totalKcal) * 100,
    carbohydrates: (carbsKcal / totalKcal) * 100,
  };
}

/**
 * Estimate cup weight in grams based on food type and kcal/cup
 * Used when kcal/cup is known but kcal/kg needs to be calculated
 */
export function estimateCupWeightFromKcal(
  kcalPerCup: number,
  ga: GuaranteedAnalysis
): number {
  const me = calculateMetabolizableEnergy(ga);
  const kcalPerGram = me.kcalPer100g / 100;
  return kcalPerCup / kcalPerGram;
}

/**
 * Validate calculated nutritional values for reasonableness
 * Returns warnings if values are outside expected ranges
 */
export function validateNutritionalData(
  ga: GuaranteedAnalysis,
  dmb: DryMatterBasis,
  cwb: CalorieWeightedBasis
): string[] {
  const warnings: string[] = [];
  
  // Dry Matter Basis checks
  if (dmb.protein < 18 || dmb.protein > 60) {
    warnings.push(`Unusual protein DMB: ${dmb.protein.toFixed(1)}% (expected 18-60%)`);
  }
  if (dmb.fat < 5 || dmb.fat > 40) {
    warnings.push(`Unusual fat DMB: ${dmb.fat.toFixed(1)}% (expected 5-40%)`);
  }
  if (dmb.carbohydrates < 10 || dmb.carbohydrates > 70) {
    warnings.push(`Unusual carbs DMB: ${dmb.carbohydrates.toFixed(1)}% (expected 10-70%)`);
  }
  
  // Calorie Weighted Basis checks
  if (cwb.protein < 15 || cwb.protein > 50) {
    warnings.push(`Unusual protein CWB: ${cwb.protein.toFixed(1)}% (expected 15-50%)`);
  }
  if (cwb.fat < 20 || cwb.fat > 70) {
    warnings.push(`Unusual fat CWB: ${cwb.fat.toFixed(1)}% (expected 20-70%)`);
  }
  
  return warnings;
}

/**
 * Complete nutritional analysis from guaranteed analysis
 * Returns all calculated values with validation warnings
 */
export function completeNutritionalAnalysis(ga: GuaranteedAnalysis, cupWeightGrams?: number) {
  const dmb = calculateDryMatterBasis(ga);
  const cwb = calculateCalorieWeightedBasis(ga);
  const me = calculateMetabolizableEnergy(ga, cupWeightGrams);
  const warnings = validateNutritionalData(ga, dmb, cwb);
  
  return {
    guaranteedAnalysis: ga,
    dryMatterBasis: dmb,
    calorieWeightedBasis: cwb,
    metabolizableEnergy: me,
    warnings,
  };
}

