/**
 * Open Pet Food Facts API Configuration
 * 
 * Centralized configuration for the Open Pet Food Facts API integration
 */

export const openPetFoodConfig = {
  // API Base URL
  baseUrl: process.env.NEXT_PUBLIC_OPENPETFOOD_API_URL || 'https://world.openpetfoodfacts.org',
  
  // Cache Configuration
  cache: {
    enabled: process.env.OPENPETFOOD_ENABLE_CACHE === 'true',
    ttl: parseInt(process.env.OPENPETFOOD_CACHE_TTL || '3600', 10), // seconds
  },
  
  // Rate Limiting
  rateLimit: {
    requestsPerMinute: parseInt(process.env.OPENPETFOOD_RATE_LIMIT || '60', 10),
  },
  
  // Fallback Configuration
  fallback: {
    enabled: process.env.OPENPETFOOD_FALLBACK_ENABLED === 'true',
  },
  
  // Logging
  logging: {
    enabled: process.env.ENABLE_API_LOGGING === 'true',
    level: process.env.LOG_LEVEL || 'info',
  },
  
  // API Endpoints
  endpoints: {
    search: '/cgi/search.pl',
    product: '/api/v2/product',
  },
  
  // Search Configuration
  search: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;

export type OpenPetFoodConfig = typeof openPetFoodConfig;

