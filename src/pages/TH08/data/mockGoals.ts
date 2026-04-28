import { Goal } from '../types';

const now = new Date();
const future = (months: number): string => {
  const d = new Date(now.getFullYear(), now.getMonth() + months, now.getDate());
  return d.toISOString().slice(0, 10);
};

export const mockGoals: Goal[] = [
  {
    id: 'g1',
    name: 'Giảm cân về 70kg',
    type: 'WeightLoss',
    targetValue: 70,
    currentValue: 74.8,
    unit: 'kg',
    deadline: future(3),
    status: 'InProgress',
  },
  {
    id: 'g2',
    name: 'Chạy bộ 5km mỗi tuần',
    type: 'Endurance',
    targetValue: 5,
    currentValue: 3.5,
    unit: 'km',
    deadline: future(1),
    status: 'InProgress',
  },
  {
    id: 'g3',
    name: 'Tăng bench press lên 80kg',
    type: 'MuscleGain',
    targetValue: 80,
    currentValue: 80,
    unit: 'kg',
    deadline: future(-1),
    status: 'Achieved',
  },
  {
    id: 'g4',
    name: 'Tập yoga 3 buổi/tuần',
    type: 'Other',
    targetValue: 12,
    currentValue: 7,
    unit: 'buổi/tháng',
    deadline: future(2),
    status: 'InProgress',
  },
  {
    id: 'g5',
    name: 'Giảm mỡ bụng',
    type: 'WeightLoss',
    targetValue: 85,
    currentValue: 88,
    unit: 'cm vòng bụng',
    deadline: future(4),
    status: 'Cancelled',
  },
];