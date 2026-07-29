import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { AuthGuard } from "../../components/AuthGuard";
import { ProjectManager } from "../../components/project/ProjectManager";

export default function ProjectsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto grid max-w-[1480px] gap-6 xl:grid-cols-[280px_1fr]">
          <Sidebar active="projects" />
          <section className="space-y-6">
            <Topbar />
            <ProjectManager />
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
