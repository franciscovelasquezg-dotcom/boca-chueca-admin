import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Check, X, Trash2 } from 'lucide-react'

// Datos hardcodeados — fase 2 conecta Supabase
const reservas = [
  { id: '1', nombre: 'Camila Torres',   telefono: '+56 9 1234 5678', fecha: '2026-05-17', hora: '19:00', personas: 4, estado: 'confirmada', comentarios: '' },
  { id: '2', nombre: 'Rodrigo Soto',    telefono: '+56 9 8765 4321', fecha: '2026-05-17', hora: '20:00', personas: 2, estado: 'pendiente',  comentarios: 'Mesa exterior si hay' },
  { id: '3', nombre: 'Valentina Paz',   telefono: '+56 9 5555 0000', fecha: '2026-05-17', hora: '20:30', personas: 3, estado: 'confirmada', comentarios: '' },
  { id: '4', nombre: 'Felipe Muñoz',    telefono: '+56 9 3333 2222', fecha: '2026-05-18', hora: '21:00', personas: 5, estado: 'pendiente',  comentarios: 'Cumpleaños de mi hijo' },
  { id: '5', nombre: 'Andrea Saavedra', telefono: '+56 9 9999 1111', fecha: '2026-05-18', hora: '19:30', personas: 2, estado: 'cancelada',  comentarios: '' },
]

const estadoBadge = {
  confirmada: 'success', pendiente: 'warning',
  cancelada: 'danger',   completada: 'default',
} as const

export function Reservas() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <p className="text-[#9d8d8a] text-sm">{reservas.length} reservas encontradas</p>
        <Button variant="primary" size="sm">+ Nueva reserva</Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {['Todas', 'Hoy', 'Pendientes', 'Confirmadas', 'Canceladas'].map(f => (
          <button
            key={f}
            className={`
              px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider border
              transition-colors duration-100
              ${f === 'Todas'
                ? 'bg-[#2b110b] border-[#eac349] text-[#eac349]'
                : 'bg-transparent border-[#504441] text-[#9d8d8a] hover:border-[#9d8d8a] hover:text-[#d5c3bf]'
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="border-2 border-[#504441] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0e0e0e]">
            <tr className="border-b-2 border-[#504441]">
              {['Fecha', 'Hora', 'Nombre', 'Tel.', 'Personas', 'Comentarios', 'Estado', 'Acciones'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, i) => (
              <tr
                key={r.id}
                className={`
                  border-b border-[#504441]/50 last:border-0
                  hover:bg-[#201f1f] transition-colors
                  ${i % 2 === 0 ? '' : 'bg-[#1c1b1b]/30'}
                `}
              >
                <td className="px-4 py-3 text-[#d5c3bf] font-mono text-xs">{r.fecha}</td>
                <td className="px-4 py-3 text-[#eac349] font-bold font-mono">{r.hora}</td>
                <td className="px-4 py-3 text-[#e5e2e1] font-medium">{r.nombre}</td>
                <td className="px-4 py-3 text-[#9d8d8a] text-xs">{r.telefono}</td>
                <td className="px-4 py-3 text-[#d5c3bf] text-center">{r.personas}</td>
                <td className="px-4 py-3 text-[#9d8d8a] text-xs max-w-[160px] truncate">
                  {r.comentarios || '—'}
                </td>
                <td className="px-4 py-3">
                  <Badge label={r.estado} variant={estadoBadge[r.estado as keyof typeof estadoBadge]} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 text-[#4ade80] hover:bg-[#14321a] transition-colors"
                      title="Confirmar"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      className="p-1.5 text-[#ffb4aa] hover:bg-[#2b110b] transition-colors"
                      title="Cancelar"
                    >
                      <X size={14} />
                    </button>
                    <button
                      className="p-1.5 text-[#9d8d8a] hover:text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
