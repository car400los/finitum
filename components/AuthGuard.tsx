"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function verifySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      if (!session) {
        router.replace("/login");
        return;
      }

      setChecking(false);
    }

    verifySession();

    return () => {
      isActive = false;
    };
  }, [router]);

  if (checking) {
    return (
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto flex h-[calc(100vh-128px)] max-w-[1000px] items-center justify-center rounded-[32px] border border-border bg-surface/95 p-10 shadow-soft backdrop-blur-xl">
          <div className="space-y-4 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
            <p className="text-sm text-muted">Verificando tu sesión...</p>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
