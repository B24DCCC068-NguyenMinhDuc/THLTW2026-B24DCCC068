import React from 'react';
import { Modal, Divider, Typography, Button, Space, Tag } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { Exercise, DifficultyLevel, MuscleGroup } from '../../types';

interface Props {
  visible: boolean;
  exercise: Exercise | null;
  onClose: () => void;
}

const muscleGroupLabel: Record<MuscleGroup, string> = {
  Chest: 'Ngực',
  Back: 'Lưng',
  Legs: 'Chân',
  Shoulders: 'Vai',
  Arms: 'Tay',
  Core: 'Lõi',
  'Full Body': 'Toàn thân',
};

const difficultyLabel: Record<DifficultyLevel, { label: string; color: string }> = {
  Easy: { label: 'Dễ', color: 'green' },
  Medium: { label: 'Trung bình', color: 'orange' },
  Hard: { label: 'Khó', color: 'red' },
};

const ExerciseDetailModal: React.FC<Props> = ({ visible, exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <Modal
      title={exercise.name}
      visible={visible}
      onCancel={onClose}
      width={640}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      {/* Thông tin cơ bản */}
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Tag color="blue">{muscleGroupLabel[exercise.muscleGroup]}</Tag>
          <Tag color={difficultyLabel[exercise.difficulty].color}>
            {difficultyLabel[exercise.difficulty].label}
          </Tag>
          <Tag icon={<FireOutlined />}>{exercise.caloriesPerHour} kcal/giờ</Tag>
        </Space>
      </div>

      {/* Mô tả */}
      <Divider>Mô tả</Divider>
      <Typography.Paragraph style={{ fontSize: 14, lineHeight: 1.6 }}>
        {exercise.description}
      </Typography.Paragraph>

      {/* Hướng dẫn chi tiết */}
      <Divider>Hướng dẫn thực hiện</Divider>
      <Typography.Paragraph
        style={{
          fontSize: 13,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          color: '#595959',
        }}
      >
        {exercise.instructions}
      </Typography.Paragraph>
    </Modal>
  );
};

export default ExerciseDetailModal;
