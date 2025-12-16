import puppeteer, { Browser, Page } from 'puppeteer';
import type { PetFood } from '../../src/types/petfood';

export abstract class BaseScraper {
  protected browser?: Browser;
  protected brand: string;
  
  constructor(brand: string) {
    this.brand = brand;
  }
  
  abstract getDogFoodUrl(): string;
  abstract getCatFoodUrl(): string;
  abstract extractProductUrls(page: Page): Promise<string[]>;
  abstract extractProductData(page: Page, url: string, species: 'dog' | 'cat'): Promise<PetFood | null>;
  
  async init() {
    this.browser = await puppeteer.launch({ headless: true });
  }
  
  async close() {
    if (this.browser) await this.browser.close();
  }
  
  async scrape(): Promise<PetFood[]> {
    await this.init();
    const results: PetFood[] = [];
    
    try {
      console.log(`[${this.brand}] Scraping dogs...`);
      const dogFoods = await this.scrapeSpecies('dog');
      results.push(...dogFoods);
      
      console.log(`[${this.brand}] Scraping cats...`);
      const catFoods = await this.scrapeSpecies('cat');
      results.push(...catFoods);
      
      console.log(`[${this.brand}] Complete: ${results.length} products`);
    } finally {
      await this.close();
    }
    
    return results;
  }
  
  private async scrapeSpecies(species: 'dog' | 'cat'): Promise<PetFood[]> {
    const page = await this.browser!.newPage();
    const url = species === 'dog' ? this.getDogFoodUrl() : this.getCatFoodUrl();
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const productUrls = await this.extractProductUrls(page);
    await page.close();
    
    console.log(`[${this.brand}] Found ${productUrls.length} ${species} products`);
    
    const results: PetFood[] = [];
    for (const productUrl of productUrls) {
      try {
        const productPage = await this.browser!.newPage();
        await productPage.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const data = await this.extractProductData(productPage, productUrl, species);
        if (data) results.push(data);
        
        await productPage.close();
      } catch (error) {
        console.error(`[${this.brand}] Failed ${productUrl}:`, error);
      }
    }
    
    return results;
  }
}


