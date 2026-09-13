import type { Course, CourseContent } from "@/types";

export const MAIN_COURSE_ID = "prevencion-riesgos";

const prevencionContent: CourseContent = {
  remainingSeconds: 180,
  badgeName: "Seguridad Nivel 1",
  steps: [
    {
      id: "identificar",
      title: "Identifica la condición insegura",
      body: "Una condición insegura es cualquier situación del entorno de trabajo que puede aumentar el riesgo de un incidente: cables expuestos, piso mojado, señalética faltante o equipos sin resguardo.",
      tip: "Si lo ves, nómbralo. El primer paso es reconocer el riesgo.",
    },
    {
      id: "actuar",
      title: "Actúa para reducir la exposición",
      body: "Detén una conducta riesgosa si corresponde, evita la zona afectada y protege a quienes están cerca. No intentes reparar sin autorización: tu prioridad es cortar el riesgo inmediato.",
      tip: "Primero seguridad de las personas, después el reporte formal.",
    },
    {
      id: "comunicar",
      title: "Comunica según el procedimiento",
      body: "Reporta la condición insegura por el canal interno (supervisor, app o formulario). Así tu institución puede corregirla y registrar el aprendizaje de toda el área.",
      tip: "Un reporte oportuno cierra el ciclo: detectar → actuar → mejorar.",
    },
  ],
  quiz: {
    question:
      "Detectas un cable eléctrico expuesto en una zona de tránsito. ¿Cuál debería ser tu primera acción?",
    hint: "Prioriza cortar la exposición al riesgo antes que seguir produciendo o reparar por tu cuenta.",
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
  },
};

const proteccionContent: CourseContent = {
  remainingSeconds: 240,
  badgeName: "Custodio de Datos",
  steps: [
    {
      id: "clasificar",
      title: "Clasifica la información",
      body: "No todos los datos pesan igual. Distingue información pública, interna y sensible (RUT, salud, credenciales). Si no sabes la categoría, trátala como sensible hasta confirmarlo.",
      tip: "Cuando dudes, eleva el nivel de cuidado.",
    },
    {
      id: "minimizar",
      title: "Minimiza y protege el acceso",
      body: "Comparte solo lo necesario, con las personas autorizadas y por canales institucionales. Evita capturas, chats personales o correos masivos con datos sensibles.",
      tip: "Menos copias = menos superficie de riesgo.",
    },
    {
      id: "reportar-dato",
      title: "Reporta un incidente de datos",
      body: "Si enviaste información al destinatario equivocado o detectas una filtración, avisa de inmediato al canal de cumplimiento o seguridad. La velocidad reduce el daño.",
      tip: "Ocultar un error agrava el impacto institucional.",
    },
  ],
  quiz: {
    question:
      "Necesitas enviar un listado con datos personales a otra área. ¿Qué práctica es la correcta?",
    hint: "Usa siempre el canal institucional y comparte solo con quien realmente necesita verlo.",
    options: [
      {
        id: "A",
        label: "Subirlo a un chat personal para ir más rápido.",
        correct: false,
        feedback: "Los canales personales no están bajo control institucional.",
      },
      {
        id: "B",
        label: "Usar el canal oficial, con acceso solo a quienes lo necesitan.",
        correct: true,
        feedback: "Correcto: canal institucional + mínimo privilegio.",
      },
      {
        id: "C",
        label: "Enviarlo a toda la organización por si alguien lo necesita.",
        correct: false,
        feedback: "Ampliar el alcance sin necesidad aumenta el riesgo de filtración.",
      },
    ],
  },
};

const ciberContent: CourseContent = {
  remainingSeconds: 300,
  badgeName: "Escudo Digital",
  steps: [
    {
      id: "reconocer",
      title: "Reconoce la amenaza",
      body: "Phishing, enlaces sospechosos y archivos inesperados son las puertas más comunes. Revisa remitente, urgencia artificial y errores ortográficos antes de hacer clic.",
      tip: "La prisa es la mejor aliada del atacante.",
    },
    {
      id: "verificar",
      title: "Verifica antes de actuar",
      body: "Si un mensaje pide credenciales, pagos o datos sensibles, valida por un canal aparte (llamada o chat oficial). Nunca uses enlaces del propio mensaje dudoso.",
      tip: "Verifica fuera del hilo sospechoso.",
    },
    {
      id: "contener",
      title: "Contén y reporta",
      body: "Si ya hiciste clic o compartiste datos, cambia la contraseña, cierra sesión en otros dispositivos y reporta al equipo de ciberseguridad. No borres evidencias hasta que te lo indiquen.",
      tip: "Reportar rápido limita el daño lateral.",
    },
  ],
  quiz: {
    question:
      "Recibes un correo urgente pidiendo tu contraseña para “evitar el bloqueo de la cuenta”. ¿Qué haces?",
    hint: "Ningún proceso legítimo te pedirá la contraseña por correo. No entregues datos y reporta.",
    options: [
      {
        id: "A",
        label: "Responder con la contraseña para no perder acceso.",
        correct: false,
        feedback: "Ningún proceso legítimo te pedirá la contraseña por correo.",
      },
      {
        id: "B",
        label: "Ignorarlo y no decir nada a nadie.",
        correct: false,
        feedback: "Aunque no caigas, reportar ayuda a proteger al resto del equipo.",
      },
      {
        id: "C",
        label: "No ingresar datos y reportarlo por el canal oficial de seguridad.",
        correct: true,
        feedback: "Correcto: no entregar credenciales y reportar la amenaza.",
      },
    ],
  },
};

const clienteContent: CourseContent = {
  remainingSeconds: 240,
  badgeName: "Servicio Clave",
  steps: [
    {
      id: "escuchar",
      title: "Escucha y valida",
      body: "Antes de resolver, demuestra que entendiste: resume la necesidad del cliente y confirma el resultado esperado. La claridad baja la fricción desde el primer contacto.",
      tip: "Validar no es perder tiempo: evita reprocesos.",
    },
    {
      id: "orientar",
      title: "Orienta con opciones concretas",
      body: "Ofrece caminos claros, tiempos realistas y el siguiente paso. Si no puedes resolverlo tú, deriva con contexto completo para que la persona no tenga que repetir su historia.",
      tip: "Una buena derivación también es buen servicio.",
    },
    {
      id: "cerrar",
      title: "Cierra el ciclo",
      body: "Confirma si la necesidad quedó resuelta y deja el registro. Un cierre explícito mejora la experiencia y genera trazabilidad para la institución.",
      tip: "Sin cierre, el caso sigue abierto en la cabeza del cliente.",
    },
  ],
  quiz: {
    question:
      "Un cliente está molesto porque debe repetir su caso. ¿Cuál es la mejor primera respuesta?",
    hint: "Valida lo ocurrido, resume lo que ya sabes y ofrece un siguiente paso concreto.",
    options: [
      {
        id: "A",
        label: "Pedirle que explique todo de nuevo sin contexto previo.",
        correct: false,
        feedback: "Repetir desde cero aumenta la frustración.",
      },
      {
        id: "B",
        label: "Validar lo ocurrido, resumir lo que ya sabes y ofrecer el siguiente paso.",
        correct: true,
        feedback: "Correcto: empatía + claridad + avance concreto.",
      },
      {
        id: "C",
        label: "Decirle que no es tu área y cortar la conversación.",
        correct: false,
        feedback: "Cortar sin derivar deja el problema sin dueño.",
      },
    ],
  },
};

const induccionContent: CourseContent = {
  remainingSeconds: 300,
  badgeName: "Bienvenida Activa",
  steps: [
    {
      id: "proposito",
      title: "Conoce el propósito institucional",
      body: "Tu rol conecta con una misión mayor: servir con calidad y consistencia. Entender el “para qué” ayuda a priorizar cuando hay varias demandas al mismo tiempo.",
      tip: "El propósito orienta las decisiones del día a día.",
    },
    {
      id: "canales",
      title: "Usa los canales correctos",
      body: "Cada necesidad tiene un canal: soporte, RR.HH., seguridad o jefatura. Usar el canal adecuado acelera la respuesta y deja evidencia útil para la organización.",
      tip: "El canal correcto evita demoras y rumores.",
    },
    {
      id: "normas",
      title: "Respeta normas y cultura",
      body: "Horarios, seguridad, trato respetuoso y confidencialidad son parte de la inducción. Cumplirlas protege a las personas y a la reputación institucional.",
      tip: "La cultura se demuestra en lo cotidiano, no solo en el manual.",
    },
  ],
  quiz: {
    question:
      "Tienes una duda operativa y no sabes a quién preguntar. ¿Qué corresponde?",
    hint: "Antes de improvisar, usa el canal o la persona de referencia definidos en la inducción.",
    options: [
      {
        id: "A",
        label: "Inventar una solución para no molestar.",
        correct: false,
        feedback: "Improvisar puede generar errores costosos o riesgos.",
      },
      {
        id: "B",
        label: "Consultar el canal o persona de referencia definidos en la inducción.",
        correct: true,
        feedback: "Correcto: usa la ruta institucional antes de improvisar.",
      },
      {
        id: "C",
        label: "Publicarlo en redes personales pidiendo ayuda externa.",
        correct: false,
        feedback: "Puede filtrar información interna y no garantiza una respuesta válida.",
      },
    ],
  },
};

const eticaContent: CourseContent = {
  remainingSeconds: 240,
  badgeName: "Cumplimiento Consciente",
  steps: [
    {
      id: "conflicto",
      title: "Identifica el conflicto de interés",
      body: "Hay conflicto cuando un interés personal puede influir en una decisión laboral: favores a conocidos, regalos o beneficios propios. Detectarlo a tiempo es parte de tu responsabilidad.",
      tip: "Si te beneficia de forma poco transparente, detente y consulta.",
    },
    {
      id: "transparencia",
      title: "Actúa con transparencia",
      body: "Declara la situación a tu jefatura o al canal de cumplimiento. La transparencia protege tu credibilidad y permite que la institución gestione el caso con imparcialidad.",
      tip: "Declarar no es culpable: es profesional.",
    },
    {
      id: "denuncia",
      title: "Usa el canal de denuncia",
      body: "Si observas una falta ética grave, usa el canal oficial. No confrontes solo si hay riesgo; documenta hechos (no rumores) y sigue el procedimiento.",
      tip: "Hechos claros + canal correcto = protección real.",
    },
  ],
  quiz: {
    question:
      "Un proveedor te ofrece un regalo costoso a cambio de priorizar su propuesta. ¿Qué corresponde?",
    hint: "Rechaza el beneficio y declara la situación por el canal de cumplimiento.",
    options: [
      {
        id: "A",
        label: "Aceptarlo en privado si no afecta mucho la decisión.",
        correct: false,
        feedback: "Eso configura un conflicto de interés y puede ser falta grave.",
      },
      {
        id: "B",
        label: "Rechazarlo y declarar la situación por el canal de cumplimiento.",
        correct: true,
        feedback: "Correcto: rechazo + transparencia institucional.",
      },
      {
        id: "C",
        label: "Aceptarlo y repartirlo con el equipo para “equilibrar”.",
        correct: false,
        feedback: "Compartir el beneficio no elimina el conflicto ni la falta ética.",
      },
    ],
  },
};

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
    content: prevencionContent,
    theme: { primary: "#0d6b5c", soft: "#d8f0ea", emoji: "🦺" },
  },
  {
    id: "proteccion-datos",
    title: "Protección de Datos",
    description: "Buenas prácticas para el manejo responsable de información.",
    durationMinutes: 4,
    level: "Básico",
    status: "pendiente",
    progress: 0,
    slug: "proteccion-datos",
    evaluations: 1,
    content: proteccionContent,
    theme: { primary: "#1d4ed8", soft: "#dbeafe", emoji: "🔐" },
  },
  {
    id: "ciberseguridad",
    title: "Ciberseguridad Básica",
    description: "Reconoce amenazas digitales frecuentes en el trabajo.",
    durationMinutes: 5,
    level: "Básico",
    status: "pendiente",
    progress: 0,
    slug: "ciberseguridad",
    evaluations: 1,
    content: ciberContent,
    theme: { primary: "#7c3aed", soft: "#ede9fe", emoji: "🛡️" },
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
    content: clienteContent,
    theme: { primary: "#c2410c", soft: "#ffedd5", emoji: "💬" },
  },
  {
    id: "induccion",
    title: "Inducción Institucional",
    description: "Conoce cultura, procesos y canales de la organización.",
    durationMinutes: 5,
    level: "Básico",
    status: "pendiente",
    progress: 0,
    slug: "induccion",
    evaluations: 1,
    content: induccionContent,
    theme: { primary: "#0f766e", soft: "#ccfbf1", emoji: "🏢" },
  },
  {
    id: "etica",
    title: "Ética y Cumplimiento",
    description: "Identifica conflictos de interés y canales de denuncia.",
    durationMinutes: 4,
    level: "Intermedio",
    status: "pendiente",
    progress: 0,
    slug: "etica",
    evaluations: 1,
    content: eticaContent,
    theme: { primary: "#a16207", soft: "#fef3c7", emoji: "⚖️" },
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id);
}

/** @deprecated usar getCourseBySlug(...).content.steps */
export const capsuleSteps = prevencionContent.steps;
/** @deprecated usar getCourseBySlug(...).content.quiz */
export const quizContent = prevencionContent.quiz;
export const capsuleContent = {
  courseId: MAIN_COURSE_ID,
  totalSteps: prevencionContent.steps.length,
  remainingSeconds: prevencionContent.remainingSeconds,
};
