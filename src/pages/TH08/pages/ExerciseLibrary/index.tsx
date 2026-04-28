import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Card,
  Space,
  Typography,
  Empty,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import useAppContext from '../../hooks/useAppContext';
import { Exercise, ExerciseFormValues, MuscleGroup, DifficultyLevel } from '../../types';
import ExerciseCard from './ExerciseCard';
import ExerciseDetailModal from './ExerciseDetailModal';
import ExerciseFormModal from './ExerciseFormModal';

const { Option } = Select;
const { Title } = Typography;

const muscleGroupOptions: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];
const difficultyOptions: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];

const ExerciseLibrary: React.FC = () => {
  const { state, addExercise, updateExercise, deleteExercise } = useAppContext();
  const { exercises } = state;

  // ── State ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState<string>('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  // ── Filtering & Searching ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...exercises];

    // Filter by muscle group
    if (selectedMuscleGroup !== 'All') {
      result = result.filter((e) => e.muscleGroup === selectedMuscleGroup);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      result = result.filter((e) => e.difficulty === selectedDifficulty);
    }

    // Search by name & description
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [exercises, search, selectedMuscleGroup, selectedDifficulty]);

  // ── Event Handlers ────────────────────────────────────────────────────────
  const handleViewDetail = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDetailVisible(true);
  };

  const handleAdd = () => {
    setEditingExercise(null);
    setFormVisible(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
    setEditingExercise(null);
  };

  const handleFormSubmit = (values: ExerciseFormValues) => {
    if (editingExercise) {
      updateExercise({ ...editingExercise, ...values });
    } else {
      addExercise(values);
    }
    handleFormClose();
  };

  const handleDelete = (id: string) => {
    deleteExercise(id);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0, marginBottom: 16 }}>
          Thư viện bài tập
        </Title>
        <Typography.Text type="secondary">
          Khám phá và tìm hiểu các bài tập để bổ sung vào lịch tập luyện của bạn
        </Typography.Text>
      </div>

      {/* Filter & Search */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          {/* Search by name */}
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm kiếm bài tập..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>

          {/* Filter by muscle group */}
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={selectedMuscleGroup}
              onChange={setSelectedMuscleGroup}
              placeholder="Chọn nhóm cơ"
            >
              <Option value="All">Tất cả nhóm cơ</Option>
              {muscleGroupOptions.map((mg) => (
                <Option key={mg} value={mg}>
                  {mg}
                </Option>
              ))}
            </Select>
          </Col>

          {/* Filter by difficulty */}
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              placeholder="Chọn mức độ khó"
            >
              <Option value="All">Tất cả mức độ</Option>
              <Option value="Easy">Dễ</Option>
              <Option value="Medium">Trung bình</Option>
              <Option value="Hard">Khó</Option>
            </Select>
          </Col>

          {/* Add button */}
          <Col xs={24} sm={24} md={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              block
            >
              Thêm bài tập
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Grid of Exercise Cards */}
      {filtered.length === 0 ? (
        <Empty description="Chưa có bài tập nào" style={{ marginTop: 40 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((exercise) => (
            <Col key={exercise.id} xs={24} sm={12} lg={8}>
              <ExerciseCard
                exercise={exercise}
                onViewDetail={handleViewDetail}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Detail Modal */}
      <ExerciseDetailModal
        visible={detailVisible}
        exercise={selectedExercise}
        onClose={() => setDetailVisible(false)}
      />

      {/* Form Modal */}
      <ExerciseFormModal
        visible={formVisible}
        editingExercise={editingExercise}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ExerciseLibrary;
