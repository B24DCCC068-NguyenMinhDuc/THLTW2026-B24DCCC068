import React from 'react';
import { Row, Col, Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types/task';

interface Props {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}

const columns = [
	{ key: 'todo', title: 'Cần làm' },
	{ key: 'inprogress', title: 'Đang làm' },
	{ key: 'done', title: 'Hoàn thành' },
];

const KanbanBoard: React.FC<Props> = ({ tasks, setTasks }) => {
	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		const taskId = result.draggableId;
		const newStatus = result.destination.droppableId;

		const newTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task));

		setTasks(newTasks);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row gutter={16}>
				{columns.map((col) => {
					const columnTasks = tasks.filter((t) => t.status === col.key);

					return (
						<Col span={8} key={col.key}>
							<Card title={col.title}>
								<Droppable droppableId={col.key}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 200 }}>
											{columnTasks.map((task, index) => (
												<Draggable key={task.id} draggableId={task.id} index={index}>
													{(provided) => (
														<Card
															size='small'
															style={{ marginBottom: 8 }}
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															{task.title}
														</Card>
													)}
												</Draggable>
											))}

											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</Card>
						</Col>
					);
				})}
			</Row>
		</DragDropContext>
	);
};

export default KanbanBoard;
