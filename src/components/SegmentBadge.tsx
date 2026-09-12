import type { CourseStatus } from "@/types";

const map: Record<
  CourseStatus,
  { label: string; className: string }
> = {
  completado: {
    label: "Completado",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  en_progreso: {
    label: "En progreso",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

export function SegmentBadge({ status }: { status: CourseStatus }) {
  const item = map[status];
  return (
    <span className={`chip !bg-transparent border ${item.className}`}>{item.label}</span>
  );
}
