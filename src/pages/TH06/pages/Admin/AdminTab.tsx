import { useState } from "react"
import { Button, Modal, Typography, Form } from "antd"
import { destinations as mockData } from "../../data/mockData"
import { Destination } from "../../types/destination"
import AdminDestinationTable from "../../components/admin/AdminDestinationTable"
import AdminDestinationForm from "../../components/admin/AdminDestinationForm"

const { Title } = Typography

function AdminTab() {

  const [data, setData] = useState<Destination[]>(mockData)

  const [visible, setVisible] = useState(false)

  const [editing, setEditing] = useState<Destination | null>(null)

  const [form] = Form.useForm()

  const openAdd = () => {
    setEditing(null)
    form.resetFields()
    setVisible(true)
  }

  const openEdit = (record: Destination) => {
    setEditing(record)
    form.setFieldsValue(record)
    setVisible(true)
  }

  const handleDelete = (id: number) => {
    const filtered = data.filter(d => d.id !== id)
    setData(filtered)
  }

  const handleOk = () => {

    form.validateFields().then(values => {

      if (editing) {

        const updated = data.map(d =>
          d.id === editing.id ? { ...editing, ...values } : d
        )

        setData(updated)

      } else {

        const newItem = {
          id: Date.now(),
          ...values
        }

        setData([...data, newItem])
      }

      setVisible(false)
    })
  }

  return (
    <div>

      <Title level={4}>Quản lý điểm đến</Title>

      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={openAdd}
      >
        Thêm địa điểm
      </Button>

      <AdminDestinationTable
        data={data}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editing ? "Edit Destination" : "Add Destination"}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >

        <AdminDestinationForm
          form={form}
          initialValues={editing || undefined}
        />

      </Modal>

    </div>
  )
}

export default AdminTab