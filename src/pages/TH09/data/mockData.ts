import { Task } from '../types/task';

export const initialTasks: Task[] = [
	{
		id: '1',
		title: 'Design UI',
		description: 'Create dashboard layout',
		priority: 'high',
		status: 'todo',
		deadline: '2026-05-10',
		tags: ['design'],
	},
	{
		id: '2',
		title: 'Build Kanban',
		priority: 'medium',
		status: 'inprogress',
		deadline: '2026-05-12',
		tags: ['frontend'],
	},
	{
		id: '3',
		title: 'Write docs',
		priority: 'low',
		status: 'done',
		deadline: '2026-05-15',
		tags: ['docs'],
	},
];
