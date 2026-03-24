import React from "react";
import { Form, Input, DatePicker, Button, Row, Col } from "antd";

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onSearch}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="diplomaCode" label="Số hiệu">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="serialNumber" label="Số vào sổ">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="studentId" label="MSV">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="name" label="Họ tên">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Tra cứu
      </Button>
    </Form>
  );
};

export default SearchForm;