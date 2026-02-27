import { NextResponse } from "next/server";

type Note = { id: string; title: string; content: string; createdAt: string };

const notes: Note[] = [
  {
    id: crypto.randomUUID(),
    title: "Distributed Systems",
    content: "CAP theorem tradeoffs + consensus algorithm revision points.",
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const note: Note = {
    id: crypto.randomUUID(),
    title: String(body.title ?? "Untitled note"),
    content: String(body.content ?? ""),
    createdAt: new Date().toISOString()
  };
  notes.unshift(note);
  return NextResponse.json(note, { status: 201 });
}
