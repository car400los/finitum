import { NextRequest, NextResponse } from "next/server";
import { createMessage, getMessagesByChannelId } from "../../../lib/db";

export async function GET(request: NextRequest) {
  const channelId = request.nextUrl.searchParams.get("channelId");
  if (!channelId) {
    return NextResponse.json({ error: "Missing channelId." }, { status: 400 });
  }

  try {
    const messages = await getMessagesByChannelId(channelId);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to load messages." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { canalId, contenido, usuarioId } = body;

  if (!canalId || !contenido || !usuarioId) {
    return NextResponse.json(
      { error: "Missing message information." },
      { status: 400 },
    );
  }

  try {
    const message = await createMessage({ canalId, contenido, usuarioId });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create message." },
      { status: 500 },
    );
  }
}
