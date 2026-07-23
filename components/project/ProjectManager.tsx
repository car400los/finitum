"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "../../lib/types";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProjectStatus,
} from "../../lib/api";

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"abierto" | "cerrado">("abierto");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const stats = useMemo(
    () => ({
      total: projects.length,
      open: projects.filter((project) => project.estado === "abierto").length,
      closed: projects.filter((project) => project.estado === "cerrado").length,
    }),
    [projects],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const project = await createProject({
        nombre: name.trim(),
        descripcion: description.trim(),
        estado: status,
      });

      setProjects((current) => [project, ...current]);
      setName("");
      setDescription("");
      setStatus("abierto");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const toggleProjectStatus = async (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return;

    try {
      setLoading(true);
      setError(null);
      const updated = await updateProjectStatus(
        projectId,
        project.estado === "abierto" ? "cerrado" : "abierto",
      );
      setProjects((current) =>
        current.map((item) => (item.id === projectId ? updated : item)),
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteProject(projectId);
      setProjects((current) => current.filter((item) => item.id !== projectId));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-soft text-text">
        Cargando gestor de proyectos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-card backdrop-blur-xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              Gestión de proyectos
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-text">
              Controla tus proyectos
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              Crea proyectos, cierra casos y conserva datos para generar chats
              después.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-border bg-surfaceHover p-6"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Nuevo proyecto
            </p>
            <div className="mt-4 space-y-4">
              <label className="block text-sm text-text">
                Nombre
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
                  placeholder="Nueva entrega de logística"
                />
              </label>
              <label className="block text-sm text-text">
                Descripción
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-2 w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
                  rows={3}
                  placeholder="Detalles del proyecto y alcance"
                />
              </label>
              <label className="block text-sm text-text">
                Estado
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "abierto" | "cerrado")
                  }
                  className="mt-2 w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  <option value="abierto">Abierto</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-[22px] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Crear proyecto
            </button>
          </form>
        </div>
      </div>

      {error ? (
        <div className="rounded-[28px] border border-red-400 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { label: "Proyectos totales", value: stats.total },
          { label: "Abiertos", value: stats.open },
          { label: "Cerrados", value: stats.closed },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[28px] border border-border bg-surfaceHover p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-muted">
              {item.label}
            </p>
            <p className="mt-4 text-4xl font-semibold text-text">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[28px] border border-border bg-surfaceHover p-6 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-text">
                  {project.nombre}
                </p>
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

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/project/${project.id}`}
                className="rounded-[22px] border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition hover:bg-surfaceHover"
              >
                Ver proyecto
              </Link>
              <button
                type="button"
                onClick={() => toggleProjectStatus(project.id)}
                disabled={loading}
                className="rounded-[22px] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {project.estado === "abierto" ? "Cerrar" : "Reabrir"}
              </button>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                disabled={loading}
                className="rounded-[22px] border border-border bg-surface px-5 py-3 text-sm font-medium text-text transition hover:bg-surfaceHover disabled:cursor-not-allowed disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
