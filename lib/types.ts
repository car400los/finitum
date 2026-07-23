export type Role = "admin" | "manager" | "staff";
export type ProjectStatus = "abierto" | "cerrado";
export type ChannelType = "oficina" | "calle" | "general";

export interface Company {
  id: string;
  nombre: string;
}

export interface User {
  id: string;
  empresaId: string;
  email: string;
  nombre: string;
  rol: Role;
}

export interface Project {
  id: string;
  empresaId: string;
  nombre: string;
  descripcion: string;
  estado: ProjectStatus;
  cerradoEn?: string;
  canalCount: number;
  participantes: number;
  archivos: number;
}

export interface Channel {
  id: string;
  proyectoId: string;
  nombre: string;
  tipo: ChannelType;
  mensajes: number;
}

export interface Message {
  id: string;
  canalId: string;
  usuarioId: string;
  contenido: string;
  creadoEn: string;
  archivoUrl?: string;
}

export interface ChatData {
  channels: Channel[];
  messages: Message[];
}
