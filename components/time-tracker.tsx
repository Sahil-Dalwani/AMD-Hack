"use client";

import { useEffect, useRef, useState } from "react";

type TimeLog = { id: string; durationMins: number; productive: boolean; createdAt: string };

export function TimeTracker() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLogs = async () => {
    const res = await fetch("/api/timelogs", { cache: "no-store" });
    setLogs(await res.json());
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const start = () => {
    if (running) return;
    setRunning(true);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
    const mins = Math.max(1, Math.round(seconds / 60));
    await fetch("/api/timelogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durationMins: mins, productive: mins >= 25 })
    });
    setSeconds(0);
    fetchLogs();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Time Tracking</h2>
      <p className="mt-1 text-sm text-slate-400">Manual timer + productive/unproductive auto-tagging.</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-lg font-semibold text-white">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</div>
        <button onClick={start} className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white">Start</button>
        <button onClick={stop} className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white">Stop & Save</button>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-slate-300">
        {logs.slice(0, 4).map((log) => (
          <li key={log.id}>• {log.durationMins}m — {log.productive ? "Productive" : "Unproductive"}</li>
        ))}
      </ul>
    </section>
  );
}
