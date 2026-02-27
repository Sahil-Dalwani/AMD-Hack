import { Dashboard } from "@/components/dashboard";
import { ResearchCopilot } from "@/components/research-copilot";
import { TaskManager } from "@/components/task-manager";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  "Smart Calendar + AI auto scheduling",
  "Time tracking with inactivity detection",
  "Notification intelligence",
  "Weekly AI productivity report",
  "Knowledge hub with smart search"
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="rounded-2xl bg-gradient-to-r from-brand to-violet-500 p-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-widest text-indigo-100">ProdigyOS</p>
            <h1 className="text-3xl font-bold">AI Productivity Operating System</h1>
            <p className="mt-2 max-w-2xl text-indigo-100">
              Eliminate busywork, automate planning, and unlock deep work with one AI-powered workspace for tasks, schedule, research, and weekly performance intelligence.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">✅ {feature}</div>
        ))}
      </section>

      <Dashboard />
      <TaskManager />
      <ResearchCopilot />
    </main>
  );
}
