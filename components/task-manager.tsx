"use client";

import { useEffect, useState } from "react";
import { Category, Priority, Task } from "@/lib/types";

const categories: Category[] = ["Study", "Work", "Health", "Personal"];
const priorities: Priority[] = ["Low", "Medium", "High"];

const priorityTone: Record<Priority, string> = {
  Low: "bg-emerald-500/15 text-emerald-300",
  Medium: "bg-amber-500/15 text-amber-300",
  High: "bg-rose-500/15 text-rose-300"
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Work",
    priority: "Medium",
    estimateMins: 30
  });

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks", { cache: "no-store" });
    setTasks(await res.json());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        deadline: new Date(Date.now() + 86400000).toISOString()
      })
    });
    setForm({ title: "", category: "Work", priority: "Medium", estimateMins: 30 });
    await fetchTasks();
    setLoading(false);
  };

  const toggleComplete = async (task: Task) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: !task.completed })
    });
    fetchTasks();
  };

  const removeTask = async (id: string) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Smart Task Manager</h2>
        <span className="text-sm text-slate-400">{tasks.length} tasks</span>
      </div>

      <div className="grid gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-3 md:grid-cols-4">
        <input
          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <select
          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
          value={form.priority}
          onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
        >
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button
          disabled={loading}
          onClick={createTask}
          className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-3"
          >
            <div>
              <p className={`font-medium ${t.completed ? "text-slate-500 line-through" : "text-white"}`}>{t.title}</p>
              <p className="text-xs text-slate-400">{t.category} • {t.estimateMins} mins • {new Date(t.deadline).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-xs ${priorityTone[t.priority]}`}>{t.priority}</span>
              <button onClick={() => toggleComplete(t)} className="rounded-md border border-white/15 px-2 py-1 text-xs text-slate-200">
                {t.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => removeTask(t.id)} className="rounded-md border border-rose-500/40 px-2 py-1 text-xs text-rose-300">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
