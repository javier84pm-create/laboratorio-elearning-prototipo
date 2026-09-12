import type { Course } from "@/types";

export const MAIN_COURSE_ID = "prevencion-riesgos";

export const courses: Course[] = [
  {
    id: MAIN_COURSE_ID,
    title: "Prevención de Riesgos — Nivel 1",
    description: "Aprende a identificar y actuar frente a una condición insegura.",
    durationMinutes: 3,
    level: "Básico",
    status: "pendiente",
    progress: 0,
    slug: "prevencion-riesgos",
    evaluations: 1,
  },
  {
    id: "proteccion-datos",
    title: "Protección de Datos",
    description: "Buenas prácticas para el manejo responsable de información.",
    durationMinutes: 4,
    level: "Básico",
    status: "completado",
    progress: 100,
    slug: "proteccion-datos",
    evaluations: 1,
  },
  {
    id: "ciberseguridad",
    title: "Ciberseguridad Básica",
    description: "Reconoce amenazas digitales frecuentes en el trabajo.",
    durationMinutes: 5,
    level: "Básico",
    status: "en_progreso",
    progress: 75,
    slug: "ciberseguridad",
    evaluations: 1,
  },
  {
    id: "atencion-cliente",
    title: "Atención al Cliente",
    description: "Comunica con claridad en puntos de contacto clave.",
    durationMinutes: 4,
    level: "Intermedio",
    status: "pendiente",
    progress: 0,
    slug: "atencion-cliente",
    evaluations: 1,
  },
  {
    id: "induccion",
    title: "Inducción Institucional",
    description: "Conoce cultura, procesos y canales de la organización.",
    durationMinutes: 5,
    level: "Básico",
    status: "completado",
    progress: 100,
    slug: "induccion",
    evaluations: 1,
  },
  {
    id: "etica",
    title: "Ética y Cumplimiento",
    description: "Identifica conflictos de interés y canales de denuncia.",
    durationMinutes: 4,
    level: "Intermedio",
    status: "completado",
    progress: 100,
    slug: "etica",
    evaluations: 1,
  },
];

export const capsuleContent = {
  courseId: MAIN_COURSE_ID,
  stepLabel: "2 de 3",
  title: "¿Qué hacer frente a una condición insegura?",
  body: "Una condición insegura es cualquier situación del entorno de trabajo que puede aumentar el riesgo de un incidente. La primera acción es identificarla, detener una conducta riesgosa si corresponde y comunicarla según el procedimiento interno.",
  remainingSeconds: 102,
};

export const quizContent = {
  question:
    "Detectas un cable eléctrico expuesto en una zona de tránsito. ¿Cuál debería ser tu primera acción?",
  options: [
    {
      id: "A",
      label: "Continuar trabajando y avisar al final de la jornada.",
      correct: false,
      feedback:
        "Esperar hasta el final mantiene el riesgo activo para ti y para otras personas.",
    },
    {
      id: "B",
      label: "Evitar la zona y reportar inmediatamente la condición insegura.",
      correct: true,
      feedback:
        "Correcto: primero reduces la exposición y luego reportas según el procedimiento interno.",
    },
    {
      id: "C",
      label: "Intentar reparar el cable sin autorización.",
      correct: false,
      feedback:
        "Reparar sin autorización puede agravar el riesgo y no es tu rol asignado.",
    },
  ],
};
