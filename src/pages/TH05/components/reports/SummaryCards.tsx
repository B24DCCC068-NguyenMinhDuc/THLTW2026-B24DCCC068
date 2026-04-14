import React from "react";
import { Card, Col, Row } from "antd";

import { Club } from "../../types/club";
import { Application } from "../../types/application";

interface Props {
  clubs: Club[];
  applications: Application[];
}

const SummaryCards: React.FC<Props> = ({ clubs, applications }) => {

  const pending = applications.filter(a => a.status === "Pending").length;
  const approved = applications.filter(a => a.status === "Approved").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>

      <Col span={6}>
        <Card title="Total Clubs">
          <h2>{clubs.length}</h2>
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Pending Applications">
          <h2>{pending}</h2>
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Approved Applications">
          <h2>{approved}</h2>
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Rejected Applications">
          <h2>{rejected}</h2>
        </Card>
      </Col>

    </Row>
  );
};

export default SummaryCards;