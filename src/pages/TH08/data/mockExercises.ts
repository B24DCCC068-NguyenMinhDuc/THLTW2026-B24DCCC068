import { Exercise } from '../types';

export const mockExercises: Exercise[] = [
  {
    id: 'e1',
    name: 'Push-up',
    muscleGroup: 'Chest',
    difficulty: 'Easy',
    description: 'Bài tập cơ bản tăng sức mạnh ngực, vai và tay sau.',
    instructions:
      '1. Nằm sấp, tay rộng hơn vai một chút.\n2. Giữ thân người thẳng từ đầu đến gót.\n3. Hạ người xuống cho đến khi ngực gần chạm sàn.\n4. Đẩy người lên về tư thế ban đầu.\n5. Thở ra khi đẩy lên, hít vào khi hạ xuống.\nLưu ý: Giữ core căng, không để hông võng xuống.',
    caloriesPerHour: 350,
  },
  {
    id: 'e2',
    name: 'Pull-up',
    muscleGroup: 'Back',
    difficulty: 'Hard',
    description: 'Bài tập kéo xà phát triển cơ lưng rộng và tay sau.',
    instructions:
      '1. Bám xà ngang, tay rộng hơn vai, lòng tay hướng ra ngoài.\n2. Treo người thẳng đứng, vai kéo xuống.\n3. Kéo người lên cho đến khi cằm vượt qua xà.\n4. Hạ xuống chậm, kiểm soát chuyển động.\n5. Lặp lại.\nLưu ý: Tránh đu lắc người, tập trung vào cơ lưng.',
    caloriesPerHour: 400,
  },
  {
    id: 'e3',
    name: 'Squat',
    muscleGroup: 'Legs',
    difficulty: 'Medium',
    description: 'Bài tập nền tảng phát triển toàn bộ cơ chân và mông.',
    instructions:
      '1. Đứng thẳng, chân rộng bằng vai, mũi chân hơi hướng ra ngoài.\n2. Hạ hông xuống như ngồi ghế, giữ lưng thẳng.\n3. Đầu gối không vượt quá mũi chân.\n4. Hạ đến khi đùi song song với sàn hoặc thấp hơn.\n5. Đứng dậy về tư thế ban đầu.\nLưu ý: Trọng tâm dồn vào gót chân.',
    caloriesPerHour: 420,
  },
  {
    id: 'e4',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    difficulty: 'Medium',
    description: 'Đẩy tạ qua đầu phát triển cơ vai và tay sau.',
    instructions:
      '1. Đứng hoặc ngồi, cầm tạ ngang vai, lòng tay hướng về phía trước.\n2. Đẩy tạ thẳng lên đầu, duỗi hoàn toàn khuỷu tay.\n3. Hạ tạ về vai một cách kiểm soát.\n4. Giữ core căng, không ưỡn lưng quá mức.\nLưu ý: Hít thở đều đặn, không nín thở.',
    caloriesPerHour: 360,
  },
  {
    id: 'e5',
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
    difficulty: 'Easy',
    description: 'Cuộn tạ phát triển cơ tay trước hiệu quả.',
    instructions:
      '1. Đứng thẳng, cầm tạ đôi, lòng tay hướng lên.\n2. Giữ khuỷu tay sát thân, không lắc người.\n3. Cuộn tạ lên đến ngang vai.\n4. Hạ tạ xuống chậm, cảm nhận cơ giãn ra.\n5. Lặp lại với số reps mong muốn.',
    caloriesPerHour: 280,
  },
  {
    id: 'e6',
    name: 'Plank',
    muscleGroup: 'Core',
    difficulty: 'Medium',
    description: 'Giữ tư thế tĩnh tăng sức mạnh cơ lõi và sự ổn định.',
    instructions:
      '1. Nằm sấp, chống tay hoặc khuỷu tay xuống sàn.\n2. Nâng người lên, giữ thân thẳng từ đầu đến gót.\n3. Giữ core căng, không để hông hạ xuống hoặc nhô lên.\n4. Hít thở đều đặn trong suốt thời gian giữ.\n5. Giữ từ 20 giây đến vài phút tùy trình độ.\nLưu ý: Mắt nhìn xuống sàn, cổ thẳng.',
    caloriesPerHour: 300,
  },
  {
    id: 'e7',
    name: 'Burpee',
    muscleGroup: 'Full Body',
    difficulty: 'Hard',
    description: 'Bài tập toàn thân cường độ cao, đốt calo cực tốt.',
    instructions:
      '1. Đứng thẳng.\n2. Hạ người xuống tư thế squat, đặt tay sàn.\n3. Nhảy chân ra sau về tư thế plank.\n4. Thực hiện một lần push-up.\n5. Nhảy chân về tư thế squat.\n6. Bật nhảy lên cao, tay vươn qua đầu.\n7. Hạ xuống và lặp lại.\nLưu ý: Giảm tốc độ nếu cần, ưu tiên kỹ thuật.',
    caloriesPerHour: 600,
  },
  {
    id: 'e8',
    name: 'Deadlift',
    muscleGroup: 'Back',
    difficulty: 'Hard',
    description: 'Nhấc tạ từ sàn — bài tập sức mạnh tổng thể số một.',
    instructions:
      '1. Đứng trước tạ, chân rộng bằng vai.\n2. Gập hông và gối, nắm thanh tạ rộng bằng vai.\n3. Lưng phẳng, ngực hướng về phía trước.\n4. Đẩy chân xuống sàn, kéo tạ lên theo đường thẳng đứng.\n5. Đứng thẳng, siết mông ở đỉnh chuyển động.\n6. Hạ tạ xuống theo đường ngược lại.\nLưu ý: Không bao giờ cong lưng khi nâng tạ nặng.',
    caloriesPerHour: 450,
  },
  {
    id: 'e9',
    name: 'Lunges',
    muscleGroup: 'Legs',
    difficulty: 'Easy',
    description: 'Bài tập chân một bên cải thiện cân bằng và sức mạnh.',
    instructions:
      '1. Đứng thẳng, tay để hông hoặc cầm tạ.\n2. Bước một chân về phía trước một bước dài.\n3. Hạ hông xuống cho đến khi cả hai đầu gối gần 90 độ.\n4. Đầu gối sau không chạm sàn.\n5. Đẩy người lên, đưa chân về vị trí ban đầu.\n6. Đổi bên và lặp lại.',
    caloriesPerHour: 380,
  },
  {
    id: 'e10',
    name: 'Dumbbell Row',
    muscleGroup: 'Back',
    difficulty: 'Medium',
    description: 'Kéo tạ đơn một bên tập trung phát triển cơ lưng giữa.',
    instructions:
      '1. Đặt tay và gối cùng bên lên ghế phẳng.\n2. Cầm tạ bằng tay còn lại, lưng song song với sàn.\n3. Kéo tạ lên phía hông, khuỷu tay gần thân.\n4. Siết cơ lưng ở đỉnh chuyển động.\n5. Hạ tạ xuống chậm, giữ kiểm soát.\n6. Đổi bên và lặp lại.',
    caloriesPerHour: 340,
  },
  {
    id: 'e11',
    name: 'Mountain Climber',
    muscleGroup: 'Core',
    difficulty: 'Medium',
    description: 'Bài tập cardio + core kết hợp, nhịp tim cao.',
    instructions:
      '1. Bắt đầu từ tư thế plank cao (chống tay thẳng).\n2. Kéo đầu gối phải về phía ngực nhanh.\n3. Đổi chân, kéo đầu gối trái về ngực.\n4. Tiếp tục luân phiên nhanh như đang chạy.\n5. Giữ hông thấp, thân người ổn định.\nLưu ý: Hít thở đều, không nín thở.',
    caloriesPerHour: 500,
  },
  {
    id: 'e12',
    name: 'Lateral Raise',
    muscleGroup: 'Shoulders',
    difficulty: 'Easy',
    description: 'Nâng tạ sang ngang cô lập cơ vai giữa.',
    instructions:
      '1. Đứng thẳng, cầm tạ đôi hai bên hông.\n2. Giữ khuỷu tay hơi cong.\n3. Nâng cả hai tạ lên sang ngang cho đến khi ngang vai.\n4. Giữ 1 giây ở đỉnh.\n5. Hạ tạ xuống chậm, kiểm soát.\nLưu ý: Không đung đưa người để tạo đà.',
    caloriesPerHour: 250,
  },
];