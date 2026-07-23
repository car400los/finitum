import { getSupabaseAdmin } from "./supabaseServer";
import type { Channel, Message, Project } from "./types";

function mapProject(row: any): Project {
  return {
    id: row.id,
    empresaId: row.empresa_id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    estado: row.estado,
    cerradoEn: row.cerrado_en ?? undefined,
    canalCount: row.canal_count,
    participantes: row.participantes,
    archivos: row.archivos,
  };
}

function mapChannel(row: any): Channel {
  return {
    id: row.id,
    proyectoId: row.proyecto_id,
    nombre: row.nombre,
    tipo: row.tipo,
    mensajes: row.mensajes,
  };
}

function mapMessage(row: any): Message {
  return {
    id: row.id,
    canalId: row.canal_id,
    usuarioId: row.usuario_id,
    contenido: row.contenido,
    creadoEn: row.creado_en,
    archivoUrl: row.archivo_url ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select(
      `id, empresa_id, nombre, descripcion, estado, cerrado_en, canal_count, participantes, archivos`,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select(
      `id, empresa_id, nombre, descripcion, estado, cerrado_en, canal_count, participantes, archivos`,
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapProject(data);
}

export async function createProject(input: {
  nombre: string;
  descripcion: string;
  estado: "abierto" | "cerrado";
}): Promise<Project> {
  const supabaseAdmin = getSupabaseAdmin();
  const cerradoEn =
    input.estado === "cerrado" ? new Date().toISOString() : null;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({
      empresa_id: "empresa-01",
      nombre: input.nombre,
      descripcion: input.descripcion,
      estado: input.estado,
      cerrado_en: cerradoEn,
      canal_count: 0,
      participantes: 1,
      archivos: 0,
    })
    .select(
      `id, empresa_id, nombre, descripcion, estado, cerrado_en, canal_count, participantes, archivos`,
    )
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to create project");
  }

  return mapProject(data);
}

export async function updateProjectStatus(
  id: string,
  estado: "abierto" | "cerrado",
): Promise<Project> {
  const supabaseAdmin = getSupabaseAdmin();
  const cerradoEn = estado === "cerrado" ? new Date().toISOString() : null;

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update({ estado, cerrado_en: cerradoEn })
    .eq("id", id)
    .select(
      `id, empresa_id, nombre, descripcion, estado, cerrado_en, canal_count, participantes, archivos`,
    )
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to update project status");
  }

  return mapProject(data);
}

export async function deleteProject(id: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) {
    throw error;
  }
}

export async function getChannelsByProjectId(
  projectId: string,
): Promise<Channel[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("channels")
    .select(`id, proyecto_id, nombre, tipo, mensajes`)
    .eq("proyecto_id", projectId)
    .order("nombre", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapChannel);
}

export async function createChannel(
  projectId: string,
  nombre: string,
  tipo: "oficina" | "calle" | "general",
): Promise<Channel> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("channels")
    .insert({
      proyecto_id: projectId,
      nombre,
      tipo,
      mensajes: 0,
    })
    .select(`id, proyecto_id, nombre, tipo, mensajes`)
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to create channel");
  }

  return mapChannel(data);
}

export async function getMessagesByChannelId(
  channelId: string,
): Promise<Message[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select(`id, canal_id, usuario_id, contenido, creado_en, archivo_url`)
    .eq("canal_id", channelId)
    .order("creado_en", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapMessage);
}

export async function createMessage(input: {
  canalId: string;
  contenido: string;
  usuarioId: string;
}): Promise<Message> {
  const supabaseAdmin = getSupabaseAdmin();
  const createdAt = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({
      canal_id: input.canalId,
      usuario_id: input.usuarioId,
      contenido: input.contenido,
      creado_en: createdAt,
    })
    .select(`id, canal_id, usuario_id, contenido, creado_en, archivo_url`)
    .single();

  if (error || !data) {
    throw error ?? new Error("Failed to create message");
  }

  return mapMessage(data);
}

export async function getChatSummaries() {
  const supabaseAdmin = getSupabaseAdmin();
  const channelsResponse = await supabaseAdmin
    .from("channels")
    .select(`id, proyecto_id, nombre, tipo, mensajes`)
    .order("nombre", { ascending: true });

  if (channelsResponse.error) {
    throw channelsResponse.error;
  }

  const messagesResponse = await supabaseAdmin
    .from("messages")
    .select(`id, canal_id, contenido, creado_en`)
    .order("creado_en", { ascending: false });

  if (messagesResponse.error) {
    throw messagesResponse.error;
  }

  const projects = await getProjects();
  const channels = (channelsResponse.data ?? []).map(mapChannel);
  const messages = (messagesResponse.data ?? []).map(mapMessage);

  return channels.map((channel) => {
    const latestMessage = messages.find(
      (message) => message.canalId === channel.id,
    );
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
