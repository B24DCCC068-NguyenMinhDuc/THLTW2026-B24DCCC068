import { Card } from "antd"

interface Props {
  food: number
  hotel: number
  transport: number
}

function BudgetSummary({ food, hotel, transport }: Props) {

  const total = food + hotel + transport

  return (
    <Card title="Chi tiết ngân sách">

      <p>Ăn uống: ${food}</p>
      <p>Lưu trú: ${hotel}</p>
      <p>Di chuyển: ${transport}</p>

      <h3>Tổng: ${total}</h3>

    </Card>
  )
}

export default BudgetSummary