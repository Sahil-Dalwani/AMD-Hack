"use client";

import { useEffect, useState } from "react";

export function NotificationCenter() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/notifications", { cache: "no-store" }).then((r) => r.json()).then(setAlerts);
  }, []);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Smart Notifications</h2>
      <p className="mt-1 text-sm text-slate-400">Priority reminders without notification overload.</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-200">
        {alerts.map((a) => (
          <li key={a} className="rounded-lg border border-white/10 bg-slate-950/60 p-3">🔔 {a}</li>
        ))}
      </ul>
    </section>
  );
}
