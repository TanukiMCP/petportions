/**
 * Hybrid Pet Food Scraper
 * 
 * Strategy:
 * 1. Extract all products from ThePetFoodIndex (fast, has kcal/cup, 842 products)
 * 2. For each product, search DogFoodAdvisor/CatFoodAdvisor for enriched data
 * 3. Merge data for complete dataset with all fields
 * 
 * ThePetFoodIndex = Source of Truth (brand, name, species, kcal/cup, basic nutrients)
 * DogFoodAdvisor = Enrichment (dry matter basis, calorie weighted basis, AAFCO, detailed ingredients)
 */

import puppeteer from 'puppeteer';
import { prisma } from '@/lib/db/prisma';

interface ThePetFoodIndexProduct {
  brandName: string;
  name: string;
  type: 'dog' | 'cat';
  protein: number;
  fat: number;
  fiber: number;
  moisture: number;
  kcal: number;
  ingredients: string;
  grainStatus: boolean;
}

interface EnrichedProduct extends ThePetFoodIndexProduct {
  // From DogFoodAdvisor
  proteinDmb?: number;
  fatDmb?: number;
  fiberDmb?: number;
  carbsDmb?: number;
  proteinCalWeighted?: number;
  fatCalWeighted?: number;
  carbsCalWeighted?: number;
  aafcoProfile?: string;
  detailedIngredients?: string;
  firstIngredient?: string;
}

/**
 * Step 1: Extract from ThePetFoodIndex bundle
 */
async function fetchThePetFoodIndexData(): Promise<ThePetFoodIndexProduct[]> {
  console.log('\n📦 Step 1: Fetching ThePetFoodIndex bundle...');
  
  const response = await fetch('https://thepetfoodindex.com/assets/index-42ec9c7f.js');
  const bundleText = await response.text();
  
  console.log(`✅ Bundle fetched (${(bundleText.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log('🔍 Extracting products...');
  
  const allProducts: ThePetFoodIndexProduct[] = [];
  
  // Find all product objects in the minified code
  // Pattern: {brandName:"X",name:"Y",type:"dog/cat",protein:N,fat:N,fiber:N,moisture:N,kcal:N,ingredients:"..."}
  const productRegex = /\{brandName:"([^"]+)",name:"([^"]+)",type:"(dog|cat)",carriedByBAP:(!?\d),grainStatus:(!?\d),protein:(\d+),fat:(\d+),fiber:([\d.]+),moisture:(\d+),kcal:(\d+),ingredients:"([^"]+)"\}/g;
  
  let match;
  while ((match = productRegex.exec(bundleText)) !== null) {
    allProducts.push({
      brandName: match[1],
      name: match[2],
      type: match[3] as 'dog' | 'cat',
      protein: parseInt(match[6]),
      fat: parseInt(match[7]),
      fiber: parseFloat(match[8]),
      moisture: parseInt(match[9]),
      kcal: parseInt(match[10]),
      ingredients: match[11],
      grainStatus: match[5] === '!0',
    });
  }
  
  console.log(`✅ Extracted ${allProducts.length} products`);
  console.log(`   - Dogs: ${allProducts.filter(p => p.type === 'dog').length}`);
  console.log(`   - Cats: ${allProducts.filter(p => p.type === 'cat').length}`);
  
  return allProducts;
}

/**
 * Step 2: Enrich with DogFoodAdvisor/CatFoodAdvisor data
 */
async function enrichWithAdvisorData(
  product: ThePetFoodIndexProduct,
  browser: any
): Promise<EnrichedProduct> {
  try {
    const baseUrl = product.type === 'dog' 
      ? 'https://www.dogfoodadvisor.com'
      : 'https://www.catfoodadvisor.com';
    
    // Search for the product on the advisor site
    const searchUrl = `${baseUrl}/?s=${encodeURIComponent(product.brandName + ' ' + product.name)}`;
    
    const page = await browser.newPage();
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Find the first review link
    const reviewLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const reviewLink = links.find(a => 
        a.href.includes('-review/') || 
        a.href.includes('-dog-food-') ||
        a.href.includes('-cat-food-')
      );
      return reviewLink ? reviewLink.href : null;
    });
    
    if (!reviewLink) {
      await page.close();
      return { ...product }; // No enrichment data found
    }
    
    // Navigate to review page
    await page.goto(reviewLink, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Extract enrichment data
    const enrichmentData = await page.evaluate(() => {
      const text = document.body.textContent || '';
      
      // Extract Dry Matter Basis
      const dmbProteinMatch = text.match(/Dry Matter[^]*?Protein[:\s]*([\d.]+)%/i);
      const dmbFatMatch = text.match(/Dry Matter[^]*?Fat[:\s]*([\d.]+)%/i);
      const dmbFiberMatch = text.match(/Dry Matter[^]*?Fiber[:\s]*([\d.]+)%/i);
      const dmbCarbsMatch = text.match(/Dry Matter[^]*?Carb[^]*?[:\s]*([\d.]+)%/i);
      
      // Extract Calorie Weighted Basis
      const cwProteinMatch = text.match(/Calorie[^]*?Protein[:\s]*([\d.]+)%/i);
      const cwFatMatch = text.match(/Calorie[^]*?Fat[:\s]*([\d.]+)%/i);
      const cwCarbsMatch = text.match(/Calorie[^]*?Carb[^]*?[:\s]*([\d.]+)%/i);
      
      // Extract AAFCO
      const aafcoMatch = text.match(/AAFCO[^]*?(Maintenance|Growth|All Life Stages|Adult|Puppy|Kitten)/i);
      
      return {
        proteinDmb: dmbProteinMatch ? parseFloat(dmbProteinMatch[1]) : undefined,
        fatDmb: dmbFatMatch ? parseFloat(dmbFatMatch[1]) : undefined,
        fiberDmb: dmbFiberMatch ? parseFloat(dmbFiberMatch[1]) : undefined,
        carbsDmb: dmbCarbsMatch ? parseFloat(dmbCarbsMatch[1]) : undefined,
        proteinCalWeighted: cwProteinMatch ? parseFloat(cwProteinMatch[1]) : undefined,
        fatCalWeighted: cwFatMatch ? parseFloat(cwFatMatch[1]) : undefined,
        carbsCalWeighted: cwCarbsMatch ? parseFloat(cwCarbsMatch[1]) : undefined,
        aafcoProfile: aafcoMatch ? aafcoMatch[1] : undefined,
      };
    });
    
    await page.close();
    
    return {
      ...product,
      ...enrichmentData,
    };
    
  } catch (error) {
    console.error(`   ⚠️  Enrichment failed for ${product.brandName} ${product.name}:`, error instanceof Error ? error.message : String(error));
    return { ...product }; // Return base data if enrichment fails
  }
}

/**
 * Step 3: Save to database
 */
async function saveToDatabase(products: EnrichedProduct[]) {
  console.log(`\n💾 Step 3: Saving ${products.length} products to database...`);
  
  let saved = 0;
  let errors = 0;
  
  for (const product of products) {
    try {
      const externalId = `hybrid-${product.type}-${product.brandName}-${product.name}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-');
      
      // Determine lifestage from product name
      let lifestage = 'ADULT';
      const nameLower = product.name.toLowerCase();
      if (nameLower.includes('puppy')) lifestage = 'PUPPY';
      else if (nameLower.includes('kitten')) lifestage = 'KITTEN';
      else if (nameLower.includes('senior') || nameLower.includes('mature')) lifestage = 'SENIOR';
      else if (product.aafcoProfile?.includes('All Life Stages')) lifestage = 'ALL_LIFE_STAGES';
      
      await prisma.petFood.upsert({
        where: { sourceUrl: externalId }, // Using sourceUrl as unique since we removed externalId
        update: {
          brand: product.brandName,
          productName: product.name,
          species: product.type.toUpperCase() as 'DOG' | 'CAT',
          foodType: 'DRY_KIBBLE',
          lifestage: lifestage as any,
          
          // From ThePetFoodIndex
          kcalPerKg: product.kcal * 4.23, // Approximate conversion from cup to kg
          proteinMin: product.protein,
          fatMin: product.fat,
          fiberMax: product.fiber,
          moistureMax: product.moisture,
          
          // From DogFoodAdvisor enrichment
          proteinDmb: product.proteinDmb,
          fatDmb: product.fatDmb,
          fiberDmb: product.fiberDmb,
          carbsDmb: product.carbsDmb,
          proteinCalorieWeighted: product.proteinCalWeighted,
          fatCalorieWeighted: product.fatCalWeighted,
          carbsCalorieWeighted: product.carbsCalWeighted,
          aafcoProfile: product.aafcoProfile,
          
          // Ingredients
          firstIngredient: product.ingredients.split(',')[0]?.trim(),
          ingredients: product.detailedIngredients || product.ingredients,
          
          sourceUrl: externalId,
          lastVerified: new Date(),
        },
        create: {
          brand: product.brandName,
          productName: product.name,
          species: product.type.toUpperCase() as 'DOG' | 'CAT',
          foodType: 'DRY_KIBBLE',
          lifestage: lifestage as any,
          
          kcalPerKg: product.kcal * 4.23,
          proteinMin: product.protein,
          fatMin: product.fat,
          fiberMax: product.fiber,
          moistureMax: product.moisture,
          
          proteinDmb: product.proteinDmb,
          fatDmb: product.fatDmb,
          fiberDmb: product.fiberDmb,
          carbsDmb: product.carbsDmb,
          proteinCalorieWeighted: product.proteinCalWeighted,
          fatCalorieWeighted: product.fatCalWeighted,
          carbsCalorieWeighted: product.carbsCalWeighted,
          aafcoProfile: product.aafcoProfile,
          
          firstIngredient: product.ingredients.split(',')[0]?.trim(),
          ingredients: product.detailedIngredients || product.ingredients,
          
          sourceUrl: externalId,
        },
      });
      
      saved++;
      
      if (saved % 50 === 0) {
        console.log(`   Progress: ${saved}/${products.length} saved`);
      }
      
    } catch (error) {
      console.error(`❌ Error saving ${product.brandName} - ${product.name}:`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Database save complete:`);
  console.log(`   - Saved/Updated: ${saved}`);
  console.log(`   - Errors: ${errors}`);
  
  return { saved, errors };
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Hybrid Pet Food Scraper...');
  console.log('📋 Strategy: ThePetFoodIndex (source of truth) + DogFoodAdvisor (enrichment)\n');
  
  const startTime = Date.now();
  
  try {
    // Step 1: Get base data from ThePetFoodIndex
    const baseProducts = await fetchThePetFoodIndexData();
    
    // Step 2: Enrich with DogFoodAdvisor data
    console.log(`\n🔍 Step 2: Enriching with DogFoodAdvisor/CatFoodAdvisor data...`);
    console.log(`⚠️  This will take a while (~${Math.ceil(baseProducts.length / 2)} minutes with rate limiting)`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const enrichedProducts: EnrichedProduct[] = [];
    let enriched = 0;
    
    for (const product of baseProducts) {
      const enrichedProduct = await enrichWithAdvisorData(product, browser);
      enrichedProducts.push(enrichedProduct);
      enriched++;
      
      if (enriched % 50 === 0) {
        console.log(`   Progress: ${enriched}/${baseProducts.length} enriched`);
      }
      
      // Rate limiting: 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    await browser.close();
    
    console.log(`✅ Enrichment complete`);
    
    // Step 3: Save to database
    const { saved, errors } = await saveToDatabase(enrichedProducts);
    
    // Record job
    await prisma.scraperJob.create({
      data: {
        jobType: 'FULL_SCRAPE',
        status: 'COMPLETED',
        productsScraped: saved,
        productsFailed: errors,
        startedAt: new Date(startTime),
        completedAt: new Date(),
      },
    });
    
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
    console.log(`\n🎉 Scraping complete in ${duration} minutes!`);
    
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    
    await prisma.scraperJob.create({
      data: {
        jobType: 'FULL_SCRAPE',
        status: 'FAILED',
        errorLog: error instanceof Error ? error.message : String(error),
        startedAt: new Date(startTime),
        completedAt: new Date(),
      },
    });
    
    process.exit(1);
  }
}

// Run
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Failed:', error);
      process.exit(1);
    });
}

export { fetchThePetFoodIndexData, enrichWithAdvisorData, saveToDatabase };

