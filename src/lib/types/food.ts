/**
 * Internal PetFood type used throughout the application
 * This is a normalized version of the OpenPetFood API data
 */
export interface PetFood {
  // Core identifiers
  id: string; // Barcode from API
  code: string; // Also store barcode separately for API compatibility
  
  // Basic information
  brand: string;
  productName: string;
  species: 'dog' | 'cat';
  lifestage: string;
  
  // Caloric information (REQUIRED for calculator)
  kcalPerCup: number;
  kcalPerKg: number;
  kcalPer100g?: number;
  
  // Nutritional information (from API)
  guaranteed_analysis?: {
    protein_min: number;
    fat_min: number;
    fiber_max: number;
    moisture_max: number;
  };
  
  // Extended nutritional data from API
  nutrients?: {
    protein?: number;
    fat?: number;
    saturated_fat?: number;
    carbohydrates?: number;
    sugars?: number;
    fiber?: number;
    ash?: number;
    moisture?: number;
    calcium?: number;
    phosphorus?: number;
    sodium?: number;
    salt?: number;
  };
  
  // Ingredients
  ingredients?: string;
  ingredients_list?: string[];
  
  // Serving information
  serving_size?: string;
  quantity?: string;
  
  // Images
  image_url?: string;
  image_thumb_url?: string;
  
  // Meta
  completeness?: number;
  source: 'api' | 'custom' | 'mock';
  api_url?: string;
  
  // Timestamps
  created_at?: Date;
  updated_at?: Date;
}

