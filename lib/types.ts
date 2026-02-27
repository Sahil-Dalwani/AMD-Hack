export type Priority = "Low" | "Medium" | "High";
export type Category = "Study" | "Work" | "Health" | "Personal";

export type Task = {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  deadline: string;
  estimateMins: number;
  completed: boolean;
};

export type TimeLog = {
  id: string;
  taskId?: string;
  durationMins: number;
  productive: boolean;
  createdAt: string;
};

export type ResearchDocument = {
  id: string;
  topic: string;
  content: string;
};
