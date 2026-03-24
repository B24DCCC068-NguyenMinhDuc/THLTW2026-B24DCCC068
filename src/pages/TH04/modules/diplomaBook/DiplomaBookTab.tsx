import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { DiplomaBook } from "../../types/diplomaBooks";
import DiplomaBookForm from "../../components/forms/DiplomaBookForm";

interface Props {
  data: DiplomaBook[];
  setData: React.Dispatch<React.SetStateAction<DiplomaBook[]>>;
}

const DiplomaBookTab: React.FC<Props> = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DiplomaBook | null>(null);

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success("Đã xoá sổ");
  };

  const columns = [
    {
      title: "Năm",
      dataIndex: "year",
      align: 'center',
    },
    {
      title: "Số hiện tại",
      dataIndex: "currentNumber",
      align: 'center',
    },
    {
      title: "Hành động",
      render: (_: any, record: DiplomaBook) => (
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
            title="Xoá sổ?"
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
        + Thêm sổ
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />
      
      <DiplomaBookForm
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        setData={setData}
        editing={editing}
      />
    </>
  );
};

export default DiplomaBookTab;