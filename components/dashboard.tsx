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
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  const suggestSchedule = async () => {
    const res = await fetch("/api/ai/schedule", { method: "POST" });
    const result = await res.json();
    setSchedule(result.suggestion);
  };

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Smart Dashboard</h2>
        <button onClick={suggestSchedule} className="rounded bg-slate-900 px-3 py-2 text-white dark:bg-slate-100 dark:text-slate-900">AI Suggestion</button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        {["Productivity", "Focus", "Wasted", "Consistency"].map((k, i) => (
          <div key={k} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
            <p className="text-sm text-slate-500">{k}</p>
            <p className="text-2xl font-semibold">
              {i === 0 && `${data.productivityScore}/100`}
              {i === 1 && `${data.focusMins}m`}
              {i === 2 && `${data.wastedMins}m`}
              {i === 3 && `${data.consistencyScore}%`}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-brand">{schedule || "Tip: Start with the highest priority task in your first deep-work block."}</p>
      <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
        {data.upcomingDeadlines.map((d) => (
          <li key={d.id}>{d.title} — {new Date(d.deadline).toLocaleDateString()}</li>
        ))}
      </ul>
    </section>
  );
}
