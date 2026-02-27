import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  return NextResponse.json(db.timeLogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const log = {
    id: crypto.randomUUID(),
    taskId: body.taskId,
    durationMins: Number(body.durationMins ?? 25),
    productive: Boolean(body.productive),
    createdAt: new Date().toISOString()
  };
  db.timeLogs.push(log);
  return NextResponse.json(log, { status: 201 });
}
