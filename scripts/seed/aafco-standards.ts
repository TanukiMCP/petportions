/**
 * AAFCO Nutrient Standards Seed Script
 * 
 * Seeds the database with official AAFCO nutrient profiles for dogs and cats.
 * These are used for nutritional adequacy analysis in the food grader.
 * 
 * Based on AAFCO 2024 Official Publication
 */

import { PrismaClient, Species, Lifestage } from '@prisma/client';

const prisma = new PrismaClient();

const aafcoStandards = [
  // DOG - GROWTH (Puppies)
  {
    species: Species.DOG,
    lifestage: Lifestage.PUPPY,
    profile: 'Growth',
    
    // Per 1000 kcal ME
    proteinMinGPerKcal: 56.3,
    fatMinGPerKcal: 21.3,
    calciumMinGPerKcal: 3.0,
    phosphorusMinGPerKcal: 2.5,
    
    // Dry Matter Basis minimums
    proteinMinDmb: 22.5,
    fatMinDmb: 8.5,
    calciumMinDmb: 1.2,
    phosphorusMinDmb: 1.0,
    
    // Dry Matter Basis maximums
    calciumMaxDmb: 1.8,
    phosphorusMaxDmb: 1.6,
    
    // Other essential nutrients
    sodiumMinDmb: 0.3,
    chlorideMinDmb: 0.45,
    magnesiumMinDmb: 0.06,
    potassiumMinDmb: 0.6,
    
    // Vitamins
    vitaminAMinIU: 5000,
    vitaminDMinIU: 500,
    vitaminEMinIU: 50,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'For puppies and pregnant/lactating dogs. Higher protein and calcium requirements for growth.',
  },
  
  // DOG - MAINTENANCE (Adult)
  {
    species: Species.DOG,
    lifestage: Lifestage.ADULT,
    profile: 'Maintenance',
    
    // Per 1000 kcal ME
    proteinMinGPerKcal: 45.0,
    fatMinGPerKcal: 13.8,
    calciumMinGPerKcal: 1.25,
    phosphorusMinGPerKcal: 1.0,
    
    // Dry Matter Basis minimums
    proteinMinDmb: 18.0,
    fatMinDmb: 5.5,
    calciumMinDmb: 0.5,
    phosphorusMinDmb: 0.4,
    
    // Dry Matter Basis maximums
    calciumMaxDmb: 2.5,
    phosphorusMaxDmb: 1.6,
    
    // Other essential nutrients
    sodiumMinDmb: 0.08,
    chlorideMinDmb: 0.12,
    magnesiumMinDmb: 0.06,
    potassiumMinDmb: 0.6,
    
    // Vitamins
    vitaminAMinIU: 5000,
    vitaminDMinIU: 500,
    vitaminEMinIU: 50,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'For adult dogs. Lower protein requirements than growth formula.',
  },
  
  // DOG - ALL LIFE STAGES
  {
    species: Species.DOG,
    lifestage: Lifestage.ALL_LIFE_STAGES,
    profile: 'All Life Stages',
    
    // Must meet the higher growth requirements
    proteinMinGPerKcal: 56.3,
    fatMinGPerKcal: 21.3,
    calciumMinGPerKcal: 3.0,
    phosphorusMinGPerKcal: 2.5,
    
    proteinMinDmb: 22.5,
    fatMinDmb: 8.5,
    calciumMinDmb: 1.2,
    phosphorusMinDmb: 1.0,
    
    calciumMaxDmb: 1.8,
    phosphorusMaxDmb: 1.6,
    
    sodiumMinDmb: 0.3,
    chlorideMinDmb: 0.45,
    magnesiumMinDmb: 0.06,
    potassiumMinDmb: 0.6,
    
    vitaminAMinIU: 5000,
    vitaminDMinIU: 500,
    vitaminEMinIU: 50,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'Must meet growth profile requirements since it includes puppies.',
  },
  
  // CAT - GROWTH (Kittens)
  {
    species: Species.CAT,
    lifestage: Lifestage.KITTEN,
    profile: 'Growth',
    
    // Per 1000 kcal ME
    proteinMinGPerKcal: 75.0,
    fatMinGPerKcal: 22.5,
    calciumMinGPerKcal: 2.5,
    phosphorusMinGPerKcal: 2.0,
    
    // Dry Matter Basis minimums
    proteinMinDmb: 30.0,
    fatMinDmb: 9.0,
    calciumMinDmb: 1.0,
    phosphorusMinDmb: 0.8,
    
    // Dry Matter Basis maximums
    calciumMaxDmb: null, // No maximum specified
    phosphorusMaxDmb: null,
    
    // Other essential nutrients
    sodiumMinDmb: 0.2,
    chlorideMinDmb: 0.3,
    magnesiumMinDmb: 0.08,
    potassiumMinDmb: 0.6,
    
    // Vitamins
    vitaminAMinIU: 6668,
    vitaminDMinIU: 280,
    vitaminEMinIU: 40,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'For kittens and pregnant/lactating cats. Cats are obligate carnivores requiring higher protein.',
  },
  
  // CAT - MAINTENANCE (Adult)
  {
    species: Species.CAT,
    lifestage: Lifestage.ADULT,
    profile: 'Maintenance',
    
    // Per 1000 kcal ME
    proteinMinGPerKcal: 65.0,
    fatMinGPerKcal: 22.5,
    calciumMinGPerKcal: 1.25,
    phosphorusMinGPerKcal: 1.25,
    
    // Dry Matter Basis minimums
    proteinMinDmb: 26.0,
    fatMinDmb: 9.0,
    calciumMinDmb: 0.5,
    phosphorusMinDmb: 0.5,
    
    // Dry Matter Basis maximums
    calciumMaxDmb: null,
    phosphorusMaxDmb: null,
    
    // Other essential nutrients
    sodiumMinDmb: 0.2,
    chlorideMinDmb: 0.3,
    magnesiumMinDmb: 0.04,
    potassiumMinDmb: 0.6,
    
    // Vitamins
    vitaminAMinIU: 3332,
    vitaminDMinIU: 280,
    vitaminEMinIU: 40,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'For adult cats. Still requires high protein as obligate carnivores.',
  },
  
  // CAT - ALL LIFE STAGES
  {
    species: Species.CAT,
    lifestage: Lifestage.ALL_LIFE_STAGES,
    profile: 'All Life Stages',
    
    // Must meet the higher growth requirements
    proteinMinGPerKcal: 75.0,
    fatMinGPerKcal: 22.5,
    calciumMinGPerKcal: 2.5,
    phosphorusMinGPerKcal: 2.0,
    
    proteinMinDmb: 30.0,
    fatMinDmb: 9.0,
    calciumMinDmb: 1.0,
    phosphorusMinDmb: 0.8,
    
    calciumMaxDmb: null,
    phosphorusMaxDmb: null,
    
    sodiumMinDmb: 0.2,
    chlorideMinDmb: 0.3,
    magnesiumMinDmb: 0.08,
    potassiumMinDmb: 0.6,
    
    vitaminAMinIU: 6668,
    vitaminDMinIU: 280,
    vitaminEMinIU: 40,
    
    aafcoVersion: '2024',
    effectiveDate: new Date('2024-01-01'),
    sourceUrl: 'https://www.aafco.org/publications/',
    notes: 'Must meet growth profile requirements since it includes kittens.',
  },
];

async function seedAAFCO() {
  console.log('🌱 Seeding AAFCO nutrient standards...\n');
  
  try {
    let created = 0;
    let updated = 0;
    
    for (const standard of aafcoStandards) {
      const existing = await prisma.aAFCOStandard.findUnique({
        where: {
          species_lifestage_profile_aafcoVersion: {
            species: standard.species,
            lifestage: standard.lifestage,
            profile: standard.profile,
            aafcoVersion: standard.aafcoVersion,
          },
        },
      });
      
      if (existing) {
        await prisma.aAFCOStandard.update({
          where: { id: existing.id },
          data: standard,
        });
        updated++;
        console.log(`  ✓ Updated: ${standard.species} - ${standard.profile}`);
      } else {
        await prisma.aAFCOStandard.create({
          data: standard,
        });
        created++;
        console.log(`  ✓ Created: ${standard.species} - ${standard.profile}`);
      }
    }
    
    console.log(`\n✅ AAFCO standards seeded successfully!`);
    console.log(`   - Created: ${created}`);
    console.log(`   - Updated: ${updated}`);
    console.log(`   - Total: ${aafcoStandards.length} standards`);
    
  } catch (error) {
    console.error('\n❌ Error seeding AAFCO standards:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedAAFCO().catch((error) => {
  console.error(error);
  process.exit(1);
});

