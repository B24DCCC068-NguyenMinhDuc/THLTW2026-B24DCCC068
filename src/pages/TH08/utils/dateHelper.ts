import { Workout } from '../types';

export const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export const currentYearMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const workoutsThisMonth = (workouts: Workout[]): Workout[] => {
  const ym = currentYearMonth();
  return workouts.filter((w) => w.date.startsWith(ym));
};

export const countByWeekThisMonth = (
  workouts: Workout[]
): { week: string; count: number }[] => {
  const monthly = workoutsThisMonth(workouts).filter(
    (w) => w.status === 'Completed'
  );
  const weeks: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  monthly.forEach((w) => {
    const day = parseInt(w.date.split('-')[2], 10);
    const weekNum = Math.min(Math.ceil(day / 7), 4);
    weeks[weekNum] = (weeks[weekNum] || 0) + 1;
  });
  return Object.entries(weeks).map(([wk, count]) => ({
    week: `Tuần ${wk}`,
    count,
  }));
};

export const calcStreak = (workouts: Workout[]): number => {
  const completedDates = new Set(
    workouts
      .filter((w) => w.status === 'Completed')
      .map((w) => w.date)
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    if (completedDates.has(iso)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const todayISO = (): string => new Date().toISOString().slice(0, 10);