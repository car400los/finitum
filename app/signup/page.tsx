"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const plans = [
  {
    id: "free",
    title: "Gratis",
    description: "Ideal para equipos pequeños.",
    price: "0 €/mes",
    highlights: ["Sin tarjeta de crédito", "Acceso inmediato", "Funcionalidad básica de proyectos y chats"],
    available: true,
  },
  {
    id: "enterprise",
    title: "Empresa",
    description: "Funciones avanzadas para equipos grandes.",
    price: "Próximamente",
    highlights: ["Seguridad empresarial", "Soporte personalizado", "Auditoría avanzada"],
    available: false,
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<string>("free");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const selectedPlan = plans.find((item) => item.id === plan) ?? plans[0];

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (selectedPlan.id === "enterprise") {
      setError("El plan Empresa estará disponible pronto. Elige el plan Gratis para comenzar ahora.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa tu correo y contraseña.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          plan: selectedPlan.id,
          company: company.trim() || null,
        },
      },
    });
    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      return;
    }

    setInfo(
      "Tu cuenta se ha creado. Revisa tu correo para confirmar tu dirección y luego accede al dashboard.",
    );
  };

  return (
    <main className="min-h-screen bg-bg px-6 py-12 text-text">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[32px] border border-border bg-surface/95 p-8 shadow-soft backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Crear cuenta</p>
          <h1 className="mt-4 text-4xl font-semibold text-text">Empieza en minutos sin tarjeta.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            Selecciona el plan que mejor se adapta a tu organización. El plan gratis está listo para usar sin cuotas ni datos de pago.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {plans.map((item) => {
              const isSelected = item.id === plan;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlan(item.id)}
                  className={`rounded-[28px] border p-6 text-left transition ${
                    isSelected
                      ? "border-accent bg-accent/10"
                      : "border-border bg-surfaceHover hover:border-accent hover:bg-surface/95"
                  } ${item.available ? "" : "opacity-90"}`}
                  disabled={!item.available}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-text">{item.title}</h2>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                      {item.price}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-surface/95 p-8 shadow-soft backdrop-blur-xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">Cuenta gratuita</p>
            <h2 className="mt-3 text-3xl font-semibold text-text">Empieza ahora</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Elige el plan gratis para comenzar sin tarjeta y con acceso inmediato.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-text">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="tucorreo@empresa.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="•••••••••"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text">Nombre de la empresa</label>
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Nombre de tu empresa (opcional)"
              />
            </div>

            {error ? (
              <div className="rounded-[20px] border border-red-400 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {info ? (
              <div className="rounded-[20px] border border-accent/20 bg-accent/10 p-4 text-sm text-accent">
                {info}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting || selectedPlan.id === "enterprise"}
              className="inline-flex w-full items-center justify-center rounded-[22px] bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {selectedPlan.id === "enterprise"
                ? "Plan Empresa próximamente"
                : submitting
                ? "Creando cuenta…"
                : "Crear cuenta gratis"}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="font-semibold text-accent hover:text-white">
              Inicia sesión
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
