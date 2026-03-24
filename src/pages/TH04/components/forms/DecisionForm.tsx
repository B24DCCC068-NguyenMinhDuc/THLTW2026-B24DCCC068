import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import { Decision } from "../../types/decision";
import moment from "moment";

interface Props {
  open: boolean;
  onClose: () => void;
  data: Decision[];
  setData: React.Dispatch<React.SetStateAction<Decision[]>>;
  editing: Decision | null;
  diplomaBooks: any[];
}

const DecisionForm: React.FC<Props> = ({
  open,
  onClose,
  data,
  setData,
  editing,
  diplomaBooks,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        date: moment(editing.date),
      });
    } else {
      form.resetFields();
    }
  }, [editing]);

  const onFinish = (values: any) => {
    const formatted = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    if (editing) {
      setData(prev =>
        prev.map(item =>
          item.id === editing.id ? { ...item, ...formatted } : item
        )
      );
      message.success("Cập nhật thành công");
    } else {
      const newItem: Decision = {
        id: Date.now(),
        ...formatted,
        searchCount: 0,
      };
      setData(prev => [...prev, newItem]);
      message.success("Thêm thành công");
    }

    onClose();
  };

  return (
    <Modal
      title={editing ? "Sửa quyết định" : "Thêm quyết định"}
      visible={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="code"
          label="Số quyết định"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày ban hành"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Trích yếu"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bookId"
          label="Sổ văn bằng"
          rules={[{ required: true }]}
        >
          <Select>
            {diplomaBooks.map(book => (
              <Select.Option key={book.id} value={book.id}>
                Năm {book.year}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DecisionForm;