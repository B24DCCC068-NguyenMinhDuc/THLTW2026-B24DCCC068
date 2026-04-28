import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { Exercise, ExerciseFormValues, MuscleGroup, DifficultyLevel } from '../../types';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  visible: boolean;
  editingExercise: Exercise | null; // null = thêm mới
  onClose: () => void;
  onSubmit: (values: ExerciseFormValues) => void;
}

const muscleGroupOptions: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];
const difficultyOptions: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];

const ExerciseFormModal: React.FC<Props> = ({
  visible,
  editingExercise,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<ExerciseFormValues>();
  const isEditing = editingExercise !== null;

  // Điền sẵn dữ liệu cũ khi mở form sửa, reset khi mở form thêm mới
  useEffect(() => {
    if (visible) {
      if (isEditing && editingExercise) {
        form.setFieldsValue({
          name: editingExercise.name,
          muscleGroup: editingExercise.muscleGroup,
          difficulty: editingExercise.difficulty,
          description: editingExercise.description,
          instructions: editingExercise.instructions,
          caloriesPerHour: editingExercise.caloriesPerHour,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          muscleGroup: 'Chest' as MuscleGroup,
          difficulty: 'Medium' as DifficultyLevel,
          caloriesPerHour: 300,
        });
      }
    }
  }, [visible, isEditing, editingExercise, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (_) {
      // validateFields đã hiển thị lỗi inline
    }
  };

  return (
    <Modal
      title={isEditing ? 'Chỉnh sửa bài tập' : 'Thêm bài tập mới'}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEditing ? 'Lưu thay đổi' : 'Thêm'}
      cancelText="Hủy"
      width={720}
      destroyOnClose={false}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 8 }}
      >
        {/* Tên bài tập */}
        <Form.Item
          label="Tên bài tập"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên bài tập' },
            { max: 100, message: 'Tên không được vượt quá 100 ký tự' },
          ]}
        >
          <Input placeholder="ví dụ: Push-up, Squat" />
        </Form.Item>

        <Row gutter={16}>
          {/* Nhóm cơ */}
          <Col span={12}>
            <Form.Item
              label="Nhóm cơ"
              name="muscleGroup"
              rules={[{ required: true, message: 'Vui lòng chọn nhóm cơ' }]}
            >
              <Select placeholder="Chọn nhóm cơ">
                {muscleGroupOptions.map((mg) => (
                  <Option key={mg} value={mg}>
                    {mg}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Mức độ khó */}
          <Col span={12}>
            <Form.Item
              label="Mức độ khó"
              name="difficulty"
              rules={[{ required: true, message: 'Vui lòng chọn mức độ khó' }]}
            >
              <Select placeholder="Chọn mức độ">
                {difficultyOptions.map((diff) => (
                  <Option key={diff} value={diff}>
                    {diff === 'Easy' ? 'Dễ' : diff === 'Medium' ? 'Trung bình' : 'Khó'}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Mô tả ngắn */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả' },
            { max: 300, message: 'Mô tả không được vượt quá 300 ký tự' },
          ]}
        >
          <TextArea
            rows={2}
            placeholder="Mô tả ngắn về bài tập"
            maxLength={300}
            showCount
          />
        </Form.Item>

        {/* Hướng dẫn thực hiện */}
        <Form.Item
          label="Hướng dẫn chi tiết"
          name="instructions"
          rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn chi tiết' }]}
        >
          <TextArea
            rows={4}
            placeholder="Nhập hướng dẫn từng bước cho bài tập này. Có thể dùng enter để ngắt dòng."
          />
        </Form.Item>

        {/* Calo đốt */}
        <Form.Item
          label="Calo đốt (kcal/giờ)"
          name="caloriesPerHour"
          rules={[
            { required: true, message: 'Vui lòng nhập calo' },
            { type: 'number', min: 0, max: 2000, message: 'Từ 0 đến 2000 kcal/giờ' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            max={2000}
            placeholder="300"
            addonAfter="kcal/giờ"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExerciseFormModal;
