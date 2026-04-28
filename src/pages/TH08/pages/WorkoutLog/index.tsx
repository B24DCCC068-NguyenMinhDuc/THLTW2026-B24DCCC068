import React, { useMemo, useState } from 'react';
import {
  Card,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import useAppContext from '../../hooks/useAppContext';
import { Workout, WorkoutType, WorkoutFormValues } from '../../types';
import WorkoutTable from './WorkoutTable';
import WorkoutFormModal from './WorkoutFormModal';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const WorkoutLog: React.FC = () => {
  const { state, addWorkout, updateWorkout, deleteWorkout } = useAppContext();
  const { workouts } = state;

  // ── State ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<WorkoutType | 'All'>('All');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [visible, setVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  // ── Filtering & Searching ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...workouts];

    // Filter by type
    if (selectedType !== 'All') {
      result = result.filter((w) => w.type === selectedType);
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].format('YYYY-MM-DD');
      const end = dateRange[1].format('YYYY-MM-DD');
      result = result.filter((w) => w.date >= start && w.date <= end);
    }

    // Search by type (name) — trong này search theo loại bài tập
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.type.toLowerCase().includes(q) ||
          w.notes.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [workouts, search, selectedType, dateRange]);

  // ── Event Handlers ────────────────────────────────────────────────────────
  const handleAdd = () => {
    setEditingWorkout(null);
    setVisible(true);
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setEditingWorkout(null);
  };

  const handleFormSubmit = (values: WorkoutFormValues) => {
    if (editingWorkout) {
      updateWorkout({ ...editingWorkout, ...values });
    } else {
      addWorkout(values);
    }
    handleModalClose();
  };

  const handleDelete = (id: string) => {
    deleteWorkout(id);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>
          Nhật ký tập luyện
        </Title>
        <Typography.Text type="secondary">
          Ghi lại và theo dõi các buổi tập của bạn
        </Typography.Text>
      </div>

      {/* Filter & Search */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          {/* Search by type/notes */}
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm kiếm theo loại, ghi chú..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>

          {/* Filter by type */}
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Chọn loại bài tập"
            >
              <Option value="All">Tất cả loại</Option>
              <Option value="Cardio">Cardio</Option>
              <Option value="Strength">Sức mạnh</Option>
              <Option value="Yoga">Yoga</Option>
              <Option value="HIIT">HIIT</Option>
              <Option value="Other">Khác</Option>
            </Select>
          </Col>

          {/* Date range picker */}
          <Col xs={24} sm={24} md={8}>
            <RangePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              value={dateRange}
              onChange={(range) => setDateRange(range as any)}
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          </Col>

          {/* Add button */}
          <Col xs={24} sm={24} md={4} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              block
            >
              Thêm buổi tập
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <WorkoutTable
          workouts={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Modal */}
      <WorkoutFormModal
        visible={visible}
        editingWorkout={editingWorkout}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default WorkoutLog;
