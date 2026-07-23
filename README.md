# Finitum 🔒

**Finitum** es una plataforma SaaS B2B de gestión de proyectos y mensajería instantánea diseñada para garantizar la seguridad jurídica, la auditoría interna y la inmutabilidad de los datos en entornos empresariales.

## 🚀 Propuesta de Valor
A diferencia de los gestores de comunicación tradicionales, **Finitum** introduce el concepto de **Persistencia Inmutable**. Al finalizar un caso, servicio o mudanza, el proyecto se archiva y el motor de la base de datos congela automáticamente los historiales de chat y archivos adjuntos en modo *Read-Only* (Solo Lectura), sirviendo como respaldo legal ante reclamaciones o auditorías.

## 🛠️ Arquitectura Técnica (Fase 1)
*   **Backend & Base de Datos:** PostgreSQL con Row Level Security (RLS) y Triggers automatizados para el bloqueo de registros.
*   **Autenticación y Almacenamiento:** Supabase / Firebase Auth & Storage.
*   **Control de Accesos (RBAC):** 
    *   `Manager`: Acceso global a todos los proyectos e historiales archivados.
    *   `Staff`: Acceso restringido únicamente a los canales de los proyectos en los que participan activamente.
