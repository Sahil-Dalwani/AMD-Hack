import { NextResponse } from "next/server";

function normalizeTopic(input: string) {
  const cleaned = input
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(Boolean);
  if (words.length === 0) return "AI for personalized learning";

  const filtered = words.filter((w) => !/^([a-zA-Z])\1{1,}$/.test(w));
  const unique = filtered.filter((w, i) => filtered.findIndex((x) => x.toLowerCase() === w.toLowerCase()) === i);

  if (unique.length < 3) return "AI for personalized learning";

  return unique
    .slice(0, 8)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function extractKeywords(content: string) {
  const words = content
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => w.length >= 5);

  const stop = new Set(["which", "where", "there", "their", "these", "those", "through", "about", "using"]);
  const freq = new Map<string, number>();

  for (const w of words) {
    if (stop.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k]) => k);
}

export async function POST(request: Request) {
  const { topic, content } = await request.json();
  const normalizedTopic = normalizeTopic(String(topic ?? ""));
  const safeContent = String(content ?? "").trim();

  if (!safeContent) {
    return NextResponse.json(
      {
        error: "Content is required for analysis."
      },
      { status: 400 }
    );
  }

  const keywords = extractKeywords(safeContent);
  const top = keywords.slice(0, 4).join(", ") || "learning signals, adaptation, and feedback loops";

  return NextResponse.json({
    topic: normalizedTopic,
    keywords,
    summary: `This brief explains ${normalizedTopic}. It focuses on ${top} and how they improve outcomes through better personalization decisions.`,
    revisionNotes: keywords.map((k, i) => `${i + 1}. Review the role of ${k} in ${normalizedTopic}.`),
    citationDraft: `${normalizedTopic}. (2026). ProdigyOS Research Copilot draft note.`,
    podcastScript: `Welcome to your ProdigyOS recap. Today: ${normalizedTopic}. Key takeaways include ${keywords.join(", ")} and practical ways to apply them this week.`
  });
}
