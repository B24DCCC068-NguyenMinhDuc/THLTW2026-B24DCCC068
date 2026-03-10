export type Difficulty = "Easy" | "Medium" | "Hard" | "VeryHard";

export interface KnowledgeBlock {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  credits: number;
}

export interface Question {
  id: number;
  subjectId: number;
  blockId: number;
  difficulty: Difficulty;
  content: string;
}

export interface ExamStructure {
  blockId: number;
  difficulty: Difficulty;
  quantity: number;
}

export interface Exam {
  id: number;
  subjectId: number;
  questions: Question[];
}