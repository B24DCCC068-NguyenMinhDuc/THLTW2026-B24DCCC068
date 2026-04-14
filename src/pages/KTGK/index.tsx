import React, { useState } from 'react';
import { Table, Input, InputNumber, Button, Select, Modal, Form, Space, Popconfirm, message, Tag } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const { TextArea } = Input;

enum CourseStatus {
    OPEN = 'Đang mở',
    CLOSED = 'Đã kết thúc',
    PAUSED = 'Tạm dừng',
}

interface Course {
    id: number;
    name: string;
    instructor: string;
    students: number;
    description: string;
    status: CourseStatus;
}

const instructors = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Minh C",
    "Phạm Đức D",
];

const getStatusColor = (status: CourseStatus) => {
    switch (status) {
        case CourseStatus.OPEN:
            return 'green';
        case CourseStatus.CLOSED:
            return 'red';
        case CourseStatus.PAUSED:
            return 'orange';
        default:
            return 'default';
    }
};

const initialCourses: Course[] = [
    {
        id: 1,
        name: 'React cơ bản',
        instructor: "Nguyễn Văn A",
        students: 20,
        description: '<p>Khóa học React từ cơ bản</p>',
        status: CourseStatus.OPEN
    },
    {
        id: 2,
        name: 'NodeJS Backend',
        instructor: "Trần Thị B",
        students: 0,
        description: '<p>Backend với NodeJS</p>',
        status: CourseStatus.PAUSED
    },
    {
        id: 3,
        name: 'Machine Learning Intro',
        instructor: 'Lê Minh C',
        students: 35,
        description: '<p>Nhập môn Machine Learning</p>',
        status: CourseStatus.CLOSED
    }
];

const App: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [search, setSearch] = useState("");
    const [filterInstructor, setFilterInstructor] = useState<string>();
    const [filterStatus, setFilterStatus] = useState<CourseStatus>();
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState<Course | null>(null);
    const [form] = Form.useForm();

    const filteredCourses = courses
        .filter((c) => 
            c.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((c) => 
            filterInstructor ? c.instructor === filterInstructor : true
        )
        .filter((c) =>
            filterStatus ? c.status === filterStatus : true
        );

    const openAdd = () => {
        setEditing(null);
        form.resetFields();
        setVisible(true);
    };

    const openEdit = (record: Course) => {
        setEditing(record);
        form.setFieldsValue(record);
        setVisible(true);
    };

    const saveCourse = () => {
        form.validateFields().then((values) => {
            const duplicate = courses.find(
                (c) => c.name === values.name && (!editing || c.id !== editing.id)
            );
            if (duplicate) {
                message.error('Tên khóa học đã tồn tại');
                return;
            }
            if (editing) {
                setCourses(courses.map((c) => c.id === editing.id ? {...editing, ...values} : c ));
                message.success('Cập nhật thành công');
            } else {
                const newCourse: Course = {
                    id: Date.now(),
                    ...values
                };
                setCourses([...courses, newCourse]);
                message.success('Thêm thành công');
            }
            setVisible(false);
        });
    };

    const deleteCourse = (record: Course) => {
        if (record.students > 0) {
            message.error('Không thể xóa khóa học đã có học viên');
            return;
        }
        setCourses(courses.filter((c) => c.id !== record.id));
        message.success('Đã xóa khóa học thành công');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
        },
        {
            title: 'Giảng viên',
            dataIndex: 'instructor',
        },
        {
            title: 'Số sinh viên',
            dataIndex: 'students',
            sorter: (a: Course, b: Course) => a.students - b.students
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: CourseStatus) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            )
        },
        {
            titles: 'Hành động',
            render: (_: any, record: Course) => (
                <Space>
                    <Button onClick={() => openEdit(record)}>Sửa</Button>
                    <Popconfirm title='Bạn có chắc muốn xóa?' onConfirm={() => deleteCourse(record)}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '16px 24px' }}>
            <h2>Quản lý khóa học Online</h2>
            <Space style={{ marginBottom: 20 }}>
                <Input
                    placeholder='Tìm tên khóa học'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    allowClear
                    placeholder='Giảng viên'
                    style={{ width: 160 }}
                    onChange={(v) => setFilterInstructor(v)}
                >
                    {instructors.map((i) => (
                        <Option key={i}>{i}</Option>
                    ))}
                </Select>

                <Select
                    allowClear
                    placeholder='Trạng thái'
                    style={{ width: 160 }}
                    onChange={(v) => setFilterStatus(v)}
                >
                    {Object.values(CourseStatus).map((s) => (
                        <Option key={s}>{s}</Option>
                    ))}
                </Select>
                <Button type='primary' onClick={openAdd}>Thêm khóa học</Button>
            </Space>
            <Table
                rowKey='id'
                columns={columns}
                dataSource={filteredCourses}
            />
            <Modal
                visible={visible}
                title={editing ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
                onCancel={() => setVisible(false)}
                onOk={saveCourse}
            >
                <Form layout='vertical' form={form}>
                    <Form.Item
                        name='name'
                        label='Tên khóa học'
                        rules={[
                            { required: true, message: 'Không được để trống' },
                            { max: 100 }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='instructor'
                        label='Giảng viên'
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {instructors.map((i) => (
                                <Option key={i}>{i}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='students'
                        label='Số lượng học viên'
                        rules={[{ required: true }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item> 

                    <Form.Item
                        name='description'
                        label='Mô tả (HTML)'
                        rules={[{ required: true }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name='status'
                        label='Trạng thái'
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {Object.values(CourseStatus).map((s) => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default App;