import React from 'react';
import { Table, Tag, Button, Popconfirm, Space, Typography, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Workout, WorkoutType, WorkoutStatus } from '../../types';
import { formatDate } from '../../utils/dateHelper';

interface Props {
  workouts: Workout[];
  loading?: boolean;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

// ── Label maps ────────────────────────────────────────────────────────────────
const typeColorMap: Record<WorkoutType, string> = {
  Cardio:   'blue',
  Strength: 'purple',
  Yoga:     'cyan',
  HIIT:     'red',
  Other:    'default',
};

const typeLabelMap: Record<WorkoutType, string> = {
  Cardio:   'Cardio',
  Strength: 'Sức mạnh',
  Yoga:     'Yoga',
  HIIT:     'HIIT',
  Other:    'Khác',
};

const statusMap: Record<WorkoutStatus, { color: string; label: string }> = {
  Completed: { color: 'success', label: 'Hoàn thành' },
  Missed:    { color: 'error',   label: 'Bỏ lỡ' },
};

// ── Component ─────────────────────────────────────────────────────────────────
const WorkoutTable: React.FC<Props> = ({ workouts, loading, onEdit, onDelete }) => {
  const columns: ColumnsType<Workout> = [
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
      title: 'Loại bài tập',
      dataIndex: 'type',
      key: 'type',
      width: 130,
      render: (type: WorkoutType) => (
        <Tag color={typeColorMap[type]}>{typeLabelMap[type]}</Tag>
      ),
    },
    {
      title: 'Thời lượng',
      dataIndex: 'durationMinutes',
      key: 'durationMinutes',
      width: 110,
      render: (v: number) => `${v} phút`,
      sorter: (a, b) => a.durationMinutes - b.durationMinutes,
    },
    {
      title: 'Calo đốt',
      dataIndex: 'caloriesBurned',
      key: 'caloriesBurned',
      width: 110,
      render: (v: number) => (
        <Typography.Text strong style={{ color: '#ff4d4f' }}>
          {v.toLocaleString('vi-VN')} kcal
        </Typography.Text>
      ),
      sorter: (a, b) => a.caloriesBurned - b.caloriesBurned,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: { showTitle: false },
      render: (notes: string) =>
        notes ? (
          <Tooltip title={notes}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {notes}
            </Typography.Text>
          </Tooltip>
        ) : (
          <Typography.Text type="secondary" disabled>
            —
          </Typography.Text>
        ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: WorkoutStatus) => (
        <Tag color={statusMap[status].color}>{statusMap[status].label}</Tag>
      ),
      filters: [
        { text: 'Hoàn thành', value: 'Completed' },
        { text: 'Bỏ lỡ',      value: 'Missed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_: unknown, record: Workout) => (
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
            title="Xóa buổi tập"
            description="Bạn có chắc muốn xóa buổi tập này không?"
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
    <Table<Workout>
      rowKey="id"
      columns={columns}
      dataSource={workouts}
      loading={loading}
      scroll={{ x: 800 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total) => `Tổng ${total} buổi tập`,
      }}
      size="middle"
    />
  );
};

export default WorkoutTable;