import React, { useEffect } from "react";
import App from "./App";
import "antd/dist/antd.css";

import { initialTasks } from "./data/mockData";
import { loadTasks, saveTasks } from "./utils/localStorage";

const TH09Page: React.FC = () => {
  useEffect(() => {
    const stored = loadTasks();
    if (!stored.length) {
      saveTasks(initialTasks);
    }
  }, []);

  return <App />;
};

export default TH09Page;