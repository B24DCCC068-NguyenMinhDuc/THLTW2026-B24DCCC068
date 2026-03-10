import { Table, Form, Input, Button, InputNumber, Popconfirm } from "antd";
import { Subject } from "../types/models";

interface Props {
  subjects: Subject[];
  setSubjects: (s: Subject[]) => void;
}

export default function SubjectsTab({ subjects, setSubjects }: Props) {
  const [form] = Form.useForm();

  const addSubject = (values: any) => {
    const newSubject: Subject = {
      id: Date.now(),
      code: values.code,
      name: values.name,
      credits: values.credits
    };

    setSubjects([...subjects, newSubject]);
    form.resetFields();
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <>
      <Form layout="inline" form={form} onFinish={addSubject}>
        <Form.Item name="code" rules={[{ required: true }]}>
          <Input placeholder="Mã môn" />
        </Form.Item>

        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Tên môn" />
        </Form.Item>

        <Form.Item name="credits">
          <InputNumber placeholder="Tín chỉ" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>

      <Table
        rowKey="id"
        dataSource={subjects}
        style={{ marginTop: 20 }}
        columns={[
          { title: "Mã", dataIndex: "code" },
          { title: "Tên", dataIndex: "name" },
          { title: "Tín chỉ", dataIndex: "credits" },
          {
            title: "Action",
            render: (_, r) => (
              <Popconfirm title="Xóa?" onConfirm={() => deleteSubject(r.id)}>
                <Button danger>Xóa</Button>
              </Popconfirm>
            )
          }
        ]}
      />
    </>
  );
}