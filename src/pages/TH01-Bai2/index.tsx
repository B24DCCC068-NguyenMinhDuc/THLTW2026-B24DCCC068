import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message, Tag, Checkbox, } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Subject {
    id: number;
    name: string;
    date: number;
    duration: number;
    information: string;
    note: string;
    completed: boolean;
}

const Storage_key = "study_tracker_data";

const StudyTrackerPage: React.FC= () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [visible, setVisible] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const stored = localStorage.getItem(Storage_key);
        if (stored) {
            const parsed: Subject[] = JSON.parse(stored).map((s: any) => ({
                ...s,
                completed: s.completed ?? false,
            }));
            setSubjects(parsed);
        };
    }, []);
    
    useEffect(() => {
        localStorage.setItem(Storage_key, JSON.stringify(subjects));
    }, [subjects]);

    const handleAddSubject = (values: Omit<Subject, 'id'>) => {
        const newSubject: Subject = {
            id: Date.now(),
            ...values,
            completed: false,
        };
        setSubjects([...subjects, newSubject]);
        message.success('Thêm môn học mới thành công');
    };

    const handleEditSubject = (id: number, values: Omit<Subject, 'id'>) => {
        const prev = subjects.find((x) => x.id === id);
        const updatedSubject: Subject = {
            id,
            ...values,
            completed: prev ? prev.completed : false,
        };
        setSubjects(subjects.map((item) => (item.id === id ? updatedSubject : item)));
        message.success('Cập nhật môn học thành công');
    };

    const handleSubmit = (values: any) => {
        const payload: Omit<Subject, 'id'> = {
            ...values,
            date: new Date(values.date).getTime(),
        };

        if (editingSubject) {
            handleEditSubject(editingSubject.id, payload);
        } else {
            handleAddSubject(payload);
        }

        form.resetFields();
        setEditingSubject(null);
        setVisible(false);
    };

    const handleDelete = (id: number) => {
        setSubjects(subjects.filter((item) => item.id !== id));
        message.success('Xóa môn học thành công');
    };

    const handleToggleComplete = (id: number) => {
        setSubjects(
            subjects.map((s) =>
                s.id === id ? { ...s, completed: !s.completed } : s
            )
        );
    };

    const currentMonth = new Date().getMonth();
    const totalStudyTime = subjects
        .filter((s) => s.completed && new Date(s.date).getMonth() === currentMonth)
        .reduce((sum, s) => sum + s.duration, 0);

    const monthlyGoal = 600;

    const incompleteColumns: ColumnsType<Subject> = [
        {
            title: 'STT',
            render: (_, __, index) => index + 1,
            width: 60,
        },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
        },
        {
            title: 'Ngày học',
            render: (_, record) => 
                new Date(record.date).toLocaleString(),
        },
        {
            title: 'Thời lượng học(Phút)',
            dataIndex: 'duration',
        },
        {
            title: 'Nội dung học',
            dataIndex: 'information',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditingSubject(record);
                            form.setFieldsValue({
                                ...record,
                                date: new Date(record.date),
                            });
                            setVisible(true);
                        }}
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa môn này?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>

                    <Checkbox
                        checked={record.completed}
                        onChange={() => handleToggleComplete(record.id)}
                        style={{ marginRight: 8 }}
                    >Hoàn thành
                    </Checkbox>
                </>
            ),
        },
    ];

    const completedColumns: ColumnsType<Subject> = [
        ...incompleteColumns.slice(0, -1),
        {
            title: 'Hành động',
            render: (_, record) => (
                <Popconfirm
                    title="Xóa môn này?"
                    onConfirm={() => handleDelete(record.id)}
                >
                    <Button type="link" danger>
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý tiến độ học tập</h2>

      <div style={{ marginBottom: 16 }}>
        <Tag color={totalStudyTime >= monthlyGoal ? "green" : "red"}>
          Tổng tháng này: {totalStudyTime} / {monthlyGoal} phút
        </Tag>
      </div>

      <Button
        type="primary"
        onClick={() => {
          setEditingSubject(null);
          form.resetFields();
          setVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm môn học
      </Button>

      <Table
        rowKey="id"
        columns={incompleteColumns}
        dataSource={subjects.filter((s) => !s.completed)}
        pagination={false}
      />

      <h3 style={{ marginTop: 24 }}>Môn đã hoàn thành</h3>
      <Table
        rowKey="id"
        columns={completedColumns}
        dataSource={subjects.filter((s) => s.completed)}
        pagination={false}
      />

      <Modal
        title={editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học"}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên môn học"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày giờ học"
            name="date"
            rules={[{ required: true }]}
          >
            <Input type="datetime-local" />
          </Form.Item>

          <Form.Item
            label="Thời lượng (phút)"
            name="duration"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Nội dung học" name="information">
            <Input />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudyTrackerPage;