import {
  CalendarCheck, Clock, UtensilsCrossed,
  Beer, TrendingUp, Users,
} from 'lucide-react'
import { MetricCard } from '../components/ui/MetricCard'
import { Badge } from '../components/ui/Badge'

// Datos hardcodeados — se reemplazarán con Supabase en la siguiente fase
const metricas = {
  reservas_hoy:        4,
  reservas_pendientes: 2,
  reservas_semana:    18,
  platos_activos:     12,
  tapas_activas:      10,
  personas_hoy:       14,
}

const reservasHoy = [
  { id: '1', nombre: 'Camila Torres',   hora: '19:00', personas: 4, estado: 'confirmada' as const },
  { id: '2', nombre: 'Rodrigo Soto',    hora: '20:00', personas: 2, estado: 'pendiente'  as const },
  { id: '3', nombre: 'Valentina Paz',   hora: '20:30', personas: 3, estado: 'confirmada' as const },
  { id: '4', nombre: 'Felipe Muñoz',    hora: '21:00', personas: 5, estado: 'pendiente'  as const },
]

const estadoBadge = {
  confirmada: 'success',
  pendiente:  'warning',
  cancelada:  'danger',
  completada: 'default',
} as const

export function Dashboard() {
  const hoy = new Date().toLocaleDateString('es-CL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="space-y-8">

      {/* Bienvenida */}
      <div className="border-b-2 border-[#504441] pb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">
          {hoy.charAt(0).toUpperCase() + hoy.slice(1)}
        </p>
        <h2 className="font-display text-[#ecbbb0] italic font-black text-3xl">
          Buenas noches, Francisco.
        </h2>
        <p className="text-[#d5c3bf] text-sm mt-1">
          Tienes <span className="text-[#eac349] font-bold">{metricas.reservas_pendientes} reservas pendientes</span> de confirmar hoy.
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Reservas hoy"
          value={metricas.reservas_hoy}
          subtitle={`${metricas.personas_hoy} personas en total`}
          icon={CalendarCheck}
          accent="gold"
          trend={{ value: 33, label: 'vs ayer' }}
        />
        <MetricCard
          title="Pendientes"
          value={metricas.reservas_pendientes}
          subtitle="Requieren confirmación"
          icon={Clock}
          accent="red"
        />
        <MetricCard
          title="Esta semana"
          value={metricas.reservas_semana}
          subtitle="Reservas confirmadas"
          icon={TrendingUp}
          accent="default"
          trend={{ value: 12, label: 'vs semana pasada' }}
        />
        <MetricCard
          title="Tapas activas"
          value={metricas.tapas_activas}
          subtitle="En carta hoy"
          icon={UtensilsCrossed}
          accent="default"
        />
        <MetricCard
          title="Platos activos"
          value={metricas.platos_activos}
          subtitle="Tablas + platos + legendario"
          icon={Beer}
          accent="default"
        />
        <MetricCard
          title="Ocupación hoy"
          value={`${Math.round((metricas.personas_hoy / 40) * 100)}%`}
          subtitle="14 / 40 personas"
          icon={Users}
          accent="green"
        />
      </div>

      {/* Reservas del día */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[#e5e2e1] italic font-bold text-xl">
            Reservas de hoy
          </h3>
          <a href="/reservas" className="text-[11px] font-bold uppercase tracking-wider text-[#9d8d8a] hover:text-[#eac349] transition-colors">
            Ver todas →
          </a>
        </div>

        <div className="border-2 border-[#504441] overflow-hidden">
          {/* Header tabla */}
          <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-[#0e0e0e] border-b border-[#504441]">
            {['Hora', 'Nombre', 'Personas', 'Estado'].map(h => (
              <p key={h} className="text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a]">{h}</p>
            ))}
          </div>
          {/* Filas */}
          {reservasHoy.map((r, i) => (
            <div
              key={r.id}
              className={`
                grid grid-cols-4 gap-4 px-4 py-3 items-center
                border-b border-[#504441]/50 last:border-0
                hover:bg-[#201f1f] transition-colors duration-100
                ${i % 2 === 0 ? '' : 'bg-[#1c1b1b]/40'}
              `}
            >
              <p className="font-bold text-[#eac349] text-sm font-mono">{r.hora}</p>
              <p className="text-[#e5e2e1] text-sm font-medium">{r.nombre}</p>
              <p className="text-[#d5c3bf] text-sm">{r.personas} personas</p>
              <Badge label={r.estado} variant={estadoBadge[r.estado]} />
            </div>
          ))}
        </div>
      </section>

      {/* Accesos rápidos */}
      <section>
        <h3 className="font-display text-[#e5e2e1] italic font-bold text-xl mb-4">Acciones rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/reservas', label: 'Nueva reserva',  color: 'border-[#8e241e] text-[#ffb4aa]' },
            { href: '/menu',     label: 'Editar menú',    color: 'border-[#eac349] text-[#eac349]' },
            { href: '/jarras',   label: 'Ver jarras',     color: 'border-[#504441] text-[#d5c3bf]' },
            { href: '/legendario', label: 'Legendario',   color: 'border-[#504441] text-[#d5c3bf]' },
          ].map(a => (
            <a
              key={a.href}
              href={a.href}
              className={`
                flex items-center justify-center py-4 px-3
                bg-[#201f1f] border-2 ${a.color}
                text-[11px] font-bold uppercase tracking-wider text-center
                hover:bg-[#2a2a2a] transition-colors duration-100
              `}
            >
              {a.label}
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
