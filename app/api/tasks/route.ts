import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { Category, Priority } from "@/lib/types";

export async function GET() {
  return NextResponse.json(db.tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const task = {
    id: crypto.randomUUID(),
    title: String(body.title ?? "Untitled Task"),
    category: (body.category as Category) ?? "Work",
    priority: (body.priority as Priority) ?? "Medium",
    deadline: body.deadline ?? new Date().toISOString(),
    estimateMins: Number(body.estimateMins ?? 30),
    completed: false
  };
  db.tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}
