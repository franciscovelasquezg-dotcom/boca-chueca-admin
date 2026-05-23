# CLAUDE.md — Boca Chueca Admin

## Stack
Vite + React 19 + TypeScript + Tailwind CSS v4 + Supabase + Zustand + Vercel

## Contexto
Panel de administración interno para La Tapería Boca Chueca. Gestiona reservas, menú, recetas, ideas, agenda y métricas del negocio. Acceso solo para administradores con master key.

## Estructura
```
src/
  components/
    auth/       → login y protección de rutas
    layout/     → sidebar, navbar
    ui/         → componentes base reutilizables
  context/      → AppContext (estado global)
  hooks/        → custom hooks
  layouts/      → AdminLayout
  lib/
    schemas.ts  → schemas Zod (reserva, menú, receta, idea)
  pages/        → Agenda, Dashboard, InboxIdeas, Login, MenuEditor,
                  MarketResearch, Milestones, RecipeLab, Reservas,
                  Settings, SpecEditor
  services/     → menuService, milestonesService, recipeService,
                  reservasService, supabase
  store/        → authStore, ideaStore, marketStore, recipeStore, taskStore
  types/        → hub.ts, index.ts
  utils/        → nanoid.ts
```

## Reglas
- Supabase como único backend (RLS activado en todas las tablas)
- Formularios con React Hook Form + Zod (`src/lib/schemas.ts`)
- Estado global con Zustand (no Context para estado de negocio)
- Tailwind v4 con `@tailwindcss/vite` — sin tailwind.config.ts
- Puerto de dev: 5173

## Paleta
Dark gastronómico — primary: `#ecbbb0` (coral), tertiary: `#eac349` (dorado), background: `#131313`

## Deploy
Vercel — rama `master`
