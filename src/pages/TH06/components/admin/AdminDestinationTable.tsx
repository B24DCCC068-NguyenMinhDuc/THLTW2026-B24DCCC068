import { Table, Button, Space } from "antd"
import { Destination } from "../../types/destination"

interface Props {
  data: Destination[]
  onEdit: (record: Destination) => void
  onDelete: (id: number) => void
}

function AdminDestinationTable({
  data,
  onEdit,
  onDelete
}: Props) {

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Location",
      dataIndex: "location"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Price",
      dataIndex: "price"
    },
    {
      title: "Rating",
      dataIndex: "rating"
    },
    {
      title: "Action",
      render: (_: any, record: Destination) => (
        <Space>
          <Button
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Button
            danger
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
    />
  )
}

export default AdminDestinationTable