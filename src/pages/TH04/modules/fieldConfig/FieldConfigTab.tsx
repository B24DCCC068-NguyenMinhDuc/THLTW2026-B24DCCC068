import React, { useState } from "react";
import { Button, Table, Space, Popconfirm, message } from "antd";
import { FieldConfig } from "../../types/fieldConfig";
import FieldConfigForm from "../../components/forms/FieldConfigForm";

interface Props {
  data: FieldConfig[];
  setData: React.Dispatch<React.SetStateAction<FieldConfig[]>>;
}

const FieldConfigTab: React.FC<Props> = ({ data, setData }) => {
  const [editing, setEditing] = useState<FieldConfig | null>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success("Đã xoá!");
  };

  const columns = [
    {
      title: "Tên trường",
      dataIndex: "name",
      align: 'center',
    },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "type",
      align: 'center',
    },
    {
      title: "Hành động",
      render: (_: any, record: FieldConfig) => (
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
            title="Xoá field?"
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
        + Thêm field
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <FieldConfigForm
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        setData={setData}
        editing={editing}
      />
    </>
  );
};

export default FieldConfigTab;