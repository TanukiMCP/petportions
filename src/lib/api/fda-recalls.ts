/**
 * FDA Pet Food Recall API Client
 * 
 * Uses openFDA Animal & Veterinary API to fetch pet food recalls
 * API Docs: https://open.fda.gov/apis/animalandveterinary/
 */

export interface FDARecall {
  recallNumber: string;
  recallDate: string;
  status: string;
  productDescription: string;
  codeInfo: string | null;
  reason: string;
  recallingFirm: string;
  city: string | null;
  state: string | null;
  country: string;
  classification: string; // "Class I", "Class II", "Class III"
  productQuantity: string | null;
  distributionPattern: string | null;
}

export interface FDARecallSearchParams {
  searchTerm?: string; // Search in product description or firm name
  limit?: number; // Max results (default 100, max 1000)
  skip?: number; // Skip first N results for pagination
  dateFrom?: string; // ISO date string (YYYY-MM-DD)
  dateTo?: string; // ISO date string (YYYY-MM-DD)
}

const FDA_API_BASE = 'https://api.fda.gov/food/enforcement.json';

/**
 * Search FDA animal/veterinary recalls
 */
export async function searchFDARecalls(params: FDARecallSearchParams = {}): Promise<FDARecall[]> {
  try {
    const {
      searchTerm,
      limit = 100,
      skip = 0,
      dateFrom,
      dateTo,
    } = params;
    
    // Build search query
    let searchQuery: string;
    
    if (searchTerm && searchTerm.trim()) {
      // Search for specific term in product description or firm
      const escapedTerm = searchTerm.replace(/[:"]/g, '');
      searchQuery = `product_description:${escapedTerm}`;
    } else {
      // Just search for dog or cat foods
      searchQuery = 'product_description:dog';
    }
    
    // Build full URL
    const url = new URL(FDA_API_BASE);
    url.searchParams.set('search', searchQuery);
    url.searchParams.set('limit', limit.toString());
    if (skip > 0) {
      url.searchParams.set('skip', skip.toString());
    }
    
    console.log('FDA Recall API Request:', url.toString());
    
    // Make request
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 404) {
        // No results found
        return [];
      }
      throw new Error(`FDA API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform results
    const results: FDARecall[] = (data.results || []).map((item: any) => ({
      recallNumber: item.recall_number || 'N/A',
      recallDate: item.recall_initiation_date || item.report_date || 'Unknown',
      status: item.status || 'Unknown',
      productDescription: item.product_description || 'No description',
      codeInfo: item.code_info || null,
      reason: item.reason_for_recall || 'No reason provided',
      recallingFirm: item.recalling_firm || 'Unknown',
      city: item.city || null,
      state: item.state || null,
      country: item.country || 'USA',
      classification: item.classification || 'Unknown',
      productQuantity: item.product_quantity || null,
      distributionPattern: item.distribution_pattern || null,
    }));
    
    return results;
    
  } catch (error) {
    console.error('Error fetching FDA recalls:', error);
    return [];
  }
}

/**
 * Get recent pet food recalls (last 90 days)
 */
export async function getRecentPetFoodRecalls(limit: number = 50): Promise<FDARecall[]> {
  const today = new Date();
  const ninetyDaysAgo = new Date(today);
  ninetyDaysAgo.setDate(today.getDate() - 90);
  
  return searchFDARecalls({
    dateFrom: ninetyDaysAgo.toISOString().split('T')[0],
    dateTo: today.toISOString().split('T')[0],
    limit,
  });
}

/**
 * Search recalls by brand name
 */
export async function searchRecallsByBrand(brandName: string, limit: number = 20): Promise<FDARecall[]> {
  return searchFDARecalls({
    searchTerm: brandName,
    limit,
  });
}

/**
 * Check if a specific product has any recalls
 */
export async function checkProductRecalls(brand: string, productName: string): Promise<FDARecall[]> {
  const searchTerm = `${brand} ${productName}`;
  return searchFDARecalls({
    searchTerm,
    limit: 10,
  });
}

/**
 * Parse recall classification to severity level
 */
export function getRecallSeverity(classification: string): 'high' | 'medium' | 'low' {
  if (classification.includes('I')) return 'high'; // Class I - dangerous
  if (classification.includes('II')) return 'medium'; // Class II - moderate risk
  return 'low'; // Class III or unknown
}

/**
 * Get human-readable recall severity description
 */
export function getRecallSeverityDescription(classification: string): string {
  const severity = getRecallSeverity(classification);
  
  switch (severity) {
    case 'high':
      return 'Serious health hazard - may cause serious adverse health consequences or death';
    case 'medium':
      return 'Moderate health hazard - may cause temporary adverse health effects';
    case 'low':
      return 'Low health risk - unlikely to cause adverse health effects';
  }
}

