export interface GradingResult {
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  overallScore: number;
  categories: GradingCategory[];
  concerns: string[];
  positives: string[];
}

export interface GradingCategory {
  name: string;
  score: number;
  weight: number;
}

