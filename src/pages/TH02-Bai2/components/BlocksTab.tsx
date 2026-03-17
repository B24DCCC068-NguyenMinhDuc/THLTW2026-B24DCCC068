import { Table, Form, Input, Button, Popconfirm } from "antd";
import { KnowledgeBlock } from "../types/models";

interface Props {
    blocks: KnowledgeBlock[];
    setBlocks: (b: KnowledgeBlock[]) => void;
}

export default function BlocksTab({ blocks, setBlocks }: Props) {
    const [form] = Form.useForm();

    const addBlock = (values: any) => {
        const newBlock = {
            id: Date.now(),
            name: values.name
        };

        setBlocks([...blocks, newBlock]);
        form.resetFields();
    };

    const deleteBlock = (id: number) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    return (
        <>
            <Form layout="inline" form={form} onFinish={addBlock}>
                <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Tên khối kiến thức" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Thêm
                </Button>
            </Form>

            <Table
                rowKey="id"
                dataSource={blocks}
                style={{ marginTop: 20 }}
                columns={[
                    { title: "Tên khối", dataIndex: "name" },
                    {
                        title: "Action",
                        render: (_, r) => (
                            <Popconfirm title="Xóa?" onConfirm={() => deleteBlock(r.id)}>
                                <Button danger>Xóa</Button>
                            </Popconfirm>
                        )
                    }
                ]}
            />
        </>
    );
}