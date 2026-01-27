import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialData: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
  { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
  { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Lọc sản phẩm theo tên (realtime)
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Thêm sản phẩm
  const handleAddProduct = (values: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now(),
      ...values,
    };
    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công');
    form.resetFields();
    setOpen(false);
  };

  // Xóa sản phẩm
  const handleDelete = (id: number) => {
    setProducts(products.filter((item) => item.id !== id));
    message.success('Xóa sản phẩm thành công');
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'STT',
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý sản phẩm</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          style={{ width: 300 }}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button type="primary" onClick={() => setOpen(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        bordered
      />

      <Modal
        title="Thêm sản phẩm"
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Thêm"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              {
                type: 'number',
                min: 1,
                message: 'Giá phải là số dương',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
            />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              {
                type: 'number',
                min: 1,
                message: 'Số lượng phải là số nguyên dương',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
