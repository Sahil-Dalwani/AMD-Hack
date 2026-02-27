import { ResearchDocument, Task, TimeLog } from "./types";

const now = new Date();
const inDays = (d: number) => new Date(now.getTime() + d * 86400000).toISOString();

export const db: {
  tasks: Task[];
  timeLogs: TimeLog[];
  researchDocs: ResearchDocument[];
} = {
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Prepare distributed systems assignment",
      category: "Study",
      priority: "High",
      deadline: inDays(1),
      estimateMins: 120,
      completed: false
    },
    {
      id: crypto.randomUUID(),
      title: "Gym + mobility routine",
      category: "Health",
      priority: "Medium",
      deadline: inDays(0),
      estimateMins: 45,
      completed: true
    }
  ],
  timeLogs: [
    {
      id: crypto.randomUUID(),
      taskId: "",
      durationMins: 95,
      productive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      durationMins: 30,
      productive: false,
      createdAt: new Date().toISOString()
    }
  ],
  researchDocs: []
};
