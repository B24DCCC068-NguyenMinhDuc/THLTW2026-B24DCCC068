import { Card, Button, List } from "antd"
import { Destination } from "../../types/destination"

interface Props {
  day: number
  destinations: Destination[]
  onRemove: (id: number) => void
}

function DayPlanner({ day, destinations, onRemove }: Props) {
  return (
    <Card
      title={`Day ${day}`}
      style={{ marginBottom: 20 }}
    >

      <List
        dataSource={destinations}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                danger
                size="small"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </Button>
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />

    </Card>
  )
}

export default DayPlanner