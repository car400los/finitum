import { NextRequest, NextResponse } from "next/server";
import {
  deleteProject,
  getProjectById,
  updateProjectStatus,
} from "../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to load project." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const { estado } = body;

  if (!estado) {
    return NextResponse.json({ error: "Missing estado." }, { status: 400 });
  }

  try {
    const project = await updateProjectStatus(id, estado);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to update project." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to delete project." },
      { status: 500 },
    );
  }
}
