"use client";

import { useEffect, useState } from "react";

type CalendarItem = { id: string; title: string; slot: string; type: string };

export function SmartCalendar() {
  const [items, setItems] = useState<CalendarItem[]>([]);

  useEffect(() => {
    fetch("/api/calendar", { cache: "no-store" }).then((r) => r.json()).then(setItems);
  }, []);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Smart Calendar & Scheduling</h2>
      <p className="mt-1 text-sm text-slate-400">Auto-filled task slots + deep-work and break blocks.</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <div>
              <p className="text-sm text-white">{item.title}</p>
              <p className="text-xs text-slate-400">{item.type}</p>
            </div>
            <span className="text-xs text-indigo-300">{item.slot}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
