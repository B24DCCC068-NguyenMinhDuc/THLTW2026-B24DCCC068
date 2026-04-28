export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface HealthLog {
  id: string;
  date: string;
  weightKg: number;
  heightCm: number;
  restingHeartRate: number;
  sleepHours: number;
}

export interface BmiResult {
  value: number;
  category: BmiCategory;
  color: 'blue' | 'green' | 'gold' | 'red';
}

export type HealthFormValues = Omit<HealthLog, 'id'>;