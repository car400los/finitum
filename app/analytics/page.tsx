import Link from "next/link";
import { AuthGuard } from "../../components/AuthGuard";

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-bg px-6 py-12 text-text">
        <div className="mx-auto max-w-[1000px] rounded-[32px] border border-border bg-surface/95 p-10 shadow-soft backdrop-blur-xl">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Analítica</p>
          <h1 className="text-4xl font-semibold text-text">Más métricas para tu equipo</h1>
          <p className="max-w-2xl mx-auto text-sm leading-7 text-muted">
            Esta sección estará disponible pronto. Mientras tanto, accede al dashboard para ver tus proyectos y chats.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-[22px] bg-accent px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#d46e53]"
          >
            Volver al dashboard
          </Link>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}
