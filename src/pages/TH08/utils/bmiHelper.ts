import { BmiCategory, BmiResult } from '../types';

export const calcBmi = (weightKg: number, heightCm: number): BmiResult => {
  const heightM = heightCm / 100;
  const value = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  let category: BmiCategory;
  let color: BmiResult['color'];

  if (value < 18.5) {
    category = 'Underweight';
    color = 'blue';
  } else if (value < 25) {
    category = 'Normal';
    color = 'green';
  } else if (value < 30) {
    category = 'Overweight';
    color = 'gold';
  } else {
    category = 'Obese';
    color = 'red';
  }
  return { value, category, color };
};

export const bmiCategoryLabel: Record<BmiCategory, string> = {
  Underweight: 'Thiếu cân',
  Normal: 'Bình thường',
  Overweight: 'Thừa cân',
  Obese: 'Béo phì',
};