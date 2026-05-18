import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from '../utils/nanoid'
import type { Task, TaskStatus, TaskType, TaskPriority } from '../types/hub'

interface TaskStore {
  tasks: Task[]
  addTask: (payload: { title: string; description?: string; type?: TaskType; priority?: TaskPriority; tags?: string[] }) => Task
  updateStatus: (id: string, status: TaskStatus) => void
  updateTask: (id: string, patch: Partial<Task>) => void
  removeTask: (id: string) => void
  getByStatus: (status: TaskStatus) => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: nanoid(),
          title: 'Definir carta definitiva para apertura',
          description: 'Tapas, tablas, platos y legendario listos para imprimir.',
          status: 'in_progress',
          type: 'ops',
          priority: 'high',
          tags: ['apertura', 'carta'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: nanoid(),
          title: 'Subir dominio personalizado a Vercel',
          description: 'Conectar bocachueca.cl al sitio publicado.',
          status: 'pending',
          type: 'dev',
          priority: 'medium',
          tags: ['web', 'deploy'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: nanoid(),
          title: 'Probar tortilla de papas chilotas con queso',
          status: 'pending',
          type: 'recipe',
          priority: 'low',
          tags: ['receta', 'prueba'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],

      addTask: (payload) => {
        const task: Task = {
          id: nanoid(),
          title: payload.title,
          description: payload.description,
          status: 'pending',
          type: payload.type ?? 'general',
          priority: payload.priority ?? 'medium',
          tags: payload.tags ?? [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        set((s) => ({ tasks: [task, ...s.tasks] }))
        return task
      },

      updateStatus: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, status, updated_at: new Date().toISOString() } : t
          ),
        })),

      updateTask: (id, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, ...patch, updated_at: new Date().toISOString() } : t
          ),
        })),

      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      getByStatus: (status) => get().tasks.filter((t) => t.status === status),
    }),
    { name: 'boca-tasks' }
  )
)
