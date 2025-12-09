/**
 * Data Transformation Layer
 * 
 * Transforms Open Pet Food Facts API responses into our internal PetFood type
 */

import type { OpenPetFoodProduct, PetSpecies, LifeStage, LIFE_STAGE_KEYWORDS } from '@/lib/types/openpetfood-api';
import type { PetFood } from '@/lib/types/food';

/**
 * Extract species from category tags
 */
function extractSpecies(categories_tags?: string[]): PetSpecies | null {
  if (!categories_tags) return null;
  
  const hasdog = categories_tags.some(tag => 
    tag.includes('dog-food') || 
    tag.includes('dog-and-cat-food')
  );
  
  const hasCat = categories_tags.some(tag => 
    tag.includes('cat-food') || 
    tag.includes('dog-and-cat-food')
  );
  
  // If both, default to dog; if specific, use that
  if (hasCat && !hasdog) return 'cat';
  if (hasdog) return 'dog';
  
  return null;
}

/**
 * Extract life stage from categories and product name
 */
function extractLifeStage(product: OpenPetFoodProduct): string {
  const searchText = [
    product.product_name,
    product.categories,
    ...(product.categories_tags || [])
  ].join(' ').toLowerCase();
  
  // Check for life stage keywords
  const lifeStageKeywords: Record<string, LifeStage> = {
    'puppy': 'puppy',
    'junior': 'puppy',
    'kitten': 'kitten',
    'adult': 'adult',
    'mature': 'adult',
    'senior': 'senior',
    'all-ages': 'all-life-stages',
    'all-life-stages': 'all-life-stages',
    'all ages': 'all-life-stages'
  };
  
  for (const [keyword, stage] of Object.entries(lifeStageKeywords)) {
    if (searchText.includes(keyword)) {
      return stage;
    }
  }
  
  return 'adult'; // Default to adult
}

/**
 * Calculate kcal per cup from kcal per 100g
 * Average dry pet food density: ~120g per cup
 * Wet food is not measured in cups typically
 */
function calculateKcalPerCup(kcalPer100g: number, isWetFood: boolean): number {
  if (isWetFood) {
    // Wet food - assume can/pouch serving
    return kcalPer100g;
  }
  
  // Dry food - standard cup is approximately 120g
  const cupsPerKg = 1000 / 120;
  return Math.round(kcalPer100g * 1.2);
}

/**
 * Calculate kcal per kg from kcal per 100g
 */
function calculateKcalPerKg(kcalPer100g: number): number {
  return Math.round(kcalPer100g * 10);
}

/**
 * Check if product is wet food
 */
function isWetFood(categories_tags?: string[]): boolean {
  if (!categories_tags) return false;
  return categories_tags.some(tag => 
    tag.includes('wet') || 
    tag.includes('moist') || 
    tag.includes('canned')
  );
}

/**
 * Transform API product to internal PetFood type
 */
export function transformApiProductToPetFood(apiProduct: OpenPetFoodProduct): PetFood | null {
  // Extract species
  const species = extractSpecies(apiProduct.categories_tags);
  if (!species) {
    console.warn(`Could not determine species for product ${apiProduct.code}`);
    return null;
  }
  
  // Get caloric information
  const kcalPer100g = apiProduct.nutriments?.['energy-kcal_100g'] || 
                      apiProduct.nutriments?.energy_100g ||
                      0;
  
  // If no caloric info, we can't use this product for calculations
  if (kcalPer100g === 0) {
    console.warn(`No caloric information for product ${apiProduct.code}`);
    return null;
  }
  
  const wetFood = isWetFood(apiProduct.categories_tags);
  const kcalPerCup = calculateKcalPerCup(kcalPer100g, wetFood);
  const kcalPerKg = calculateKcalPerKg(kcalPer100g);
  
  // Extract brand
  const brand = apiProduct.brands || 'Unknown Brand';
  
  // Extract product name
  const productName = apiProduct.product_name || 
                      apiProduct.product_name_en || 
                      apiProduct.product_name_fr || 
                      apiProduct.product_name_es ||
                      'Unknown Product';
  
  // Extract life stage
  const lifestage = extractLifeStage(apiProduct);
  
  // Build guaranteed analysis if we have the data
  const guaranteed_analysis = apiProduct.nutriments && (
    apiProduct.nutriments.proteins_100g !== undefined ||
    apiProduct.nutriments.fat_100g !== undefined
  ) ? {
    protein_min: apiProduct.nutriments.proteins_100g || 0,
    fat_min: apiProduct.nutriments.fat_100g || 0,
    fiber_max: apiProduct.nutriments.fiber_100g || 0,
    moisture_max: apiProduct.nutriments.water_100g || 0,
  } : undefined;
  
  // Build extended nutrients object
  const nutrients = apiProduct.nutriments ? {
    protein: apiProduct.nutriments.proteins_100g,
    fat: apiProduct.nutriments.fat_100g,
    saturated_fat: apiProduct.nutriments['saturated-fat_100g'],
    carbohydrates: apiProduct.nutriments.carbohydrates_100g,
    sugars: apiProduct.nutriments.sugars_100g,
    fiber: apiProduct.nutriments.fiber_100g,
    ash: apiProduct.nutriments.ash_100g,
    moisture: apiProduct.nutriments.water_100g,
    calcium: apiProduct.nutriments.calcium_100g,
    phosphorus: apiProduct.nutriments.phosphorus_100g,
    sodium: apiProduct.nutriments.sodium_100g,
    salt: apiProduct.nutriments.salt_100g,
  } : undefined;
  
  // Extract ingredients
  const ingredients = apiProduct.ingredients_text || 
                     apiProduct.ingredients_text_en || 
                     apiProduct.ingredients_text_fr ||
                     apiProduct.ingredients_text_es ||
                     undefined;
  
  const ingredients_list = apiProduct.ingredients?.map(ing => ing.text || ing.id || '').filter(Boolean);
  
  return {
    id: apiProduct.code,
    code: apiProduct.code,
    brand,
    productName,
    species,
    lifestage,
    kcalPerCup,
    kcalPerKg,
    kcalPer100g,
    guaranteed_analysis,
    nutrients,
    ingredients,
    ingredients_list,
    serving_size: apiProduct.serving_size,
    quantity: apiProduct.quantity || apiProduct.product_quantity,
    image_url: apiProduct.image_url || apiProduct.image_front_url,
    image_thumb_url: apiProduct.image_thumb_url || apiProduct.image_front_thumb_url,
    completeness: apiProduct.completeness,
    source: 'api',
    api_url: apiProduct.url,
    created_at: apiProduct.created_t ? new Date(apiProduct.created_t * 1000) : undefined,
    updated_at: apiProduct.last_modified_t ? new Date(apiProduct.last_modified_t * 1000) : undefined,
  };
}

/**
 * Transform an array of API products to PetFood array
 * Filters out products that can't be transformed
 */
export function transformApiProductsToPetFoods(apiProducts: OpenPetFoodProduct[]): PetFood[] {
  return apiProducts
    .map(product => transformApiProductToPetFood(product))
    .filter((food): food is PetFood => food !== null);
}

/**
 * Validate that a PetFood has minimum required data for use in calculator
 */
export function isValidForCalculator(food: PetFood): boolean {
  return !!(
    food.id &&
    food.brand &&
    food.productName &&
    food.species &&
    food.kcalPerCup > 0 &&
    food.kcalPerKg > 0
  );
}

/**
 * Validate that a PetFood has enough data for grading
 */
export function isValidForGrading(food: PetFood): boolean {
  return !!(
    isValidForCalculator(food) &&
    food.guaranteed_analysis &&
    food.ingredients
  );
}

