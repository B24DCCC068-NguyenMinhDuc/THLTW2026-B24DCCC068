import React, { useState } from "react";
import { Modal, Select } from "antd";

import { Application } from "../../types/application";
import { Club } from "../../types/club";

interface Props {
  visible: boolean;
  selectedIds: number[];
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  clubs: Club[];
  onClose: () => void;
}

const TransferClubModal: React.FC<Props> = ({
  visible,
  selectedIds,
  applications,
  setApplications,
  clubs,
  onClose
}) => {

  const [clubId, setClubId] = useState<number | null>(null);

  const submit = () => {

    if (!clubId) return;

    const updated = applications.map(app => {
      if (selectedIds.includes(app.id)) {
        return {
          ...app,
          clubId
        };
      }
      return app;
    });

    setApplications(updated);
    onClose();
  };

  return (
    <Modal
      title={`Transfer ${selectedIds.length} members`}
      visible={visible}
      onOk={submit}
      onCancel={onClose}
    >
      <Select
        placeholder="Select new club"
        style={{ width: "100%" }}
        onChange={(value) => setClubId(value)}
      >
        {clubs.map(club => (
          <Select.Option key={club.id} value={club.id}>
            {club.name}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};

export default TransferClubModal;