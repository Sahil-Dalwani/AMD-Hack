"use client";

import { useState } from "react";

export function ResearchCopilot() {
  const [topic, setTopic] = useState("AI for personalized learning");
  const [content, setContent] = useState("Adaptive systems improve student outcomes through analytics, feedback loops, and dynamic curriculum generation.");
  const [output, setOutput] = useState<null | Record<string, unknown>>(null);

  const run = async () => {
    const res = await fetch("/api/ai/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, content })
    });
    setOutput(await res.json());
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Research Copilot</h2>
      <div className="mt-3 grid gap-2">
        <input className="rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea className="min-h-24 rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={run} className="w-fit rounded bg-brand px-4 py-2 text-white">Generate AI Insights</button>
      </div>
      {output && (
        <pre className="mt-3 overflow-x-auto rounded bg-slate-100 p-3 text-xs dark:bg-slate-800">{JSON.stringify(output, null, 2)}</pre>
      )}
    </section>
  );
}
