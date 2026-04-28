import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import { HealthLog, HealthFormValues } from '../../types';

interface Props {
  visible: boolean;
  editingLog: HealthLog | null; // null = thêm mới
  onClose: () => void;
  onSubmit: (values: HealthFormValues) => void;
}

const HealthFormTable: React.FC<Props> = ({
  visible,
  editingLog,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<HealthFormValues & { date: moment.Moment }>();
  const isEditing = editingLog !== null;

  // Điền sẵn dữ liệu cũ khi mở form sửa, reset khi mở form thêm mới
  useEffect(() => {
    if (visible) {
      if (isEditing && editingLog) {
        form.setFieldsValue({
          ...editingLog,
          date: moment(editingLog.date) as any,
        });
      } else {
        form.resetFields();
        // Mặc định cho form thêm mới — hôm nay
        form.setFieldsValue({
          date: moment() as any,
          weightKg: 70,
          heightCm: 175,
          restingHeartRate: 65,
          sleepHours: 8,
        });
      }
    }
  }, [visible, isEditing, editingLog, form]);

  const handleOk = async () => {
    try {
      const raw = await form.validateFields();
      const values: HealthFormValues = {
        ...raw,
        date: (raw.date as any).format('YYYY-MM-DD'),
      };
      onSubmit(values);
    } catch (_) {
      // validateFields đã hiển thị lỗi inline
    }
  };

  return (
    <Modal
      title={isEditing ? 'Chỉnh sửa chỉ số sức khỏe' : 'Thêm chỉ số sức khỏe'}
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
        {/* Ngày */}
        <Form.Item
          label="Ngày"
          name="date"
          rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            disabledDate={(d) => d && d.isAfter(moment(), 'day')}
            placeholder="Chọn ngày"
          />
        </Form.Item>

        <Row gutter={16}>
          {/* Cân nặng */}
          <Col span={12}>
            <Form.Item
              label="Cân nặng (kg)"
              name="weightKg"
              rules={[
                { required: true, message: 'Vui lòng nhập cân nặng' },
                { type: 'number', min: 20, max: 300, message: 'Từ 20 đến 300 kg' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={20}
                max={300}
                step={0.1}
                placeholder="70"
                addonAfter="kg"
              />
            </Form.Item>
          </Col>

          {/* Chiều cao */}
          <Col span={12}>
            <Form.Item
              label="Chiều cao (cm)"
              name="heightCm"
              rules={[
                { required: true, message: 'Vui lòng nhập chiều cao' },
                { type: 'number', min: 100, max: 250, message: 'Từ 100 đến 250 cm' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={100}
                max={250}
                placeholder="175"
                addonAfter="cm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Nhịp tim lúc nghỉ */}
          <Col span={12}>
            <Form.Item
              label="Nhịp tim lúc nghỉ (bpm)"
              name="restingHeartRate"
              rules={[
                { required: true, message: 'Vui lòng nhập nhịp tim' },
                { type: 'number', min: 40, max: 120, message: 'Từ 40 đến 120 bpm' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={40}
                max={120}
                placeholder="65"
                addonAfter="bpm"
              />
            </Form.Item>
          </Col>

          {/* Giờ ngủ */}
          <Col span={12}>
            <Form.Item
              label="Giờ ngủ"
              name="sleepHours"
              rules={[
                { required: true, message: 'Vui lòng nhập giờ ngủ' },
                { type: 'number', min: 0, max: 24, message: 'Từ 0 đến 24 giờ' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={24}
                step={0.5}
                placeholder="8"
                addonAfter="giờ"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default HealthFormTable;
