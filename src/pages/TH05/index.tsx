import { useState } from "react";

import App from "./App";

import { Club } from "./types/club";
import { Application } from "./types/application";
import { History } from "./types/history";

import mockClubs from "./data/clubs";
import mockApplications from "./data/applications";
import mockHistories from "./data/histories";

const Root = () => {

  const [clubs, setClubs] = useState<Club[]>(mockClubs);

  const [applications, setApplications] =
    useState<Application[]>(mockApplications);

  const [histories, setHistories] =
    useState<History[]>(mockHistories);

  return (
    <App
      clubs={clubs}
      setClubs={setClubs}

      applications={applications}
      setApplications={setApplications}

      histories={histories}
      setHistories={setHistories}
    />
  );
};

export default Root;
