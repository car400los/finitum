"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Channel, Message } from "../../lib/types";
import {
  createChannel,
  createMessage,
  getChannelsByProjectId,
  getMessagesByChannelId,
} from "../../lib/api";

const CURRENT_USER_ID = "usuario-01";

interface ProjectChatManagerProps {
  projectId: string;
}

export function ProjectChatManager({ projectId }: ProjectChatManagerProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<
    "oficina" | "calle" | "general"
  >("oficina");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadChannels() {
      try {
        setLoadingChannels(true);
        setError(null);
        const loadedChannels = await getChannelsByProjectId(projectId);
        if (!active) return;
        setChannels(loadedChannels);
        setSelectedChannelId((prev) => prev ?? loadedChannels[0]?.id ?? null);
      } catch (error) {
        if (!active) return;
        setError((error as Error).message);
      } finally {
        if (active) setLoadingChannels(false);
      }
    }

    loadChannels();

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

  const handleCreateChannel = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newChannelName.trim()) return;

    try {
      setError(null);
      const created = await createChannel({
        projectId,
        nombre: newChannelName.trim(),
        tipo: newChannelType,
      });
      setChannels((current) => [...current, created]);
      setSelectedChannelId(created.id);
      setNewChannelName("");
      setNewChannelType("oficina");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedChannel || !messageText.trim()) return;

    try {
      setError(null);
      const message = await createMessage({
        canalId: selectedChannel.id,
        contenido: messageText.trim(),
        usuarioId: CURRENT_USER_ID,
      });
      setMessageText("");
      setMessages((current) => [message, ...current]);
      setChannels((current) =>
        current.map((channel) =>
          channel.id === selectedChannel.id
            ? { ...channel, mensajes: channel.mensajes + 1 }
            : channel,
        ),
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Canales del proyecto
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              Chats por proyecto
            </h2>
          </div>
          <p className="text-sm text-muted">
            Crea canales y conversa dentro del caso.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {loadingChannels ? (
              <div className="rounded-[24px] border border-border bg-surfaceHover p-6 text-sm text-muted">
                Cargando canales...
              </div>
            ) : channels.length ? (
              channels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setSelectedChannelId(channel.id)}
                  className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                    selectedChannelId === channel.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-surfaceHover"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-text">
                        {channel.nombre}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Canal {channel.tipo}
                      </p>
                    </div>
                    <span className="rounded-full border border-border px-2 py-1 text-[12px] uppercase tracking-[0.24em] text-muted">
                      {channel.mensajes} mensajes
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[24px] border border-border bg-surfaceHover p-6 text-sm text-muted">
                No hay canales todavía. Crea uno para comenzar la conversación.
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-border bg-surfaceHover p-6">
            <form onSubmit={handleCreateChannel} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text">
                  Nuevo canal
                </label>
                <input
                  value={newChannelName}
                  onChange={(event) => setNewChannelName(event.target.value)}
                  placeholder="Nombre del canal"
                  className="mt-2 w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-text">
                  Tipo de canal
                </label>
                <select
                  value={newChannelType}
                  onChange={(event) =>
                    setNewChannelType(
                      event.target.value as "oficina" | "calle" | "general",
                    )
                  }
                  className="mt-2 w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
                >
                  <option value="oficina">Oficina</option>
                  <option value="calle">Calle</option>
                  <option value="general">General</option>
                </select>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-[22px] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53]"
              >
                Crear canal
              </button>
            </form>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-[28px] border border-red-400 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Mensajes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">
              {selectedChannel ? selectedChannel.nombre : "Selecciona un canal"}
            </h2>
          </div>
          <span className="rounded-full bg-accentSoft/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {selectedChannel ? `${messages.length} mensajes` : "Sin canal"}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {selectedChannel ? (
            loadingMessages ? (
              <div className="rounded-[24px] border border-border bg-surfaceHover p-5 text-sm text-muted">
                Cargando mensajes...
              </div>
            ) : messages.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-[24px] border border-border bg-surfaceHover p-5"
                >
                  <p className="font-semibold text-text">{message.usuarioId}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {message.contenido}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">
                    {new Date(message.creadoEn).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[24px] border border-border bg-surfaceHover p-5 text-sm text-muted">
                No hay mensajes en este canal todavía.
              </div>
            )
          ) : (
            <div className="rounded-[24px] border border-border bg-surfaceHover p-5 text-sm text-muted">
              Selecciona un canal para ver su conversación.
            </div>
          )}
        </div>

        {selectedChannel ? (
          <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
            <textarea
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              rows={3}
              placeholder="Escribe un mensaje de chat..."
              className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-[22px] bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53]"
            >
              Enviar mensaje
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
