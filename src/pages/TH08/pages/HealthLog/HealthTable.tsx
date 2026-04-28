import React from 'react';
import { Table, Tag, Button, Popconfirm, Space, Typography, Tooltip, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { HealthLog } from '../../types';
import { calcBmi, bmiCategoryLabel } from '../../utils/bmiHelper';
import { formatDate } from '../../utils/dateHelper';

interface Props {
  healthLogs: HealthLog[];
  loading?: boolean;
  onEdit: (log: HealthLog) => void;
  onDelete: (id: string) => void;
}

const HealthTable: React.FC<Props> = ({ healthLogs, loading, onEdit, onDelete }) => {
  const columns: ColumnsType<HealthLog> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 110,
      render: (date: string) => formatDate(date),
      sorter: (a, b) => a.date.localeCompare(b.date),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Cân nặng',
      dataIndex: 'weightKg',
      key: 'weightKg',
      width: 110,
      render: (v: number) => (
        <Typography.Text strong style={{ color: '#1890ff' }}>
          {v} kg
        </Typography.Text>
      ),
      sorter: (a, b) => a.weightKg - b.weightKg,
    },
    {
      title: 'Chiều cao',
      dataIndex: 'heightCm',
      key: 'heightCm',
      width: 110,
      render: (v: number) => `${v} cm`,
      sorter: (a, b) => a.heightCm - b.heightCm,
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
      width: 140,
      render: (_: any, record: HealthLog) => {
        const bmi = calcBmi(record.weightKg, record.heightCm);
        return (
          <Tooltip title={bmiCategoryLabel[bmi.category]}>
            <Tag color={bmi.color} style={{ fontSize: 12, fontWeight: 600 }}>
              {bmi.value} — {bmiCategoryLabel[bmi.category]}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Nhịp tim lúc nghỉ',
      dataIndex: 'restingHeartRate',
      key: 'restingHeartRate',
      width: 130,
      render: (v: number) => `${v} bpm`,
      sorter: (a, b) => a.restingHeartRate - b.restingHeartRate,
    },
    {
      title: 'Giờ ngủ',
      dataIndex: 'sleepHours',
      key: 'sleepHours',
      width: 100,
      render: (v: number) => `${v} giờ`,
      sorter: (a, b) => a.sleepHours - b.sleepHours,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_: unknown, record: HealthLog) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa chỉ số sức khỏe"
            description="Bạn có chắc muốn xóa chỉ số này không?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table<HealthLog>
      rowKey="id"
      columns={columns}
      dataSource={healthLogs}
      loading={loading}
      scroll={{ x: 1000 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total) => `Tổng ${total} bản ghi`,
      }}
      size="middle"
    />
  );
};

export default HealthTable;
