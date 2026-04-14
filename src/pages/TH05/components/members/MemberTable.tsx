import React from "react";
import { Table } from "antd";

import { Application } from "../../types/application";
import { Club } from "../../types/club";

interface Props {
  members: Application[];
  clubs: Club[];
  selectedRowKeys: number[];
  setSelectedRowKeys: (keys: number[]) => void;
}

const MemberTable: React.FC<Props> = ({
  members,
  clubs,
  selectedRowKeys,
  setSelectedRowKeys
}) => {

  const getClubName = (id: number) =>
    clubs.find(c => c.id === id)?.name;

  const columns = [
    { title: "Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Club",
      render: (_: any, record: Application) =>
        getClubName(record.clubId)
    }
  ];

  return (
    <Table
      rowKey="id"
      dataSource={members}
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys as number[])
      }}
    />
  );
};

export default MemberTable;