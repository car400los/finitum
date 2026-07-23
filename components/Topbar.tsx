import { getCurrentUser } from "../lib/data";

export function Topbar() {
  const user = getCurrentUser();

  return (
    <header className="flex flex-col gap-4 rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-muted">
          Bienvenido
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-text">
          Hola, {user.nombre}
        </h1>
      </div>
      <div className="space-y-2 rounded-[22px] border border-border bg-surface p-4 text-sm text-muted sm:text-right">
        <p className="font-semibold text-text">
          {user.rol === "manager"
            ? "Manager"
            : user.rol === "staff"
              ? "Staff"
              : "Administrador"}
        </p>
        <p>{user.email}</p>
      </div>
    </header>
  );
}
