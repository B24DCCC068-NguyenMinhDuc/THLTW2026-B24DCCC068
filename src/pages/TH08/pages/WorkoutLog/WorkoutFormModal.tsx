import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  DatePicker,
  Select,
  InputNumber,
  Input,
  Radio,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import { Workout, WorkoutFormValues, WorkoutType, WorkoutStatus } from '../../types';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  visible: boolean;
  editingWorkout: Workout | null; // null = thêm mới
  onClose: () => void;
  onSubmit: (values: WorkoutFormValues) => void;
}

const WORKOUT_TYPES: { value: WorkoutType; label: string }[] = [
  { value: 'Cardio',   label: 'Cardio' },
  { value: 'Strength', label: 'Sức mạnh (Strength)' },
  { value: 'Yoga',     label: 'Yoga' },
  { value: 'HIIT',     label: 'HIIT' },
  { value: 'Other',    label: 'Khác' },
];

const WorkoutFormModal: React.FC<Props> = ({
  visible,
  editingWorkout,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<WorkoutFormValues & { date: moment.Moment }>();
  const isEditing = editingWorkout !== null;

  // Điền sẵn dữ liệu cũ khi mở form sửa, reset khi mở form thêm mới
  useEffect(() => {
    if (visible) {
      if (isEditing && editingWorkout) {
        form.setFieldsValue({
          ...editingWorkout,
          date: moment(editingWorkout.date) as any,
        });
      } else {
        form.resetFields();
        // Mặc định cho form thêm mới
        form.setFieldsValue({
          date: moment() as any,
          type: 'Cardio',
          status: 'Completed',
          durationMinutes: 30,
          caloriesBurned: 200,
          notes: '',
        });
      }
    }
  }, [visible, isEditing, editingWorkout, form]);

  const handleOk = async () => {
    try {
      const raw = await form.validateFields();
      const values: WorkoutFormValues = {
        ...raw,
        date: (raw.date as any).format('YYYY-MM-DD'),
      };
      onSubmit(values);
    } catch (_) {
      // validateFields đã hiển thị lỗi inline, không cần xử lý thêm
    }
  };

  return (
    <Modal
      title={isEditing ? 'Chỉnh sửa buổi tập' : 'Thêm buổi tập mới'}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEditing ? 'Lưu thay đổi' : 'Thêm'}
      cancelText="Hủy"
      width={560}
      destroyOnClose={false}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 8 }}
      >
        <Row gutter={16}>
          {/* Ngày tập */}
          <Col span={12}>
            <Form.Item
              label="Ngày tập"
              name="date"
              rules={[{ required: true, message: 'Vui lòng chọn ngày tập' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                disabledDate={(d) => d && d.isAfter(moment(), 'day')}
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </Col>

          {/* Loại bài tập */}
          <Col span={12}>
            <Form.Item
              label="Loại bài tập"
              name="type"
              rules={[{ required: true, message: 'Vui lòng chọn loại bài tập' }]}
            >
              <Select placeholder="Chọn loại">
                {WORKOUT_TYPES.map((t) => (
                  <Option key={t.value} value={t.value}>
                    {t.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Thời lượng */}
          <Col span={12}>
            <Form.Item
              label="Thời lượng (phút)"
              name="durationMinutes"
              rules={[
                { required: true, message: 'Vui lòng nhập thời lượng' },
                { type: 'number', min: 1, max: 600, message: 'Từ 1 đến 600 phút' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={600}
                placeholder="30"
                addonAfter="phút"
              />
            </Form.Item>
          </Col>

          {/* Calo */}
          <Col span={12}>
            <Form.Item
              label="Calo đốt"
              name="caloriesBurned"
              rules={[
                { required: true, message: 'Vui lòng nhập calo' },
                { type: 'number', min: 0, max: 5000, message: 'Từ 0 đến 5000 kcal' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={5000}
                placeholder="200"
                addonAfter="kcal"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Ghi chú */}
        <Form.Item label="Ghi chú" name="notes">
          <TextArea
            rows={2}
            placeholder="Nhập ghi chú về buổi tập (tuỳ chọn)"
            maxLength={300}
            showCount
          />
        </Form.Item>

        {/* Trạng thái */}
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Radio.Group>
            <Radio value={'Completed' as WorkoutStatus}>
              ✅ Hoàn thành
            </Radio>
            <Radio value={'Missed' as WorkoutStatus}>
              ❌ Bỏ lỡ
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkoutFormModal;