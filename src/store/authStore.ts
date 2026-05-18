import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MASTER_KEY = import.meta.env.VITE_MASTER_KEY ?? 'bocachueca2026'

interface AuthStore {
  authenticated: boolean
  login: (key: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authenticated: false,

      login: (key) => {
        if (key === MASTER_KEY) {
          set({ authenticated: true })
          return true
        }
        return false
      },

      logout: () => set({ authenticated: false }),
    }),
    { name: 'boca-auth' }
  )
)
