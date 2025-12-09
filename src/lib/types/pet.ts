export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed?: string;
  currentWeight: number;
  targetWeight: number;
  weightUnit: 'kg' | 'lb';
}

