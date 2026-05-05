import React from 'react';
import { Card, Tag } from 'antd';
import { Task } from './../types/task';
import { priorityColor } from './../constants/priorityColor';

interface Props {
	task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
	const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';

	return (
		<Card size='small' style={{ marginBottom: 8 }}>
			<b>{task.title}</b>

			<div style={{ marginTop: 5 }}>
				<Tag color={priorityColor[task.priority]}>{task.priority}</Tag>

				{isOverdue && <Tag color='red'>Overdue</Tag>}
			</div>

			<div style={{ marginTop: 5 }}>
				{task.tags?.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</Card>
	);
};

export default TaskCard;
