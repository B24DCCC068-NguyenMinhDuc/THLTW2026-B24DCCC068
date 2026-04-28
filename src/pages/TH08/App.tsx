import React, { useState } from 'react';
import { Layout, Tabs, Typography } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  HeartOutlined,
  TrophyOutlined,
  BookOutlined,
} from '@ant-design/icons';

import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import HealthLogPage from './pages/HealthLog';
import Goals from './pages/Goals';
import ExerciseLibrary from './pages/ExerciseLibrary';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const TAB_KEYS = {
  DASHBOARD: 'dashboard',
  WORKOUT: 'workout',
  HEALTH: 'health',
  GOALS: 'goals',
  LIBRARY: 'library',
} as const;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_KEYS.DASHBOARD);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Typography.Title
          level={4}
          style={{ margin: 0, color: '#1890ff', whiteSpace: 'nowrap' }}
        >
          💪 FitTracker
        </Typography.Title>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginBottom: 0, marginLeft: 32, flex: 1 }}
          size="large"
        >
          <TabPane
            key={TAB_KEYS.DASHBOARD}
            tab={
              <span>
                <DashboardOutlined />
                Tổng quan
              </span>
            }
          />
          <TabPane
            key={TAB_KEYS.WORKOUT}
            tab={
              <span>
                <CalendarOutlined />
                Nhật ký tập
              </span>
            }
          />
          <TabPane
            key={TAB_KEYS.HEALTH}
            tab={
              <span>
                <HeartOutlined />
                Chỉ số sức khỏe
              </span>
            }
          />
          <TabPane
            key={TAB_KEYS.GOALS}
            tab={
              <span>
                <TrophyOutlined />
                Mục tiêu
              </span>
            }
          />
          <TabPane
            key={TAB_KEYS.LIBRARY}
            tab={
              <span>
                <BookOutlined />
                Thư viện bài tập
              </span>
            }
          />
        </Tabs>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {/* Render tất cả tab nhưng ẩn tab không active — giữ state không bị reset khi đổi tab */}
        <div style={{ display: activeTab === TAB_KEYS.DASHBOARD ? 'block' : 'none' }}>
          <Dashboard />
        </div>
        <div style={{ display: activeTab === TAB_KEYS.WORKOUT ? 'block' : 'none' }}>
          <WorkoutLog />
        </div>
        <div style={{ display: activeTab === TAB_KEYS.HEALTH ? 'block' : 'none' }}>
          <HealthLogPage />
        </div>
        <div style={{ display: activeTab === TAB_KEYS.GOALS ? 'block' : 'none' }}>
          <Goals />
        </div>
        <div style={{ display: activeTab === TAB_KEYS.LIBRARY ? 'block' : 'none' }}>
          <ExerciseLibrary />
        </div>
      </Content>
    </Layout>
  );
};

export default App;