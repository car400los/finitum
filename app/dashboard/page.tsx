"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ProjectCard } from "../../components/ProjectCard";
import { AuthGuard } from "../../components/AuthGuard";
import { getProjects as fetchProjects, getChatSummaries } from "../../lib/api";
import { getRecentEvents } from "../../lib/data";
import type { Project } from "../../lib/types";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [chats, setChats] = useState<
    Array<{
      id: string;
      nombre: string;
      proyectoNombre: string;
      ultimoMensaje: string;
      actualizado: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>([
        ".hero-animate",
        ".stat-card",
        ".content-card",
        ".action-link",
      ]);

      gsap.set(cards, {
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      gsap.from(cards, {
        autoAlpha: 0,
        y: 26,
        scale: 0.98,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.to(".hero-animate", {
        y: -4,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
      });

      gsap.to(".content-card", {
        y: -3,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
        paused: true,
      });

      gsap.to(".stat-card", {
        y: -2,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
        paused: true,
      });

      const handleMouseMove = (event: MouseEvent) => {
        const target = event.target;
        const element = target instanceof HTMLElement ? target : null;
        if (!element) return;

        const card = element.closest<HTMLElement>(
          ".hero-animate, .content-card, .stat-card",
        );
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 6;
        const rotateX = (0.5 - y / rect.height) * 6;

        gsap.to(card, {
          rotateY,
          rotateX,
          scale: 1.01,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleMouseLeave = (event: MouseEvent) => {
        const target = event.target;
        const element = target instanceof HTMLElement ? target : null;
        if (!element) return;
        const card = element.closest<HTMLElement>(
          ".hero-animate, .content-card, .stat-card",
        );
        if (!card) return;

        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [loadedProjects, loadedChats] = await Promise.all([
          fetchProjects(),
          getChatSummaries(),
        ]);
        setProjects(loadedProjects);
        setChats(loadedChats);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const events = getRecentEvents();

  const openProjects = useMemo(
    () => projects.filter((project) => project.estado === "abierto").length,
    [projects],
  );

  const closedProjects = useMemo(
    () => projects.filter((project) => project.estado === "cerrado").length,
    [projects],
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto max-w-[1480px] p-8">
          <div className="rounded-[28px] border border-border bg-surface/95 p-8 shadow-soft text-text">
            Cargando el dashboard...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto max-w-[1480px] p-8">
          <div className="rounded-[28px] border border-red-400 bg-red-50 p-8 shadow-soft text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-bg px-6 py-8 text-text">
        <div className="mx-auto grid max-w-[1480px] gap-6 xl:grid-cols-[280px_1fr]">
          <Sidebar active="dashboard" />

          <section className="space-y-6">
            <Topbar />
            <div
              ref={heroRef}
              className="hero-animate rounded-[28px] border border-border bg-surface/95 p-8 shadow-card backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">
                    Dashboard
                  </p>
                  <h1 className="text-4xl font-semibold leading-tight text-text">
                    Plataforma SaaS para proyectos, mensajería y auditoría.
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-muted">
                    Gestiona proyectos con canales separados, roles seguros y
                    registros inmutables.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/projects"
                    className="action-link inline-flex items-center justify-center rounded-[22px] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-[#d46e53]"
                  >
                    Ver proyectos
                  </Link>
                  <Link
                    href="/chats"
                    className="action-link inline-flex items-center justify-center rounded-[22px] border border-border bg-surface px-6 py-3 text-sm font-medium text-text transition duration-300 hover:-translate-y-0.5 hover:bg-surfaceHover"
                  >
                    Ver chats
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Proyectos abiertos", value: openProjects },
                    { label: "Proyectos cerrados", value: closedProjects },
                    { label: "Canales activos", value: chats.length },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="stat-card rounded-[28px] border border-border bg-surfaceHover p-6"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">
                        {stat.label}
                      </p>
                      <p className="mt-4 text-4xl font-semibold text-text">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-muted">
                        Proyectos recientes
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-text">
                        Tus casos más recientes
                      </h2>
                    </div>
                    <Link
                      href="/projects"
                      className="text-sm font-semibold text-accent hover:text-accentSoft"
                    >
                      Ver todos
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {projects.slice(0, 2).map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Chats recientes
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text">
                    Actividad del equipo
                  </h2>
                  <div className="mt-6 space-y-4">
                    {chats.slice(0, 3).map((chat) => (
                      <div
                        key={chat.id}
                        className="rounded-[24px] border border-border bg-surfaceHover p-5"
                      >
                        <p className="text-sm font-semibold text-text">
                          {chat.nombre}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {chat.proyectoNombre}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {chat.ultimoMensaje}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-card rounded-[28px] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">
                    Eventos recientes
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text">
                    Historial operativo
                  </h2>
                  <div className="mt-6 space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.title}
                        className="rounded-[24px] border border-border bg-surfaceHover p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-text">{event.title}</p>
                          <span className="text-xs uppercase tracking-[0.24em] text-muted">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
