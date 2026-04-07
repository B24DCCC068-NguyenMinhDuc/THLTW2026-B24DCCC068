import { Card } from "antd"
import { Destination } from "../../types/destination"

interface Props {
  destinations: Destination[]
}

function ItinerarySummary({ destinations }: Props) {

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

  return (
    <Card title="Tổng chi phí">

      <p>Ăn uống: ${totalFood}</p>
      <p>Lưu trú: ${totalHotel}</p>
      <p>Di chuyển: ${totalTransport}</p>

      <h3>Tổng cộng: ${total}</h3>

    </Card>
  )
}

export default ItinerarySummary