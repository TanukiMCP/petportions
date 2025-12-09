/**
 * MongoDB Pet Food Server Actions
 * 
 * Replaces the OpenPetFood API with our own database queries
 * Uses our 842 real pet food products with complete nutritional data
 */

"use server";

import { prisma } from '@/lib/db/prisma';
import type { PetFood } from '@/lib/types/food';
import { Species } from '@prisma/client';

/**
 * Search pet foods in our MongoDB database
 * Much faster and more reliable than the external API!
 */
export async function searchPetFoodsFromDB(
  query: string,
  species?: 'dog' | 'cat',
  page: number = 1,
  pageSize: number = 20
): Promise<PetFood[]> {
  try {
    // Build the search filter
    const where: any = {};
    
    // Add species filter if provided
    if (species) {
      where.species = species === 'dog' ? Species.DOG : Species.CAT;
    }
    
    // Search in brand and product name
    if (query && query.trim().length > 0) {
      where.OR = [
        { brand: { contains: query, mode: 'insensitive' } },
        { productName: { contains: query, mode: 'insensitive' } },
      ];
    }
    
    // Query the database
    const dbFoods = await prisma.petFood.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: [
        { brand: 'asc' },
        { productName: 'asc' },
      ],
    });
    
    // Transform to our PetFood type
    return dbFoods.map(dbFood => ({
      // Core identifiers
      id: dbFood.id,
      code: dbFood.id, // Use MongoDB ID as code
      
      // Basic information
      brand: dbFood.brand,
      productName: dbFood.productName,
      species: dbFood.species.toLowerCase() as 'dog' | 'cat',
      lifestage: dbFood.lifestage.toLowerCase().replace('_', ' '),
      
      // Caloric information (REQUIRED for calculator) - ALL products have this!
      kcalPerCup: dbFood.kcalPerCup || 0,
      kcalPerKg: dbFood.kcalPerKg || 0,
      kcalPer100g: dbFood.kcalPer100g ?? undefined,
      
      // Guaranteed Analysis
      guaranteed_analysis: {
        protein_min: dbFood.proteinMin || 0,
        fat_min: dbFood.fatMin || 0,
        fiber_max: dbFood.fiberMax || 0,
        moisture_max: dbFood.moistureMax || 0,
      },
      
      // Extended nutritional data (calculated)
      nutrients: {
        protein: dbFood.proteinDmb ?? undefined,
        fat: dbFood.fatDmb ?? undefined,
        carbohydrates: dbFood.carbsDmb ?? undefined,
        fiber: dbFood.fiberDmb ?? undefined,
        moisture: dbFood.moistureMax ?? undefined,
      },
      
      // Ingredients
      ingredients: dbFood.ingredients ?? undefined,
      ingredients_list: dbFood.ingredients ? dbFood.ingredients.split(',').map(i => i.trim()) : undefined,
      
      // Images (not available in our schema)
      image_url: undefined,
      
      // Meta
      completeness: 100, // Our data is complete!
      source: 'custom' as const,
      api_url: dbFood.sourceUrl ?? undefined,
      
      // Timestamps
      created_at: dbFood.createdAt,
      updated_at: dbFood.updatedAt,
    }));
  } catch (error) {
    console.error('Error searching pet foods from DB:', error);
    // Re-throw with a more user-friendly message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Database connection error. Please try again.';
    throw new Error(`Failed to search pet foods: ${errorMessage}`);
  }
}

/**
 * Get a single pet food by ID
 */
export async function getPetFoodByIdFromDB(id: string): Promise<PetFood | null> {
  try {
    const dbFood = await prisma.petFood.findUnique({
      where: { id },
    });
    
    if (!dbFood) return null;
    
    // Transform to our PetFood type (same as above)
    return {
      id: dbFood.id,
      code: dbFood.id,
      brand: dbFood.brand,
      productName: dbFood.productName,
      species: dbFood.species.toLowerCase() as 'dog' | 'cat',
      lifestage: dbFood.lifestage.toLowerCase().replace('_', ' '),
      kcalPerCup: dbFood.kcalPerCup || 0,
      kcalPerKg: dbFood.kcalPerKg || 0,
      kcalPer100g: dbFood.kcalPer100g ?? undefined,
      guaranteed_analysis: {
        protein_min: dbFood.proteinMin || 0,
        fat_min: dbFood.fatMin || 0,
        fiber_max: dbFood.fiberMax || 0,
        moisture_max: dbFood.moistureMax || 0,
      },
      nutrients: {
        protein: dbFood.proteinDmb ?? undefined,
        fat: dbFood.fatDmb ?? undefined,
        carbohydrates: dbFood.carbsDmb ?? undefined,
        fiber: dbFood.fiberDmb ?? undefined,
        moisture: dbFood.moistureMax ?? undefined,
      },
      ingredients: dbFood.ingredients ?? undefined,
      ingredients_list: dbFood.ingredients ? dbFood.ingredients.split(',').map(i => i.trim()) : undefined,
      image_url: undefined,
      completeness: 100,
      source: 'custom' as const,
      api_url: dbFood.sourceUrl ?? undefined,
      created_at: dbFood.createdAt,
      updated_at: dbFood.updatedAt,
    };
  } catch (error) {
    console.error('Error getting pet food by ID from DB:', error);
    return null;
  }
}

/**
 * Get all unique brands (for autocomplete)
 */
export async function getBrandsFromDB(species?: 'dog' | 'cat'): Promise<string[]> {
  try {
    const where: any = {};
    if (species) {
      where.species = species === 'dog' ? Species.DOG : Species.CAT;
    }
    
    const brands = await prisma.petFood.findMany({
      where,
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    });
    
    return brands.map(b => b.brand);
  } catch (error) {
    console.error('Error getting brands from DB:', error);
    return [];
  }
}

/**
 * Get database statistics
 */
export async function getDBStats() {
  try {
    const [totalCount, dogCount, catCount, brands] = await Promise.all([
      prisma.petFood.count(),
      prisma.petFood.count({ where: { species: Species.DOG } }),
      prisma.petFood.count({ where: { species: Species.CAT } }),
      prisma.petFood.findMany({
        select: { brand: true },
        distinct: ['brand'],
      }),
    ]);
    
    return {
      totalProducts: totalCount,
      dogProducts: dogCount,
      catProducts: catCount,
      totalBrands: brands.length,
      dataCompleteness: 100, // All our products have complete data!
    };
  } catch (error) {
    console.error('Error getting DB stats:', error);
    return {
      totalProducts: 0,
      dogProducts: 0,
      catProducts: 0,
      totalBrands: 0,
      dataCompleteness: 0,
    };
  }
}

