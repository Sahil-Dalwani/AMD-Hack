"use client";

import { useEffect, useState } from "react";

type Weekly = {
  trend: number[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export function WeeklyReportPreview() {
  const [report, setReport] = useState<Weekly | null>(null);

  useEffect(() => {
    fetch("/api/weekly-report", { cache: "no-store" }).then((r) => r.json()).then(setReport);
  }, []);

  if (!report) return <p className="text-slate-400">Loading weekly report...</p>;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Weekly AI Productivity Report</h2>
      <p className="mt-1 text-sm text-slate-400">Auto-generated insights, strengths, weaknesses, and next-week actions.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs uppercase text-indigo-300">Trend</p>
          <p className="mt-2 text-sm text-slate-300">{report.trend.join(" → ")}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs uppercase text-indigo-300">Strengths</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">{report.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs uppercase text-indigo-300">Recommendations</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">{report.recommendations.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
