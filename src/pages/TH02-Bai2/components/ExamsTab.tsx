import { Button } from "antd";
import { Question, ExamStructure, Exam } from "../types/models";

interface Props {
  questions: Question[];
  exams: Exam[];
  setExams: (e: Exam[]) => void;
  structures: ExamStructure[];
}

export default function ExamsTab({
  questions,
  exams,
  setExams,
  structures
}: Props) {

  const generateExam = () => {
    const defaultQuantity = 5;
    let selected: Question[] = [];

    for (let rule of structures) {

      const filtered = questions.filter(q =>
        q.blockId === rule.blockId &&
        q.difficulty === rule.difficulty
      );

      if (filtered.length < defaultQuantity) {
        return;
      }

      const shuffled = [...filtered].sort(() => Math.random() - 0.5);

      selected.push(...shuffled.slice(0, rule.quantity));
    }

    const newExam: Exam = {
      id: Date.now(),
      subjectId: 0,
      questions: selected
    };

    setExams([...exams, newExam]);
  };

  return (
    <Button type="primary" onClick={generateExam}>
      Tạo đề thi
    </Button>
  );
}