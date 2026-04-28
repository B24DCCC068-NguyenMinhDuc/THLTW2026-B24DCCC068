import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import 'antd/dist/antd.min.css';

import { AppProvider, AppState } from './context/AppContext';
import { mockWorkouts } from './data/mockWorkouts';
import { mockHealthLogs } from './data/mockHealthLogs';
import { mockGoals } from './data/mockGoals';
import { mockExercises } from './data/mockExercises';
import App from './App';

// ─────────────────────────────────────────────────────────────────────────────
// ĐÂY LÀ "DATABASE" CỦA ỨNG DỤNG
// Toàn bộ dữ liệu mẫu được khai báo ở đây và truyền xuống qua AppProvider.
// Các component con KHÔNG được import mock data trực tiếp — chỉ đọc qua context.
// ─────────────────────────────────────────────────────────────────────────────
const initialState: AppState = {
  workouts: mockWorkouts,
  healthLogs: mockHealthLogs,
  goals: mockGoals,
  exercises: mockExercises,
};

const TH08: React.FC = () => (
  <ConfigProvider locale={viVN}>
    <AppProvider initialState={initialState}>
      <App />
    </AppProvider>
  </ConfigProvider>
);

export default TH08;