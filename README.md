# SmartCaps — Laboratorio E-Learning (prototipo)

Prototipo Next.js de **SmartCaps**: microcápsulas interactivas de 3–5 minutos con evaluación inmediata, modo audio, insignias y panel administrador.

## Requisitos

- Node.js 18+
- npm

## Instalación y arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio aprendiz (meta semanal + cápsula destacada) |
| `/learning` | Catálogo de microcápsulas |
| `/learning/prevencion-riesgos` | Reproductor + modo solo audio |
| `/learning/prevencion-riesgos/quiz` | Evaluación (A/B/C; B correcta; reintentos ilimitados) |
| `/learning/prevencion-riesgos/result` | Completitud e insignia |
| `/progress` | Progreso e insignias del aprendiz |
| `/admin` | KPIs, gráficos, filtros y exportación simulada |
| `/admin/participants` | Búsqueda y detalle (drawer) de participantes |
| `/about-solution` | Comparación de solución y segmentos |

## Material del examen (video / PPT)

Para la demo del video de examen, usa la presentación:

**`PaolaCornejo_Examen_IE.pptx`**

El guion AIDA del video está en `guion-video-aida-2min.md`.

## Notas

- Los datos del panel admin son **demostrativos**.
- El estado de la demo (audio, quiz, completitud) se guarda en `localStorage`.
- Marca: teal `#0d6b5c` · tipografías Outfit + Lexend.
