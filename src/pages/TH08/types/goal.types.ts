export type GoalType = 'WeightLoss' | 'MuscleGain' | 'Endurance' | 'Other';
export type GoalStatus = 'InProgress' | 'Achieved' | 'Cancelled';

export interface Goal {
  id: string;
  name: string;
  type: GoalType;
  targetValue: number;    
  currentValue: number;  
  unit: string;          
  deadline: string;       
  status: GoalStatus;
}

export type GoalFormValues = Omit<Goal, 'id'>;