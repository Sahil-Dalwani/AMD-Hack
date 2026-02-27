"use client";

import { useEffect, useState } from "react";
import { Category, Priority, Task } from "@/lib/types";

const categories: Category[] = ["Study", "Work", "Health", "Personal"];
const priorities: Priority[] = ["Low", "Medium", "High"];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({ title: "", category: "Work", priority: "Medium", estimateMins: 30 });

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!form.title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        deadline: new Date(Date.now() + 86400000).toISOString()
      })
    });
    setForm({ title: "", category: "Work", priority: "Medium", estimateMins: 30 });
    fetchTasks();
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Smart Task Manager</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <input
          className="rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <select
          className="rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"
          value={form.priority}
          onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
        >
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button onClick={createTask} className="rounded bg-brand px-3 py-2 text-white">
          Add Task
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-slate-500">
                {t.category} • {t.priority} • {t.estimateMins} mins
              </p>
            </div>
            <span className="text-xs text-slate-500">{new Date(t.deadline).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
