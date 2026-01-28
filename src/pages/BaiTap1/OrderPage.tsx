import React, { useMemo, useState } from 'react';
import { Button, Descriptions, Form, Input, InputNumber, message, Modal, Select, Table, Tag, Typography, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

interface OrderProduct {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    products: OrderProduct[];
    totalAmount: number;
    status: 'Chờ xử lý' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';
    createdAt: string; // YYYY-MM-DD
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number; // tồn kho
}

const initialProducts: Product[] = [
    { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
    { id: 2, name: 'iPhone 15 Pro Max', category: 'Phone', price: 30000000, quantity: 8 },
    { id: 3, name: 'Samsung Galaxy S24', category: 'Phone', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', category: 'Tablet', price: 18000000, quantity: 5 },
    { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
    { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
    { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Tablet', price: 15000000, quantity: 7 },
    { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
];

const initialData: Order[] = [
    {
        id: 'DH001',
        customerName: 'Nguyễn Văn A',
        phone: '0912345678',
        address: '123 Nguyễn Huệ, Q1, TP.HCM',
        products: [
            {
                productId: 1,
                productName: 'Laptop Dell XPS 13',
                quantity: 1,
                price: 25000000,
            },
        ],
        totalAmount: 25000000,
        status: 'Chờ xử lý',
        createdAt: '2024-01-15',
    },
];

const { RangePicker } = DatePicker;

const OrderPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [orders, setOrders] = useState<Order[]>(initialData);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);

    const filteredOrders = useMemo(() => {
        return orders.filter((item) => {
            const matchName = item.customerName
                .toLowerCase()
                .includes(searchText.toLowerCase());

            let matchDate = true;
            if (dateRange && dateRange[0] && dateRange[1]) {
                const orderDate = moment(item.createdAt, 'YYYY-MM-DD');
                matchDate = 
                    orderDate.isSameOrAfter(dateRange[0], 'day') &&
                    orderDate.isSameOrBefore(dateRange[1], 'day');
            }

            return matchName && matchDate;
        });
    }, [orders, searchText, dateRange]);

    const [form] = Form.useForm();
    const selectedProductIds = Form.useWatch('productIds', form) as number[] | undefined;

    const selectedProducts = useMemo(() => {
        const ids = selectedProductIds ?? [];
        const map = new Map(products.map((p) => [p.id, p] as const));
        return ids.map((id) => map.get(id)).filter(Boolean) as Product[];
    }, [products, selectedProductIds]);

    const totalAmount = useMemo(() => {
        const ids = selectedProductIds ?? [];
        if (ids.length === 0) return 0;

        const quantities = form.getFieldValue('quantities') as Record<number, number> | undefined;
        const qtyMap = quantities ?? {};

        const priceMap = new Map(products.map((p) => [p.id, p.price] as const));
        return ids.reduce((sum, id) => {
            const qty = Number(qtyMap?.[id] ?? 0);
            const price = priceMap.get(id) ?? 0;
            return sum + qty * price;
        }, 0);
    }, [form, products, selectedProductIds]);

    const handleAddOrder = (values: {
        customerName: string;
        phone: string;
        address: string;
        productIds: number[];
        quantities: Record<number, number>;
    }) => {
        const productMap = new Map(products.map((p) => [p.id, p] as const));

        const orderProducts: OrderProduct[] = values.productIds.map((id) => {
            const p = productMap.get(id);
            return {
                productId: id,
                productName: p?.name ?? 'N/A',
                quantity: Number(values.quantities?.[id] ?? 0),
                price: Number(p?.price ?? 0),
            };
        });

        const newOrder: Order = {
            id: `DH${String(orders.length + 1).padStart(3, '0')}`,
            customerName: values.customerName,
            phone: values.phone,
            address: values.address,
            products: orderProducts,
            totalAmount: orderProducts.reduce((sum, op) => sum + op.quantity * op.price, 0),
            status: 'Chờ xử lý',
            createdAt: moment().format('YYYY-MM-DD'),
        };

        setOrders([newOrder, ...orders]);
        message.success('Tạo đơn hàng thành công');
        setOpenCreate(false);
        form.resetFields();
    };

    const tryUpdateStockForComplete = (order: Order): boolean => {
        const productMap = new Map(products.map((p) => [p.id, p] as const));
        for (const item of order.products) {
            const p = productMap.get(item.productId);
            if (!p) continue;
            if (item.quantity > p.quantity) {
                message.error(`Không đủ tồn kho cho "${p.name}" (còn ${p.quantity})`);
                return false;
            }
        }

        setProducts((prev) =>
            prev.map((p) => {
                const item = order.products.find((x) => x.productId === p.id);
                if (!item) return p;
                return { ...p, quantity: p.quantity - item.quantity };
            }),
        );
        return true;
    };

    const returnStockForCancel = (order: Order) => {
        setProducts((prev) =>
            prev.map((p) => {
                const item = order.products.find((x) => x.productId === p.id);
                if (!item) return p;
                return { ...p, quantity: p.quantity + item.quantity };
            }),
        );
    };

    const handleChangeStatus = (orderId: string, nextStatus: Order['status']) => {
        const current = orders.find((o) => o.id === orderId);
        if (!current) return;
        const prevStatus = current.status;
        if (prevStatus === nextStatus) return;

        // Quy tắc cập nhật tồn kho:
        // - Khi chuyển sang "Hoàn thành": trừ kho (nếu đủ)
        // - Khi chuyển sang "Đã hủy" từ "Hoàn thành": hoàn kho
        // - Nếu rời "Hoàn thành" sang trạng thái khác: hoàn kho (để tránh bị trừ 2 lần)
        if (nextStatus === 'Hoàn thành' && prevStatus !== 'Hoàn thành') {
            const ok = tryUpdateStockForComplete(current);
            if (!ok) return;
        }
        if (prevStatus !== 'Hoàn thành' && nextStatus === 'Hoàn thành') {
            const ok = tryUpdateStockForComplete(current);
            if (!ok) return;
        }
        if (prevStatus === 'Hoàn thành' && nextStatus !== 'Hoàn thành') {
            returnStockForCancel(current);
        }


        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
        message.success('Cập nhật trạng thái thành công');
    };

    const statusColor = (status: Order['status']) => {
        switch (status) {
            case 'Chờ xử lý':
                return 'gold';
            case 'Đang giao':
                return 'blue';
            case 'Hoàn thành':
                return 'green';
            case 'Đã hủy':
                return 'red';
            default:
                return 'default';
        }
    };

    const columns: ColumnsType<Order> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            width: 110,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
        },
        {
            title: 'Số sản phẩm',
            render: (_, record) => record.products.length,
            width: 110,
            align: 'center',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            render: (v: number) => v.toLocaleString(),
            align: 'right',
            width: 140,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 170,
            render: (value: Order['status'], record) => (
                <Select
                    value={value}
                    style={{ width: '100%' }}
                    onChange={(next) => handleChangeStatus(record.id, next)}
                >
                    <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
                    <Select.Option value="Đang giao">Đang giao</Select.Option>
                    <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                    <Select.Option value="Đã hủy">Đã hủy</Select.Option>
                </Select>
            ),
            filters: [
                { text: 'Chờ xử lý', value: 'Chờ xử lý'},
                { text: 'Đang giao', value: 'Đang giao'},
                { text: 'Hoàn thành', value: 'Hoàn thành'},
                { text: 'Đã hủy', value: 'Đã hủy'},
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 120,
        },
        {
            title: 'Thao tác',
            width: 160,
            align: 'center',
            render: (_, record) => (
                <>
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => {
                            setSelectedOrder(record);
                            setOpenDetail(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                    <Tag color={statusColor(record.status)}>{record.status}</Tag>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
                Quản lý đơn hàng
            </Typography.Title>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Input.Search
                    placeholder="Tìm kiếm theo tên khách hàng"
                    style={{ width: 300 }}
                    allowClear
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <RangePicker
                    allowClear
                    format='DD/MM/YYYY'
                    onChange={(values) => setDateRange(values)}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setOpenCreate(true);
                        form.resetFields();
                    }}
                >
                    Tạo đơn hàng mới
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredOrders}
                bordered
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title="Tạo đơn hàng mới"
                visible={openCreate}
                onCancel={() => {
                    setOpenCreate(false);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                okText="Tạo đơn"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddOrder}
                    initialValues={{ productIds: [], quantities: {} }}
                >
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                            {
                                pattern: /^\d{10,11}$/,
                                message: 'Số điện thoại phải gồm 10-11 chữ số',
                            },
                        ]}
                    >
                        <Input inputMode="numeric" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Chọn sản phẩm"
                        name="productIds"
                        rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 sản phẩm' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn nhiều sản phẩm"
                            options={products.map((p) => ({
                                label: `${p.name} - ${p.price.toLocaleString()} (Tồn: ${p.quantity})`,
                                value: p.id,
                                disabled: p.quantity === 0,
                            }))}
                        />
                    </Form.Item>

                    {selectedProducts.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                            <Typography.Text strong>Nhập số lượng đặt</Typography.Text>
                        </div>
                    )}

                    {selectedProducts.map((p) => (
                        <Form.Item
                            key={p.id}
                            label={`${p.name} (Tồn kho: ${p.quantity})`}
                            name={['quantities', p.id]}
                            rules={[
                                { required: true, message: 'Vui lòng nhập số lượng' },
                                {
                                    validator: async (_, value) => {
                                        const v = Number(value);
                                        if (!Number.isFinite(v) || v <= 0) {
                                            throw new Error('Số lượng phải là số dương');
                                        }
                                        if (v > p.quantity) {
                                            throw new Error('Số lượng đặt không được vượt quá tồn kho');
                                        }
                                    },
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min={1} max={p.quantity} />
                        </Form.Item>
                    ))}

                    <Form.Item shouldUpdate>
                        {() => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography.Text strong>Tổng tiền</Typography.Text>
                                <Typography.Text strong>{totalAmount.toLocaleString()} VNĐ</Typography.Text>
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Chi tiết đơn hàng"
                visible={openDetail}
                onCancel={() => {
                    setOpenDetail(false);
                    setSelectedOrder(null);
                }}
                footer={[
                    <Button
                        key="close"
                        onClick={() => {
                            setOpenDetail(false);
                            setSelectedOrder(null);
                        }}
                    >
                        Đóng
                    </Button>,
                ]}
            >
                {selectedOrder ? (
                    <>
                        <Descriptions size="small" column={1} bordered>
                            <Descriptions.Item label="Mã đơn hàng">{selectedOrder.id}</Descriptions.Item>
                            <Descriptions.Item label="Khách hàng">{selectedOrder.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedOrder.phone}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={statusColor(selectedOrder.status)}>{selectedOrder.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">{selectedOrder.createdAt}</Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền">
                                {selectedOrder.totalAmount.toLocaleString()} VNĐ
                            </Descriptions.Item>
                        </Descriptions>

                        <div style={{ marginTop: 16 }}>
                            <Typography.Text strong>Danh sách sản phẩm</Typography.Text>
                            <Table
                                style={{ marginTop: 8 }}
                                size="small"
                                pagination={false}
                                rowKey="productId"
                                dataSource={selectedOrder.products.map((p) => ({
                                    ...p,
                                    subtotal: p.price * p.quantity,
                                }))}
                                columns={[
                                    { title: 'Sản phẩm', dataIndex: 'productName' },
                                    {
                                        title: 'Số lượng',
                                        dataIndex: 'quantity',
                                        width: 90,
                                        align: 'center',
                                    },
                                    {
                                        title: 'Giá',
                                        dataIndex: 'price',
                                        width: 140,
                                        align: 'right',
                                        render: (v: number) => v.toLocaleString(),
                                    },
                                    {
                                        title: 'Thành tiền',
                                        dataIndex: 'subtotal',
                                        width: 140,
                                        align: 'right',
                                        render: (v: number) => v.toLocaleString(),
                                    },
                                ]}
                            />
                        </div>
                    </>
                ) : (
                    <Typography.Text>Không có dữ liệu</Typography.Text>
                )}
            </Modal>
        </div>
    );
}

export default OrderPage;