export interface WeightEntry {
  id: string;
  petId: string;
  date: string;
  weight: number;
  weightUnit: 'kg' | 'lb';
}

export const mockWeightEntries: WeightEntry[] = [
  { id: '1', petId: '1', date: '2024-11-01', weight: 33.5, weightUnit: 'kg' },
  { id: '2', petId: '1', date: '2024-11-15', weight: 32.8, weightUnit: 'kg' },
  { id: '3', petId: '1', date: '2024-12-01', weight: 32.1, weightUnit: 'kg' },
  { id: '4', petId: '1', date: '2024-12-08', weight: 31.5, weightUnit: 'kg' },
  { id: '5', petId: '1', date: '2024-12-15', weight: 32.0, weightUnit: 'kg' },
  { id: '6', petId: '2', date: '2024-11-01', weight: 5.0, weightUnit: 'kg' },
  { id: '7', petId: '2', date: '2024-11-15', weight: 4.9, weightUnit: 'kg' },
  { id: '8', petId: '2', date: '2024-12-01', weight: 4.8, weightUnit: 'kg' },
  { id: '9', petId: '2', date: '2024-12-08', weight: 4.7, weightUnit: 'kg' },
  { id: '10', petId: '3', date: '2024-11-01', weight: 29.5, weightUnit: 'kg' },
  { id: '11', petId: '3', date: '2024-11-15', weight: 29.0, weightUnit: 'kg' },
  { id: '12', petId: '3', date: '2024-12-01', weight: 28.5, weightUnit: 'kg' },
];

