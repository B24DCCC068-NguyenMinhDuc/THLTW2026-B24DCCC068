import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { Decision } from "../../types/decision";
import DecisionForm from "../../components/forms/DecisionForm";

interface Props {
  data: Decision[];
  setData: React.Dispatch<React.SetStateAction<Decision[]>>;
  diplomaBooks: any[]
}

const DecisionTab: React.FC<Props> = ({ data, setData, diplomaBooks }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Decision | null>(null);

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success("Đã xoá quyết định");
  };

  const columns = [
    {
      title: "Số QĐ",
      dataIndex: "code",
      align: 'center',
    },
    {
      title: "Ngày",
      dataIndex: "date",
      align: 'center',
    },
    {
      title: "Trích yếu",
      dataIndex: "summary",
      align: 'center',
    },
    {
      title: "Sổ văn bằng",
      render: (_: any, record: Decision) => {
        const book = diplomaBooks.find(b => b.id === record.bookId);
        return book ? `Năm ${book.year}` : "Không rõ";
      },
      align: 'center',
    },
    {
      title: "Lượt tra cứu",
      dataIndex: "searchCount",
      align: 'center',
    },
    {
      title: "Hành động",
      render: (_: any, record: Decision) => (
        <Space>
          <Button
            onClick={() => {
              setEditing(record);
              setOpen(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Xoá quyết định?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        + Thêm quyết định
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <DecisionForm
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        setData={setData}
        editing={editing}
        diplomaBooks={diplomaBooks}
      />
    </>
  );
};

export default DecisionTab;