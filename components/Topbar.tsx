"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

type ProfileState = {
  email: string;
  plan?: string;
  company?: string;
};

export function Topbar() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileState>({
    email: "Usuario",
    plan: undefined,
    company: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("plan, company")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setProfile({
          email: session.user.email ?? session.user.id,
          plan: data.plan ?? "gratis",
          company: data.company ?? undefined,
        });
      } else {
        setProfile({
          email: session.user.email ?? session.user.id,
          plan: "gratis",
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex flex-col gap-4 rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-muted">Bienvenido</p>
        <h1 className="mt-2 text-3xl font-semibold text-text">
          Hola, {profile.company ?? profile.email}
        </h1>
      </div>
      <div className="flex flex-col gap-3 rounded-[22px] border border-border bg-surface p-4 text-sm text-muted sm:text-right">
        <div>
          <p className="font-semibold text-text">
            {loading ? "Cargando..." : profile.plan === "enterprise" ? "Empresa" : "Plan gratis"}
          </p>
          <p>{profile.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center justify-center rounded-[18px] border border-[#C8603D]/15 bg-[#C8603D]/10 px-4 py-2 text-sm font-medium text-[#C8603D] transition hover:-translate-y-0.5 hover:bg-[#C8603D]/15 focus:outline-none focus:ring-2 focus:ring-[#C8603D]/40"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
