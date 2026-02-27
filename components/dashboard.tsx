"use client";

import { useEffect, useState } from "react";

type DashboardPayload = {
  productivityScore: number;
  completedTasks: number;
  totalTasks: number;
  focusMins: number;
  wastedMins: number;
  inactivityMins: number;
  consistencyScore: number;
  upcomingDeadlines: { id: string; title: string; deadline: string }[];
};

export function Dashboard() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [schedule, setSchedule] = useState<string>("");

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" }).then((r) => r.json()).then(setData);
  }, []);

  const suggestSchedule = async () => {
    const res = await fetch("/api/ai/schedule", { method: "POST" });
    const result = await res.json();
    setSchedule(result.suggestion);
  };

  if (!data) return <p className="text-slate-400">Loading dashboard...</p>;

  const stats = [
    { label: "Productivity", value: `${data.productivityScore}/100` },
    { label: "Focus Time", value: `${data.focusMins}m` },
    { label: "Wasted", value: `${data.wastedMins}m` },
    { label: "Consistency", value: `${data.consistencyScore}%` }
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">AI Smart Dashboard</h2>
          <p className="text-sm text-slate-400">Real-time focus, completion and performance summary.</p>
        </div>
        <button onClick={suggestSchedule} className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400">
          Generate AI Suggestion
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="mb-2 text-sm font-medium text-indigo-300">Smart Suggestion</p>
          <p className="text-sm text-slate-300">{schedule || "Start with one 90-minute deep-work block before noon and batch shallow tasks later."}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="mb-2 text-sm font-medium text-indigo-300">Upcoming Deadlines</p>
          <ul className="space-y-1 text-sm text-slate-300">
            {data.upcomingDeadlines.map((d) => (
              <li key={d.id}>• {d.title} — {new Date(d.deadline).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
