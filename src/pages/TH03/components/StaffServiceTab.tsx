import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Tabs } from 'antd';
const { TabPane } = Tabs;

interface Staff {
	id: number;
	name: string;
	workingHours: string;
	maxCustomers: number;
}

interface Service {
	id: number;
	name: string;
	price: number;
	duration: number;
}

interface StaffServiceTabProps {
	staffs: Staff[];
	services: Service[];
	onAddStaff: (staff: Staff) => void;
	onAddService: (service: Service) => void;
}

const StaffServiceTab: React.FC<StaffServiceTabProps> = ({ staffs, services, onAddStaff, onAddService }) => {
	const [staffModal, setStaffModal] = useState(false);
	const [serviceModal, setServiceModal] = useState(false);

	const [form] = Form.useForm();
	const [serviceForm] = Form.useForm();

	const addStaff = (values: any) => {
		onAddStaff({ id: Date.now(), ...values });
		setStaffModal(false);
		form.resetFields();
	};

	const addService = (values: any) => {
		onAddService({ id: Date.now(), ...values });
		setServiceModal(false);
		serviceForm.resetFields();
	};

	return (
		<Tabs>
			<TabPane key='1' tab='Nhân viên'>
				<>
					<Button onClick={() => setStaffModal(true)}>Thêm nhân viên</Button>

					<Table
						dataSource={staffs}
						rowKey='id'
						columns={[
							{ title: 'Tên', dataIndex: 'name', align: 'center' },
							{ title: 'Giờ làm', dataIndex: 'workingHours', align: 'center' },
							{ title: 'Khách tối đa/ngày', dataIndex: 'maxCustomers', align: 'center' },
						]}
					/>

					<Modal visible={staffModal} onCancel={() => setStaffModal(false)} onOk={() => form.submit()}>
						<Form form={form} onFinish={addStaff} layout='vertical'>
							<Form.Item name='name' label='Tên'>
								<Input />
							</Form.Item>

							<Form.Item name='workingHours' label='Giờ làm'>
								<Input placeholder='9:00-17:00' />
							</Form.Item>

							<Form.Item name='maxCustomers' label='Số khách tối đa'>
								<InputNumber />
							</Form.Item>
						</Form>
					</Modal>
				</>
			</TabPane>

			<TabPane key='2' tab='Dịch vụ'>
				<>
					<Button onClick={() => setServiceModal(true)}>Thêm dịch vụ</Button>

					<Table
						dataSource={services}
						rowKey='id'
						columns={[
							{ title: 'Tên dịch vụ', dataIndex: 'name', align: 'center' },
							{ title: 'Giá', dataIndex: 'price', align: 'center' },
							{ title: 'Thời gian (phút)', dataIndex: 'duration', align: 'center' },
						]}
					/>

					<Modal visible={serviceModal} onCancel={() => setServiceModal(false)} onOk={() => serviceForm.submit()}>
						<Form form={serviceForm} onFinish={addService} layout='vertical'>
							<Form.Item name='name' label='Tên dịch vụ'>
								<Input />
							</Form.Item>

							<Form.Item name='price' label='Giá'>
								<InputNumber />
							</Form.Item>

							<Form.Item name='duration' label='Thời gian'>
								<InputNumber />
							</Form.Item>
						</Form>
					</Modal>
				</>
			</TabPane>
		</Tabs>
	);
};

export default StaffServiceTab;
