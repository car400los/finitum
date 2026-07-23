import { NextRequest, NextResponse } from "next/server";
import {
  deleteProject,
  getProjectById,
  updateProjectStatus,
} from "../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const project = await getProjectById(params.id);
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
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { estado } = body;

  if (!estado) {
    return NextResponse.json({ error: "Missing estado." }, { status: 400 });
  }

  try {
    const project = await updateProjectStatus(params.id, estado);
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
  { params }: { params: { id: string } },
) {
  try {
    await deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to delete project." },
      { status: 500 },
    );
  }
}
