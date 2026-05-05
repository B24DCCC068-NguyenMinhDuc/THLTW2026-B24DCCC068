import React, { useState } from 'react';
import { Table, Input, Select, Popconfirm, Button, Tag } from 'antd';
import { Task } from '../../types/task';
import { v4 as uuid } from 'uuid';
import TaskForm from '../../components/TaskForm';
import { priorityColor } from '../../constants/priorityColor';
import { ColumnsType } from 'antd/es/table';

interface Props {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}

const { Option } = Select;

const TaskListPage: React.FC<Props> = ({ tasks, setTasks }) => {
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [formVisible, setFormVisible] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	const handleSubmit = (task: Task) => {
		if (editingTask) {
			setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
		} else {
			setTasks([...tasks, { ...task, id: uuid(), status: 'todo' }]);
		}

		setFormVisible(false);
	};

	const handleDelete = (id: string) => {
		setTasks(tasks.filter((t) => t.id !== id));
	};

	const filtered = tasks.filter((t) => {
		const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
		const matchStatus = !statusFilter || t.status === statusFilter;
		return matchSearch && matchStatus;
	});

	const columns: ColumnsType<Task> = [
		{
			title: 'Task',
			dataIndex: 'title',
			align: 'center',
		},
		{
			title: 'Priority',
			dataIndex: 'priority',
			align: 'center',
			render: (priority: string) => <Tag color={priorityColor[priority]}>{priority.toUpperCase()}</Tag>,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			align: 'center',
			render: (status: string) => status.charAt(0).toUpperCase() + status.slice(1),
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			align: 'center',
			render: (date: string, record: Task) => {
				const overdue = date && new Date(date) < new Date() && record.status !== 'done';

				return overdue ? <span style={{ color: 'red' }}>{date}</span> : date;
			},
		},
		{
			title: 'Action',
			align: 'center',
			render: (_: any, record: Task) => (
				<span>
					<a
						onClick={() => {
							setEditingTask(record);
							setFormVisible(true);
						}}
						style={{ marginRight: 16 }}
					>
						Edit
					</a>
					<Popconfirm title='Delete this task?' onConfirm={() => handleDelete(record.id)}>
						<a>Delete</a>
					</Popconfirm>
				</span>
			),
		},
	];

	return (
		<div style={{ marginBottom: 16 }}>
			<Button
				type='primary'
				onClick={() => {
					setEditingTask(null);
					setFormVisible(true);
				}}
			>
				Add Task
			</Button>
			<Input
				placeholder='Search task'
				style={{ width: 200, marginLeft: 16 }}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Select
				placeholder='Filter status'
				style={{ width: 200, marginLeft: 16 }}
				onChange={(v) => setStatusFilter(v)}
				allowClear
			>
				<Option value='todo'>Todo</Option>
				<Option value='inprogress'>In Progress</Option>
				<Option value='done'>Done</Option>
			</Select>

			<Table rowKey='id' columns={columns} dataSource={filtered} pagination={{ pageSize: 5 }} />

			<TaskForm
				visible={formVisible}
				onCancel={() => setFormVisible(false)}
				onSubmit={handleSubmit}
				editingTask={editingTask}
			/>
		</div>
	);
};

export default TaskListPage;
