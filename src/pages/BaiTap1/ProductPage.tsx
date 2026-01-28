import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message, Tag, Select, } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const initialData: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Phone', price: 30000000, quantity: 8, },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Phone', price: 22000000, quantity: 20, },
  { id: 4, name: 'iPad Air M2', category: 'Tablet', price: 18000000, quantity: 5, },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12, },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0, },
  { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Tablet', price: 15000000, quantity: 7, },
  { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25, },
];

function getStockStatus(quantity: number): { text: string; color: string } {
  if (quantity === 0) return { text: 'Hết hàng', color: 'red' };
  if (quantity <= 10) return { text: 'Sắp hết', color: 'gold' };
  return { text: 'Còn hàng', color: 'green' };
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleAddProduct = (values: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now(),
      ...values,
    };
    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công');
  };

  const handleEditProduct = (id: number, values: Omit<Product, 'id'>) => {
    const updatedProduct: Product = {
      id,
      ...values,
    };
    setProducts(products.map((item) => (item.id === id ? updatedProduct : item)));
    message.success('Cập nhật sản phẩm thành công');
  };

  const handleSubmit = (values: Omit<Product, 'id'>) => {
    if (editingProduct) {
      handleEditProduct(editingProduct.id, values);
      setEditingProduct(null);
      setOpen(false);
      form.resetFields();
    } else {
      handleAddProduct(values);
      setOpen(false);
      form.resetFields();
    }
  };
  
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
      title: 'Danh mục',
      dataIndex: 'category',
      filters: [
        {
          text: 'Laptop',
          value: 'Laptop',
        },
        {
          text: 'Phone',
          value: 'Phone',
        },
        {
          text: 'Tablet',
          value: 'Tablet',
        },
        {
          text: 'Phụ kiện',
          value: 'Phụ kiện',
        },
        {
          text: 'Other',
          value: 'Other',
        }
      ],
      onFilter: (value, record) => record.category.indexOf(value as string) === 0,
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      render: (_, record) => {
        const { text, color } = getStockStatus(record.quantity);
        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: 'Còn hàng', value: 'Còn hàng' },
        { text: 'Sắp hết', value: 'Sắp hết' },
        { text: 'Hết hàng', value: 'Hết hàng' },
      ],
      onFilter: (value, record) => {
        const {text} = getStockStatus(record.quantity);
        return text === value;
      }
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger style={{ marginRight: 4 }}>
              Xóa
            </Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setEditingProduct(record);
              setOpen(true);
              form.setFieldsValue(record);
            }}
          >
            Sửa
          </Button>
        </>
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

        <Button
          type="primary"
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
        visible={open}
        onCancel={() => {
          setOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingProduct ? 'Hoàn tất' : 'Thêm'}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select>
              <Select.Option value="Laptop">Laptop</Select.Option>
              <Select.Option value="Phone">Phone</Select.Option>
              <Select.Option value="Tablet">Tablet</Select.Option>
              <Select.Option value="Phụ kiện">Phụ kiện</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
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
                min: 0,
                message: 'Số lượng phải là số nguyên không âm',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;