import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { Task } from './../types/task';
import dayjs from 'dayjs';

const { Option } = Select;

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (task: Task) => void;
	editingTask?: Task | null;
}

const TaskForm: React.FC<Props> = ({ visible, onCancel, onSubmit, editingTask }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (editingTask) {
			form.setFieldsValue({
				...editingTask,
				deadline: editingTask.deadline ? dayjs(editingTask.deadline) : null,
			});
		} else {
			form.resetFields();
		}
	}, [editingTask]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			const task: Task = {
				...editingTask,
				...values,
				deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
			};

			onSubmit(task);
			form.resetFields();
		});
	};

	return (
		<Modal title={editingTask ? 'Edit Task' : 'Add Task'} visible={visible} onCancel={onCancel} onOk={handleOk}>
			<Form layout='vertical' form={form}>
				<Form.Item name='title' label='Task Name' rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item name='description' label='Description'>
					<Input.TextArea />
				</Form.Item>

				<Form.Item name='priority' label='Priority'>
					<Select>
						<Option value='high'>High</Option>
						<Option value='medium'>Medium</Option>
						<Option value='low'>Low</Option>
					</Select>
				</Form.Item>

				<Form.Item name='deadline' label='Deadline'>
					<DatePicker style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item name='tags' label='Tags'>
					<Select mode='tags' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default TaskForm;
