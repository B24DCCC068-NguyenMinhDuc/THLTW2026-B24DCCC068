import React from "react";
import { Modal, Table } from "antd";

import { Club } from "../../types/club";
import { Application } from "../../types/application";

interface Props {
  visible: boolean;
  club: Club | null;
  applications: Application[];
  onClose: () => void;
}

const MemberListModal: React.FC<Props> = ({
  visible,
  club,
  applications,
  onClose
}) => {
  if (!club) return null;

  const members = applications.filter(
    a => a.clubId === club.id && a.status === "Approved"
  );

  const columns = [
    { title: "Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" }
  ];

  return (
    <Modal
      title={`Members of ${club.name}`}
      visible={visible}
      footer={null}
      onCancel={onClose}
      width={600}
    >
      <Table
        rowKey="id"
        dataSource={members}
        columns={columns}
      />
    </Modal>
  );
};

export default MemberListModal;