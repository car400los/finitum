"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const trustedLogos = ["Tesser", "Aurum", "Verde", "Opal", "Carte", "Nomad"];

const features = [
  {
    title: "Bandeja unificada",
    description:
      "Un solo espacio para email, WhatsApp, llamadas y canales internos.",
    icon: MessageCircle,
  },
  {
    title: "Asistente AI",
    description:
      "Respuestas inteligentes, resúmenes automáticos y sugerencias contextuales.",
    icon: Sparkles,
  },
  {
    title: "Análisis en vivo",
    description:
      "Visibilidad clara sobre actividad, respuesta y carga de trabajo.",
    icon: BarChart3,
  },
  {
    title: "Ruteo inteligente",
    description:
      "Automatiza prioridades y entrega cada tarea al equipo correcto.",
    icon: Zap,
  },
  {
    title: "Búsqueda de conocimiento",
    description:
      "Encuentra cualquier conversación, documento o historial en segundos.",
    icon: Search,
  },
  {
    title: "Seguridad empresarial",
    description:
      "Control total con permisos, auditoría y cumplimiento integrado.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    label: "Conecta canales",
    detail: "Importa email, WhatsApp, llamadas y chat.",
  },
  {
    label: "Activa AI",
    detail: "Automatiza resúmenes y respuestas inteligentes.",
  },
  {
    label: "Opera con claridad",
    detail: "Supervisa equipo, flujo y resultados desde un solo lugar.",
  },
];

const benefits = [
  { number: "35%", title: "Menos tiempo en bandeja de entrada" },
  { number: "98%", title: "Visibilidad en conversaciones críticas" },
  { number: "4.8/5", title: "Satisfacción de equipos de operaciones" },
  { number: "24h", title: "Despliegue inicial en menos de un día" },
];

const pricing = [
  {
    name: "Community",
    cost: "0 €",
    description: "Para equipos pequeños que necesitan empezar sin fricción.",
    perks: ["Bandeja unificada", "Chats internos", "AI básico"],
    emphasized: false,
  },
  {
    name: "Professional",
    cost: "60 €/usuario",
    description:
      "Control completo para equipos que exigen visibilidad y velocidad.",
    perks: [
      "Automatización avanzada",
      "Análisis inteligentes",
      "Seguridad empresarial",
    ],
    emphasized: true,
  },
  {
    name: "Enterprise",
    cost: "Próximamente",
    description: "Escala con soporte dedicado y acuerdos personalizados.",
    perks: ["Implementación premium", "Auditoría total", "Soporte 24/7"],
    emphasized: false,
  },
];

const faqs = [
  {
    question: "¿Puedo usar Finitum sin tarjeta de crédito?",
    answer:
      "Sí. El plan Community no requiere tarjeta y está listo para comenzar inmediatamente.",
  },
  {
    question: "¿Qué canales admite la plataforma?",
    answer:
      "Email, WhatsApp, llamadas, chats internos y cualquier flujo de comunicación empresarial.",
  },
  {
    question: "¿Cómo protege Finitum mi información?",
    answer:
      "Los datos se cifran en tránsito y en reposo, con auditoría y permisos empresariales.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const hoverCard = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -4 },
};

export default function LandingPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    const target = document.querySelector(hash);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - 28;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetTop, autoKill: false },
      ease: "power3.out",
    });
  };

  return (
    <div className="relative overflow-hidden bg-bg text-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(200,96,61,0.18),_transparent_28%)]" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[520px] w-[520px] translate-y-[-50%] rounded-full bg-[radial-gradient(circle,_rgba(236,253,173,0.14),_transparent_55%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,_rgba(255,255,255,0.03),_transparent_18%),radial-gradient(circle_at_80%_20%,_rgba(200,96,61,0.04),_transparent_16%)]" />

      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-8 sm:px-10 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-[32px] border border-white/10 bg-surface/80 px-5 py-4 shadow-soft backdrop-blur-2xl md:px-8"
        >
          <div className="font-semibold tracking-[0.18em] text-accent">
            Finitum
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <Link href="#features" onClick={(event) => handleSmoothScroll(event, "#features")} className="transition hover:text-text">
              Características
            </Link>
            <Link href="#work" onClick={(event) => handleSmoothScroll(event, "#work")} className="transition hover:text-text">
              Cómo funciona
            </Link>
            <Link href="#pricing" onClick={(event) => handleSmoothScroll(event, "#pricing")} className="transition hover:text-text">
              Precios
            </Link>
            <Link href="#faq" onClick={(event) => handleSmoothScroll(event, "#faq")} className="transition hover:text-text">
              Preguntas
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-[22px] border border-white/10 bg-transparent px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/signup"
              className="rounded-[22px] bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-glow transition hover:bg-[#d46e53]"
            >
              Comenzar gratis
            </Link>
          </div>
        </motion.header>

        <main className="relative z-10 mx-auto mt-14 flex w-full max-w-[1240px] flex-col gap-20 xl:mt-20">
          <section className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
              className="space-y-10"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-sm text-accent shadow-soft backdrop-blur-xl"
              >
                <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                  AI-first
                </span>
                Plataforma inteligente para comunicación empresarial.
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6 max-w-3xl">
                <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.03em] text-text sm:text-6xl xl:text-7xl">
                  Cada conversación. Un espacio inteligente.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  Reúne email, WhatsApp, llamadas y chat en un único workspace
                  potenciado por IA, diseñado para equipos que necesitan
                  claridad, confianza y velocidad.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-[24px] bg-accent px-7 py-4 text-base font-semibold text-bg transition duration-300 hover:bg-[#d46e53]"
                >
                  Comenzar gratis
                </Link>
                <Link
                  href="#work"
                  onClick={(event) => handleSmoothScroll(event, "#work")}
                  className="inline-flex items-center justify-center rounded-[24px] border border-white/10 bg-surface/80 px-7 py-4 text-base text-text transition duration-300 hover:border-accent hover:text-accent"
                >
                  Ver cómo funciona
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid gap-4 sm:grid-cols-3"
              >
                {[
                  { label: "Confían en Finitum", value: "+120" },
                  { label: "Tiempo de despliegue", value: "<24h" },
                  { label: "Disponibilidad", value: "99.99%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-white/10 bg-surface/80 px-5 py-4"
                  >
                    <p className="text-3xl font-semibold text-text">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-muted">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
              className="relative isolate overflow-hidden rounded-[40px] border border-white/10 bg-surface/75 p-8 shadow-soft backdrop-blur-2xl"
            >
              <div className="absolute -left-16 top-2 h-40 w-40 rounded-full bg-[#c8603d]/10 blur-3xl" />
              <div className="absolute right-0 top-24 h-36 w-36 rounded-full bg-[#ecfdad]/10 blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0e13]/90 to-transparent" />

              <div className="grid gap-6 xl:grid-cols-[0.9fr_0.75fr]">
                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-[#141823]/95 p-5 shadow-[0_20px_60px_rgba(0,_0,_0,_0.22)]">
                    <div className="flex items-center justify-between text-sm text-muted">
                      <span>Resumen AI</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-accent">
                        Activo
                      </span>
                    </div>
                    <div className="mt-5 space-y-4">
                      <div className="rounded-[28px] border border-white/10 bg-surface/90 p-4">
                        <p className="text-sm leading-6 text-text">
                          Finitum detectó una solicitud urgente de pago en la
                          conversación de soporte.
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          {
                            label: "Tiempo medio de respuesta",
                            value: "12 min",
                          },
                          { label: "Conversaciones priorizadas", value: "32" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-[24px] border border-white/10 bg-surface/90 px-4 py-4"
                          >
                            <p className="text-sm text-muted">{item.label}</p>
                            <p className="mt-2 text-lg font-semibold text-text">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[40px] border border-white/10 bg-[#0f131f]/95 p-5 shadow-[0_24px_64px_rgba(0,_0,_0,_0.24)]">
                    <div className="flex items-center justify-between text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                        <span>Canal: WhatsApp</span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.28em] text-muted">
                        En curso
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-[28px] bg-surface/90 p-4">
                        <p className="text-sm text-muted">María</p>
                        <p className="mt-2 text-base leading-7 text-text">
                          ¿Podemos confirmar la entrega antes de las 18:00?
                        </p>
                      </div>
                      <div className="rounded-[28px] border border-white/10 bg-surface/90 p-4">
                        <p className="text-sm leading-6 text-muted">
                          Sugerencia AI
                        </p>
                        <p className="mt-2 text-base leading-7 text-text">
                          Confirmamos hora y ubicación, luego guardamos el
                          registro para auditoría.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-[32px] border border-white/10 bg-[#141823]/95 p-5">
                    <div className="flex items-center justify-between text-sm text-muted">
                      <span>Vista general</span>
                      <span className="text-xs uppercase tracking-[0.24em] text-muted">
                        Ahora
                      </span>
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        { label: "Bandeja", value: "18" },
                        { label: "Urgentes", value: "4" },
                        { label: "Asignadas", value: "74" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-[24px] bg-surface/90 px-4 py-3"
                        >
                          <span className="text-sm text-muted">
                            {item.label}
                          </span>
                          <span className="font-semibold text-text">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[32px] border border-white/10 bg-[#141823]/95 p-5">
                    <div className="flex items-center justify-between text-sm text-muted">
                      <span>Actividad reciente</span>
                      <span className="text-xs uppercase tracking-[0.24em] text-muted">
                        Live
                      </span>
                    </div>
                    <div className="mt-5 space-y-3">
                      {[
                        "Nueva nota en proyecto Atlas.",
                        "Respuesta AI enviada al cliente.",
                        "Flujo de prioridad actualizado.",
                      ].map((label) => (
                        <div
                          key={label}
                          className="rounded-[24px] bg-surface/90 px-4 py-3 text-sm text-muted"
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-[#ecfdad]/10 blur-3xl" />
            </motion.div>
          </section>

          <section className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-4"
              id="trusted"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Confían en Finitum
              </p>
              <div className="grid gap-5 sm:grid-cols-3 xl:grid-cols-6">
                {trustedLogos.map((logo) => (
                  <div
                    key={logo}
                    className="rounded-[28px] border border-white/10 bg-surface/80 px-5 py-4 text-center text-sm uppercase tracking-[0.22em] text-muted transition duration-300 hover:border-accent hover:text-text"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.section
              id="features"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {},
              }}
              className="grid gap-6 xl:grid-cols-[1fr_0.9fr]"
            >
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.32em] text-muted">
                  Capacidades
                </p>
                <h2 className="max-w-xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                  Todo lo que tu equipo necesita para comunicarse con seguridad.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted">
                  Finitum reúne el poder de la IA, el control empresarial y una
                  experiencia visual que aporta confianza a cada interacción.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.article
                      key={feature.title}
                      variants={fadeUp}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="group rounded-[30px] border border-white/10 bg-surface/90 p-6 transition-shadow duration-300 hover:shadow-glow"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-accent ring-1 ring-white/10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-text">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {feature.description}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.section>
          </section>

          <section className="grid gap-10 xl:grid-cols-[0.9fr_0.7fr] xl:items-end">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                IA inteligente
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Deja que la plataforma entienda, resuma y actúe por tu equipo.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted">
                Finitum analiza cada conversación para ofrecer respuestas,
                tareas y oportunidades en el momento exacto.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Resúmenes automáticos",
                    description:
                      "Reúne el contexto clave sin leer cada mensaje.",
                  },
                  {
                    title: "Sugerencias proactivas",
                    description:
                      "Responde con mensajes preparados en segundos.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[32px] border border-white/10 bg-surface/85 p-6"
                  >
                    <p className="text-sm font-semibold text-text">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#15202f]/95 p-8 shadow-soft">
              <div className="absolute left-6 top-6 h-14 w-14 rounded-full bg-[#ecfdad]/15 blur-2xl" />
              <div className="relative space-y-4">
                <div className="rounded-[30px] border border-white/10 bg-surface/90 p-5">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>AI Inbox</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfdad]/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-accent">
                      Inteligente
                    </span>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[26px] bg-[#0d121c] p-4">
                      <p className="text-sm text-muted">
                        Finitum sugirió este mensaje:
                      </p>
                      <p className="mt-3 text-base leading-7 text-text">
                        Gracias por contactarnos. Ya tenemos tu caso y nos
                        aseguraremos de priorizar la entrega.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["Revisión rápida", "Generación de follow-up"].map(
                        (item) => (
                          <div
                            key={item}
                            className="rounded-[26px] border border-white/10 bg-surface/90 px-4 py-3 text-sm text-muted"
                          >
                            {item}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 rounded-[32px] border border-white/10 bg-[#141823]/95 p-5">
                  <div className="rounded-[28px] bg-surface/90 p-4">
                    <p className="text-sm font-semibold text-text">
                      Meeting Insight
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      Se identificó acción urgente para facturación y
                      notificación interna.
                    </p>
                  </div>
                  <div className="rounded-[28px] bg-surface/90 p-4">
                    <p className="text-sm font-semibold text-text">
                      Task extraction
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      4 tareas generadas automáticamente y asignadas a
                      operaciones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="work" className="grid gap-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Cómo funciona
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Tres pasos claros para transformar la comunicación de tu equipo.
              </h2>
            </div>
            <div className="relative rounded-[40px] border border-white/10 bg-surface/80 p-8 shadow-soft">
              <div className="absolute left-10 top-20 h-[calc(100%-5rem)] w-px bg-white/5 md:left-1/2 lg:left-1/3" />
              <div className="grid gap-6 md:grid-cols-3">
                {steps.map((step, index) => (
                  <div
                    key={step.label}
                    className="relative rounded-[32px] border border-white/10 bg-[#0f1521]/95 p-6"
                  >
                    <div className="absolute left-0 top-1/2 hidden h-1 w-10 -translate-y-1/2 rounded-full bg-accent md:block" />
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-surface/90 text-xl font-semibold text-text">
                      {index + 1}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-text">
                      {step.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Beneficios
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Más claridad. Menos desgaste. Mayor control.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map((item) => (
                <div
                  key={item.number}
                  className="rounded-[32px] border border-white/10 bg-surface/90 p-6 text-center"
                >
                  <p className="text-4xl font-semibold text-text">
                    {item.number}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10" id="pricing">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Precios
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Un precio limpio para un producto de clase empresarial.
              </h2>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {pricing.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{
                    y: plan.emphasized ? -6 : -3,
                    scale: plan.emphasized ? 1.01 : 1.0,
                  }}
                  className={`rounded-[36px] border border-white/10 p-8 transition duration-300 ${plan.emphasized ? "bg-[#1c222f] shadow-glow" : "bg-surface/90"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-muted">
                        {plan.name}
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold text-text">
                        {plan.cost}
                      </h3>
                    </div>
                    {plan.emphasized ? (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-accent">
                        Más popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-muted">
                    {plan.description}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-muted">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={
                      plan.emphasized
                        ? "/signup"
                        : plan.name === "Enterprise"
                          ? "#contact"
                          : "/signup"
                    }
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-[24px] px-6 py-3 text-sm font-semibold transition ${plan.emphasized ? "bg-accent text-bg hover:bg-[#d46e53]" : "border border-white/10 bg-white/5 text-text hover:border-accent"}`}
                  >
                    {plan.emphasized
                      ? "Elegir Professional"
                      : plan.name === "Enterprise"
                        ? "Próximamente"
                        : "Comenzar gratis"}
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid gap-10" id="faq">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-muted">
                Preguntas frecuentes
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Respuestas directas para equipos exigentes.
              </h2>
            </div>
            <div className="grid gap-3">
              {faqs.map((item, index) => (
                <details
                  key={item.question}
                  className="rounded-[30px] border border-white/10 bg-surface/80 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-text">
                    {item.question}
                    <ArrowRight className="h-5 w-5 text-muted transition duration-200 group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#11141c]/95 px-8 py-16 text-center shadow-soft">
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#ecfdad]/10 to-transparent" />
            <div className="relative mx-auto max-w-3xl space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-accent">
                Finaliza con confianza
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
                Construye un espacio de comunicación que inspire confianza.
              </h2>
              <p className="max-w-2xl mx-auto text-base leading-7 text-muted">
                Comienza con un plan sin tarjeta y experimenta cómo la IA
                convierte la comunicación empresarial en un proceso fluido y
                seguro.
              </p>
              <div className="mx-auto flex max-w-[520px] flex-wrap justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-[24px] bg-accent px-8 py-4 text-base font-semibold text-bg transition hover:bg-[#d46e53]"
                >
                  Comenzar gratis
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-[24px] border border-white/10 bg-transparent px-8 py-4 text-base text-text transition hover:border-accent hover:text-accent"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 border-t border-white/10 pt-10 text-muted">
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="font-semibold text-text">Finitum</div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                AI-powered communication para empresas modernas. Claridad,
                control y confianza en cada conversación.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-text">Producto</p>
              <div className="grid gap-3 text-sm leading-7 text-muted">
                <Link href="#features" className="transition hover:text-text">
                  Características
                </Link>
                <Link href="#work" className="transition hover:text-text">
                  Cómo funciona
                </Link>
                <Link href="#pricing" className="transition hover:text-text">
                  Precios
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-text">Recursos</p>
              <div className="grid gap-3 text-sm leading-7 text-muted">
                <Link href="#faq" className="transition hover:text-text">
                  Centro de ayuda
                </Link>
                <Link href="/login" className="transition hover:text-text">
                  Guía de inicio
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-text">Legal</p>
              <div className="grid gap-3 text-sm leading-7 text-muted">
                <Link href="#" className="transition hover:text-text">
                  Privacidad
                </Link>
                <Link href="#" className="transition hover:text-text">
                  Términos
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Finitum. Todos los derechos reservados.</span>
            <span>Diseño premium para comunicación empresarial.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
