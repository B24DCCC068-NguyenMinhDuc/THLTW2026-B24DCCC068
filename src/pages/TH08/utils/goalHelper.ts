import { Goal, GoalStatus } from '../types';

export const calcGoalProgress = (goal: Goal): number => {
  const { type, targetValue, currentValue } = goal;

  if (type === 'WeightLoss') {
    if (currentValue <= targetValue) return 100;
    const ratio = targetValue / currentValue;
    return Math.min(Math.round(ratio * 100), 100);
  }
  if (targetValue === 0) return 100;
  return Math.min(Math.round((currentValue / targetValue) * 100), 100);
};

export const goalStatusLabel: Record<GoalStatus, string> = {
  InProgress: 'Đang thực hiện',
  Achieved: 'Đã đạt',
  Cancelled: 'Đã hủy',
};

export const goalStatusColor: Record<GoalStatus, string> = {
  InProgress: 'processing',
  Achieved: 'success',
  Cancelled: 'default',
};