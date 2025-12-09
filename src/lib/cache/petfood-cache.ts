/**
 * Client-side cache for pet food data
 * Loads once and reuses for instant searches
 */

import type { PetFood } from '@/lib/types/food';

let cachedFoods: PetFood[] | null = null;
let loadingPromise: Promise<PetFood[]> | null = null;

export async function getCachedPetFoods(): Promise<PetFood[]> {
  // Return cached data if available
  if (cachedFoods) {
    console.log('Using cached pet foods:', cachedFoods.length);
    return cachedFoods;
  }

  // Return existing loading promise if already loading
  if (loadingPromise) {
    console.log('Waiting for existing load...');
    return loadingPromise;
  }

  // Load data for the first time
  console.log('Loading pet foods for the first time...');
  loadingPromise = fetch('/api/petfoods')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load pet foods');
      return res.json();
    })
    .then((foods: PetFood[]) => {
      console.log('Loaded and cached', foods.length, 'pet foods');
      cachedFoods = foods;
      loadingPromise = null;
      return foods;
    })
    .catch(err => {
      console.error('Failed to load pet foods:', err);
      loadingPromise = null;
      throw err;
    });

  return loadingPromise;
}

export function searchCachedFoods(query: string, species?: 'dog' | 'cat'): PetFood[] {
  if (!cachedFoods) return [];

  let results = cachedFoods;

  // Filter by species
  if (species) {
    results = results.filter(f => f.species === species);
  }

  // Search in brand and product name
  if (query && query.trim()) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(f =>
      f.brand.toLowerCase().includes(lowerQuery) ||
      f.productName.toLowerCase().includes(lowerQuery)
    );
  }

  return results; // Return all matching results
}

export function clearCache() {
  cachedFoods = null;
  loadingPromise = null;
}

