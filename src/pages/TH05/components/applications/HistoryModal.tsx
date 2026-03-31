import React from "react";
import { Modal, Table } from "antd";

import { Application } from "../../types/application";
import { History } from "../../types/history";

interface Props {
  visible: boolean;
  application: Application | null;
  histories: History[];
  onClose: () => void;
}

const HistoryModal: React.FC<Props> = ({
  visible,
  application,
  histories,
  onClose
}) => {
  if (!application) return null;

  const data = histories.filter(
    h => h.applicationId === application.id
  );

  const columns = [
    { title: "Action", dataIndex: "action" },
    { title: "Admin", dataIndex: "admin" },
    { title: "Reason", dataIndex: "reason" },
    { title: "Time", dataIndex: "time" }
  ];

  return (
    <Modal
      title="Action History"
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <Table rowKey="id" dataSource={data} columns={columns} />
    </Modal>
  );
};

export default HistoryModal;