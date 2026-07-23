-- Finitum Database Schema

create table empresas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  created_at timestamptz not null default now()
);

create table usuarios (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id),
  email text not null unique,
  nombre text not null,
  rol text not null check (rol in ('admin', 'staff', 'manager')),
  created_at timestamptz not null default now()
);

create table proyectos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references empresas(id),
  nombre text not null,
  descripcion text,
  estado text not null default 'abierto' check (estado in ('abierto', 'cerrado')),
  created_at timestamptz not null default now(),
  cerrado_en timestamptz
);

create table canales (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references proyectos(id),
  nombre text not null,
  tipo text not null check (tipo in ('oficina', 'calle', 'general')),
  created_at timestamptz not null default now()
);

create table proyecto_usuarios (
  proyecto_id uuid not null references proyectos(id),
  usuario_id uuid not null references usuarios(id),
  canal_tipo text not null check (canal_tipo in ('oficina', 'calle')),
  primary key (proyecto_id, usuario_id, canal_tipo)
);

create table mensajes (
  id uuid primary key default gen_random_uuid(),
  canal_id uuid not null references canales(id),
  usuario_id uuid not null references usuarios(id),
  contenido text,
  creado_en timestamptz not null default now(),
  modificado_en timestamptz,
  archivo_url text
);

create or replace function proyectos_cerrados_no_modificar() returns trigger as $$
begin
  if exists (select 1 from proyectos where id = new.proyecto_id and estado = 'cerrado') then
    raise exception 'No se puede modificar un proyecto cerrado';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trigger_no_modificar_mensajes
  before insert or update or delete on mensajes
  for each row execute function proyectos_cerrados_no_modificar();
