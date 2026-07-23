import type { Channel, Message, Project, User } from "./types";

const currentCompany = {
  id: "empresa-01",
  nombre: "Casa 24 Logistics",
};

const users: User[] = [
  {
    id: "usuario-01",
    empresaId: currentCompany.id,
    email: "admin@finitum.test",
    nombre: "Sergio Martin",
    rol: "manager",
  },
  {
    id: "usuario-02",
    empresaId: currentCompany.id,
    email: "soporte@finitum.test",
    nombre: "Ana Torres",
    rol: "staff",
  },
];

const rawProjects = [
  {
    id: "proyecto-01",
    empresaId: currentCompany.id,
    nombre: "Entrega de muebles Casa 24",
    descripcion:
      "Proyecto de reparto con canales independientes para oficina y calle.",
    estado: "abierto" as const,
    cerradoEn: undefined,
  },
  {
    id: "proyecto-02",
    empresaId: currentCompany.id,
    nombre: "Servicio técnico Tienda A",
    descripcion: "Proyecto de servicio con acceso segmentado por equipo.",
    estado: "cerrado" as const,
    cerradoEn: "2026-06-28T11:10:00.000Z",
  },
];

const channels: Channel[] = [
  {
    id: "canal-01",
    proyectoId: "proyecto-01",
    nombre: "Oficina",
    tipo: "oficina",
    mensajes: 14,
  },
  {
    id: "canal-02",
    proyectoId: "proyecto-01",
    nombre: "Calle",
    tipo: "calle",
    mensajes: 9,
  },
  {
    id: "canal-03",
    proyectoId: "proyecto-02",
    nombre: "Oficina",
    tipo: "oficina",
    mensajes: 18,
  },
  {
    id: "canal-04",
    proyectoId: "proyecto-02",
    nombre: "Calle",
    tipo: "calle",
    mensajes: 11,
  },
];

const messages: Message[] = [
  {
    id: "mensaje-01",
    canalId: "canal-01",
    usuarioId: "usuario-01",
    contenido:
      "¿Cuál es el estado de la entrega para Casa 24? Necesitamos confirmar que el equipo de calle está preparado.",
    creadoEn: "2026-07-21T12:16:00.000Z",
  },
  {
    id: "mensaje-02",
    canalId: "canal-01",
    usuarioId: "usuario-02",
    contenido:
      "Estamos listos. Validé las rutas y la coordinación con logística interna.",
    creadoEn: "2026-07-21T12:20:00.000Z",
  },
  {
    id: "mensaje-03",
    canalId: "canal-02",
    usuarioId: "usuario-02",
    contenido:
      "Confirmado. El reparto avanza y el cliente está listo para la gestión final.",
    creadoEn: "2026-07-21T12:52:00.000Z",
  },
  {
    id: "mensaje-04",
    canalId: "canal-02",
    usuarioId: "usuario-01",
    contenido:
      "Perfecto. Guarda las fotos de entrega como evidencia y preparemos el cierre del proyecto.",
    creadoEn: "2026-07-21T12:54:00.000Z",
    archivoUrl: "https://example.com/evidence/casa24-entrega.jpg",
  },
];

export function getCurrentUser(): User {
  return users[0];
}

export function getCompanyName(): string {
  return currentCompany.nombre;
}

function countFiles(projectId: string) {
  return messages.filter(
    (message) =>
      message.archivoUrl &&
      channels.some(
        (channel) =>
          channel.id === message.canalId && channel.proyectoId === projectId,
      ),
  ).length;
}

export function getAllProjects(): Project[] {
  return rawProjects.map((project) => {
    const projectChannels = channels.filter(
      (channel) => channel.proyectoId === project.id,
    );
    return {
      ...project,
      canalCount: projectChannels.length,
      participantes: users.length,
      archivos: countFiles(project.id),
    };
  });
}

export function getProjectById(id: string): Project | null {
  const project = rawProjects.find((item) => item.id === id);
  if (!project) return null;
  const projectChannels = channels.filter(
    (channel) => channel.proyectoId === id,
  );
  return {
    ...project,
    canalCount: projectChannels.length,
    participantes: users.length,
    archivos: countFiles(id),
  };
}

export function getChannelsByProjectId(projectId: string): Channel[] {
  return channels.filter((channel) => channel.proyectoId === projectId);
}

export function getAllChannels(): Channel[] {
  return channels;
}

export function getChatSummaries() {
  return channels.map((channel) => {
    const latestMessage = messages
      .filter((message) => message.canalId === channel.id)
      .sort((a, b) => (a.creadoEn < b.creadoEn ? 1 : -1))[0];

    const project = rawProjects.find(
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

export function getMessagesByChannelId(channelId: string): Message[] {
  return messages.filter((message) => message.canalId === channelId);
}

export function getRecentEvents(): Array<{
  title: string;
  description: string;
  timestamp: string;
}> {
  return [
    {
      title: "Proyecto Casa 24 actualizado",
      description:
        "Se agregó evidencia de entrega y se notificó a operaciones.",
      timestamp: "Hace 12 minutos",
    },
    {
      title: "Tarea de auditoría generada",
      description:
        "Se creó un historial inmutable para el cierre del proyecto.",
      timestamp: "Hace 40 minutos",
    },
  ];
}
