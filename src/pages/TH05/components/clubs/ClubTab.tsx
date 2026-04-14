import React, { useState } from "react";
import { Button } from "antd";

import ClubTable from "./ClubTable";
import ClubFormModal from "./ClubFormModal";
import MemberListModal from "./MemberListModal";

import { Club } from "../../types/club";
import { Application } from "../../types/application";

interface Props {
  clubs: Club[];
  setClubs: (clubs: Club[]) => void;
  applications: Application[];
}

const ClubTab: React.FC<Props> = ({ clubs, setClubs, applications }) => {
  const [visible, setVisible] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);

  const [memberModal, setMemberModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const openAdd = () => {
    setEditingClub(null);
    setVisible(true);
  };

  const openEdit = (club: Club) => {
    setEditingClub(club);
    setVisible(true);
  };

  const deleteClub = (id: number) => {
    setClubs(clubs.filter(c => c.id !== id));
  };

  const openMembers = (club: Club) => {
    setSelectedClub(club);
    setMemberModal(true);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={openAdd}
      >
        Add Club
      </Button>

      <ClubTable
        clubs={clubs}
        onEdit={openEdit}
        onDelete={deleteClub}
        onViewMembers={openMembers}
      />

      <ClubFormModal
        visible={visible}
        editing={editingClub}
        clubs={clubs}
        setClubs={setClubs}
        onClose={() => setVisible(false)}
      />

      <MemberListModal
        visible={memberModal}
        club={selectedClub}
        applications={applications}
        onClose={() => setMemberModal(false)}
      />
    </>
  );
};

export default ClubTab;