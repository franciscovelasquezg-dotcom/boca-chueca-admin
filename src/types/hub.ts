// ─── AGENDA / TAREAS ──────────────────────────────────────────────────────────

export type TaskStatus = 'pending' | 'in_progress' | 'done'
export type TaskType   = 'user_feedback' | 'dev' | 'ops' | 'recipe' | 'market' | 'general'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  type: TaskType
  priority: TaskPriority
  created_at: string
  updated_at: string
  tags: string[]
}

// ─── INBOX DE IDEAS ───────────────────────────────────────────────────────────

export type IdeaSource = 'cliente' | 'staff' | 'francisco' | 'observacion'

export interface Idea {
  id: string
  text: string
  source: IdeaSource
  converted: boolean          // true cuando se convirtió en Task
  task_id?: string            // id de la Task que generó
  created_at: string
}

// ─── INVESTIGACIÓN DE MERCADO ─────────────────────────────────────────────────

export type MarketCardType = 'competidor' | 'tendencia' | 'analisis' | 'referencia'

export interface MarketCard {
  id: string
  title: string
  description: string
  url?: string
  type: MarketCardType
  tags: string[]
  created_at: string
}

// ─── LABORATORIO DE RECETAS ───────────────────────────────────────────────────

export type RecipeStatus = 'a_probar' | 'en_prueba' | 'aprobada' | 'descartada'
export type RecipeCategoria = 'tapa' | 'tabla' | 'plato' | 'legendario' | 'bebida' | 'postre'

export interface Recipe {
  id: string
  titulo: string
  descripcion?: string
  ingredientes: string[]      // lista de ingredientes clave
  categoria: RecipeCategoria
  status: RecipeStatus
  notas?: string
  created_at: string
  updated_at: string
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────

export interface AuthState {
  authenticated: boolean
  token: string | null
}
