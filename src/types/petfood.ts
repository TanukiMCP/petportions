export interface PetFood {
  id: string;
  brand: string;
  productName: string;
  species: 'dog' | 'cat';
  foodType: 'dry' | 'wet' | 'fresh' | 'freeze-dried' | 'raw';
  lifestage: 'puppy' | 'kitten' | 'adult' | 'senior' | 'all-life-stages';
  isPrescription: boolean;
  
  // Critical calorie data
  kcalPerCup: number;
  kcalPerKg: number;
  kcalPer100g?: number;
  
  // Guaranteed analysis
  guaranteedAnalysis: {
    proteinMin: number;
    fatMin: number;
    fiberMax: number;
    moistureMax: number;
  };
  
  // Additional
  ingredients?: string[];
  sourceUrl: string;
  scrapedAt: string;
}


