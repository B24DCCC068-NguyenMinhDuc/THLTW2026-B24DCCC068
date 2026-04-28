import React from 'react';
import { Card, Empty } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HealthLog } from '../../types';
import { formatDate } from '../../utils/dateHelper';

interface Props {
  healthLogs: HealthLog[];
}

// Custom tooltip để hiển thị ngày và cân nặng rõ ràng
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: 8,
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <p style={{ margin: 0, fontSize: 12, color: '#8c8c8c' }}>{label}</p>
        <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 600, color: '#1890ff' }}>
          {payload[0].value} kg
        </p>
      </div>
    );
  }
  return null;
};

const WeightChart: React.FC<Props> = ({ healthLogs }) => {
  // Sắp xếp theo ngày tăng dần và format data cho recharts
  const sorted = [...healthLogs].sort((a, b) => a.date.localeCompare(b.date));

  const data = sorted.map((log) => ({
    date: formatDate(log.date),
    weight: log.weightKg,
  }));

  if (data.length === 0) {
    return (
      <Card title="Biến động cân nặng" size="small" style={{ height: '100%' }}>
        <Empty description="Chưa có nhật ký chỉ số" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    );
  }

  // Tính domain Y với padding để đường không sát viền
  const weights = data.map((d) => d.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const padding = Math.max((maxW - minW) * 0.3, 1);
  const yMin = parseFloat((minW - padding).toFixed(1));
  const yMax = parseFloat((maxW + padding).toFixed(1));

  // Chỉ hiển thị một số nhãn X nếu có nhiều điểm
  const tickInterval = data.length > 8 ? Math.floor(data.length / 6) : 0;

  return (
    <Card
      title="Biến động cân nặng"
      size="small"
      style={{ height: '100%' }}
      bodyStyle={{ paddingTop: 8 }}
    >
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#8c8c8c' }}
            axisLine={false}
            tickLine={false}
            interval={tickInterval}
          />
          <YAxis
            domain={[yMin, yMax]}
            tick={{ fontSize: 12, fill: '#8c8c8c' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Đường tham chiếu cân nặng hiện tại (điểm cuối) */}
          {data.length > 0 && (
            <ReferenceLine
              y={data[data.length - 1].weight}
              stroke="#52c41a"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          )}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#1890ff"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#1890ff', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#1890ff', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeightChart;