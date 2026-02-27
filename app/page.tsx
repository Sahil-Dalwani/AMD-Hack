import { Dashboard } from "@/components/dashboard";
import { ResearchCopilot } from "@/components/research-copilot";
import { TaskManager } from "@/components/task-manager";
import { ThemeToggle } from "@/components/theme-toggle";
import { WeeklyReportPreview } from "@/components/weekly-report-preview";

const pillars = [
  "AI Smart Dashboard + weekly intelligence",
  "Task orchestration with auto-prioritization",
  "Research copilot with keyword + summary pipeline",
  "Deep-work focused planning and execution",
  "Netlify-ready full-stack deployment"
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigo-300">ProdigyOS</p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Your AI Productivity Operating System</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
              Plan smarter, execute deeper, and improve weekly with one integrated workspace for tasks, scheduling,
              time awareness, and research automation.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {pillars.map((p) => (
          <div key={p} className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">✨ {p}</div>
        ))}
      </section>

      <Dashboard />
      <div className="grid gap-6 lg:grid-cols-2">
        <TaskManager />
        <ResearchCopilot />
      </div>
      <WeeklyReportPreview />
    </main>
  );
}
