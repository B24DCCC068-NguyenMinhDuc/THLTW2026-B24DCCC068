import { HealthLog } from '../types';

const now = new Date();

const dateStr = (monthOffset: number, day: number): string => {
  const d = new Date(now.getFullYear(), now.getMonth() + monthOffset, day);
  return d.toISOString().slice(0, 10);
};

export const mockHealthLogs: HealthLog[] = [
  // 2 tháng trước
  { id: 'h1',  date: dateStr(-2, 5),  weightKg: 78.5, heightCm: 175, restingHeartRate: 72, sleepHours: 6.5 },
  { id: 'h2',  date: dateStr(-2, 12), weightKg: 78.1, heightCm: 175, restingHeartRate: 70, sleepHours: 7.0 },
  { id: 'h3',  date: dateStr(-2, 19), weightKg: 77.8, heightCm: 175, restingHeartRate: 71, sleepHours: 7.5 },
  { id: 'h4',  date: dateStr(-2, 26), weightKg: 77.4, heightCm: 175, restingHeartRate: 69, sleepHours: 7.0 },
  // Tháng trước
  { id: 'h5',  date: dateStr(-1, 4),  weightKg: 77.0, heightCm: 175, restingHeartRate: 68, sleepHours: 7.5 },
  { id: 'h6',  date: dateStr(-1, 11), weightKg: 76.6, heightCm: 175, restingHeartRate: 67, sleepHours: 8.0 },
  { id: 'h7',  date: dateStr(-1, 18), weightKg: 76.3, heightCm: 175, restingHeartRate: 66, sleepHours: 7.0 },
  { id: 'h8',  date: dateStr(-1, 25), weightKg: 76.0, heightCm: 175, restingHeartRate: 65, sleepHours: 7.5 },
  // Tháng hiện tại
  { id: 'h9',  date: dateStr(0, 3),   weightKg: 75.7, heightCm: 175, restingHeartRate: 64, sleepHours: 8.0 },
  { id: 'h10', date: dateStr(0, 10),  weightKg: 75.3, heightCm: 175, restingHeartRate: 63, sleepHours: 7.5 },
  { id: 'h11', date: dateStr(0, 17),  weightKg: 75.0, heightCm: 175, restingHeartRate: 62, sleepHours: 8.0 },
  { id: 'h12', date: dateStr(0, 22),  weightKg: 74.8, heightCm: 175, restingHeartRate: 61, sleepHours: 7.5 },
];