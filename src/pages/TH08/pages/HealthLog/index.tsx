import React, { useMemo, useState } from 'react';
import {
  Card,
  Button,
  Space,
  Input,
  DatePicker,
  Row,
  Col,
  Typography,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import useAppContext from '../../hooks/useAppContext';
import { HealthLog, HealthFormValues } from '../../types';
import HealthTable from './HealthTable';
import HealthFormTable from './HealthFormTable';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const HealthLogPage: React.FC = () => {
  const { state, addHealthLog, updateHealthLog, deleteHealthLog } = useAppContext();
  const { healthLogs } = state;

  // ── State ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState<string>('');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [visible, setVisible] = useState(false);
  const [editingLog, setEditingLog] = useState<HealthLog | null>(null);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...healthLogs];

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const start = dateRange[0].format('YYYY-MM-DD');
      const end = dateRange[1].format('YYYY-MM-DD');
      result = result.filter((h) => h.date >= start && h.date <= end);
    }

    // Search by weight (có thể search theo giá trị cân nặng)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.weightKg.toString().includes(q) ||
          h.heightCm.toString().includes(q) ||
          h.restingHeartRate.toString().includes(q)
      );
    }

    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [healthLogs, search, dateRange]);

  // ── Event Handlers ────────────────────────────────────────────────────────
  const handleAdd = () => {
    setEditingLog(null);
    setVisible(true);
  };

  const handleEdit = (log: HealthLog) => {
    setEditingLog(log);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setEditingLog(null);
  };

  const handleFormSubmit = (values: HealthFormValues) => {
    if (editingLog) {
      updateHealthLog({ ...editingLog, ...values });
    } else {
      addHealthLog(values);
    }
    handleModalClose();
  };

  const handleDelete = (id: string) => {
    deleteHealthLog(id);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>
          Nhật ký chỉ số sức khỏe
        </Title>
        <Typography.Text type="secondary">
          Ghi lại cân nặng, chiều cao, nhịp tim và giấc ngủ hàng ngày
        </Typography.Text>
      </div>

      {/* Filter & Search */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          {/* Search */}
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tìm kiếm theo cân nặng, chiều cao..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>

          {/* Date range picker */}
          <Col xs={24} sm={24} md={12}>
            <RangePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              value={dateRange}
              onChange={(range) => setDateRange(range as any)}
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          </Col>

          {/* Add button */}
          <Col xs={24} sm={24} md={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              block
            >
              Thêm chỉ số
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card>
        <HealthTable
          healthLogs={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Modal */}
      <HealthFormTable
        visible={visible}
        editingLog={editingLog}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default HealthLogPage;
