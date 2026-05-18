import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import { Sidebar }       from '../components/layout/Sidebar'
import { useIdeaStore }  from '../store/ideaStore'
import { useTaskStore }  from '../store/taskStore'

const pageTitles: Record<string, string> = {
  '/':           'Dashboard',
  '/reservas':   'Reservas',
  '/menu':       'Editor Menú',
  '/jarras':     'Jarras',
  '/legendario': 'Legendario',
  '/agenda':     'Agenda',
  '/inbox':      'Inbox Ideas',
  '/mercado':    'Mercado',
  '/recetas':    'Lab Recetas',
  '/settings':   'Ajustes',
}

export function AdminLayout() {
  const [sidebarOpen,  setSidebarOpen]  = useState(true)
  const [mobileDrawer, setMobileDrawer] = useState(false)
  const { pathname }    = useLocation()
  const pendingIdeas    = useIdeaStore(s => s.ideas.filter(i => !i.converted).length)
  const pendingTasks    = useTaskStore(s => s.tasks.filter(t => t.status === 'pending').length)
  const title           = pageTitles[pathname] ?? pathname.slice(1)

  return (
    <div className="flex w-full min-h-screen bg-[#131313]">

      {/* Sidebar desktop */}
      <div className="hidden md:flex shrink-0">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Drawer móvil */}
      {mobileDrawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileDrawer(false)} />
          <div className="absolute left-0 top-0 h-full z-10">
            <Sidebar open={true} setOpen={() => setMobileDrawer(false)} />
          </div>
        </div>
      )}

      {/* Columna contenido */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Header único */}
        <header className="h-14 px-4 flex items-center gap-3 bg-[#131313] border-b-2 border-[#504441] sticky top-0 z-20 shrink-0">
          {/* Hamburguesa móvil */}
          <button className="md:hidden text-[#9d8d8a] hover:text-[#ecbbb0] p-1 shrink-0" onClick={() => setMobileDrawer(true)}>
            <Menu size={20} />
          </button>

          {/* Título */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[#ecbbb0] font-black italic text-base sm:text-lg leading-tight truncate">{title}</h1>
          </div>

          {/* Indicadores */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-[#504441]">
              <span className="text-[11px] text-[#9d8d8a]"><span className="text-[#eac349] font-bold">{pendingTasks}</span> tareas</span>
              <span className="text-[11px] text-[#9d8d8a]"><span className="text-[#ffb4aa] font-bold">{pendingIdeas}</span> ideas</span>
            </div>
            <button className="relative p-1.5 text-[#9d8d8a] hover:text-[#ecbbb0] transition-colors">
              <Bell size={16} />
              {(pendingIdeas + pendingTasks) > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-[#8e241e] rounded-full" />}
            </button>
            <div className="w-7 h-7 bg-[#2b110b] border border-[#8e241e] flex items-center justify-center">
              <span className="text-[#ecbbb0] font-black text-[10px]">FV</span>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
