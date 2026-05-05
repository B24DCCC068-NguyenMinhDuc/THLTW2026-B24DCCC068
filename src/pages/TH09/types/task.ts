export type TaskStatus = "todo" | "inprogress" | "done";

export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  priority: Priority;
  status: TaskStatus;
  tags?: string[];
}