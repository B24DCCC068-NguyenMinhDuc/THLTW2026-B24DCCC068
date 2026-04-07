import { Select } from "antd"
import { Destination } from "../../types/destination"

const { Option } = Select

interface Props {
  destinations: Destination[]
  onSelect: (id: number) => void
}

function DestinationSelector({ destinations, onSelect }: Props) {
  return (
    <Select
      style={{ width: 300 }}
      placeholder="Chọn điểm đến"
      onChange={onSelect}
    >
      {destinations.map((d) => (
        <Option key={d.id} value={d.id}>
          {d.name} ({d.location})
        </Option>
      ))}
    </Select>
  )
}

export default DestinationSelector