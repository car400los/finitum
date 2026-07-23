import Link from "next/link";
import type { Project } from "../lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[28px] border border-border bg-surfaceHover p-6 transition hover:-translate-y-0.5 hover:bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-text">{project.nombre}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {project.descripcion}
          </p>
        </div>
        <span className="rounded-full bg-[#3b1c12] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
          {project.estado === "abierto" ? "En ejecución" : "Archivado"}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-[13px] text-muted">
        <span className="rounded-full border border-border px-3 py-1">
          Canales {project.canalCount}
        </span>
        <span className="rounded-full border border-border px-3 py-1">
          Participantes {project.participantes}
        </span>
        <span className="rounded-full border border-border px-3 py-1">
          Archivos {project.archivos}
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={`/project/${project.id}`}
          className="rounded-[22px] border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition hover:bg-surfaceHover"
        >
          Ver proyecto
        </Link>
        <span className="text-xs uppercase tracking-[0.28em] text-muted">
          ID {project.id.slice(-4)}
        </span>
      </div>
    </article>
  );
}
