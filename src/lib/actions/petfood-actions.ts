/**
 * Next.js Server Actions for Pet Food Data
 * 
 * These actions run on the server and provide a clean API for client components
 * to fetch pet food data from the Open Pet Food Facts API
 */

'use server';

import { getOpenPetFoodClient, OpenPetFoodAPIError } from '@/lib/api/openpetfood-client';
import { transformApiProductsToPetFoods } from '@/lib/api/transform-petfood';
import type { PetFood } from '@/lib/types/food';
import type { PetSpecies } from '@/lib/types/openpetfood-api';

/**
 * Result type for server actions
 */
export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Search for pet foods
 */
export async function searchPetFoods(
  searchTerm: string,
  species?: PetSpecies,
  page?: number
): Promise<ActionResult<PetFood[]>> {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return {
        success: false,
        error: 'Search term must be at least 2 characters',
      };
    }

    const client = getOpenPetFoodClient();
    const response = await client.searchWithNutrition(searchTerm.trim(), species);

    if (!response.products || response.products.length === 0) {
      return {
        success: true,
        data: [],
      };
    }

    const petFoods = transformApiProductsToPetFoods(response.products);

    return {
      success: true,
      data: petFoods,
    };
  } catch (error) {
    console.error('Error searching pet foods:', error);

    if (error instanceof OpenPetFoodAPIError) {
      return {
        success: false,
        error: `API Error: ${error.message}`,
      };
    }

    return {
      success: false,
      error: 'Failed to search pet foods. Please try again.',
    };
  }
}

/**
 * Get pet foods by species with pagination
 */
export async function getPetFoodsBySpecies(
  species: PetSpecies,
  page: number = 1,
  searchTerm?: string
): Promise<ActionResult<{ foods: PetFood[]; totalCount: number; pageCount: number }>> {
  try {
    const client = getOpenPetFoodClient();
    const response = await client.searchBySpecies(species, searchTerm, page);

    const petFoods = transformApiProductsToPetFoods(response.products);

    return {
      success: true,
      data: {
        foods: petFoods,
        totalCount: response.count,
        pageCount: response.page_count,
      },
    };
  } catch (error) {
    console.error('Error fetching pet foods by species:', error);

    if (error instanceof OpenPetFoodAPIError) {
      return {
        success: false,
        error: `API Error: ${error.message}`,
      };
    }

    return {
      success: false,
      error: 'Failed to fetch pet foods. Please try again.',
    };
  }
}

/**
 * Get a single pet food by barcode
 */
export async function getPetFoodByBarcode(
  barcode: string
): Promise<ActionResult<PetFood>> {
  try {
    if (!barcode || barcode.trim().length === 0) {
      return {
        success: false,
        error: 'Barcode is required',
      };
    }

    const client = getOpenPetFoodClient();
    const product = await client.getProduct(barcode.trim());

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    const petFoods = transformApiProductsToPetFoods([product]);

    if (petFoods.length === 0) {
      return {
        success: false,
        error: 'Product does not have required nutritional data',
      };
    }

    return {
      success: true,
      data: petFoods[0],
    };
  } catch (error) {
    console.error('Error fetching pet food by barcode:', error);

    if (error instanceof OpenPetFoodAPIError) {
      return {
        success: false,
        error: `API Error: ${error.message}`,
      };
    }

    return {
      success: false,
      error: 'Failed to fetch pet food. Please try again.',
    };
  }
}

/**
 * Clear API cache (useful for admin/debugging)
 */
export async function clearPetFoodCache(): Promise<ActionResult<boolean>> {
  try {
    const client = getOpenPetFoodClient();
    client.clearCache();

    return {
      success: true,
      data: true,
    };
  } catch (error) {
    console.error('Error clearing cache:', error);

    return {
      success: false,
      error: 'Failed to clear cache',
    };
  }
}

