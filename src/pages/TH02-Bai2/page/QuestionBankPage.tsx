import { Tabs } from "antd";
import { useState } from "react";

import BlocksTab from "../components/BlocksTab";
import SubjectsTab from "../components/SubjectsTab";
import QuestionsTab from "../components/QuestionsTab";
import ExamsTab from "../components/ExamsTab";

import {
  KnowledgeBlock,
  Subject,
  Question,
  Exam,
  ExamStructure
} from "../types/models";

const { TabPane } = Tabs;

export default function QuestionBankPage() {

  const [blocks, setBlocks] = useState<KnowledgeBlock[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [structures] = useState<ExamStructure[]>([]);

  return (
    <Tabs defaultActiveKey="1">

      <TabPane tab="Khối kiến thức" key="1">
        <BlocksTab blocks={blocks} setBlocks={setBlocks} />
      </TabPane>

      <TabPane tab="Môn học" key="2">
        <SubjectsTab subjects={subjects} setSubjects={setSubjects} />
      </TabPane>

      <TabPane tab="Câu hỏi" key="3">
        <QuestionsTab
          questions={questions}
          setQuestions={setQuestions}
          subjects={subjects}
          blocks={blocks}
        />
      </TabPane>

      <TabPane tab="Đề thi" key="4">
        <ExamsTab
          questions={questions}
          exams={exams}
          setExams={setExams}
          structures={structures}
        />
      </TabPane>

    </Tabs>
  );
}