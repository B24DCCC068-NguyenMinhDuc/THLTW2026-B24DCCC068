import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { Club } from "../../types/club";

interface Props {
  visible: boolean;
  editing: Club | null;
  clubs: Club[];
  setClubs: (clubs: Club[]) => void;
  onClose: () => void;
}

const ClubFormModal: React.FC<Props> = ({
  visible,
  editing,
  clubs,
  setClubs,
  onClose
}) => {

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<any[]>([]);

  useEffect(() => {
    if (editing) {
      form.setFieldsValue(editing);
      if (editing.avatar) {
        setAvatar([
          {
            uid: "-1",
            name: "avatar",
            url: editing.avatar
          }
        ]);
      }
    } else {
      form.resetFields();
      setAvatar([]);
    }
  }, [editing]);

  const submit = () => {
    form.validateFields().then(values => {

      const avatarUrl =
        avatar.length && avatar[0].originFileObj
          ? URL.createObjectURL(avatar[0].originFileObj)
          : editing?.avatar;

      if (editing) {

        const updated = clubs.map(c =>
          c.id === editing.id
            ? { ...editing, ...values, avatar: avatarUrl }
            : c
        );

        setClubs(updated);

      } else {

        const newClub: Club = {
          id: Date.now(),
          avatar: avatarUrl,
          ...values
        };

        setClubs([...clubs, newClub]);
      }

      onClose();
    });
  };

  return (
    <Modal
      title={editing ? "Edit Club" : "Add Club"}
      visible={visible}
      onOk={submit}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">

        <Form.Item label="Avatar">
          <Upload
            fileList={avatar}
            beforeUpload={() => false}
            onChange={({ fileList }) => setAvatar(fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              Upload Avatar
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="name"
          label="Club Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="president"
          label="President"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="active"
          label="Active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default ClubFormModal;