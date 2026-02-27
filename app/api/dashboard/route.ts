import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/lib/analytics";

export async function GET() {
  return NextResponse.json(getDashboardMetrics());
}
