import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

const DashboardPage: React.FC<Props> = ({ tasks }) => {

  const completed = tasks.filter(t => t.status === "done").length;

  const overdue = tasks.filter(t => {
    if (!t.deadline) return false;
    return new Date(t.deadline) < new Date() && t.status !== "done";
  }).length;

  return (
    <Row gutter={16}>

      <Col span={8}>
        <Card>
          <Statistic title="Total Tasks" value={tasks.length}/>
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic title="Completed" value={completed}/>
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic title="Overdue" value={overdue}/>
        </Card>
      </Col>

    </Row>
  );
};

export default DashboardPage;