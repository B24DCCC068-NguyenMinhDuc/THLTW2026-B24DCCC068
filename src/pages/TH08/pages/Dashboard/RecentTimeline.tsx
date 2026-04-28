import React from 'react';
import { Card, Timeline, Tag, Typography, Empty } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { Workout, WorkoutType } from '../../types';
import { formatDate } from '../../utils/dateHelper';

interface Props {
  workouts: Workout[];
}

// Màu tag cho từng loại bài tập
const typeColorMap: Record<WorkoutType, string> = {
  Cardio: 'blue',
  Strength: 'purple',
  Yoga: 'cyan',
  HIIT: 'red',
  Other: 'default',
};

// Nhãn tiếng Việt
const typeLabelMap: Record<WorkoutType, string> = {
  Cardio: 'Cardio',
  Strength: 'Sức mạnh',
  Yoga: 'Yoga',
  HIIT: 'HIIT',
  Other: 'Khác',
};

const RecentTimeline: React.FC<Props> = ({ workouts }) => {
  // Lấy 5 buổi tập gần nhất, sắp xếp theo ngày giảm dần
  const recent = [...workouts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <Card title="5 buổi tập gần nhất" size="small" style={{ height: '100%' }}>
        <Empty description="Chưa có buổi tập nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    );
  }

  return (
    <Card
      title="5 buổi tập gần nhất"
      size="small"
      style={{ height: '100%' }}
      bodyStyle={{ paddingTop: 12 }}
    >
      <Timeline>
        {recent.map((workout) => {
          const isCompleted = workout.status === 'Completed';

          return (
            <Timeline.Item
              key={workout.id}
              color={isCompleted ? 'blue' : 'red'}
              dot={
                isCompleted ? (
                  <CheckCircleOutlined style={{ fontSize: 16, color: '#1890ff' }} />
                ) : (
                  <CloseCircleOutlined style={{ fontSize: 16, color: '#ff4d4f' }} />
                )
              }
            >
              <div style={{ marginBottom: 2 }}>
                <Typography.Text strong style={{ marginRight: 8 }}>
                  {formatDate(workout.date)}
                </Typography.Text>
                <Tag color={typeColorMap[workout.type]} style={{ marginRight: 4 }}>
                  {typeLabelMap[workout.type]}
                </Tag>
                {!isCompleted && (
                  <Tag color="error">Bỏ lỡ</Tag>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 2 }}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  <ThunderboltOutlined style={{ marginRight: 3, color: '#faad14' }} />
                  {workout.durationMinutes} phút
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  <FireOutlined style={{ marginRight: 3, color: '#ff4d4f' }} />
                  {workout.caloriesBurned} kcal
                </Typography.Text>
              </div>

              {workout.notes && (
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: 12, display: 'block', marginTop: 2, fontStyle: 'italic' }}
                >
                  {workout.notes}
                </Typography.Text>
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Card>
  );
};

export default RecentTimeline;