import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import moment from "moment";

interface DiplomaFormProps {
  open: boolean;
  onClose: () => void;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  editing: any;
  diplomaBooks: any[];
  decisions: any[];
  fieldConfigs: any[];
  setDiplomaBooks: React.Dispatch<React.SetStateAction<any[]>>;
}

const DiplomaForm = ({
  open,
  onClose,
  data,
  setData,
  editing,
  diplomaBooks,
  decisions,
  fieldConfigs,
  setDiplomaBooks,
}: DiplomaFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        dob: moment(editing.dob),
        ...editing.extraFields,
      });
    } else {
      form.resetFields();
    }
  }, [editing]);

  const onFinish = (values: any) => {
    const { bookId } = values;

    const book = diplomaBooks.find((b: any) => b.id === bookId);

    if (!book) {
      message.error("Chọn sổ!");
      return;
    }

    let serialNumber = editing?.serialNumber;

    if (!editing) {
      // AUTO TĂNG
      serialNumber = book.currentNumber + 1;

      // update book
      setDiplomaBooks((prev: any) =>
        prev.map((b: any) =>
          b.id === bookId
            ? { ...b, currentNumber: serialNumber }
            : b
        )
      );
    }

    // extract dynamic fields
    const extraFields: any = {};
    fieldConfigs.forEach((f: any) => {
      extraFields[f.name] = values[f.name];
    });

    const newItem = {
      ...values,
      dob: values.dob.format("YYYY-MM-DD"),
      serialNumber,
      extraFields,
    };

    if (editing) {
      setData((prev: any) =>
        prev.map((item: any) =>
          item.id === editing.id ? { ...item, ...newItem } : item
        )
      );
      message.success("Cập nhật thành công");
    } else {
      setData((prev: any) => [
        ...prev,
        {
          id: Date.now(),
          ...newItem,
        },
      ]);
      message.success("Thêm văn bằng thành công");
    }

    onClose();
  };

  return (
    <Modal
      title="Văn bằng"
      visible={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="bookId" label="Sổ" rules={[{ required: true }]}>
          <Select>
            {diplomaBooks.map((b: any) => (
              <Select.Option key={b.id} value={b.id}>
                {b.year}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="decisionId" label="Quyết định" rules={[{ required: true }]}>
          <Select>
            {decisions.map((d: any) => (
              <Select.Option key={d.id} value={d.id}>
                {d.code}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="diplomaCode" label="Số hiệu" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="studentId" label="MSV" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* 🔥 Dynamic Fields */}
        {fieldConfigs.map((field: any) => (
          <Form.Item key={field.id} name={field.name} label={field.name}>
            {field.type === "string" && <Input />}
            {field.type === "number" && <InputNumber style={{ width: "100%" }} />}
            {field.type === "date" && <DatePicker style={{ width: "100%" }} />}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default DiplomaForm;