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

export async function PATCH(request: Request) {
  const body = await request.json();
  const id = String(body.id ?? "");
  const task = db.tasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  if (typeof body.completed === "boolean") {
    task.completed = body.completed;
  }

  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing task id" }, { status: 400 });
  }

  const index = db.tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const [removed] = db.tasks.splice(index, 1);
  return NextResponse.json(removed);
}
