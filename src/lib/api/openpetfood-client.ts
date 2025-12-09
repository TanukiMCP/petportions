/**
 * Open Pet Food Facts API Client
 * 
 * Core service layer for interacting with the Open Pet Food Facts API
 * Includes error handling, rate limiting, caching, and retry logic
 */

import { openPetFoodConfig } from '@/lib/config/openpetfood';
import type {
  OpenPetFoodSearchResponse,
  OpenPetFoodProductResponse,
  OpenPetFoodSearchParams,
  OpenPetFoodProduct,
  PetSpecies,
  SPECIES_CATEGORY_TAGS,
} from '@/lib/types/openpetfood-api';

/**
 * Rate limiter state
 */
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number = 60000; // 1 minute

  constructor(maxRequestsPerMinute: number) {
    this.maxRequests = maxRequestsPerMinute;
  }

  async checkLimit(): Promise<void> {
    const now = Date.now();
    
    // Remove requests older than the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      
      if (openPetFoodConfig.logging.enabled) {
        console.warn(`Rate limit reached. Waiting ${waitTime}ms`);
      }
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.checkLimit(); // Recursive check after waiting
    }
    
    this.requests.push(now);
  }
}

/**
 * In-memory cache implementation
 */
class MemoryCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private readonly ttl: number;

  constructor(ttlSeconds: number) {
    this.ttl = ttlSeconds * 1000;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    const now = Date.now();
    if (now - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * API Error class
 */
export class OpenPetFoodAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'OpenPetFoodAPIError';
  }
}

/**
 * Open Pet Food Facts API Client
 */
export class OpenPetFoodClient {
  private readonly baseUrl: string;
  private readonly rateLimiter: RateLimiter;
  private readonly searchCache: MemoryCache<OpenPetFoodSearchResponse>;
  private readonly productCache: MemoryCache<OpenPetFoodProduct>;

  constructor() {
    this.baseUrl = openPetFoodConfig.baseUrl;
    this.rateLimiter = new RateLimiter(openPetFoodConfig.rateLimit.requestsPerMinute);
    this.searchCache = new MemoryCache<OpenPetFoodSearchResponse>(openPetFoodConfig.cache.ttl);
    this.productCache = new MemoryCache<OpenPetFoodProduct>(openPetFoodConfig.cache.ttl);

    // Cleanup caches every hour
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.searchCache.cleanup();
        this.productCache.cleanup();
      }, 3600000);
    }
  }

  /**
   * Make HTTP request with retry logic
   */
  private async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries: number = 3
  ): Promise<Response> {
    // Rate limiting
    await this.rateLimiter.checkLimit();

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'User-Agent': 'PetPortions.com/1.0 (https://petportions.com)',
            ...options.headers,
          },
        });

        if (!response.ok) {
          // Handle specific HTTP errors
          if (response.status === 429) {
            // Too many requests - wait and retry
            const waitTime = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }

          if (response.status >= 500) {
            // Server error - retry
            const waitTime = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          }

          // Client error - don't retry
          throw new OpenPetFoodAPIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            await response.text()
          );
        }

        return response;
      } catch (error) {
        lastError = error as Error;
        
        if (openPetFoodConfig.logging.enabled) {
          console.error(`API request attempt ${attempt + 1} failed:`, error);
        }

        if (attempt < retries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    throw lastError || new Error('Unknown error during API request');
  }

  /**
   * Search for pet food products
   */
  async searchProducts(params: OpenPetFoodSearchParams): Promise<OpenPetFoodSearchResponse> {
    // Build cache key
    const cacheKey = `search:${JSON.stringify(params)}`;

    // Check cache
    if (openPetFoodConfig.cache.enabled) {
      const cached = this.searchCache.get(cacheKey);
      if (cached) {
        if (openPetFoodConfig.logging.enabled) {
          console.log('Cache hit for search:', cacheKey);
        }
        return cached;
      }
    }

    // Build query params
    const queryParams = new URLSearchParams({
      json: '1',
      page_size: String(params.page_size || openPetFoodConfig.search.defaultPageSize),
      page: String(params.page || 1),
      ...((params.search_terms && { search_terms: params.search_terms })),
      ...(params.categories_tags && { categories_tags: params.categories_tags }),
      ...(params.brands_tags && { brands_tags: params.brands_tags }),
      ...(params.fields && { fields: params.fields }),
    });

    const url = `${this.baseUrl}/api/v2/search?${queryParams}`;

    if (openPetFoodConfig.logging.enabled) {
      console.log('API Request:', url);
    }

    const response = await this.fetchWithRetry(url);
    const data: OpenPetFoodSearchResponse = await response.json();

    // Cache the result
    if (openPetFoodConfig.cache.enabled) {
      this.searchCache.set(cacheKey, data);
    }

    return data;
  }

  /**
   * Get a specific product by barcode
   */
  async getProduct(barcode: string): Promise<OpenPetFoodProduct | null> {
    // Check cache
    if (openPetFoodConfig.cache.enabled) {
      const cached = this.productCache.get(barcode);
      if (cached) {
        if (openPetFoodConfig.logging.enabled) {
          console.log('Cache hit for product:', barcode);
        }
        return cached;
      }
    }

    const url = `${this.baseUrl}/api/v2/product/${barcode}.json`;

    if (openPetFoodConfig.logging.enabled) {
      console.log('API Request:', url);
    }

    const response = await this.fetchWithRetry(url);
    const data: OpenPetFoodProductResponse = await response.json();

    if (data.status === 0 || !data.product) {
      return null;
    }

    // Cache the result
    if (openPetFoodConfig.cache.enabled) {
      this.productCache.set(barcode, data.product);
    }

    return data.product;
  }

  /**
   * Search for pet foods by species
   */
  async searchBySpecies(
    species: PetSpecies,
    searchTerm?: string,
    page?: number
  ): Promise<OpenPetFoodSearchResponse> {
    const speciesCategoryTags: Record<PetSpecies, string> = {
      dog: 'en:dog-foods',
      cat: 'en:cat-foods',
    };

    return this.searchProducts({
      categories_tags: speciesCategoryTags[species],
      search_terms: searchTerm,
      page: page || 1,
      fields: 'code,product_name,brands,categories_tags,nutriments,serving_size,ingredients_text,image_url,image_thumb_url',
    });
  }

  /**
   * Search for pet foods with full nutritional data
   */
  async searchWithNutrition(
    searchTerm: string,
    species?: PetSpecies
  ): Promise<OpenPetFoodSearchResponse> {
    const params: OpenPetFoodSearchParams = {
      search_terms: searchTerm,
      fields: 'code,product_name,brands,categories_tags,nutriments,serving_size,ingredients_text,image_url,image_thumb_url,quantity',
    };

    if (species) {
      const speciesCategoryTags: Record<PetSpecies, string> = {
        dog: 'en:dog-foods',
        cat: 'en:cat-foods',
      };
      params.categories_tags = speciesCategoryTags[species];
    }

    return this.searchProducts(params);
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.searchCache.clear();
    this.productCache.clear();
  }
}

// Singleton instance
let clientInstance: OpenPetFoodClient | null = null;

/**
 * Get the singleton client instance
 */
export function getOpenPetFoodClient(): OpenPetFoodClient {
  if (!clientInstance) {
    clientInstance = new OpenPetFoodClient();
  }
  return clientInstance;
}

