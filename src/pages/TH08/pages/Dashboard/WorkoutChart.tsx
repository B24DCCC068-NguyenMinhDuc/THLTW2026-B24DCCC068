import React from 'react';
import { Card, Empty } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { countByWeekThisMonth } from '../../utils/dateHelper';
import { Workout } from '../../types';

interface Props {
  workouts: Workout[];
}

// Màu bar theo số buổi: ít → nhạt, nhiều → đậm
const getBarColor = (count: number): string => {
  if (count >= 5) return '#1890ff';
  if (count >= 3) return '#40a9ff';
  if (count >= 1) return '#91caff';
  return '#e6f4ff';
};

const WorkoutChart: React.FC<Props> = ({ workouts }) => {
  const data = countByWeekThisMonth(workouts);
  const hasData = data.some((d) => d.count > 0);

  return (
    <Card
      title="Buổi tập theo tuần"
      size="small"
      style={{ height: '100%' }}
      bodyStyle={{ paddingTop: 8 }}
    >
      {!hasData ? (
        <Empty description="Chưa có dữ liệu tháng này" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: '#8c8c8c' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#8c8c8c' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`${value} buổi`, 'Số buổi tập']}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.count)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default WorkoutChart;