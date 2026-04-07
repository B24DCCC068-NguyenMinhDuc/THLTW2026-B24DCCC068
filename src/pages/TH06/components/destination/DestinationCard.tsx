import { Card, Rate, Typography } from "antd"
import { Destination } from "../../types/destination"

const { Text } = Typography

interface Props {
  destination: Destination
}

function DestinationCard({ destination }: Props) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={destination.name}
          src={destination.image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        title={destination.name}
        description={destination.location}
      />

      <div style={{ marginTop: 10 }}>

        <Rate disabled allowHalf defaultValue={destination.rating} />

        <div>
          <Text strong>Price: ${destination.price}</Text>
        </div>

      </div>

    </Card>
  )
}

export default DestinationCard