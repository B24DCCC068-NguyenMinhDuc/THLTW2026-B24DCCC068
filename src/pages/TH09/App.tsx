import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { Task } from './types/task';
import { loadTasks, saveTasks } from './utils/localStorage';
import { initialTasks } from './data/mockData';

import DashboardPage from './pages/Dashboard/DashboardPage';
import KanbanBoard from './pages/Kanban/KanbanBoard';
import TaskListPage from './pages/TaskList/TaskListPage';

const { TabPane } = Tabs;

const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const stored = loadTasks();
		return stored.length > 0 ? stored : initialTasks;
	});

	useEffect(() => {
		saveTasks(tasks);
	}, [tasks]);

	return (
		<div style={{ padding: 24 }}>
			<Tabs defaultActiveKey='dashboard'>
				<TabPane tab='Dashboard' key='dashboard'>
					<DashboardPage tasks={tasks} />
				</TabPane>

				<TabPane tab='Kanban Board' key='kanban'>
					<KanbanBoard tasks={tasks} setTasks={setTasks} />
				</TabPane>

				<TabPane tab='Task List' key='list'>
					<TaskListPage tasks={tasks} setTasks={setTasks} />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default App;
