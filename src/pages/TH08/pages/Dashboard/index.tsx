import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Progress, Tooltip, Typography } from 'antd';
import {
  CalendarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import useAppContext from '../../hooks/useAppContext';
import {
  workoutsThisMonth,
  calcStreak,
} from '../../utils/dateHelper';
import { calcGoalProgress } from '../../utils/goalHelper';
import WorkoutChart from './WorkoutChart';
import WeightChart from './WeightChart';
import RecentTimeline from './RecentTimeline';

const { Title } = Typography;

// ─── Stat Card wrapper ────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description?: string;
  extra?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix,
  icon,
  color,
  bgColor,
  description,
  extra,
}) => (
  <Card
    hoverable
    style={{ borderRadius: 12, overflow: 'hidden' }}
    bodyStyle={{ padding: '20px 24px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          {title}
        </Typography.Text>
        <div style={{ marginTop: 6 }}>
          <Statistic
            value={value}
            suffix={suffix}
            valueStyle={{ fontSize: 28, fontWeight: 700, color }}
          />
        </div>
        {description && (
          <Typography.Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
            {description}
          </Typography.Text>
        )}
        {extra}
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          color,
          flexShrink: 0,
          marginLeft: 12,
        }}
      >
        {icon}
      </div>
    </div>
  </Card>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { workouts, healthLogs, goals } = state;

  // ── Tính toán các chỉ số tháng này ──────────────────────────────────────────
  const stats = useMemo(() => {
    const thisMonthWorkouts = workoutsThisMonth(workouts);
    const completedThisMonth = thisMonthWorkouts.filter((w) => w.status === 'Completed');

    // 1. Tổng buổi tập trong tháng (chỉ tính completed)
    const totalSessions = completedThisMonth.length;

    // 2. Tổng calo đốt trong tháng
    const totalCalories = completedThisMonth.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    // 3. Streak ngày tập liên tiếp
    const streak = calcStreak(workouts);

    // 4. Mục tiêu hoàn thành trung bình % — chỉ tính InProgress goals
    const activeGoals = goals.filter((g) => g.status === 'InProgress');
    const avgGoalProgress =
      activeGoals.length === 0
        ? 0
        : Math.round(
            activeGoals.reduce((sum, g) => sum + calcGoalProgress(g), 0) /
              activeGoals.length
          );

    // So sánh calo với tháng trước (đơn giản: lấy trung bình theo số buổi)
    const avgCalPerSession =
      completedThisMonth.length > 0
        ? Math.round(totalCalories / completedThisMonth.length)
        : 0;

    return { totalSessions, totalCalories, streak, avgGoalProgress, avgCalPerSession };
  }, [workouts, goals]);

  // Lấy cân nặng mới nhất để hiển thị phụ
  const latestWeight = useMemo(() => {
    if (healthLogs.length === 0) return null;
    return [...healthLogs].sort((a, b) => b.date.localeCompare(a.date))[0].weightKg;
  }, [healthLogs]);

  const now = new Date();
  const monthName = now.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>
          Tổng quan tháng {monthName}
        </Title>
        <Typography.Text type="secondary">
          Theo dõi tiến trình tập luyện và sức khỏe của bạn
        </Typography.Text>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tổng buổi tập (tháng)"
            value={stats.totalSessions}
            suffix="buổi"
            icon={<CalendarOutlined />}
            color="#1890ff"
            bgColor="#e6f4ff"
            description={`${workoutsThisMonth(workouts).filter(w => w.status === 'Missed').length} buổi bỏ lỡ`}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tổng calo đốt (tháng)"
            value={stats.totalCalories.toLocaleString('vi-VN')}
            suffix="kcal"
            icon={<FireOutlined />}
            color="#ff4d4f"
            bgColor="#fff1f0"
            description={
              stats.avgCalPerSession > 0
                ? `Trung bình ${stats.avgCalPerSession} kcal/buổi`
                : 'Chưa có dữ liệu'
            }
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Streak ngày liên tiếp"
            value={stats.streak}
            suffix="ngày"
            icon={<ThunderboltOutlined />}
            color="#faad14"
            bgColor="#fffbe6"
            description={
              stats.streak >= 7
                ? '🔥 Tuyệt vời! Giữ vững nhé!'
                : stats.streak > 0
                ? 'Tiếp tục chuỗi của bạn!'
                : 'Bắt đầu chuỗi mới hôm nay!'
            }
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Mục tiêu hoàn thành"
            value={stats.avgGoalProgress}
            suffix="%"
            icon={<TrophyOutlined />}
            color="#52c41a"
            bgColor="#f6ffed"
            description={`${goals.filter(g => g.status === 'InProgress').length} mục tiêu đang thực hiện`}
            extra={
              <Progress
                percent={stats.avgGoalProgress}
                size="small"
                showInfo={false}
                strokeColor="#52c41a"
                style={{ marginTop: 8, marginBottom: 0 }}
              />
            }
          />
        </Col>
      </Row>

      {/* ── Biểu đồ ───────────────────────────────────────────────────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={12}>
          <WorkoutChart workouts={workouts} />
        </Col>
        <Col xs={24} md={12}>
          <WeightChart healthLogs={healthLogs} />
        </Col>
      </Row>

      {/* ── Timeline + Weight info ─────────────────────────────────────────────── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <RecentTimeline workouts={workouts} />
        </Col>

        <Col xs={24} md={8}>
          <Card title="Chỉ số hiện tại" size="small" style={{ height: '100%' }}>
            {latestWeight ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Statistic
                  title="Cân nặng mới nhất"
                  value={latestWeight}
                  suffix="kg"
                  valueStyle={{ color: '#1890ff', fontWeight: 700 }}
                  prefix={
                    healthLogs.length >= 2 ? (
                      (() => {
                        const sorted = [...healthLogs].sort((a, b) =>
                          b.date.localeCompare(a.date)
                        );
                        const diff = sorted[0].weightKg - sorted[1].weightKg;
                        return diff < 0 ? (
                          <Tooltip title={`Giảm ${Math.abs(diff).toFixed(1)}kg`}>
                            <ArrowDownOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                          </Tooltip>
                        ) : diff > 0 ? (
                          <Tooltip title={`Tăng ${diff.toFixed(1)}kg`}>
                            <ArrowUpOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
                          </Tooltip>
                        ) : null;
                      })()
                    ) : null
                  }
                />

                {/* Nhịp tim mới nhất */}
                {(() => {
                  const sorted = [...healthLogs].sort((a, b) => b.date.localeCompare(a.date));
                  const latest = sorted[0];
                  return (
                    <>
                      <Statistic
                        title="Nhịp tim lúc nghỉ"
                        value={latest.restingHeartRate}
                        suffix="bpm"
                        valueStyle={{ color: '#ff4d4f', fontWeight: 700 }}
                      />
                      <Statistic
                        title="Giờ ngủ trung bình"
                        value={latest.sleepHours}
                        suffix="giờ"
                        valueStyle={{
                          color: latest.sleepHours >= 7 ? '#52c41a' : '#faad14',
                          fontWeight: 700,
                        }}
                      />
                    </>
                  );
                })()}
              </div>
            ) : (
              <Typography.Text type="secondary">
                Chưa có dữ liệu chỉ số sức khỏe. Hãy thêm vào tab "Chỉ số sức khỏe".
              </Typography.Text>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;