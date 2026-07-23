import { NextRequest, NextResponse } from "next/server";
import { createChannel, getChannelsByProjectId } from "../../../lib/db";

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId." }, { status: 400 });
  }

  try {
    const channels = await getChannelsByProjectId(projectId);
    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to load channels." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, nombre, tipo } = body;

  if (!projectId || !nombre || !tipo) {
    return NextResponse.json(
      { error: "Missing channel information." },
      { status: 400 },
    );
  }

  try {
    const channel = await createChannel(projectId, nombre, tipo);
    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create channel." },
      { status: 500 },
    );
  }
}
