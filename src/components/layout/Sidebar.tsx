import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, UtensilsCrossed,
  Beer, Star, Settings, ChevronLeft, ChevronRight,
  ClipboardList, Lightbulb, BarChart2, FlaskConical,
  LogOut, ExternalLink, FileText,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useTaskStore }  from '../../store/taskStore'
import { useIdeaStore }  from '../../store/ideaStore'

const OPERACIONES = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard'     },
  { to: '/reservas',  icon: CalendarCheck,   label: 'Reservas'      },
  { to: '/menu',      icon: UtensilsCrossed, label: 'Editor Menú'   },
  { to: '/jarras',    icon: Beer,            label: 'Jarras'        },
  { to: '/legendario',icon: Star,            label: 'Legendario'    },
]


interface SidebarProps {
  open: boolean
  setOpen: (v: boolean) => void
}

function NavItem({ to, icon: Icon, label, open, badge }: {
  to: string; icon: typeof LayoutDashboard; label: string; open: boolean; badge?: number
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => `
        relative flex items-center gap-3 px-3 py-2.5 mx-2 mb-0.5
        text-[12px] font-bold uppercase tracking-wider
        border-l-2 transition-all duration-100
        ${isActive
          ? 'bg-[#2b110b] text-[#ecbbb0] border-[#eac349]'
          : 'text-[#9d8d8a] border-transparent hover:bg-[#201f1f] hover:text-[#d5c3bf] hover:border-[#504441]'
        }
      `}
    >
      <Icon size={16} className="shrink-0" />
      {open && <span className="whitespace-nowrap truncate">{label}</span>}
      {badge != null && badge > 0 && (
        <span className="ml-auto bg-[#8e241e] text-[#ffb4aa] text-[10px] font-black px-1.5 py-0.5 min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const logout   = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const pendingTasks = useTaskStore((s) => s.tasks.filter(t => t.status === 'pending').length)
  const pendingIdeas = useIdeaStore((s) => s.ideas.filter(i => !i.converted).length)

  const handleLogout = () => { logout(); navigate('/login', { replace: true }) }

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 bg-[#0e0e0e] border-r-2 border-[#504441] transition-all duration-200 z-30 shrink-0"
      style={{ width: open ? 220 : 56 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 h-14 border-b-2 border-[#504441] shrink-0 overflow-hidden">
        <div className="w-7 h-7 bg-[#8e241e] border border-[#eac349] flex items-center justify-center shrink-0">
          <span className="text-[#eac349] font-black text-[10px] italic">BC</span>
        </div>
        {open && (
          <div className="overflow-hidden">
            <p className="font-display text-[#ecbbb0] font-black italic text-sm leading-tight whitespace-nowrap">Boca Chueca</p>
            <p className="text-[#504441] text-[9px] uppercase tracking-widest whitespace-nowrap">Hub Interno</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {/* Sección Operaciones */}
        {open && (
          <p className="px-5 mb-1 text-[9px] font-black uppercase tracking-widest text-[#504441]">Operaciones</p>
        )}
        {OPERACIONES.map(item => (
          <NavItem key={item.to} {...item} open={open} />
        ))}

        {/* Divisor */}
        <div className="my-3 mx-4 border-t border-[#504441]/50" />

        {/* Sección Hub */}
        {open && (
          <p className="px-5 mb-1 text-[9px] font-black uppercase tracking-widest text-[#504441]">Hub Dev</p>
        )}
        <NavItem to="/agenda"  icon={ClipboardList} label="Agenda"      open={open} badge={pendingTasks} />
        <NavItem to="/inbox"   icon={Lightbulb}     label="Inbox Ideas" open={open} badge={pendingIdeas} />
        <NavItem to="/mercado" icon={BarChart2}      label="Mercado"     open={open} />
        <NavItem to="/recetas" icon={FlaskConical}   label="Lab Recetas" open={open} />

        {/* Divisor */}
        <div className="my-3 mx-4 border-t border-[#504441]/50" />

        <NavItem to="/spec"     icon={FileText}  label="Spec Proyecto" open={open} />
        <NavItem to="/settings" icon={Settings} label="Ajustes"       open={open} />
      </nav>

      {/* Footer */}
      <div className="border-t-2 border-[#504441] shrink-0">
        {/* Sitio web */}
        <a
          href="https://taperia-boca-chueca.vercel.app"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2.5 text-[#504441] hover:text-[#9d8d8a] hover:bg-[#1c1b1b] transition-colors"
          title="Ver sitio web"
        >
          <ExternalLink size={14} className="shrink-0" />
          {open && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Ver sitio</span>}
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[#504441] hover:text-[#ffb4ab] hover:bg-[#1c1b1b] transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={14} className="shrink-0" />
          {open && <span className="text-[11px] font-bold uppercase tracking-wider">Salir</span>}
        </button>

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-center h-9 text-[#504441] hover:text-[#eac349] hover:bg-[#1c1b1b] transition-colors border-t border-[#504441]/50"
        >
          {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </aside>
  )
}
