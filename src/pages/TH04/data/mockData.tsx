import { FieldConfig } from '../types/fieldConfig';
import { Decision } from '../types/decision';
import { DiplomaBook } from '../types/diplomaBooks';

export const mockFieldConfigs: FieldConfig[] = [
	{ id: 1, name: 'Điểm trung bình', type: 'number' },
	{ id: 2, name: 'Nơi sinh', type: 'string' },
];

export const mockDecisions: Decision[] = [
	{
		id: 1,
		code: 'QD001',
		date: '2024-06-01',
		summary: 'Tốt nghiệp đợt 1',
		bookId: 1,
		searchCount: 0,
	},
];

export const mockDiplomaBooks: DiplomaBook[] = [
  {
    id: 1,
    year: 2024,
    currentNumber: 10,
  },
];