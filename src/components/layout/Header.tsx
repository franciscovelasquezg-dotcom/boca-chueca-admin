import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useIdeaStore } from '../../store/ideaStore'
import { useTaskStore }  from '../../store/taskStore'

const pageTitles: Record<string, { title: string; sub: string }> = {
  '/':           { title: 'Dashboard',         sub: 'Resumen'            },
  '/reservas':   { title: 'Reservas',          sub: 'Gestión'            },
  '/menu':       { title: 'Editor Menú',       sub: 'Carta'              },
  '/jarras':     { title: 'Jarras',            sub: 'Bebestibles'        },
  '/legendario': { title: 'Legendario',        sub: 'Platos estrella'    },
  '/agenda':     { title: 'Agenda',            sub: 'Kanban'             },
  '/inbox':      { title: 'Inbox Ideas',       sub: 'Captura'            },
  '/mercado':    { title: 'Mercado',           sub: 'Investigación'      },
  '/recetas':    { title: 'Lab Recetas',       sub: 'Desarrollo'         },
  '/settings':   { title: 'Ajustes',           sub: 'Config'             },
}

export function Header() {
  const { pathname }    = useLocation()
  const page            = pageTitles[pathname] ?? { title: pathname.slice(1), sub: '' }
  const pendingIdeas    = useIdeaStore((s) => s.ideas.filter(i => !i.converted).length)
  const pendingTasks    = useTaskStore((s) => s.tasks.filter(t => t.status === 'pending').length)

  return (
    <div className="flex items-center justify-between w-full h-full">
      <div className="ml-2 md:ml-0">
        <h1 className="font-display text-[#ecbbb0] font-black italic text-base sm:text-lg leading-tight">{page.title}</h1>
        <p className="text-[9px] sm:text-[10px] text-[#9d8d8a] uppercase tracking-wider hidden sm:block">{page.sub}</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-[#504441]">
          <span className="text-[11px] text-[#9d8d8a]">
            <span className="text-[#eac349] font-bold">{pendingTasks}</span> tareas
          </span>
          <span className="text-[11px] text-[#9d8d8a]">
            <span className="text-[#ffb4aa] font-bold">{pendingIdeas}</span> ideas
          </span>
        </div>
        <button className="relative p-1.5 text-[#9d8d8a] hover:text-[#ecbbb0] transition-colors">
          <Bell size={16} />
          {(pendingIdeas + pendingTasks) > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8e241e] rounded-full" />
          )}
        </button>
        <div className="w-7 h-7 bg-[#2b110b] border border-[#8e241e] flex items-center justify-center">
          <span className="text-[#ecbbb0] font-black text-[10px]">FV</span>
        </div>
      </div>
    </div>
  )
}
