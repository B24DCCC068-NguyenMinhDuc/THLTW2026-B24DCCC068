import React from "react";
import { Modal, Input } from "antd";

import { Application } from "../../types/application";

interface Props {
  visible: boolean;
  selectedIds: number[];
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  addHistory: (id: number, action: "Approved" | "Rejected", reason?: string) => void;
  onClose: () => void;
}

const RejectModal: React.FC<Props> = ({
  visible,
  selectedIds,
  applications,
  setApplications,
  addHistory,
  onClose
}) => {
  const [reason, setReason] = React.useState("");

  const submit = () => {
    const updated = applications.map(app => {
      if (selectedIds.includes(app.id)) {
        addHistory(app.id, "Rejected", reason);
        return { ...app, status: "Rejected", note: reason };
      }
      return app;
    });

    setApplications(updated);
    onClose();
  };

  return (
    <Modal
      title="Reject Applications"
      visible={visible}
      onOk={submit}
      onCancel={onClose}
    >
      <Input.TextArea
        placeholder="Enter reject reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </Modal>
  );
};

export default RejectModal;