import Link from "next/link";
import { getCompanyName } from "../lib/data";

interface SidebarProps {
  active?: "dashboard" | "projects" | "chats" | "analytics";
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  { label: "Proyectos", href: "/projects", key: "projects" },
  { label: "Chats", href: "/chats", key: "chats" },
  { label: "Analítica", href: "/analytics", key: "analytics" },
];

export function Sidebar({ active = "dashboard" }: SidebarProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 space-y-6 rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl md:block">
      <div className="rounded-[28px] border border-border bg-surface/90 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-muted">
          Finitum
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-text">
          {getCompanyName()}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Comunicación segura, gestión de proyectos y auditoría en un solo
          sitio.
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`group flex items-center justify-between rounded-[22px] border border-border bg-surface px-4 py-3 text-sm transition hover:bg-surfaceHover ${
                isActive ? "ring-1 ring-accent/20" : ""
              }`}
            >
              <span
                className={`font-medium ${isActive ? "text-text" : "text-muted"}`}
              >
                {item.label}
              </span>
              {isActive ? (
                <span className="h-8 w-1 rounded-full bg-accent" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-[28px] border border-border bg-surface/90 p-5 text-sm text-muted">
        <p className="font-semibold text-text">AI Assistant</p>
        <p className="mt-3 leading-6">
          Resúmenes, acciones y seguimiento jurídico para cada proyecto.
        </p>
      </div>
    </aside>
  );
}
