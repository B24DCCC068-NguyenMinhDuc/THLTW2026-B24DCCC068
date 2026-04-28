import React from 'react';
import {
  Card,
  Tag,
  Button,
  Space,
  Tooltip,
  Typography,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined } from '@ant-design/icons';
import { Exercise, DifficultyLevel, MuscleGroup } from '../../types';

interface Props {
  exercise: Exercise;
  onViewDetail: (exercise: Exercise) => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

const muscleGroupEmoji: Record<MuscleGroup, string> = {
  Chest: '🏋️',
  Back: '🔙',
  Legs: '🦵',
  Shoulders: '💪',
  Arms: '💪',
  Core: '⭐',
  'Full Body': '🌟',
};

const difficultyLabel: Record<DifficultyLevel, { label: string; color: string }> = {
  Easy: { label: 'Dễ', color: 'green' },
  Medium: { label: 'Trung bình', color: 'orange' },
  Hard: { label: 'Khó', color: 'red' },
};

const ExerciseCard: React.FC<Props> = ({ exercise, onViewDetail, onEdit, onDelete }) => {
  return (
    <Card
      hoverable
      style={{ borderRadius: 12, overflow: 'hidden', height: '100%' }}
      bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
      cover={
        <div
          style={{
            height: 140,
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
            color: '#fff',
          }}
        >
          {muscleGroupEmoji[exercise.muscleGroup]}
        </div>
      }
    >
      {/* Tên bài tập */}
      <Typography.Title level={5} style={{ margin: '0 0 8px 0' }} ellipsis={{ rows: 1 }}>
        {exercise.name}
      </Typography.Title>

      {/* Nhóm cơ + Mức độ khó */}
      <div style={{ marginBottom: 12 }}>
        <Tag style={{ marginRight: 4, marginBottom: 4 }} color="blue">
          {exercise.muscleGroup}
        </Tag>
        <Tag
          style={{ marginBottom: 4 }}
          color={difficultyLabel[exercise.difficulty].color}
        >
          {difficultyLabel[exercise.difficulty].label}
        </Tag>
      </div>

      {/* Mô tả ngắn */}
      <Typography.Paragraph
        style={{
          margin: '8px 0',
          fontSize: 12,
          color: '#8c8c8c',
          flex: 1,
        }}
        ellipsis={{ rows: 2 }}
      >
        {exercise.description}
      </Typography.Paragraph>

      {/* Calo */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid #f0f0f0',
          marginBottom: 12,
        }}
      >
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          <FireOutlined style={{ marginRight: 4, color: '#ff4d4f' }} />
          {exercise.caloriesPerHour} kcal/giờ
        </Typography.Text>
      </div>

      {/* Actions */}
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(exercise)}
          style={{ flex: 1 }}
        >
          Chi tiết
        </Button>
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(exercise)}
          />
        </Tooltip>
        <Popconfirm
          title="Xóa bài tập"
          description="Bạn có chắc muốn xóa bài tập này không?"
          onConfirm={() => onDelete(exercise.id)}
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
    </Card>
  );
};

export default ExerciseCard;
