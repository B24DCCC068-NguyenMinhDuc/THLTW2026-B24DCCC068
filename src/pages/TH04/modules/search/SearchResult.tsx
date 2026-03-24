import React from "react";
import { Table } from "antd";

const SearchResult = ({ data, decisions }) => {
  const columns = [
    { title: "Số vào sổ", dataIndex: "serialNumber" },
    { title: "Số hiệu", dataIndex: "diplomaCode" },
    { title: "Họ tên", dataIndex: "name" },
    { title: "MSV", dataIndex: "studentId" },
    {
      title: "Quyết định",
      render: (_, record) => {
        const d = decisions.find(x => x.id === record.decisionId);
        return d?.code;
      },
    },
  ];

  return (
    <Table
      style={{ marginTop: 20 }}
      rowKey="id"
      columns={columns}
      dataSource={data}
    />
  );
};

export default SearchResult;