import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

import { Application } from "../../types/application";
import { Club } from "../../types/club";

interface Props {
  visible: boolean;
  editing: Application | null;
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  clubs: Club[];
  onClose: () => void;
}

const ApplicationFormModal: React.FC<Props> = ({
  visible,
  editing,
  applications,
  setApplications,
  clubs,
  onClose
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue(editing);
    } else {
      form.resetFields();
    }
  }, [editing]);

  const submit = () => {
    form.validateFields().then(values => {

      if (editing) {
        const updated = applications.map(app =>
          app.id === editing.id
            ? { ...editing, ...values }
            : app
        );

        setApplications(updated);
      } else {
        const newApplication: Application = {
          id: Date.now(),
          status: "Pending",
          note: "",
          ...values
        };

        setApplications([...applications, newApplication]);
      }

      onClose();
    });
  };

  return (
    <Modal
      title={editing ? "Edit Application" : "Add Application"}
      visible={visible}
      onOk={submit}
      onCancel={onClose}
      width={600}
    >
      <Form form={form} layout="vertical">

        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
        >
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="skill"
          label="Skill"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="clubId"
          label="Club"
          rules={[{ required: true }]}
        >
          <Select>
            {clubs.map(club => (
              <Select.Option
                key={club.id}
                value={club.id}
              >
                {club.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason to join"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default ApplicationFormModal;