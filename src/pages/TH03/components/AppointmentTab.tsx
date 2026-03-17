import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Modal,
  Tag,
} from "antd";

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

interface Appointment {
  key: number;
  date: string;
  staff: string;
  customer: string;
  service: string;
  status: "pending" | "confirmed" | "done" | "cancel";
}

interface AppointmentTabProps {
  staffs: Staff[];
  services: Service[];
  appointments: Appointment[];
  onAddAppointment: (a: Appointment) => void;
  onUpdateStatus: (key: number, status: Appointment["status"]) => void;
}

const AppointmentTab: React.FC<AppointmentTabProps> = ({ staffs, services, appointments, onAddAppointment, onUpdateStatus }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const date = values.date.format("YYYY-MM-DD HH:mm");
    const exist = appointments.find(a => a.date === date && a.staff === values.staff);

    if (exist) {
      message.error("Nhân viên đã có lịch vào thời điểm này!");
      return;
    }

    const newAppointment: Appointment = {
      key: Date.now(),
      date,
      staff: values.staff,
      customer: values.customer,
      service: values.service,
      status: "pending",
    };

    onAddAppointment(newAppointment);
    message.success("Đặt lịch thành công");
    form.resetFields();
    setOpen(false);
  };

  const columns = [
    { title: "Thời gian", dataIndex: "date", align: 'center' },
    { title: "Nhân viên", dataIndex: "staff", align: 'center' },
    { title: "Khách hàng", dataIndex: "customer", align: 'center' },
    { title: "Dịch vụ", dataIndex: "service", align: 'center' },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const map: any = {
          pending: <Tag color="orange">Chờ duyệt</Tag>,
          confirmed: <Tag color="blue">Xác nhận</Tag>,
          done: <Tag color="green">Hoàn thành</Tag>,
          cancel: <Tag color="red">Hủy</Tag>,
        };
        return map[status];
      },
      align: 'center'
    },
    {
      title: "Hành động",
      render: (_: any, record: Appointment) => (
        <>
          <Button size="small" style={{ marginRight: 8 }} onClick={() => onUpdateStatus(record.key, "confirmed")}>
            Xác nhận
          </Button>
          <Button size="small" style={{ marginRight: 8 }} onClick={() => onUpdateStatus(record.key, "done")}>
            Hoàn thành
          </Button>
          <Button danger size="small" onClick={() => onUpdateStatus(record.key, "cancel")}>
            Hủy
          </Button>
        </>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
        Đặt lịch hẹn
      </Button>

      <Modal title="Đặt lịch hẹn" visible={open} onCancel={() => setOpen(false)} footer={null}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item name="customer" label="Tên khách" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="staff" label="Nhân viên" rules={[{ required: true }]}>
            <Select options={staffs.map(s => ({ value: s.name, label: s.name }))} />
          </Form.Item>

          <Form.Item name="service" label="Dịch vụ" rules={[{ required: true }]}>
            <Select options={services.map(s => ({ value: s.name, label: s.name }))} />
          </Form.Item>

          <Form.Item name="date" label="Thời gian" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đặt lịch
          </Button>
        </Form>
      </Modal>

      <Table dataSource={appointments} columns={columns} rowKey="key" />
    </>
  );
};

export default AppointmentTab;