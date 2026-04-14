import React, { useState } from "react";
import { Button, Select, Space } from "antd";

import MemberTable from "./MemberTable";
import TransferClubModal from "./TransferClubModal";

import { Application } from "../../types/application";
import { Club } from "../../types/club";

interface Props {
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  clubs: Club[];
}

const MemberTab: React.FC<Props> = ({
  applications,
  setApplications,
  clubs
}) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [transferVisible, setTransferVisible] = useState(false);

  const [clubFilter, setClubFilter] = useState<number | null>(null);

  const members = applications.filter(app =>
    app.status === "Approved" &&
    (!clubFilter || app.clubId === clubFilter)
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>

        <Select
          placeholder="Filter by club"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setClubFilter(value)}
        >
          {clubs.map(club => (
            <Select.Option key={club.id} value={club.id}>
              {club.name}
            </Select.Option>
          ))}
        </Select>

        <Button
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={() => setTransferVisible(true)}
        >
          Transfer {selectedRowKeys.length} Members
        </Button>

      </Space>

      <MemberTable
        members={members}
        clubs={clubs}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />

      <TransferClubModal
        visible={transferVisible}
        selectedIds={selectedRowKeys}
        applications={applications}
        setApplications={setApplications}
        clubs={clubs}
        onClose={() => {
          setTransferVisible(false);
          setSelectedRowKeys([]);
        }}
      />
    </>
  );
};

export default MemberTab;