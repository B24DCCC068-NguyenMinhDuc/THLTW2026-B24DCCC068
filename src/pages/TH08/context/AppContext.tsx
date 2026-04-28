import React, { createContext, useReducer, ReactNode } from 'react';
import { Workout, HealthLog, Goal, Exercise } from '../types';

export interface AppState {
  workouts: Workout[];
  healthLogs: HealthLog[];
  goals: Goal[];
  exercises: Exercise[];
}

type Action =
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'UPDATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: string }

  | { type: 'ADD_HEALTH_LOG'; payload: HealthLog }
  | { type: 'UPDATE_HEALTH_LOG'; payload: HealthLog }
  | { type: 'DELETE_HEALTH_LOG'; payload: string }

  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'DELETE_GOAL'; payload: string }

  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'UPDATE_EXERCISE'; payload: Exercise }
  | { type: 'DELETE_EXERCISE'; payload: string };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_WORKOUT':
      return { ...state, workouts: [action.payload, ...state.workouts] };

    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w.id === action.payload.id ? action.payload : w
        ),
      };

    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((w) => w.id !== action.payload),
      };

    case 'ADD_HEALTH_LOG':
      return {
        ...state,
        healthLogs: [action.payload, ...state.healthLogs],
      };

    case 'UPDATE_HEALTH_LOG':
      return {
        ...state,
        healthLogs: state.healthLogs.map((h) =>
          h.id === action.payload.id ? action.payload : h
        ),
      };

    case 'DELETE_HEALTH_LOG':
      return {
        ...state,
        healthLogs: state.healthLogs.filter((h) => h.id !== action.payload),
      };

    case 'ADD_GOAL':
      return { ...state, goals: [action.payload, ...state.goals] };

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((g) =>
          g.id === action.payload.id ? action.payload : g
        ),
      };

    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((g) => g.id !== action.payload),
      };

    case 'ADD_EXERCISE':
      return { ...state, exercises: [action.payload, ...state.exercises] };

    case 'UPDATE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case 'DELETE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.filter((e) => e.id !== action.payload),
      };

    default:
      return state;
  }
};

export interface AppContextValue {
  state: AppState;
  addWorkout: (w: Omit<Workout, 'id'>) => void;
  updateWorkout: (w: Workout) => void;
  deleteWorkout: (id: string) => void;

  addHealthLog: (h: Omit<HealthLog, 'id'>) => void;
  updateHealthLog: (h: HealthLog) => void;
  deleteHealthLog: (id: string) => void;

  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoal: (g: Goal) => void;
  deleteGoal: (id: string) => void;

  addExercise: (e: Omit<Exercise, 'id'>) => void;
  updateExercise: (e: Exercise) => void;
  deleteExercise: (id: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
  initialState: AppState;
}

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value: AppContextValue = {
    state,

    addWorkout: (w) =>
      dispatch({ type: 'ADD_WORKOUT', payload: { ...w, id: genId() } }),
    updateWorkout: (w) =>
      dispatch({ type: 'UPDATE_WORKOUT', payload: w }),
    deleteWorkout: (id) =>
      dispatch({ type: 'DELETE_WORKOUT', payload: id }),

    addHealthLog: (h) =>
      dispatch({ type: 'ADD_HEALTH_LOG', payload: { ...h, id: genId() } }),
    updateHealthLog: (h) =>
      dispatch({ type: 'UPDATE_HEALTH_LOG', payload: h }),
    deleteHealthLog: (id) =>
      dispatch({ type: 'DELETE_HEALTH_LOG', payload: id }),

    addGoal: (g) =>
      dispatch({ type: 'ADD_GOAL', payload: { ...g, id: genId() } }),
    updateGoal: (g) =>
      dispatch({ type: 'UPDATE_GOAL', payload: g }),
    deleteGoal: (id) =>
      dispatch({ type: 'DELETE_GOAL', payload: id }),

    addExercise: (e) =>
      dispatch({ type: 'ADD_EXERCISE', payload: { ...e, id: genId() } }),
    updateExercise: (e) =>
      dispatch({ type: 'UPDATE_EXERCISE', payload: e }),
    deleteExercise: (id) =>
      dispatch({ type: 'DELETE_EXERCISE', payload: id }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};