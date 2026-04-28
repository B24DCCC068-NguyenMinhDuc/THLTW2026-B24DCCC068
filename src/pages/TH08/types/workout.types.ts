export type WorkoutType = 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
export type WorkoutStatus = 'Completed' | 'Missed';

export interface Workout {
  id: string;
  date: string;           
  type: WorkoutType;
  durationMinutes: number;
  caloriesBurned: number;
  notes: string;
  status: WorkoutStatus;
}

export type WorkoutFormValues = Omit<Workout, 'id'>;