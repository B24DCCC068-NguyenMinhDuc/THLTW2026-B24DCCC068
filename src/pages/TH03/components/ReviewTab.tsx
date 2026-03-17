import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface Review {
	key: number;
	datetime: string;
	staff: string;
	customer: string;
	service: string;
	rating?: number;
	feedback?: string;
	staffReply?: string;
}

interface ReviewTabProps {
	reviews: Review[];
	onSaveReview: (review: Review) => void;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ reviews, onSaveReview }) => {
	const [data, setData] = useState<Review[]>(reviews);
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState<Review | null>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		setData(reviews);
	}, [reviews]);

	const openReview = (record: Review) => {
		setCurrent(record);
		form.setFieldsValue(record);
		setOpen(true);
	};

	const saveReview = (values: any) => {
		if (!current) return;
		const updated = { ...current, ...values };
		onSaveReview(updated);
		setOpen(false);
	};

	const getAverage = (staff: string) => {
		const staffReviews = data.filter((r) => r.staff === staff && r.rating);
		if (staffReviews.length === 0) return 0;
		const total = staffReviews.reduce((sum, r) => sum + (r.rating || 0), 0);
		return (total / staffReviews.length).toFixed(1);
	};

	const columns = [
		{ title: 'Thời gian', dataIndex: 'datetime' },
		{
			title: 'Nhân viên',
			dataIndex: 'staff',
			render: (staff: string) => (
				<>
					{staff}
					<br />
					<Tag color='gold'>⭐ {getAverage(staff)}</Tag>
				</>
			),
		},
		{ title: 'Khách hàng', dataIndex: 'customer' },
		{ title: 'Dịch vụ', dataIndex: 'service' },
		{
			title: 'Đánh giá',
			dataIndex: 'rating',
			render: (rating: number) => (rating || rating === 0 ? `${rating}/10` : 'Chưa đánh giá'),
		},
		{ title: 'Phản hồi KH', dataIndex: 'feedback' },
		{
			title: 'Phản hồi NV',
			dataIndex: 'staffReply',
			render: (text: string) => (text ? <Tag color='blue'>{text}</Tag> : 'Chưa phản hồi'),
		},
		{
			title: '',
			render: (_: any, record: Review) => (
				<Button icon={<EditOutlined />} onClick={() => openReview(record)} />
			),
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={data} rowKey='key' />
			<Modal title='Đánh giá dịch vụ' visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
				<Form layout='vertical' form={form} onFinish={saveReview}>
				<Form.Item label='Đánh giá (0-10)' name='rating'>
					<InputNumber min={0} max={10} step={0.5} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item label='Phản hồi khách hàng' name='feedback'>
						<Input.TextArea />
					</Form.Item>
					<Form.Item label='Phản hồi của nhân viên' name='staffReply'>
						<Input.TextArea />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ReviewTab;
