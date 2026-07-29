import { notFound } from "next/navigation";
import { Sidebar } from "../../../components/Sidebar";
import { Topbar } from "../../../components/Topbar";
import { AuthGuard } from "../../../components/AuthGuard";
import ProjectDetailClient from "../../../components/project/ProjectDetailClient";
import { ProjectChatManager } from "../../../components/project/ProjectChatManager";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-6 xl:grid-cols-[280px_1.45fr_0.75fr]">
          <aside className="hidden xl:block">
            <Sidebar active="projects" />
          </aside>

          <section className="space-y-6">
            <Topbar />
            <ProjectDetailClient projectId={id} />
            <ProjectChatManager projectId={id} />
          </section>

          <aside className="space-y-6">
          <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Detalles del proyecto
            </p>
            <div className="mt-5 space-y-4 text-sm text-muted">
              <div className="rounded-[24px] border border-border bg-surfaceHover/95 p-4">
                <p className="font-medium text-text">Acciones</p>
                <p className="mt-2">Gestiona estados y chat por proyecto.</p>
              </div>
              <div className="rounded-[24px] border border-border bg-surfaceHover/95 p-4">
                <p className="font-medium text-text">Visibilidad</p>
                <p className="mt-2">
                  Cada proyecto mantiene su propio historial.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </AuthGuard>
);
}
