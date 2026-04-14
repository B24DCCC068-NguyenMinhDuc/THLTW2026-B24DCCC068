import { Row, Col, Typography, InputNumber } from "antd"
import { useState } from "react"
import { destinations } from "../../data/mockData"
import BudgetChart from "../../components/budget/BudgetChart"
import BudgetSummary from "../../components/budget/BudgetSummary"
import BudgetAlert from "../../components/budget/BudgetAlert"

const { Title } = Typography

function BudgetTab() {

  const totalFood = destinations.reduce(
    (sum, d) => sum + d.costFood,
    0
  )

  const totalHotel = destinations.reduce(
    (sum, d) => sum + d.costHotel,
    0
  )

  const totalTransport = destinations.reduce(
    (sum, d) => sum + d.costTransport,
    0
  )

  const total = totalFood + totalHotel + totalTransport

  const [budgetLimit, setBudgetLimit] = useState(300)

  return (
    <div>

      <Title level={4}>Quản lý ngân sách</Title>

      <div style={{ marginBottom: 20 }}>

        Ngân sách tối đa:{" "}
        <InputNumber
          value={budgetLimit}
          onChange={(v) => setBudgetLimit(Number(v))}
        />

      </div>

      <BudgetAlert
        total={total}
        limit={budgetLimit}
      />

      <Row gutter={20}>

        <Col xs={24} md={12}>

          <BudgetChart
            food={totalFood}
            hotel={totalHotel}
            transport={totalTransport}
          />

        </Col>

        <Col xs={24} md={12}>

          <BudgetSummary
            food={totalFood}
            hotel={totalHotel}
            transport={totalTransport}
          />

        </Col>

      </Row>

    </div>
  )
}

export default BudgetTab