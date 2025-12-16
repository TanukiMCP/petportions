import type { PetFood } from "@/lib/types/food";
import type { Species, LifeStage } from "@/lib/types/calculator";
import type { GradingResult, GradingCategory } from "@/lib/types/grading";
import {
  calculateDryMatterBasis,
  calculateCalorieWeightedBasis,
  calculateMetabolizableEnergy,
  calculateCarbohydrates,
  type GuaranteedAnalysis as GuaranteedAnalysisInput,
} from "@/lib/nutrition/calculations";
import { GRADING_CRITERIA } from "./criteria";

type NormalizedLifeStage = "adult" | "growth";

interface CategoryEvaluation {
  score: number;
  positives: string[];
  concerns: string[];
}

const AAFCO_THRESHOLDS: Record<
  Species,
  Record<NormalizedLifeStage, { protein: number; fat: number }>
> = {
  dog: {
    adult: { protein: 18, fat: 5 },
    growth: { protein: 22.5, fat: 8.5 },
  },
  cat: {
    adult: { protein: 26, fat: 9 },
    growth: { protein: 30, fat: 9 },
  },
};

const NAMED_PROTEIN_PATTERN =
  /(chicken|turkey|duck|salmon|trout|tuna|lamb|beef|bison|venison|rabbit|quail)/i;
const ANIMAL_BYPRODUCT_PATTERN = /(by-product|meat and bone meal|poultry meal)/i;
const FILLER_PATTERN = /(corn gluten meal|soybean meal|wheat middlings)/i;
const ARTIFICIAL_ADDITIVES = [
  /bha/i,
  /bht/i,
  /ethoxyquin/i,
  /artificial flavor/i,
  /artificial color/i,
  /red 40/i,
  /blue 2/i,
];
const QUESTIONABLE_BINDERS = [/carrageenan/i, /propylene glycol/i];
const HIGH_RISK_INGREDIENTS = [/onion/i, /garlic/i, /chocolate/i, /xylitol/i];

const IDEAL_CARB_RANGE: Record<Species, [number, number]> = {
  dog: [15, 45],
  cat: [5, 25],
};

const IDEAL_CALORIE_DENSITY: Record<"dry" | "wet", [number, number]> = {
  dry: [300, 480], // kcal per cup
  wet: [150, 300],
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function resolveLifeStage(lifeStage: LifeStage): NormalizedLifeStage {
  return lifeStage === "puppy" || lifeStage === "kitten" ? "growth" : "adult";
}

function safeNumber(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function extractGuaranteedAnalysis(food: PetFood): GuaranteedAnalysisInput | null {
  const raw =
    food.guaranteed_analysis || (food as Record<string, any>).guaranteedAnalysis;

  if (!raw) return null;

  const protein =
    safeNumber(raw.protein_min) ??
    safeNumber(raw.proteinMin) ??
    safeNumber(raw.protein);
  const fat =
    safeNumber(raw.fat_min) ??
    safeNumber(raw.fatMin) ??
    safeNumber(raw.fat);
  const fiber =
    safeNumber(raw.fiber_max) ??
    safeNumber(raw.fiberMax) ??
    safeNumber(raw.fiber) ??
    0;
  const moisture =
    safeNumber(raw.moisture_max) ??
    safeNumber(raw.moistureMax) ??
    safeNumber(raw.moisture);
  const ash =
    safeNumber(raw.ash) ?? safeNumber(raw.ash_max) ?? safeNumber(raw.ashMax);

  const fallbackMoisture = ((food as Record<string, any>).foodType || "")
    .toLowerCase()
    .includes("wet")
    ? 78
    : 10;

  if (protein === undefined || fat === undefined) return null;

  return {
    protein,
    fat,
    fiber,
    moisture: moisture ?? fallbackMoisture,
    ash,
  };
}

function normalizeIngredients(food: PetFood): string[] {
  const raw =
    food.ingredients_list ||
    (Array.isArray((food as Record<string, any>).ingredients)
      ? (food as Record<string, any>).ingredients
      : undefined) ||
    (typeof food.ingredients === "string" ? food.ingredients : undefined) ||
    (food as Record<string, any>).ingredients;

  if (Array.isArray(raw)) {
    return raw
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(/[,;]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function evaluateAAFCOCompliance(
  ga: GuaranteedAnalysisInput | null,
  species: Species,
  lifeStage: LifeStage
): CategoryEvaluation & {
  dryMatterProtein?: number;
  dryMatterFat?: number;
} {
  if (!ga) {
    return {
      score: 45,
      positives: [],
      concerns: ["Missing guaranteed analysis data; unable to confirm AAFCO compliance."],
    };
  }

  const thresholds = AAFCO_THRESHOLDS[species][resolveLifeStage(lifeStage)];
  const dmb = calculateDryMatterBasis(ga);

  const proteinRatio = dmb.protein / thresholds.protein;
  const fatRatio = dmb.fat / thresholds.fat;

  const proteinScore = clamp(proteinRatio * 100, 0, 120);
  const fatScore = clamp(fatRatio * 100, 0, 120);
  const score = Math.min(100, (proteinScore + fatScore) / 2);

  const positives: string[] = [];
  const concerns: string[] = [];

  if (proteinRatio >= 1.1) {
    positives.push(
      `Protein exceeds AAFCO minimum (${dmb.protein.toFixed(1)}% vs ${thresholds.protein}% required).`
    );
  }
  if (fatRatio >= 1.1) {
    positives.push(
      `Fat exceeds AAFCO minimum (${dmb.fat.toFixed(1)}% vs ${thresholds.fat}% required).`
    );
  }
  if (proteinRatio < 1) {
    concerns.push(
      `Protein is below AAFCO minimum (${dmb.protein.toFixed(1)}% vs ${thresholds.protein}% required).`
    );
  }
  if (fatRatio < 1) {
    concerns.push(
      `Fat is below AAFCO minimum (${dmb.fat.toFixed(1)}% vs ${thresholds.fat}% required).`
    );
  }

  return {
    score,
    positives,
    concerns,
    dryMatterProtein: dmb.protein,
    dryMatterFat: dmb.fat,
  };
}

function evaluateProteinQuality(
  ingredients: string[],
  species: Species,
  dryMatterProtein?: number
): CategoryEvaluation {
  if (!ingredients.length) {
    return {
      score: 55,
      positives: [],
      concerns: ["No ingredient list available; protein sources cannot be verified."],
    };
  }

  const firstFive = ingredients.slice(0, 5).map((ing) => ing.toLowerCase());
  let score = 75;
  const positives: string[] = [];
  const concerns: string[] = [];

  if (firstFive.some((ing) => NAMED_PROTEIN_PATTERN.test(ing))) {
    score += 10;
    positives.push("Named animal proteins appear at the top of the ingredient list.");
  } else {
    concerns.push("Ingredient list does not start with a named animal protein.");
  }

  if (firstFive.some((ing) => ANIMAL_BYPRODUCT_PATTERN.test(ing))) {
    score -= 15;
    concerns.push("Contains unspecified by-products in the primary ingredients.");
  }

  if (ingredients.some((ing) => FILLER_PATTERN.test(ing))) {
    score -= 10;
    concerns.push("Uses filler ingredients such as corn gluten meal or wheat middlings.");
  }

  if (foodSpeciesMismatch(species, ingredients)) {
    score -= 10;
    concerns.push("Primary proteins are not ideal for the selected species.");
  }

  if (dryMatterProtein !== undefined) {
    if (
      (species === "dog" && dryMatterProtein >= 30) ||
      (species === "cat" && dryMatterProtein >= 40)
    ) {
      score += 5;
      positives.push(
        `High protein concentration (${dryMatterProtein.toFixed(1)}% DMB).`
      );
    }
  }

  return {
    score: clamp(score, 30, 100),
    positives,
    concerns,
  };
}

function foodSpeciesMismatch(species: Species, ingredients: string[]) {
  const fishProteins = ["salmon", "trout", "tuna", "whitefish"];
  const ingredientString = ingredients.join(" ").toLowerCase();

  if (species === "cat") {
    return ingredientString.includes("plant protein isolate");
  }

  if (species === "dog") {
    return (
      ingredientString.includes("taurine") &&
      fishProteins.every((protein) => !ingredientString.includes(protein))
    );
  }

  return false;
}

function evaluateIngredientQuality(ingredients: string[]): CategoryEvaluation {
  if (!ingredients.length) {
    return {
      score: 60,
      positives: [],
      concerns: ["Missing ingredient disclosure."],
    };
  }

  let score = 85;
  const positives: string[] = [];
  const concerns: string[] = [];

  const lowerIngredients = ingredients.map((ing) => ing.toLowerCase());

  for (const pattern of ARTIFICIAL_ADDITIVES) {
    if (lowerIngredients.some((ing) => pattern.test(ing))) {
      score -= 8;
      concerns.push("Contains artificial preservatives or colors.");
      break;
    }
  }

  for (const pattern of QUESTIONABLE_BINDERS) {
    if (lowerIngredients.some((ing) => pattern.test(ing))) {
      score -= 5;
      concerns.push("Uses thickening agents that may irritate sensitive pets.");
      break;
    }
  }

  if (lowerIngredients.some((ing) => ing.includes("salmon oil") || ing.includes("flaxseed"))) {
    score += 5;
    positives.push("Includes omega-rich ingredients such as salmon oil or flaxseed.");
  }

  if (lowerIngredients.some((ing) => ing.includes("sweet potato") || ing.includes("pumpkin"))) {
    score += 3;
    positives.push("Contains whole-food carbohydrate sources.");
  }

  return {
    score: clamp(score, 30, 100),
    positives,
    concerns,
  };
}

function evaluateNutritionalBalance(
  ga: GuaranteedAnalysisInput | null,
  food: PetFood,
  species: Species
): CategoryEvaluation {
  if (!ga) {
    return {
      score: 55,
      positives: [],
      concerns: ["Unable to evaluate nutritional balance without guaranteed analysis data."],
    };
  }

  const dmb = calculateDryMatterBasis(ga);
  const carbs = calculateCarbohydrates(ga);
  const carbDmb = (carbs / (100 - ga.moisture)) * 100;

  const carbRange = IDEAL_CARB_RANGE[species];
  let score = 85;
  const positives: string[] = [];
  const concerns: string[] = [];

  if (carbDmb >= carbRange[0] && carbDmb <= carbRange[1]) {
    positives.push(`Carbohydrates fall within the expected range (${carbDmb.toFixed(1)}% DMB).`);
  } else if (carbDmb > carbRange[1]) {
    score -= 15;
    concerns.push(`High carbohydrate load (${carbDmb.toFixed(1)}% DMB).`);
  } else if (carbDmb < carbRange[0]) {
    score -= 5;
    positives.push("Low carbohydrate formula.");
  }

  const cwb = calculateCalorieWeightedBasis(ga);
  if (cwb.fat < 20) {
    score -= 5;
    concerns.push("Fat provides a low share of calories; may reduce palatability.");
  }
  if (cwb.protein < 20) {
    score -= 5;
    concerns.push("Protein supplies a low percentage of calories.");
  }

  const foodType =
    ((food as Record<string, any>).foodType || "").toLowerCase().includes("wet") ||
    ga.moisture > 70
      ? "wet"
      : "dry";
  const calorieRange = IDEAL_CALORIE_DENSITY[foodType];

  const calorieData = calculateMetabolizableEnergy(ga, undefined);
  const kcalPerCup = food.kcalPerCup ?? calorieData.kcalPerCup;

  if (kcalPerCup) {
    if (kcalPerCup < calorieRange[0]) {
      score -= 5;
      concerns.push(`Low calorie density (${kcalPerCup} kcal/cup).`);
    } else if (kcalPerCup > calorieRange[1]) {
      score -= 5;
      concerns.push(`Very high calorie density (${kcalPerCup} kcal/cup).`);
    } else {
      positives.push("Calorie density is within the expected range for this food type.");
    }
  } else {
    concerns.push("Calorie-per-cup information missing.");
    score -= 5;
  }

  return {
    score: clamp(score, 25, 100),
    positives,
    concerns,
  };
}

function evaluateSafety(
  ingredients: string[],
  ga: GuaranteedAnalysisInput | null,
  food: PetFood
): CategoryEvaluation {
  let score = 90;
  const positives: string[] = [];
  const concerns: string[] = [];

  const lowerIngredients = ingredients.map((ing) => ing.toLowerCase());

  for (const flag of HIGH_RISK_INGREDIENTS) {
    if (lowerIngredients.some((ing) => flag.test(ing))) {
      score -= 20;
      concerns.push("Contains ingredients that are unsafe or inappropriate for pets.");
      break;
    }
  }

  if ((food as Record<string, any>).isPrescription) {
    concerns.push("Prescription diet — consult your veterinarian before use.");
    score -= 5;
  }

  if (!ga) {
    score -= 10;
  } else {
    const dmb = calculateDryMatterBasis(ga);
    if (dmb.fat > 45) {
      score -= 5;
      concerns.push("Extremely high fat content may upset sensitive pets.");
    }
    if (dmb.fiber > 12) {
      score -= 3;
      concerns.push("Very high fiber content may reduce nutrient absorption.");
    }
  }

  if (score >= 90 && !concerns.length) {
    positives.push("No notable safety flags detected.");
  }

  return {
    score: clamp(score, 20, 100),
    positives,
    concerns,
  };
}

export function gradeFood(
  food: PetFood,
  species: Species,
  lifeStage: LifeStage
): GradingResult {
  const ga = extractGuaranteedAnalysis(food);
  const ingredients = normalizeIngredients(food);

  const aafco = evaluateAAFCOCompliance(ga, species, lifeStage);
  const proteinQuality = evaluateProteinQuality(
    ingredients,
    species,
    aafco.dryMatterProtein
  );
  const ingredientQuality = evaluateIngredientQuality(ingredients);
  const nutritionalBalance = evaluateNutritionalBalance(ga, food, species);
  const safety = evaluateSafety(ingredients, ga, food);

  const categories: GradingCategory[] = [
    {
      name: "AAFCO Compliance",
      score: Math.round(aafco.score),
      weight: GRADING_CRITERIA.aafcoCompliance.weight,
    },
    {
      name: "Protein Quality",
      score: Math.round(proteinQuality.score),
      weight: GRADING_CRITERIA.proteinQuality.weight,
    },
    {
      name: "Ingredient Quality",
      score: Math.round(ingredientQuality.score),
      weight: GRADING_CRITERIA.ingredientQuality.weight,
    },
    {
      name: "Nutritional Balance",
      score: Math.round(nutritionalBalance.score),
      weight: GRADING_CRITERIA.nutritionalBalance.weight,
    },
    {
      name: "Safety Flags",
      score: Math.round(safety.score),
      weight: GRADING_CRITERIA.safetyFlags.weight,
    },
  ];

  const overallScore = categories.reduce(
    (sum, cat) => sum + (cat.score * cat.weight) / 100,
    0
  );

  const overallGrade =
    overallScore >= 90
      ? "A"
      : overallScore >= 80
      ? "B"
      : overallScore >= 70
      ? "C"
      : overallScore >= 60
      ? "D"
      : "F";

  const positives = [
    ...aafco.positives,
    ...proteinQuality.positives,
    ...ingredientQuality.positives,
    ...nutritionalBalance.positives,
    ...safety.positives,
  ];

  const concerns = [
    ...aafco.concerns,
    ...proteinQuality.concerns,
    ...ingredientQuality.concerns,
    ...nutritionalBalance.concerns,
    ...safety.concerns,
  ];

  return {
    overallGrade,
    overallScore: Math.round(overallScore),
    categories,
    concerns,
    positives,
  };
}

