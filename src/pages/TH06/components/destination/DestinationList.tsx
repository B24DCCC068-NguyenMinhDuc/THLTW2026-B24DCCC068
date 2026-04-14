import { Row, Col } from "antd"
import DestinationCard from "./DestinationCard"
import { Destination } from "../../types/destination"

interface Props {
  destinations: Destination[]
}

function DestinationList({ destinations }: Props) {
  return (
    <Row gutter={[16, 16]}>

      {destinations.map((destination) => (
        <Col
          key={destination.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <DestinationCard destination={destination} />
        </Col>
      ))}

    </Row>
  )
}

export default DestinationList