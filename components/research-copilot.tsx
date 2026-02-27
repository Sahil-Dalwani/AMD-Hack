"use client";

import { useState } from "react";

type CopilotOutput = {
  summary?: string;
  keywords?: string[];
  podcastScript?: string;
};

export function ResearchCopilot() {
  const [topic, setTopic] = useState("AI for personalized learning");
  const [content, setContent] = useState("Adaptive systems improve student outcomes through analytics, feedback loops, and dynamic curriculum generation.");
  const [output, setOutput] = useState<CopilotOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, content })
    });
    setOutput(await res.json());
    setLoading(false);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Research Copilot</h2>
      <p className="mt-1 text-sm text-slate-400">Extract keywords, generate summary, and convert your notes into podcast script.</p>
      <div className="mt-3 grid gap-2">
        <input className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea className="min-h-24 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={run} className="w-fit rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400">{loading ? "Generating..." : "Generate AI Insights"}</button>
      </div>
      {output && (
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <p className="text-xs uppercase text-indigo-300">Summary</p>
            <p className="mt-2 text-sm text-slate-300">{output.summary}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <p className="text-xs uppercase text-indigo-300">Keywords</p>
            <p className="mt-2 text-sm text-slate-300">{output.keywords?.join(", ")}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <p className="text-xs uppercase text-indigo-300">Podcast Script</p>
            <p className="mt-2 text-sm text-slate-300 line-clamp-6">{output.podcastScript}</p>
          </div>
        </div>
      )}
    </section>
  );
}
