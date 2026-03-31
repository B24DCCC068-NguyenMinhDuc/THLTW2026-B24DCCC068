import React from "react";
import { Tabs } from "antd";

import ClubTab from "./components/clubs/ClubTab";
import ApplicationTab from "./components/applications/ApplicationTab";
import MemberTab from "./components/members/MemberTab";
import ReportTab from "./components/reports/ReportTab";

const { TabPane } = Tabs;

interface AppProps {
  clubs: any[];
  setClubs: (clubs: any[]) => void;
  applications: any[];
  setApplications: (applications: any[]) => void;
  histories: any[];
  setHistories: (histories: any[]) => void;
}

const App = ({
  clubs,
  setClubs,
  applications,
  setApplications,
  histories,
  setHistories
}: AppProps) => {

  return (
    <Tabs defaultActiveKey="1">

      <TabPane tab="Clubs" key="1">
        <ClubTab
          clubs={clubs}
          setClubs={setClubs}
          applications={applications}
        />
      </TabPane>

      <TabPane tab="Applications" key="2">
        <ApplicationTab
          clubs={clubs}
          applications={applications}
          setApplications={setApplications}
          histories={histories}
          setHistories={setHistories}
        />
      </TabPane>

      <TabPane tab="Members" key="3">
        <MemberTab
          clubs={clubs}
          applications={applications}
          setApplications={setApplications}
        />
      </TabPane>

      <TabPane tab="Reports" key="4">
        <ReportTab
          clubs={clubs}
          applications={applications}
        />
      </TabPane>

    </Tabs>
  );
};

export default App;