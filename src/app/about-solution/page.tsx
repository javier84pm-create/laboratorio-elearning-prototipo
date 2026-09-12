import Link from "next/link";
import { Building2, GraduationCap, Landmark, Sparkles } from "lucide-react";
import { SolutionComparison } from "@/components/SolutionComparison";

const segments = [
  {
    title: "Empresas",
    text: "Cumplimiento operativo sin detener la jornada.",
    icon: Building2,
  },
  {
    title: "Universidades",
    text: "Refuerzo microlearning entre clases y prácticas.",
    icon: GraduationCap,
  },
  {
    title: "OTEC / Público",
    text: "Capacitación masiva con trazabilidad clara.",
    icon: Landmark,
  },
];

export default function AboutSolutionPage() {
  return (
    <div className="page-wrap space-y-6">
      <section className="surface overflow-hidden">
        <div className="bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] px-6 py-8 text-white md:px-8">
          <span className="chip !border-white/20 !bg-white/15 !text-white">Propuesta de valor</span>
          <h1 className="font-display mt-4 text-3xl font-bold md:text-4xl">SmartCaps</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Transforma contenidos extensos en microcápsulas interactivas de 3 a 5 minutos, con
            evaluación inmediata, gamificación ligera y panel de trazabilidad.
          </p>
          <Link href="/learning/prevencion-riesgos" className="btn mt-6 bg-white text-[var(--brand)]">
            <Sparkles size={16} />
            Probar la demo
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {segments.map(({ title, text, icon: Icon }) => (
          <article key={title} className="surface p-5">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon size={18} />
            </span>
            <h2 className="font-display text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{text}</p>
          </article>
        ))}
      </section>

      <SolutionComparison />

      <section className="surface p-5">
        <h2 className="font-display text-lg font-semibold">Integración conceptual</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
          SmartCaps no reemplaza el LMS institucional: lo complementa. La visión incluye empaquetado
          compatible con estándares como SCORM para reportar finalización y resultados hacia la
          plataforma existente.
        </p>
      </section>
    </div>
  );
}
