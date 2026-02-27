import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  const pending = db.tasks.filter((t) => !t.completed).slice(0, 5);
  const baseHour = 9;

  const items = pending.map((task, i) => ({
    id: task.id,
    title: task.title,
    slot: `${baseHour + i}:00 - ${baseHour + i + 1}:00`,
    type: "Task Block"
  }));

  const extras = [
    { id: "focus", title: "Deep Work Session", slot: "14:00 - 15:30", type: "Focus" },
    { id: "break", title: "Recovery Break", slot: "15:30 - 15:45", type: "Break" }
  ];

  return NextResponse.json([...items, ...extras]);
}
