import type { Badge } from "@/types";

/** earned se deriva en UI desde completedCourseIds; aquí solo metadata. */
export const badges: Badge[] = [
  {
    id: "seguridad-1",
    name: "Seguridad Nivel 1",
    description: "Completaste Prevención de Riesgos.",
    earned: false,
    courseId: "prevencion-riesgos",
  },
  {
    id: "datos",
    name: "Custodio de Datos",
    description: "Completaste Protección de Datos.",
    earned: false,
    courseId: "proteccion-datos",
  },
  {
    id: "ciber",
    name: "Escudo Digital",
    description: "Completaste Ciberseguridad Básica.",
    earned: false,
    courseId: "ciberseguridad",
  },
  {
    id: "induccion",
    name: "Bienvenida Activa",
    description: "Completaste Inducción Institucional.",
    earned: false,
    courseId: "induccion",
  },
  {
    id: "etica",
    name: "Cumplimiento Consciente",
    description: "Completaste Ética y Cumplimiento.",
    earned: false,
    courseId: "etica",
  },
  {
    id: "cliente",
    name: "Servicio Clave",
    description: "Completa Atención al Cliente.",
    earned: false,
    courseId: "atencion-cliente",
  },
];
