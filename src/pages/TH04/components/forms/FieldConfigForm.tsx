import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { FieldConfig, FieldType } from "../../types/fieldConfig";

interface Props {
  open: boolean;
  onClose: () => void;
  data: FieldConfig[];
  setData: React.Dispatch<React.SetStateAction<FieldConfig[]>>;
  editing: FieldConfig | null;
}

const FieldConfigForm: React.FC<Props> = ({
  open,
  onClose,
  data,
  setData,
  editing,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue(editing);
    } else {
      form.resetFields();
    }
  }, [editing]);

  const onFinish = (values: { name: string; type: FieldType }) => {
    if (editing) {
      setData(prev =>
        prev.map(item =>
          item.id === editing.id ? { ...item, ...values } : item
        )
      );
      message.success("Cập nhật thành công");
    } else {
      const newField: FieldConfig = {
        id: Date.now(),
        ...values,
      };
      setData(prev => [...prev, newField]);
      message.success("Thêm thành công");
    }

    onClose();
  };

  return (
    <Modal
      title={editing ? "Sửa field" : "Thêm field"}
      visible={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên trường"
          rules={[{ required: true, message: "Nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Kiểu dữ liệu"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="string">String</Select.Option>
            <Select.Option value="number">Number</Select.Option>
            <Select.Option value="date">Date</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FieldConfigForm;