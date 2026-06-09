# Distro — Landing

Plataforma de gestión comercial con IA para equipos de ventas en campo. Landing
construida con **Next.js 14 (App Router) + TypeScript + Tailwind**, portada 1:1
desde el prototipo HTML original (cursor custom, grilla reactiva, magnetic
buttons, tilt 3D, scatter plot, scramble, ripple y count-up con
IntersectionObserver).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Estructura

```
app/
  layout.tsx              # fuentes, metadata, iconos Tabler, Providers
  page.tsx                # composición de las secciones
  providers.tsx          # CursorProvider + ModalProvider + modales
  globals.css            # todos los estilos + variables de tema
  api/demo-request/route.ts   # endpoint del formulario (stub listo para conectar)
components/
  Navbar, Hero, KpiStrip, Features, ScatterPlot,
  ScrambleSection, Industries, CtaSection, DemoModal, FormModal
  MagneticButton, TiltCard, GridCanvas         # piezas reutilizables
lib/
  cursor.tsx             # cursor custom + hooks useMagnetic / useTilt
  modal.tsx              # estado global de los modales (+ cierre con Esc)
  animate.ts             # helper de count-up
```

## Tema

Los colores viven como variables CSS en `app/globals.css` y están espejados en
`tailwind.config.ts`:

| Token        | Valor     |
| ------------ | --------- |
| accent       | `#BA7517` |
| accent-dark  | `#854F0B` |
| accent-light | `#FAEEDA` |

## Formulario

El submit valida el email y muestra la pantalla de éxito. Ya hace `POST` a
`/api/demo-request` (no bloqueante). Para conectarlo de verdad, completá el
handler en `app/api/demo-request/route.ts` (email / CRM / DB).

## Deploy en Vercel

El repo incluye `vercel.json`. Importá el proyecto en Vercel (o
`vercel --prod`); detecta Next.js automáticamente, sin configuración extra.
