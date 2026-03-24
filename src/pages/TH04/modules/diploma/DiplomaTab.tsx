import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { Diploma } from "../../types/diploma";
import DiplomaForm from "../../components/forms/DiplomaForm";

interface Props {
  data: Diploma[];
  setData: React.Dispatch<React.SetStateAction<Diploma[]>>;
  diplomaBooks: any[];
  decisions: any[];
  fieldConfigs: any[];
  setDiplomaBooks: any;
}

const DiplomaTab: React.FC<Props> = ({
  data,
  setData,
  diplomaBooks,
  decisions,
  fieldConfigs,
  setDiplomaBooks,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Diploma | null>(null);

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success("Đã xoá văn bằng");
  };

  const columns = [
    { title: "Số vào sổ", dataIndex: "serialNumber", align: 'center' as const, },
    { title: "Số hiệu", dataIndex: "diplomaCode", align: 'center' as const, },
    { title: "Họ tên", dataIndex: "name", align: 'center' as const, },
    { title: "MSV", dataIndex: "studentId", align: 'center' as const, },
    {
      title: "Quyết định",
      render: (_: any, record: Diploma) => {
        const d = decisions.find(x => x.id === record.decisionId);
        return d?.code;
      },
      align: 'center' as const,
    },
    {
      title: "Hành động",
      render: (_: any, record: Diploma) => (
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
            title="Xoá?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
      align: 'center' as const,
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
        + Thêm văn bằng
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <DiplomaForm
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        setData={setData}
        editing={editing}
        diplomaBooks={diplomaBooks}
        decisions={decisions}
        fieldConfigs={fieldConfigs}
        setDiplomaBooks={setDiplomaBooks}
      />
    </>
  );
};

export default DiplomaTab;