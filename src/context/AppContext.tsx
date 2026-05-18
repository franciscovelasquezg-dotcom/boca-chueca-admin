import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../services/supabase'
import type { AdminUser } from '../types'

interface AppContextValue {
  user: AdminUser | null
  loading: boolean
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  signOut: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser]               = useState<AdminUser | null>(null)
  const [loading, setLoading]         = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Escucha cambios de sesión de Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser({
            id:     session.user.id,
            email:  session.user.email ?? '',
            nombre: session.user.user_metadata?.nombre ?? 'Admin',
            rol:    session.user.user_metadata?.rol ?? 'admin',
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AppContext.Provider value={{ user, loading, sidebarOpen, setSidebarOpen, signOut }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}
