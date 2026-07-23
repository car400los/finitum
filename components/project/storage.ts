"use client";

import type { Channel, ChatData, Message, Project } from "../../lib/types";
import {
  getAllChannels,
  getAllProjects,
  getChannelsByProjectId,
  getMessagesByChannelId,
} from "../../lib/data";

const PROJECTS_STORAGE_KEY = "finitum-projects";
const CHAT_STORAGE_KEY = "finitum-chat-data";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];

  const stored = safeParse<Project[]>(
    window.localStorage.getItem(PROJECTS_STORAGE_KEY),
  );

  const baseProjects = Array.isArray(stored) ? stored : getAllProjects();

  return baseProjects.map((project) => ({
    ...project,
    canalCount: Math.max(
      project.canalCount,
      getProjectChannels(project.id).length,
    ),
  }));
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function loadChatData(): ChatData {
  if (typeof window === "undefined") {
    return { channels: [], messages: [] };
  }

  const stored = safeParse<ChatData>(
    window.localStorage.getItem(CHAT_STORAGE_KEY),
  );
  return stored ?? { channels: [], messages: [] };
}

export function saveChatData(data: ChatData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data));
}

export function getProjectChannels(projectId: string): Channel[] {
  const storedChannels = loadChatData().channels.filter(
    (channel) => channel.proyectoId === projectId,
  );

  const fallbackChannels = getChannelsByProjectId(projectId);
  const mergedChannels = [
    ...fallbackChannels.filter(
      (fallback) =>
        !storedChannels.some((channel) => channel.id === fallback.id),
    ),
    ...storedChannels,
  ];

  return mergedChannels;
}

export function getMessagesForChannel(channelId: string): Message[] {
  const storedMessages = loadChatData().messages.filter(
    (message) => message.canalId === channelId,
  );

  const fallbackMessages = getMessagesByChannelId(channelId);
  const mergedMessages = [
    ...fallbackMessages.filter(
      (fallback) =>
        !storedMessages.some((message) => message.id === fallback.id),
    ),
    ...storedMessages,
  ];

  return mergedMessages;
}

export function addChannel(
  projectId: string,
  nombre: string,
  tipo: "oficina" | "calle" | "general",
): Channel {
  const data = loadChatData();

  const newChannel: Channel = {
    id: `canal-${Date.now()}`,
    proyectoId: projectId,
    nombre,
    tipo,
    mensajes: 0,
  };

  data.channels.push(newChannel);
  saveChatData(data);
  return newChannel;
}

export function appendMessage(
  channelId: string,
  contenido: string,
  usuarioId: string,
): Message {
  const data = loadChatData();

  const existingChannel = data.channels.find(
    (channel) => channel.id === channelId,
  );
  let channel = existingChannel;

  if (!channel) {
    const fallbackChannel = getAllChannels().find(
      (item) => item.id === channelId,
    );
    if (fallbackChannel) {
      channel = { ...fallbackChannel };
      data.channels.push(channel);
    }
  }

  if (channel) {
    channel.mensajes += 1;
  }

  const message: Message = {
    id: `mensaje-${Date.now()}`,
    canalId: channelId,
    usuarioId,
    contenido,
    creadoEn: new Date().toISOString(),
  };

  data.messages.push(message);
  saveChatData(data);

  return message;
}

export function loadChatSummaries() {
  const data = loadChatData();
  const allChannels = getAllChannels();
  const projects = loadProjects();

  const mergedChannels = [
    ...allChannels.filter(
      (fallback) =>
        !data.channels.some((channel) => channel.id === fallback.id),
    ),
    ...data.channels,
  ];

  return mergedChannels.map((channel) => {
    const latestMessage = loadChatData()
      .messages.filter((message) => message.canalId === channel.id)
      .sort((a, b) => (a.creadoEn < b.creadoEn ? 1 : -1))[0];

    const project = projects.find(
      (projectItem) => projectItem.id === channel.proyectoId,
    );

    return {
      ...channel,
      proyectoNombre: project?.nombre ?? "Proyecto desconocido",
      ultimoMensaje: latestMessage?.contenido ?? "Sin actividad reciente.",
      actualizado: latestMessage?.creadoEn ?? "No hay mensajes",
    };
  });
}
