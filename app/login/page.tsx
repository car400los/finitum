"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa tu correo y contraseña.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-bg px-6 py-12 text-text">
      <div className="mx-auto w-full max-w-xl rounded-[32px] border border-border bg-surface/95 p-8 shadow-soft backdrop-blur-xl">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">
            Iniciar sesión
          </p>
          <h1 className="text-4xl font-semibold text-text">
            Bienvenido de nuevo
          </h1>
          <p className="text-sm leading-6 text-muted">
            Accede a tu panel de proyectos, chats y auditoría.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="tucorreo@empresa.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-[18px] border border-border bg-bg px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="•••••••••"
            />
          </div>

          {error ? (
            <div className="rounded-[20px] border border-red-400 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-[22px] bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d46e53] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/signup"
            className="font-semibold text-accent hover:text-white"
          >
            Crea una cuenta gratis
          </Link>
        </div>
      </div>
    </main>
  );
}
