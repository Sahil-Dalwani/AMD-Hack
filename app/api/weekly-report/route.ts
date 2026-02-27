import { NextResponse } from "next/server";
import { weeklyReport } from "@/lib/analytics";

export async function GET() {
  return NextResponse.json(weeklyReport());
}
