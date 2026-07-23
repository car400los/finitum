import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import ChatOverview from "../../components/ChatOverview";

export default function ChatsPage() {
  return (
    <main className="min-h-screen bg-bg px-6 py-8 text-text">
      <div className="mx-auto grid max-w-[1480px] gap-6 xl:grid-cols-[280px_1fr]">
        <Sidebar active="chats" />
        <section className="space-y-6">
          <Topbar />

          <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-card backdrop-blur-xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                  Chats
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-text">
                  Comunicación del equipo
                </h1>
              </div>
              <button className="inline-flex items-center justify-center rounded-[22px] bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53]">
                Nuevo mensaje
              </button>
            </div>
          </div>

          <ChatOverview />
        </section>
      </div>
    </main>
  );
}
