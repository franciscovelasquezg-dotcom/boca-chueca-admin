import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from '../utils/nanoid'
import type { Recipe, RecipeStatus, RecipeCategoria } from '../types/hub'

interface RecipeStore {
  recipes: Recipe[]
  addRecipe: (payload: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => void
  updateStatus: (id: string, status: RecipeStatus) => void
  updateRecipe: (id: string, patch: Partial<Recipe>) => void
  removeRecipe: (id: string) => void
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set) => ({
      recipes: [
        {
          id: nanoid(),
          titulo: 'Tapa de papas con merkén y queso de cabra',
          descripcion: 'Variación de papas rústicas agregando queso de cabra fundido encima.',
          ingredientes: ['papas chilotas', 'merkén', 'queso de cabra', 'orégano', 'aceite de oliva'],
          categoria: 'tapa' as RecipeCategoria,
          status: 'a_probar' as RecipeStatus,
          notas: 'Probar con queso mantecoso si no hay de cabra.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: nanoid(),
          titulo: 'Pulpo en escabeche frío',
          descripcion: 'Versión fría del pulpo para ofrecer como tapa de verano.',
          ingredientes: ['pulpo', 'vinagre de vino', 'ají de color', 'laurel', 'cebolla morada'],
          categoria: 'tapa' as RecipeCategoria,
          status: 'en_prueba' as RecipeStatus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: nanoid(),
          titulo: 'Cazuela de mariscos al vermú',
          descripcion: 'Mariscos chilenos en caldo de vermú blanco con ajo y perejil.',
          ingredientes: ['choritos', 'almejas', 'camarones', 'vermú blanco', 'ajo', 'perejil', 'mantequilla'],
          categoria: 'plato' as RecipeCategoria,
          status: 'aprobada' as RecipeStatus,
          notas: 'Aprobada en degustación 15/05/2026. Va al menú legendario.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],

      addRecipe: (payload) =>
        set((s) => ({
          recipes: [
            {
              ...payload,
              id: nanoid(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            ...s.recipes,
          ],
        })),

      updateStatus: (id, status) =>
        set((s) => ({
          recipes: s.recipes.map((r) =>
            r.id === id ? { ...r, status, updated_at: new Date().toISOString() } : r
          ),
        })),

      updateRecipe: (id, patch) =>
        set((s) => ({
          recipes: s.recipes.map((r) =>
            r.id === id ? { ...r, ...patch, updated_at: new Date().toISOString() } : r
          ),
        })),

      removeRecipe: (id) =>
        set((s) => ({ recipes: s.recipes.filter((r) => r.id !== id) })),
    }),
    { name: 'boca-recipes' }
  )
)
