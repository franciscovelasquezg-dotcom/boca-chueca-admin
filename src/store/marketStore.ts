import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from '../utils/nanoid'
import type { MarketCard, MarketCardType } from '../types/hub'

interface MarketStore {
  cards: MarketCard[]
  addCard: (payload: Omit<MarketCard, 'id' | 'created_at'>) => void
  removeCard: (id: string) => void
  updateCard: (id: string, patch: Partial<MarketCard>) => void
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      cards: [
        {
          id: nanoid(),
          title: 'La Tasca Española — Santiago',
          description: 'Tapería tradicional en Bellavista. Precios altos, sin concepto chileno. Debilidad: no personalizan.',
          url: '',
          type: 'competidor' as MarketCardType,
          tags: ['competidor', 'bellavista'],
          created_at: new Date().toISOString(),
        },
        {
          id: nanoid(),
          title: 'Tendencia: bar de autor low-cost',
          description: 'En Europa están creciendo bares con identidad fuerte y precios populares. Exactamente lo que es Boca Chueca.',
          type: 'tendencia' as MarketCardType,
          tags: ['tendencia', 'europa', 'low-cost'],
          created_at: new Date().toISOString(),
        },
      ],

      addCard: (payload) =>
        set((s) => ({
          cards: [{ ...payload, id: nanoid(), created_at: new Date().toISOString() }, ...s.cards],
        })),

      removeCard: (id) =>
        set((s) => ({ cards: s.cards.filter((c) => c.id !== id) })),

      updateCard: (id, patch) =>
        set((s) => ({
          cards: s.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
    }),
    { name: 'boca-market' }
  )
)
