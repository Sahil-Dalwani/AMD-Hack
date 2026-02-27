import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function POST() {
  const pending = db.tasks.filter((t) => !t.completed).sort((a, b) => {
    const priorityScore = { High: 3, Medium: 2, Low: 1 };
    const p = priorityScore[b.priority] - priorityScore[a.priority];
    if (p !== 0) return p;
    return +new Date(a.deadline) - +new Date(b.deadline);
  });

  const schedule = pending.map((task, index) => ({
    task: task.title,
    start: `${9 + index}:00`,
    durationMins: task.estimateMins,
    rationale: "Higher priority + earlier deadline"
  }));

  return NextResponse.json({
    executionOrder: schedule,
    suggestion: "Protect your top 2 tasks in morning deep-work blocks."
  });
}
