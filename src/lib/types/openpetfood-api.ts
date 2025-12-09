/**
 * Open Pet Food Facts API Response Types
 * 
 * These types match the ACTUAL structure returned by the Open Pet Food Facts API
 * Based on real API responses from world.openpetfoodfacts.org
 */

/**
 * Raw product data from the Open Pet Food Facts API
 * Note: nutriments object can be empty {} if no nutrition data is available
 */
export interface OpenPetFoodProduct {
  // Core identifiers
  code: string; // Barcode
  _id?: string;
  
  // Basic information
  product_name?: string;
  product_name_en?: string;
  product_name_fr?: string;
  product_name_es?: string;
  product_name_ru?: string;
  generic_name?: string;
  generic_name_en?: string;
  brands?: string;
  brands_tags?: string[];
  
  // Categories and classification
  categories?: string;
  categories_tags?: string[];
  categories_hierarchy?: string[];
  
  // Ingredients
  ingredients_text?: string;
  ingredients_text_en?: string;
  ingredients_text_es?: string;
  ingredients_text_fr?: string;
  ingredients_tags?: string[];
  ingredients?: Array<{
    id?: string;
    text?: string;
    rank?: number;
    percent?: number;
    percent_min?: number;
    percent_max?: number;
    percent_estimate?: number;
  }>;
  
  // Nutritional information (per 100g)
  // Note: This can be an empty object {}
  nutriments?: {
    // Energy
    'energy-kcal'?: number;
    'energy-kcal_100g'?: number;
    'energy-kcal_serving'?: number;
    'energy-kcal_unit'?: string;
    'energy-kcal_value'?: number;
    energy?: number;
    energy_100g?: number;
    energy_serving?: number;
    energy_unit?: string;
    energy_value?: number;
    
    // Macronutrients
    proteins?: number;
    proteins_100g?: number;
    proteins_serving?: number;
    proteins_unit?: string;
    proteins_value?: number;
    
    fat?: number;
    fat_100g?: number;
    fat_serving?: number;
    fat_unit?: string;
    fat_value?: number;
    
    'saturated-fat'?: number;
    'saturated-fat_100g'?: number;
    'saturated-fat_unit'?: string;
    'saturated-fat_value'?: number;
    
    carbohydrates?: number;
    carbohydrates_100g?: number;
    carbohydrates_serving?: number;
    carbohydrates_unit?: string;
    carbohydrates_value?: number;
    
    sugars?: number;
    sugars_100g?: number;
    sugars_unit?: string;
    sugars_value?: number;
    
    fiber?: number;
    fiber_100g?: number;
    fiber_serving?: number;
    fiber_unit?: string;
    
    // Salt/Sodium
    salt?: number;
    salt_100g?: number;
    salt_unit?: string;
    salt_value?: number;
    
    sodium?: number;
    sodium_100g?: number;
    sodium_unit?: string;
    sodium_value?: number;
    
    // Water/Moisture
    water?: number;
    water_100g?: number;
    
    // Ash (mineral content)
    ash?: number;
    ash_100g?: number;
    
    // Specific nutrients
    calcium?: number;
    calcium_100g?: number;
    
    phosphorus?: number;
    phosphorus_100g?: number;
    
    // Vitamins
    'vitamin-a'?: number;
    'vitamin-a_100g'?: number;
    'vitamin-d'?: number;
    'vitamin-d_100g'?: number;
    'vitamin-e'?: number;
    'vitamin-e_100g'?: number;
    
    // Minerals
    iron?: number;
    iron_100g?: number;
    zinc?: number;
    zinc_100g?: number;
    
    // Omega fatty acids
    'omega-3-fat'?: number;
    'omega-3-fat_100g'?: number;
    'omega-6-fat'?: number;
    'omega-6-fat_100g'?: number;
    
    // Nutrition scores
    'nutrition-score-fr'?: number;
    'nutrition-score-fr_100g'?: number;
  };
  
  // Serving information
  serving_size?: string;
  serving_quantity?: number;
  
  // Packaging
  packaging?: string;
  packaging_tags?: string[];
  packaging_materials_tags?: string[];
  packaging_shapes_tags?: string[];
  packagings?: Array<{
    material?: string;
    shape?: string;
  }>;
  quantity?: string;
  product_quantity?: string;
  
  // Images
  image_url?: string;
  image_small_url?: string;
  image_thumb_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  image_front_thumb_url?: string;
  image_nutrition_url?: string;
  image_nutrition_small_url?: string;
  image_ingredients_url?: string;
  image_ingredients_small_url?: string;
  
  // Meta information
  created_t?: number;
  last_modified_t?: number;
  last_modified_by?: string;
  completeness?: number;
  complete?: number;
  
  // Labels and certifications
  labels?: string;
  labels_tags?: string[];
  labels_hierarchy?: string[];
  
  // Countries
  countries?: string;
  countries_tags?: string[];
  countries_hierarchy?: string[];
  
  // Purchase places
  stores?: string;
  stores_tags?: string[];
  purchase_places?: string;
  purchase_places_tags?: string[];
  
  // Allergens
  allergens?: string;
  allergens_tags?: string[];
  allergens_hierarchy?: string[];
  traces?: string;
  traces_tags?: string[];
  
  // Manufacturing details
  manufacturing_places?: string;
  manufacturing_places_tags?: string[];
  origins?: string;
  origins_tags?: string[];
  
  // URL and external links
  url?: string;
  link?: string;
  
  // States and quality
  states?: string;
  states_tags?: string[];
  states_hierarchy?: string[];
  
  // Language
  lang?: string;
  languages_codes?: Record<string, number>;
  languages_tags?: string[];
  
  // Additional fields
  product_type?: string;
  nutrition_data_per?: string;
  nutrition_data_prepared_per?: string;
  nutrition_grade_fr?: string;
  nutrition_grades?: string;
  nutriscore_grade?: string;
  nutriscore_score?: number;
  no_nutrition_data?: string;
  scans_n?: number;
  unique_scans_n?: number;
}

/**
 * Response from the product detail endpoint
 */
export interface OpenPetFoodProductResponse {
  code: string;
  product: OpenPetFoodProduct | null;
  status: number;
  status_verbose: string;
}

/**
 * Search results from the search endpoint
 */
export interface OpenPetFoodSearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: OpenPetFoodProduct[];
  skip: number;
}

/**
 * Search parameters for the API
 */
export interface OpenPetFoodSearchParams {
  // Search query
  search_terms?: string;
  
  // Pagination
  page?: number;
  page_size?: number;
  
  // Sorting
  sort_by?: 'product_name' | 'created_t' | 'last_modified_t' | 'completeness';
  
  // Filters
  categories_tags?: string; // e.g., "en:dog-foods", "en:cat-foods"
  brands_tags?: string;
  countries_tags?: string;
  
  // Fields to return (reduce payload size)
  fields?: string; // comma-separated list
  
  // Language
  lc?: string; // e.g., "en"
  
  // JSON format
  json?: boolean;
}

/**
 * Error response from the API
 */
export interface OpenPetFoodErrorResponse {
  status: number;
  status_verbose: string;
  error?: string;
}

/**
 * Species type for filtering
 */
export type PetSpecies = 'dog' | 'cat';

/**
 * Life stage categories
 */
export type LifeStage = 'puppy' | 'adult' | 'senior' | 'kitten' | 'all-life-stages';

/**
 * Category tags for filtering by species
 */
export const SPECIES_CATEGORY_TAGS: Record<PetSpecies, string> = {
  dog: 'en:dog-foods',
  cat: 'en:cat-foods',
};

/**
 * Life stage keywords for parsing categories
 */
export const LIFE_STAGE_KEYWORDS: Record<string, LifeStage> = {
  puppy: 'puppy',
  junior: 'puppy',
  kitten: 'kitten',
  adult: 'adult',
  mature: 'adult',
  senior: 'senior',
  'all-ages': 'all-life-stages',
  'all-life-stages': 'all-life-stages',
};

