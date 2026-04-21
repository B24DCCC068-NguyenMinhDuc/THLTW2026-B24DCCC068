import React from 'react';
import { Table, Button, Input, Select, Space, Tag, Modal, Form, Popconfirm } from 'antd';
import { Post, Tag as Tagtype } from '../types/blog';

interface Props {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    tags: Tagtype[];
}

const ManagePostsPage: React.FC<Props> = ({ posts, setPosts, tags }) => {
    const [search, setSearch] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingPost, setEditingPost] = React.useState<Post | null>(null);
    const [form] = Form.useForm();

    const filteredPosts = posts.filter((post) => {
        const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !statusFilter || post.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const deletePost = (id: string) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    const openAddModal = () => {
        setEditingPost(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (post: Post) => {
        setEditingPost(post);
        form.setFieldsValue(post);
        setIsModalOpen(true);
    };

    const handleSubmit = (values: any) => {
        if (editingPost) {
            setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...values } : p)));
        } else {
            const newPost: Post = {
                id: Date.now().toString(),
                views: 0,
                createdAt: new Date().toISOString().slice(0, 10),
                author: 'Admin',
                ...values,
            };
            setPosts((prev) => [...prev, newPost]);
        }
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (status === 'published' ? <Tag color='green'>Đã đăng</Tag> : <Tag>Nháp</Tag>),
        },
        {
            title: 'Thẻ',
            dataIndex: 'tags',
            render: (tagIds: string[]) =>
                tagIds.map((id) => {
                    const tag = tags.find((t) => t.id === id);

                    return <Tag key={id}>{tag?.name}</Tag>;
                }),
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
        },

        {
            title: 'Hành động',
            render: (_: any, record: Post) => (
                <Space>
                    <Button size='small' onClick={() => openEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm title='Xóa bài viết?' onConfirm={() => deletePost(record.id)}>
                        <Button danger size='small'>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Input placeholder='Tìm theo tiêu đề' onChange={(e) => setSearch(e.target.value)} />

                <Select placeholder='Lọc trạng thái' allowClear style={{ width: 160 }} onChange={setStatusFilter}>
                    <Select.Option value='draft'>Nháp</Select.Option>

                    <Select.Option value='published'>Đã đăng</Select.Option>
                </Select>

                <Button type='primary' onClick={openAddModal}>
                    Thêm bài viết
                </Button>
            </Space>
            <Table rowKey='id' columns={columns} dataSource={filteredPosts} />
            <Modal
                title={editingPost ? 'Sửa bài viết' : 'Thêm bài viết'}
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout='vertical' onFinish={handleSubmit}>
                    <Form.Item name='title' label='Tiêu đề' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='slug' label='Slug'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='Cover' label='Ảnh đại diện (URL)'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='summary' label='Tóm tắt'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='content' label='Nội dung'>
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item name='tags' label='Thẻ'>
                        <Select mode='multiple'>
                            {tags.map((tag) => (
                                <Select.Option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='status' label='Trạng thái'>
                        <Select>
                            <Select.Option value='draft'>Nháp</Select.Option>
                            <Select.Option value='published'>Đã đăng</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManagePostsPage;
