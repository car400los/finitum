"use client";

import { useEffect, useState } from "react";
import { getChatSummaries } from "../lib/api";

export default function ChatOverview() {
  const [summaries, setSummaries] = useState<
    Array<{
      id: string;
      nombre: string;
      proyectoNombre: string;
      ultimoMensaje: string;
      actualizado: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getChatSummaries();
        setSummaries(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-[28px] border border-border bg-surfaceHover p-6 shadow-soft text-text">
        Cargando resúmenes de chat...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-red-400 bg-red-50 p-6 shadow-soft text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {summaries.map((chat) => (
        <article
          key={chat.id}
          className="rounded-[28px] border border-border bg-surfaceHover p-6 shadow-soft transition hover:-translate-y-0.5 hover:bg-surface"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-text">{chat.nombre}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {chat.proyectoNombre}
              </p>
            </div>
            <span className="rounded-full bg-accentSoft/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {chat.actualizado}
            </span>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">
            {chat.ultimoMensaje}
          </p>
        </article>
      ))}
    </div>
  );
}
