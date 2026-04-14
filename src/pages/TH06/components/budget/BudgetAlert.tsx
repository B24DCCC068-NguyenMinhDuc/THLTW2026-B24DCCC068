import { Alert } from "antd"

interface Props {
  total: number
  limit: number
}

function BudgetAlert({ total, limit }: Props) {

  if (total <= limit) return null

  return (
    <Alert
      message="Vượt ngân sách!"
      description={`Chi phí hiện tại ${total}$ đã vượt giới hạn ${limit}$`}
      type="warning"
      showIcon
      style={{ marginBottom: 20 }}
    />
  )
}

export default BudgetAlert