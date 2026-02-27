"use client";

import { useEffect, useState } from "react";

type Note = { id: string; title: string; content: string };

export function KnowledgeHub() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("/api/notes", { cache: "no-store" });
    setNotes(await res.json());
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title.trim()) return;
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Knowledge Hub</h2>
      <p className="mt-1 text-sm text-slate-400">Store notes, insights, and project summaries in one place.</p>
      <div className="mt-3 grid gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Quick summary" className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white" />
        <button onClick={addNote} className="w-fit rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white">Add Note</button>
      </div>
      <ul className="mt-3 space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
            <p className="text-sm font-medium text-white">{n.title}</p>
            <p className="text-xs text-slate-300">{n.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
