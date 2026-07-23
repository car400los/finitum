import { NextResponse } from "next/server";
import { getChatSummaries } from "../../../lib/db";

export async function GET() {
  try {
    const summaries = await getChatSummaries();
    return NextResponse.json(summaries);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to load chat summaries." },
      { status: 500 },
    );
  }
}
