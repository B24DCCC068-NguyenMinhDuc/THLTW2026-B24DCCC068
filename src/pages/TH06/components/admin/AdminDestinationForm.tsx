import { Form, Input, InputNumber, Select } from "antd"
import { Destination } from "../../types/destination"

const { Option } = Select

interface Props {
  form: any
  initialValues?: Destination
}

function AdminDestinationForm({ form, initialValues }: Props) {

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >

      <Form.Item
        name="name"
        label="Tên địa điểm"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Địa điểm"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="type"
        label="Loại"
      >
        <Select>
          <Option value="beach">Beach</Option>
          <Option value="mountain">Mountain</Option>
          <Option value="city">City</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="rating"
        label="Rating"
      >
        <InputNumber min={0} max={5} step={0.1} />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image URL"
      >
        <Input />
      </Form.Item>

    </Form>
  )
}

export default AdminDestinationForm