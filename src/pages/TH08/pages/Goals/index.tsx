import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Segmented,
  Space,
  Typography,
  Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useAppContext from '../../hooks/useAppContext';
import { Goal, GoalStatus, GoalFormValues } from '../../types';
import GoalCard from './GoalCard';
import GoalDrawer from './GoalDrawer';

const { Title } = Typography;

const Goals: React.FC = () => {
  const { state, addGoal, updateGoal, deleteGoal } = useAppContext();
  const { goals } = state;

  // ── State ─────────────────────────────────────────────────────────────────
  const [filter, setFilter] = useState<GoalStatus | 'All'>('InProgress');
  const [visible, setVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (filter === 'All') return goals;
    return goals.filter((g) => g.status === filter);
  }, [goals, filter]);

  // ── Event Handlers ────────────────────────────────────────────────────────
  const handleAdd = () => {
    setEditingGoal(null);
    setVisible(true);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setVisible(false);
    setEditingGoal(null);
  };

  const handleFormSubmit = (values: GoalFormValues) => {
    if (editingGoal) {
      updateGoal({ ...editingGoal, ...values });
    } else {
      addGoal(values as any);
    }
    handleDrawerClose();
  };

  const handleDelete = (id: string) => {
    deleteGoal(id);
  };

  const handleUpdateValue = (goal: Goal) => {
    updateGoal(goal);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0, marginBottom: 16 }}>
          Quản lý mục tiêu
        </Title>

        {/* Filter + Add button */}
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Segmented<GoalStatus | 'All'>
              options={[
                { label: 'Đang thực hiện', value: 'InProgress' },
                { label: 'Đã đạt', value: 'Achieved' },
                { label: 'Đã hủy', value: 'Cancelled' },
                { label: 'Tất cả', value: 'All' },
              ]}
              value={filter}
              onChange={setFilter}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Thêm mục tiêu
            </Button>
          </Col>
        </Row>
      </div>

      {/* Grid Goals */}
      {filtered.length === 0 ? (
        <Empty description="Chưa có mục tiêu nào" style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((goal) => (
            <Col key={goal.id} xs={24} sm={12} lg={8}>
              <GoalCard
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUpdateValue={handleUpdateValue}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Drawer */}
      <GoalDrawer
        visible={visible}
        editingGoal={editingGoal}
        onClose={handleDrawerClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Goals;
