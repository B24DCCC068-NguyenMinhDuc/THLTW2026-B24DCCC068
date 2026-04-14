import React, { useState } from "react";
import { Button, Space, message } from "antd";

import ApplicationTable from "./ApplicationTable";
import ApplicationFormModal from "./ApplicationFormModal";
import RejectModal from "./RejectModal";
import HistoryModal from "./HistoryModal";

import { Application } from "../../types/application";
import { Club } from "../../types/club";
import { History } from "../../types/history";

interface Props {
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  clubs: Club[];
  histories: History[];
  setHistories: (h: History[]) => void;
}

const ApplicationTab: React.FC<Props> = ({
  applications,
  setApplications,
  clubs,
  histories,
  setHistories
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  const [rejectVisible, setRejectVisible] = useState(false);

  const [historyApp, setHistoryApp] = useState<Application | null>(null);

  const addHistory = (appId: number, action: "Approved" | "Rejected", reason?: string) => {
    const newHistory: History = {
      id: Date.now(),
      applicationId: appId,
      action,
      reason,
      admin: "Admin",
      time: new Date().toLocaleString()
    };

    setHistories([...histories, newHistory]);
  };

  const approveSelected = () => {
    const updated = applications.map(app => {
      if (selectedRowKeys.includes(app.id)) {
        addHistory(app.id, "Approved");
        return { ...app, status: "Approved" };
      }
      return app;
    });

    setApplications(updated);
    setSelectedRowKeys([]);
    message.success("Approved selected applications");
  };

  const deleteApplication = (id: number) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          Add Application
        </Button>

        <Button
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={approveSelected}
        >
          Approve {selectedRowKeys.length}
        </Button>

        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={() => setRejectVisible(true)}
        >
          Reject {selectedRowKeys.length}
        </Button>
      </Space>

      <ApplicationTable
        applications={applications}
        clubs={clubs}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        onEdit={(app) => {
          setEditing(app);
          setVisible(true);
        }}
        onDelete={deleteApplication}
        onHistory={(app) => setHistoryApp(app)}
      />

      <ApplicationFormModal
        visible={visible}
        editing={editing}
        applications={applications}
        setApplications={setApplications}
        clubs={clubs}
        onClose={() => {
          setVisible(false);
          setEditing(null);
        }}
      />

      <RejectModal
        visible={rejectVisible}
        selectedIds={selectedRowKeys}
        applications={applications}
        setApplications={setApplications}
        addHistory={addHistory}
        onClose={() => setRejectVisible(false)}
      />

      <HistoryModal
        visible={!!historyApp}
        application={historyApp}
        histories={histories}
        onClose={() => setHistoryApp(null)}
      />
    </>
  );
};

export default ApplicationTab;