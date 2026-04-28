import React, { useEffect } from 'react';
import {
  Drawer,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import { Goal, GoalFormValues, GoalType, GoalStatus } from '../../types';

const { Option } = Select;

interface Props {
  visible: boolean;
  editingGoal: Goal | null; // null = thêm mới
  onClose: () => void;
  onSubmit: (values: GoalFormValues) => void;
}

const goalTypeOptions: { value: GoalType; label: string }[] = [
  { value: 'WeightLoss', label: 'Giảm cân' },
  { value: 'MuscleGain', label: 'Tăng cơ' },
  { value: 'Endurance', label: 'Cải thiện sức bền' },
  { value: 'Other', label: 'Khác' },
];

const GoalDrawer: React.FC<Props> = ({
  visible,
  editingGoal,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<GoalFormValues & { deadline: moment.Moment }>();
  const isEditing = editingGoal !== null;

  // Điền sẵn dữ liệu cũ khi mở drawer sửa, reset khi mở drawer thêm mới
  useEffect(() => {
    if (visible) {
      if (isEditing && editingGoal) {
        form.setFieldsValue({
          name: editingGoal.name,
          type: editingGoal.type,
          targetValue: editingGoal.targetValue,
          currentValue: editingGoal.currentValue,
          unit: editingGoal.unit,
          deadline: moment(editingGoal.deadline),
          status: editingGoal.status,
        });
      } else {
        form.resetFields();
        // Mặc định cho form thêm mới
        form.setFieldsValue({
          type: 'WeightLoss',
          currentValue: 0,
          unit: 'kg',
          deadline: moment().add(3, 'months'),
          status: 'InProgress' as GoalStatus,
        });
      }
    }
  }, [visible, isEditing, editingGoal, form]);

  const handleOk = async () => {
    try {
      const raw = await form.validateFields();
      const values: GoalFormValues = {
        ...raw,
        deadline: (raw.deadline as any).format('YYYY-MM-DD'),
      };
      onSubmit(values);
    } catch (_) {
      // validateFields đã hiển thị lỗi inline
    }
  };

  return (
    <Drawer
      title={isEditing ? 'Chỉnh sửa mục tiêu' : 'Thêm mục tiêu mới'}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
      destroyOnClose={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              padding: '6px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleOk}
            style={{
              padding: '6px 16px',
              background: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {isEditing ? 'Lưu thay đổi' : 'Thêm'}
          </button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 8 }}
      >
        {/* Tên mục tiêu */}
        <Form.Item
          label="Tên mục tiêu"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên mục tiêu' },
            { max: 100, message: 'Tên không được vượt quá 100 ký tự' },
          ]}
        >
          <Input placeholder="ví dụ: Giảm cân về 70kg" />
        </Form.Item>

        {/* Loại mục tiêu */}
        <Form.Item
          label="Loại mục tiêu"
          name="type"
          rules={[{ required: true, message: 'Vui lòng chọn loại mục tiêu' }]}
        >
          <Select placeholder="Chọn loại">
            {goalTypeOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mục tiêu */}
        <Form.Item
          label="Giá trị mục tiêu"
          name="targetValue"
          rules={[
            { required: true, message: 'Vui lòng nhập giá trị mục tiêu' },
            { type: 'number', min: 0, message: 'Giá trị phải lớn hơn 0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.1}
            placeholder="ví dụ: 70"
          />
        </Form.Item>

        {/* Giá trị hiện tại */}
        <Form.Item
          label="Giá trị hiện tại"
          name="currentValue"
          rules={[
            { required: true, message: 'Vui lòng nhập giá trị hiện tại' },
            { type: 'number', min: 0, message: 'Giá trị phải lớn hơn 0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.1}
            placeholder="ví dụ: 75"
          />
        </Form.Item>

        {/* Đơn vị */}
        <Form.Item
          label="Đơn vị"
          name="unit"
          rules={[{ required: true, message: 'Vui lòng nhập đơn vị' }]}
        >
          <Input placeholder="ví dụ: kg, km, buổi/tháng" maxLength={20} />
        </Form.Item>

        {/* Deadline */}
        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: 'Vui lòng chọn deadline' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày"
          />
        </Form.Item>

        {/* Trạng thái (chỉ khi sửa) */}
        {isEditing && (
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="InProgress">Đang thực hiện</Option>
              <Option value="Achieved">Đã đạt</Option>
              <Option value="Cancelled">Đã hủy</Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Drawer>
  );
};

export default GoalDrawer;
