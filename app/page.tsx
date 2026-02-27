import { Dashboard } from "@/components/dashboard";
import { KnowledgeHub } from "@/components/knowledge-hub";
import { NotificationCenter } from "@/components/notification-center";
import { ResearchCopilot } from "@/components/research-copilot";
import { SmartCalendar } from "@/components/smart-calendar";
import { TaskManager } from "@/components/task-manager";
import { ThemeToggle } from "@/components/theme-toggle";
import { TimeTracker } from "@/components/time-tracker";
import { WeeklyReportPreview } from "@/components/weekly-report-preview";

const modules = [
  "Smart Calendar with AI-assisted task slots",
  "Time tracking with productive/unproductive tagging",
  "Notification intelligence with smart alerts",
  "Weekly AI productivity report",
  "Knowledge Hub for notes and insights"
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigo-300">ProdigyOS</p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">AI Productivity Operating System</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
              Fully integrated workspace for tasks, calendar, time tracking, research, notifications, and weekly improvement loops.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {modules.map((m) => (
          <div key={m} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">✅ {m}</div>
        ))}
      </section>

      <Dashboard />
      <div className="grid gap-6 lg:grid-cols-2">
        <TaskManager />
        <SmartCalendar />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TimeTracker />
        <NotificationCenter />
      </div>
      <ResearchCopilot />
      <KnowledgeHub />
      <WeeklyReportPreview />
    </main>
  );
}
