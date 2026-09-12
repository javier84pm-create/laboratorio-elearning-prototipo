const rows = [
  {
    dimension: "Formato",
    traditional: "Cursos extensos (horas)",
    smartcaps: "Microcápsulas de 3–5 min",
  },
  {
    dimension: "Disponibilidad",
    traditional: "Escritorio / LMS rígido",
    smartcaps: "Móvil + modo solo audio",
  },
  {
    dimension: "Evaluación",
    traditional: "Al final del módulo",
    smartcaps: "Feedback inmediato por cápsula",
  },
  {
    dimension: "Motivación",
    traditional: "Cumplimiento formal",
    smartcaps: "Gamificación e insignias",
  },
  {
    dimension: "Trazabilidad",
    traditional: "Reportes limitados",
    smartcaps: "Finalización, score y tiempo",
  },
  {
    dimension: "Integración",
    traditional: "Silo o reemplazo LMS",
    smartcaps: "Complementa LMS (SCORM conceptual)",
  },
];

export function SolutionComparison() {
  return (
    <div className="surface overflow-hidden">
      <div className="border-b border-[var(--line)] bg-[var(--brand-soft)]/60 px-5 py-4">
        <h2 className="font-display text-lg font-semibold">Comparación de solución</h2>
        <p className="text-sm text-[var(--ink-muted)]">
          Antes vs SmartCaps — propuesta Laboratorio E-Learning
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-[var(--ink-muted)]">
              <th className="px-5 py-3 font-medium">Dimensión</th>
              <th className="px-5 py-3 font-medium">Enfoque tradicional</th>
              <th className="px-5 py-3 font-medium text-[var(--brand)]">SmartCaps</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dimension} className="border-b border-[var(--line)] last:border-0">
                <td className="px-5 py-3 font-semibold">{row.dimension}</td>
                <td className="px-5 py-3 text-[var(--ink-muted)]">{row.traditional}</td>
                <td className="px-5 py-3 font-medium text-[var(--brand)]">{row.smartcaps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
