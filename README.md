# SmartCaps — Laboratorio E-Learning (prototipo)

Prototipo Next.js de **SmartCaps**: microcápsulas interactivas de 3–5 minutos con evaluación inmediata, voz, gamificación (XP, vidas, liga, racha) y panel administrador.

## Requisitos

- Node.js 18+
- npm

## Instalación y arranque (desarrollo)

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de entrega

```bash
npm install
npm run build
npm run start
```

La app queda en [http://localhost:3000](http://localhost:3000) en modo producción.

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio (meta del día, racha, cápsula destacada) |
| `/learning` | Catálogo + acceso a práctica rápida |
| `/learning/practice` | Práctica 60 s (solo quiz) |
| `/learning/[slug]` | Reproductor (pasos + voz + XP) |
| `/learning/[slug]/quiz` | Evaluación (vidas, pista, mascota) |
| `/learning/[slug]/result` | Insignia + compartir / PNG |
| `/progress` | Progreso, liga semanal, insignias |
| `/admin` | KPIs en vivo desde la cohorte |
| `/admin/participants` | Tabla + drawer de participantes |
| `/about-solution` | Propuesta + **checklist demo 90 s** + tips |

## Flujo recomendado para el video (~90 s)

1. **Reset** (header) para partir limpio  
2. Inicio → cápsula **Prevención de Riesgos**  
3. Quiz (fallar 1 + acertar **B**)  
4. Resultado (insignia / PNG)  
5. **Admin** (Paola actualizada)  

Checklist interactivo: `/about-solution`.  
Guion AIDA completo: `guion-video-aida-2min.md`.

## Material del examen

- Presentación: `PaolaCornejo_Examen_IE.pptx` (si está en la carpeta del proyecto)
- Guion video: `guion-video-aida-2min.md`

## Notas

- Datos del panel admin: **demostrativos** (coherentes con la cohorte del prototipo).
- Progreso del aprendiz en `localStorage` (`smartcaps-demo-state-v5`).
- Onboarding de tips: `smartcaps-onboarding-done-v1` (reabrir en Solución → Ver tips).
- Marca: teal `#0d6b5c` · tipografías Outfit + Lexend.
