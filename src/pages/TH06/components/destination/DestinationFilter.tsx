import { Select, Row, Col } from "antd"

const { Option } = Select

interface Props {
  onTypeChange: (value: string) => void
  onSortChange: (value: string) => void
}

function DestinationFilter({ onTypeChange, onSortChange }: Props) {
  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>

      <Col xs={24} sm={12} md={6}>
        <Select
          placeholder="Filter by type"
          style={{ width: "100%" }}
          onChange={onTypeChange}
          allowClear
        >
          <Option value="beach">Beach</Option>
          <Option value="mountain">Mountain</Option>
          <Option value="city">City</Option>
        </Select>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Select
          placeholder="Sort by"
          style={{ width: "100%" }}
          onChange={onSortChange}
          allowClear
        >
          <Option value="price">Price</Option>
          <Option value="rating">Rating</Option>
        </Select>
      </Col>

    </Row>
  )
}

export default DestinationFilter