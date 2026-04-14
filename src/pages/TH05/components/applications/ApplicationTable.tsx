import React from "react";
import { Table, Tag, Button, Space, Popconfirm } from "antd";

import { Application } from "../../types/application";
import { Club } from "../../types/club";

interface Props {
  applications: Application[];
  clubs: Club[];
  selectedRowKeys: number[];
  setSelectedRowKeys: (keys: number[]) => void;
  onEdit: (app: Application) => void;
  onDelete: (id: number) => void;
  onHistory: (app: Application) => void;
}

const ApplicationTable: React.FC<Props> = ({
  applications,
  clubs,
  selectedRowKeys,
  setSelectedRowKeys,
  onEdit,
  onDelete,
  onHistory
}) => {

  const getClubName = (id: number) =>
    clubs.find(c => c.id === id)?.name;

  const columns = [
    { title: "Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Club",
      render: (_: any, record: Application) => getClubName(record.clubId)
    },
    {
      title: "Status",
      render: (_: any, record: Application) => {
        const color =
          record.status === "Approved"
            ? "green"
            : record.status === "Rejected"
            ? "red"
            : "gold";

        return <Tag color={color}>{record.status}</Tag>;
      }
    },
    {
      title: "Actions",
      render: (_: any, record: Application) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>

          <Popconfirm
            title="Delete?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>

          <Button onClick={() => onHistory(record)}>
            History
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      dataSource={applications}
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys as number[])
      }}
    />
  );
};

export default ApplicationTable;