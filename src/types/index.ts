// ── Reserva ────────────────────────────────────────────────────────────────
export type ReservaEstado = 'pendiente' | 'confirmada' | 'cancelada' | 'completada'

export interface Reserva {
  id: string
  nombre: string
  telefono: string
  fecha: string          // ISO date
  hora: string           // HH:MM
  personas: number
  comentarios?: string
  estado: ReservaEstado
  created_at: string
}

// ── Menú ───────────────────────────────────────────────────────────────────
export type MenuCategoria =
  | 'tapa_incluida'
  | 'tapa_extra'
  | 'tabla'
  | 'plato'
  | 'legendario'
  | 'bebida'

export interface MenuItem {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: MenuCategoria
  imagen_url?: string
  disponible: boolean
  es_favorito: boolean
  chips: string[]        // ['Veggie', 'Picante', 'Gratis']
  created_at: string
  updated_at: string
}

// ── Jarra / Bebestible ──────────────────────────────────────────────────────
export interface Jarra {
  id: string
  nombre: string          // 'Jarra 500ml' | 'Jarra 1L' | 'Copa'
  precio: number
  tapas_incluidas: number
  activa: boolean
}

// ── Métricas dashboard ──────────────────────────────────────────────────────
export interface DashboardMetrics {
  reservas_hoy: number
  reservas_pendientes: number
  reservas_semana: number
  platos_activos: number
  tapas_activas: number
  mesas_disponibles: number
}

// ── Auth ────────────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string
  email: string
  nombre: string
  rol: 'admin' | 'staff'
}
