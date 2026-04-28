export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Arms'
  | 'Core'
  | 'Full Body';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: DifficultyLevel;
  description: string;        
  instructions: string;       
  caloriesPerHour: number;    
}

export type ExerciseFormValues = Omit<Exercise, 'id'>;