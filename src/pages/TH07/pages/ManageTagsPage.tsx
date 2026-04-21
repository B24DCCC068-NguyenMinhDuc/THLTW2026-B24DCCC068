import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Popconfirm } from "antd";

interface Tag {
  id: number;
  name: string;
}

interface Post {
  id: number;
  tags: string[];
}

interface Props {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  posts: Post[];
}

const ManageTagPage: React.FC<Props> = ({ tags, setTags, posts }) => {
  const [visible, setVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();

  const openAdd = () => {
    setEditingTag(null);
    form.resetFields();
    setVisible(true);
  };

  const openEdit = (tag: Tag) => {
    setEditingTag(tag);
    form.setFieldsValue(tag);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    setTags(tags.filter(t => t.id !== id));
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingTag) {
        setTags(
          tags.map(t =>
            t.id === editingTag.id ? { ...t, ...values } : t
          )
        );
      } else {
        setTags([
          ...tags,
          {
            id: Date.now(),
            name: values.name
          }
        ]);
      }

      setVisible(false);
    });
  };

  const countPosts = (tagName: string) => {
    return posts.filter(p => p.tags.includes(tagName)).length;
  };

  const columns = [
    {
      title: "Tag Name",
      dataIndex: "name"
    },
    {
      title: "Used In",
      render: (tag: Tag) => countPosts(tag.name)
    },
    {
      title: "Action",
      render: (tag: Tag) => (
        <Space>
          <Button onClick={() => openEdit(tag)}>Edit</Button>

          <Popconfirm
            title="Delete this tag?"
            onConfirm={() => handleDelete(tag.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAdd}>
          Add Tag
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={tags}
        pagination={false}
      />

      <Modal
        title={editingTag ? "Edit Tag" : "Add Tag"}
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tag Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTagPage;