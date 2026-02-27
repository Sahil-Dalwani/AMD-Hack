import { db } from "./store";

export function getDashboardMetrics() {
  const completed = db.tasks.filter((t) => t.completed).length;
  const total = db.tasks.length || 1;
  const productive = db.timeLogs.filter((l) => l.productive).reduce((s, l) => s + l.durationMins, 0);
  const wasted = db.timeLogs.filter((l) => !l.productive).reduce((s, l) => s + l.durationMins, 0);
  const inactivity = Math.max(0, 480 - productive - wasted);
  const consistency = Math.min(100, Math.round((productive / 240) * 100));
  const productivityScore = Math.min(100, Math.round((completed / total) * 45 + (productive / (productive + wasted + 1)) * 55));

  return {
    productivityScore,
    completedTasks: completed,
    totalTasks: db.tasks.length,
    focusMins: productive,
    wastedMins: wasted,
    inactivityMins: inactivity,
    consistencyScore: consistency,
    upcomingDeadlines: db.tasks
      .filter((t) => !t.completed)
      .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline))
      .slice(0, 5)
  };
}

export function weeklyReport() {
  const metrics = getDashboardMetrics();
  const trend = [62, 68, 71, 74, metrics.productivityScore];
  return {
    ...metrics,
    trend,
    strengths: ["Shows consistent deep-work sessions", "Completes high-priority tasks first"],
    weaknesses: ["Late-evening unproductive time spikes", "Personal admin tasks are delayed"],
    recommendations: [
      "Schedule 2×90-minute focus blocks before noon.",
      "Set one break reminder every 75 minutes to avoid fatigue.",
      "Move low-priority errands to Friday batching window."
    ]
  };
}
