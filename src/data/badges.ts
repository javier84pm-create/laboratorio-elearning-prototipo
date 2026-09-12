import type { Badge } from "@/types";

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
    earned: true,
    courseId: "proteccion-datos",
  },
  {
    id: "induccion",
    name: "Bienvenida Activa",
    description: "Completaste Inducción Institucional.",
    earned: true,
    courseId: "induccion",
  },
  {
    id: "etica",
    name: "Cumplimiento Consciente",
    description: "Completaste Ética y Cumplimiento.",
    earned: true,
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
