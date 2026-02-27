import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  const pending = db.tasks.filter((t) => !t.completed);
  const staleResearch = pending.find((t) => t.category === "Study");

  const alerts = [
    pending.length > 0 ? `You have ${pending.length} pending tasks. Prioritize the top 2 this morning.` : "All tasks complete. Great consistency today!",
    staleResearch ? `Smart alert: you still have a study task pending (${staleResearch.title}).` : "Research cadence is healthy this week.",
    "Focus reminder: take a 5-minute break every 75 minutes of deep work."
  ];

  return NextResponse.json(alerts);
}
