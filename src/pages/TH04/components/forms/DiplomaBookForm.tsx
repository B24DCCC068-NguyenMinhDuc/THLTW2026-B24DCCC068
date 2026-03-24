import React, { useEffect } from "react";
import { Modal, Form, InputNumber, message } from "antd";
import { DiplomaBook } from "../../types/diplomaBooks";

interface Props {
  open: boolean;
  onClose: () => void;
  data: DiplomaBook[];
  setData: React.Dispatch<React.SetStateAction<DiplomaBook[]>>;
  editing: DiplomaBook | null;
}

const DiplomaBookForm: React.FC<Props> = ({
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

  const onFinish = (values: { year: number }) => {
    const exist = data.find(
      item => item.year === values.year && item.id !== editing?.id
    );

    if (exist) {
      message.error("Năm đã tồn tại!");
      return;
    }

    if (editing) {
      setData(prev =>
        prev.map(item =>
          item.id === editing.id ? { ...item, year: values.year } : item
        )
      );
      message.success("Cập nhật thành công");
    } else {
      const newBook: DiplomaBook = {
        id: Date.now(),
        year: values.year,
        currentNumber: 0,
      };

      setData(prev => [...prev, newBook]);
      message.success("Tạo sổ mới");
    }

    onClose();
  };

  return (
    <Modal
      title={editing ? "Sửa sổ" : "Tạo sổ mới"}
      visible={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="year"
          label="Năm"
          rules={[{ required: true, message: "Nhập năm!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DiplomaBookForm;