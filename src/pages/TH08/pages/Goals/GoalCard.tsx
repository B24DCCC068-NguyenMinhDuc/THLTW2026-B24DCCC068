import React, { useState } from 'react';
import {
  Card,
  Progress,
  Tag,
  Button,
  Space,
  Popconfirm,
  Typography,
  InputNumber,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Goal, GoalType } from '../../types';
import { calcGoalProgress, goalStatusLabel, goalStatusColor } from '../../utils/goalHelper';
import { formatDate } from '../../utils/dateHelper';

interface Props {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onUpdateValue: (goal: Goal) => void;
}

const goalTypeLabel: Record<GoalType, string> = {
  WeightLoss: '📉 Giảm cân',
  MuscleGain: '💪 Tăng cơ',
  Endurance: '⏱️ Cải thiện sức bền',
  Other: '🎯 Khác',
};

const GoalCard: React.FC<Props> = ({ goal, onEdit, onDelete, onUpdateValue }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(goal.currentValue);

  const progress = calcGoalProgress(goal);
  const isDeadlinePassed = new Date(goal.deadline) < new Date();

  const handleSaveValue = () => {
    if (tempValue !== goal.currentValue) {
      onUpdateValue({ ...goal, currentValue: tempValue });
    }
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setTempValue(goal.currentValue);
    setEditing(false);
  };

  // Phần còn lại để đạt được mục tiêu
  const remaining =
    goal.type === 'WeightLoss'
      ? Math.max(0, goal.currentValue - goal.targetValue)
      : Math.max(0, goal.targetValue - goal.currentValue);

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        borderLeft: `4px solid ${
          goal.status === 'InProgress'
            ? '#1890ff'
            : goal.status === 'Achieved'
            ? '#52c41a'
            : '#d9d9d9'
        }`,
      }}
      bodyStyle={{ padding: '16px' }}
    >
      {/* Header: Tên + Loại + Trạng thái */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <Typography.Title level={5} style={{ margin: 0, marginBottom: 4 }}>
            {goal.name}
          </Typography.Title>
          <div>
            <Tag style={{ marginRight: 8 }}>{goalTypeLabel[goal.type]}</Tag>
            <Tag color={goalStatusColor[goal.status]}>{goalStatusLabel[goal.status]}</Tag>
          </div>
        </div>
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(goal)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa mục tiêu"
            description="Bạn có chắc muốn xóa mục tiêu này không?"
            onConfirm={() => onDelete(goal.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      </div>

      {/* Giá trị hiện tại — inline edit */}
      <div style={{ marginBottom: 16, padding: '8px 12px', background: '#fafafa', borderRadius: 6 }}>
        <Row gutter={8} align="middle">
          <Col>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Giá trị hiện tại:
            </Typography.Text>
          </Col>
          <Col>
            {editing ? (
              <Space size={4}>
                <InputNumber
                  value={tempValue}
                  onChange={(v) => setTempValue(v || 0)}
                  step={0.1}
                  style={{ width: 80 }}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={handleSaveValue}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={handleCancelEdit}
                />
              </Space>
            ) : (
              <Typography.Text
                strong
                style={{ fontSize: 14, cursor: 'pointer' }}
                onClick={() => setEditing(true)}
              >
                {goal.currentValue} {goal.unit}
              </Typography.Text>
            )}
          </Col>
        </Row>
      </div>

      {/* Mục tiêu & Giá trị */}
      <Row gutter={16} style={{ marginBottom: 12 }}>
        <Col span={12}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Mục tiêu
          </Typography.Text>
          <div>
            <Typography.Text strong style={{ fontSize: 14, color: '#1890ff' }}>
              {goal.targetValue} {goal.unit}
            </Typography.Text>
          </div>
        </Col>
        <Col span={12}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Còn lại
          </Typography.Text>
          <div>
            <Typography.Text strong style={{ fontSize: 14, color: '#faad14' }}>
              {remaining.toFixed(1)} {goal.unit}
            </Typography.Text>
          </div>
        </Col>
      </Row>

      {/* Progress Bar */}
      <div style={{ marginBottom: 12 }}>
        <Progress
          percent={progress}
          status={
            goal.status === 'Achieved'
              ? 'success'
              : goal.status === 'Cancelled'
              ? 'exception'
              : 'normal'
          }
          strokeColor={
            goal.status === 'Achieved'
              ? '#52c41a'
              : goal.status === 'Cancelled'
              ? '#ff4d4f'
              : '#1890ff'
          }
        />
      </div>

      {/* Deadline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          Deadline:
        </Typography.Text>
        <Typography.Text
          type={isDeadlinePassed && goal.status === 'InProgress' ? 'danger' : 'secondary'}
          style={{ fontSize: 12 }}
        >
          {formatDate(goal.deadline)}
        </Typography.Text>
      </div>
    </Card>
  );
};

export default GoalCard;
