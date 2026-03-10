import { Table, Form, Select, Button, Input, Tag, Space } from "antd";
import { Question, Subject, KnowledgeBlock } from "../types/models";

interface Props {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  subjects: Subject[];
  blocks: KnowledgeBlock[];
}

export default function QuestionsTab({
  questions,
  setQuestions,
  subjects,
  blocks
}: Props) {

  const [form] = Form.useForm();

  const addQuestion = (values: any) => {

    const newQuestion: Question = {
      id: Date.now(),
      subjectId: values.subjectId,
      blockId: values.blockId,
      difficulty: values.difficulty,
      content: values.content
    };

    setQuestions([...questions, newQuestion]);
    form.resetFields();
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={addQuestion}>

        <Form.Item name="subjectId" label="Môn học">
          <Select
            options={subjects.map(s => ({
              label: s.name,
              value: s.id
            }))}
          />
        </Form.Item>

        <Form.Item name="blockId" label="Khối kiến thức">
          <Select
            options={blocks.map(b => ({
              label: b.name,
              value: b.id
            }))}
          />
        </Form.Item>

        <Form.Item name="difficulty" label="Độ khó">
          <Select
            options={[
              { label: "Dễ", value: "Easy" },
              { label: "Trung bình", value: "Medium" },
              { label: "Khó", value: "Hard" },
              { label: "Rất khó", value: "VeryHard" }
            ]}
          />
        </Form.Item>

        <Form.Item name="content" label="Câu hỏi">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm câu hỏi
        </Button>

      </Form>

      <Table
        rowKey="id"
        style={{ marginTop: 20 }}
        dataSource={questions}
        columns={[
          { title: "Câu hỏi", dataIndex: "content" },
          {
            title: "Độ khó",
            render: (_, r) => <Tag>{r.difficulty}</Tag>
          }
        ]}
      />
    </>
  );
}