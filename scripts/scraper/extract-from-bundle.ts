/**
 * Extract Pet Food Data from ThePetFoodIndex React Bundle
 * 
 * Much more efficient than DOM scraping - just parse the JS bundle!
 */

import { prisma } from '@/lib/db/prisma';

interface RawProduct {
  brandName: string;
  name: string;
  type: 'dog' | 'cat';
  carriedByBAP: boolean;
  grainStatus: boolean;
  protein: number;
  fat: number;
  fiber: number;
  moisture: number;
  kcal: number;
  ingredients: string;
}

/**
 * Fetch and extract product data from the React bundle
 */
async function fetchBundleData(): Promise<RawProduct[]> {
  console.log('📦 Fetching React bundle...');
  
  const response = await fetch('https://thepetfoodindex.com/assets/index-42ec9c7f.js');
  const bundleText = await response.text();
  
  console.log(`✅ Bundle fetched (${(bundleText.length / 1024 / 1024).toFixed(2)} MB)`);
  
  // Find the products array in the bundle
  // Look for the pattern: products:[{brandName:"...",name:"...",...}]
  const productsMatch = bundleText.match(/products:\[(\{brandName:.+?\})\]/);
  
  if (!productsMatch) {
    throw new Error('Could not find products data in bundle');
  }
  
  console.log('🔍 Extracting product data from bundle...');
  
  // Extract all product objects
  // The data is minified, so we need to parse it carefully
  const allProducts: RawProduct[] = [];
  
  // Find all brand objects with products arrays
  const brandMatches = bundleText.matchAll(/\{brandName:"([^"]+)",products:\[(.+?)\]\}/g);
  
  for (const match of brandMatches) {
    const brandName = match[1];
    const productsStr = match[2];
    
    // Parse individual products
    const productMatches = productsStr.matchAll(/\{brandName:"([^"]+)",name:"([^"]+)",type:"(dog|cat)",carriedByBAP:(!?\d),grainStatus:(!?\d),protein:(\d+),fat:(\d+),fiber:([\d.]+),moisture:(\d+),kcal:(\d+),ingredients:"(.+?)"\}/g);
    
    for (const pMatch of productMatches) {
      allProducts.push({
        brandName: pMatch[1],
        name: pMatch[2],
        type: pMatch[3] as 'dog' | 'cat',
        carriedByBAP: pMatch[4] === '!0', // Minified true
        grainStatus: pMatch[5] === '!0', // Minified true
        protein: parseInt(pMatch[6]),
        fat: parseInt(pMatch[7]),
        fiber: parseFloat(pMatch[8]),
        moisture: parseInt(pMatch[9]),
        kcal: parseInt(pMatch[10]),
        ingredients: pMatch[11]
      });
    }
  }
  
  console.log(`✅ Extracted ${allProducts.length} products`);
  
  return allProducts;
}

/**
 * Save products to database
 */
async function saveToDatabase(products: RawProduct[]) {
  console.log(`\n💾 Saving ${products.length} products to database...`);
  
  let saved = 0;
  let errors = 0;
  
  for (const product of products) {
    try {
      const externalId = `petfoodindex-${product.type}-${product.brandName}-${product.name}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-');
      
      await prisma.petFood.upsert({
        where: { externalId },
        update: {
          brand: product.brandName,
          productName: product.name,
          species: product.type,
          kcalPerCup: product.kcal,
          ingredients: product.ingredients,
          guaranteedAnalysis: {
            protein_min: product.protein,
            fat_min: product.fat,
            fiber_max: product.fiber,
            moisture_max: product.moisture,
          },
          sourceUrl: `https://thepetfoodindex.com/food-catalog`,
          lastScraped: new Date(),
        },
        create: {
          externalId,
          brand: product.brandName,
          productName: product.name,
          species: product.type,
          kcalPerCup: product.kcal,
          ingredients: product.ingredients,
          guaranteedAnalysis: {
            protein_min: product.protein,
            fat_min: product.fat,
            fiber_max: product.fiber,
            moisture_max: product.moisture,
          },
          sourceUrl: `https://thepetfoodindex.com/food-catalog`,
          lastScraped: new Date(),
        },
      });
      
      saved++;
      
      if (saved % 100 === 0) {
        console.log(`   Progress: ${saved}/${products.length} products saved`);
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
  console.log('🚀 Starting ThePetFoodIndex Bundle Scraper...\n');
  
  const startTime = Date.now();
  
  try {
    // Fetch and extract data from bundle
    const products = await fetchBundleData();
    
    // Analyze data
    const dogProducts = products.filter(p => p.type === 'dog');
    const catProducts = products.filter(p => p.type === 'cat');
    
    console.log(`\n📊 Data Summary:`);
    console.log(`   - Dog foods: ${dogProducts.length}`);
    console.log(`   - Cat foods: ${catProducts.length}`);
    console.log(`   - Total: ${products.length}`);
    
    // Save to database
    const { saved, errors } = await saveToDatabase(products);
    
    // Record scraper job
    await prisma.scraperJob.create({
      data: {
        jobType: 'FULL_SCRAPE',
        status: 'COMPLETED',
        productsScraped: saved,
        startedAt: new Date(startTime),
        completedAt: new Date(),
      },
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n🎉 Scraping complete in ${duration} seconds!`);
    
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    
    // Record failed job
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

// Run if called directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Script finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

export { fetchBundleData, saveToDatabase };

