"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Channel, Message, Project } from "../../lib/types";
import {
  getChannelsByProjectId,
  getMessagesByChannelId,
  getProjectById,
} from "../../lib/api";

interface ProjectDetailClientProps {
  projectId: string;
}

export default function ProjectDetailClient({
  projectId,
}: ProjectDetailClientProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProject() {
      try {
        setLoading(true);
        setError(null);
        const project = await getProjectById(projectId);
        if (!active) return;
        setProject(project);

        if (project) {
          const channels = await getChannelsByProjectId(projectId);
          if (!active) return;
          setChannels(channels);
          setSelectedChannelId(channels[0]?.id ?? null);
        }
      } catch (error) {
        if (!active) return;
        setError((error as Error).message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProject();

    return () => {
      active = false;
    };
  }, [projectId]);

  useEffect(() => {
    let active = true;

    async function loadMessages() {
      if (!selectedChannelId) {
        setMessages([]);
        return;
      }

      try {
        setLoadingMessages(true);
        const loadedMessages = await getMessagesByChannelId(selectedChannelId);
        if (!active) return;
        setMessages(loadedMessages);
      } catch (error) {
        if (!active) return;
        setError((error as Error).message);
      } finally {
        if (active) setLoadingMessages(false);
      }
    }

    loadMessages();

    return () => {
      active = false;
    };
  }, [selectedChannelId]);

  const selectedChannel = useMemo(
    () => channels.find((channel) => channel.id === selectedChannelId) ?? null,
    [channels, selectedChannelId],
  );

  const stats = useMemo(
    () => ({
      channels: channels.length,
      participants: project?.participantes ?? 0,
      files: project?.archivos ?? 0,
    }),
    [channels.length, project],
  );

  if (loading) {
    return (
      <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-soft text-text">
        Cargando datos del proyecto...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-soft text-text">
        <p className="text-lg font-semibold">Proyecto no encontrado</p>
        <p className="mt-3 text-sm text-muted">
          Asegúrate de que el proyecto existe o crea uno nuevo desde el panel de
          proyectos.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-flex rounded-[22px] border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition hover:bg-surfaceHover"
        >
          Volver a proyectos
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-card backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              Proyecto
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-text">
              {project.nombre}
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              {project.descripcion} La plataforma separa comunicación de oficina
              y calle mientras mantiene un archivo seguro y auditado.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex rounded-full bg-[#1B1510] px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              {project.estado === "abierto" ? "En ejecución" : "Cerrado"}
            </span>
            <Link
              href="/projects"
              className="rounded-[22px] border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition hover:bg-surfaceHover"
            >
              Volver a proyectos
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Canales", value: stats.channels },
            { label: "Participantes", value: stats.participants },
            { label: "Archivos", value: stats.files },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-border bg-surfaceHover/90 p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-text">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Canales activos
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              {channels.length} canales
            </h2>
          </div>
          <span className="rounded-full bg-accentSoft/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Separados
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <article
              key={channel.id}
              className="rounded-[24px] border border-border bg-surfaceHover/95 p-5 transition hover:-translate-y-0.5 hover:bg-surface"
            >
              <h3 className="text-lg font-semibold text-text">
                {channel.nombre}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {channel.tipo === "oficina"
                  ? "Equipos internos, coordinación y validación de entregas."
                  : "Comunicación rápida para repartidores y técnicos en ruta."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[13px] uppercase tracking-[0.24em] text-muted">
                <span className="rounded-full border border-border px-2 py-1">
                  {channel.mensajes} mensajes
                </span>
                <span className="rounded-full border border-border px-2 py-1">
                  Canal {channel.tipo}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Vista de chat
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              Últimos mensajes
            </h2>
          </div>
          <span className="rounded-full bg-accentSoft/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {loadingMessages ? "Cargando..." : "En vivo"}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {selectedChannel ? (
            messages.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-[24px] border border-border bg-surfaceHover/95 p-5 text-sm leading-7 text-muted"
                >
                  <p className="font-medium text-text">{message.usuarioId}</p>
                  <p className="mt-3">{message.contenido}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-border bg-surfaceHover/95 p-5 text-sm text-muted">
                <p className="font-medium text-text">Sin mensajes</p>
                <p className="mt-3">
                  No hay actividad en el canal seleccionado.
                </p>
              </div>
            )
          ) : (
            <div className="rounded-[24px] border border-border bg-surfaceHover/95 p-5 text-sm text-muted">
              Selecciona un canal en la vista de chat para ver mensajes.
            </div>
          )}
        </div>
        {error ? (
          <div className="mt-6 rounded-[24px] border border-red-400 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>
    </>
  );
}
