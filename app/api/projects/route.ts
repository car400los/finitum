import { NextRequest, NextResponse } from "next/server";
import { createProject, getProjects } from "../../../lib/db";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to load projects." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nombre, descripcion, estado } = body;

  if (!nombre || !descripcion || !estado) {
    return NextResponse.json(
      { error: "Missing project information." },
      { status: 400 },
    );
  }

  try {
    const project = await createProject({ nombre, descripcion, estado });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create project." },
      { status: 500 },
    );
  }
}
