import type { Channel, Message, Project } from "./types";

async function fetchJson<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ?? `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}

export function getProjects() {
  return fetchJson<Project[]>("/api/projects");
}

export function getProjectById(id: string) {
  return fetchJson<Project>(`/api/projects/${id}`);
}

export function createProject(input: {
  nombre: string;
  descripcion: string;
  estado: "abierto" | "cerrado";
}) {
  return fetchJson<Project>("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function updateProjectStatus(id: string, estado: "abierto" | "cerrado") {
  return fetchJson<Project>(`/api/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
}

export function deleteProject(id: string) {
  return fetchJson<{ success: boolean }>(`/api/projects/${id}`, {
    method: "DELETE",
  });
}

export function getChannelsByProjectId(projectId: string) {
  return fetchJson<Channel[]>(
    `/api/channels?projectId=${encodeURIComponent(projectId)}`,
  );
}

export function createChannel(input: {
  projectId: string;
  nombre: string;
  tipo: "oficina" | "calle" | "general";
}) {
  return fetchJson<Channel>("/api/channels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function getMessagesByChannelId(channelId: string) {
  return fetchJson<Message[]>(
    `/api/messages?channelId=${encodeURIComponent(channelId)}`,
  );
}

export function createMessage(input: {
  canalId: string;
  contenido: string;
  usuarioId: string;
}) {
  return fetchJson<Message>("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function getChatSummaries() {
  return fetchJson<
    Array<{
      id: string;
      nombre: string;
      proyectoNombre: string;
      ultimoMensaje: string;
      actualizado: string;
    }>
  >("/api/chats");
}
