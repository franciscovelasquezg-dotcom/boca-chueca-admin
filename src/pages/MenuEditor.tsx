import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Toggle } from '../components/ui/Toggle'
import { Pencil, Trash2 } from 'lucide-react'

const categorias = ['tapa_incluida', 'tapa_extra', 'tabla', 'plato', 'legendario'] as const
const labelCategoria: Record<string, string> = {
  tapa_incluida: 'Tapas incluidas',
  tapa_extra:    'Tapas extra',
  tabla:         'Tablas',
  plato:         'Platos',
  legendario:    'Legendario',
}

const items = [
  { id: '1', nombre: 'Papas rústicas merkén',     categoria: 'tapa_incluida', precio: 2600, disponible: true,  es_favorito: true,  chips: ['Veggie', 'Picante'] },
  { id: '2', nombre: 'Croquetas de mechada',       categoria: 'tapa_incluida', precio: 2900, disponible: true,  es_favorito: false, chips: [] },
  { id: '3', nombre: 'Pan con tomate al merkén',   categoria: 'tapa_incluida', precio: 1800, disponible: true,  es_favorito: false, chips: ['Veggie'] },
  { id: '4', nombre: 'Pulpo a la brasa con pebre', categoria: 'tapa_incluida', precio: 4900, disponible: true,  es_favorito: true,  chips: [] },
  { id: '5', nombre: 'Gambas al ajillo',           categoria: 'tapa_extra',    precio: 3800, disponible: true,  es_favorito: false, chips: [] },
  { id: '6', nombre: 'Boquerones fritos',          categoria: 'tapa_extra',    precio: 2900, disponible: false, es_favorito: false, chips: [] },
  { id: '7', nombre: 'Tabla del Conquistador',     categoria: 'tabla',         precio: 28900,disponible: true,  es_favorito: true,  chips: ['Para 4-6'] },
  { id: '8', nombre: 'Tabla del mar',              categoria: 'tabla',         precio: 12900,disponible: true,  es_favorito: true,  chips: ['Para 2-3'] },
  { id: '9', nombre: 'Pulpo entero a la brasa',    categoria: 'legendario',    precio: 19900,disponible: true,  es_favorito: true,  chips: ['Para 2'] },
]

export function MenuEditor() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <p className="text-[#9d8d8a] text-sm">{items.length} items en el menú</p>
        <Button variant="primary" size="sm">+ Agregar plato</Button>
      </div>

      {categorias.map(cat => {
        const catItems = items.filter(i => i.categoria === cat)
        if (!catItems.length) return null

        return (
          <section key={cat}>
            <div className="flex items-center gap-3 mb-3 border-b border-[#504441] pb-2">
              <h3 className="font-display text-[#ecbbb0] italic font-bold text-lg">
                {labelCategoria[cat]}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a]">
                {catItems.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {catItems.map(item => (
                <div
                  key={item.id}
                  className={`
                    bg-[#201f1f] border-2 p-4 transition-all
                    ${item.es_favorito ? 'border-[#eac349]' : 'border-[#504441]'}
                    ${!item.disponible ? 'opacity-50' : ''}
                  `}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-[#e5e2e1] text-sm leading-tight">{item.nombre}</p>
                      <p className="text-[#eac349] font-black text-lg mt-0.5">
                        ${item.precio.toLocaleString('es-CL')}
                      </p>
                    </div>
                    <Toggle active={item.disponible} />
                  </div>

                  {/* Chips */}
                  {item.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.chips.map(c => (
                        <Badge
                          key={c}
                          label={c}
                          variant={c === 'Veggie' ? 'success' : c === 'Picante' ? 'danger' : 'gold'}
                        />
                      ))}
                      {item.es_favorito && <Badge label="★ Favorito" variant="gold" />}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2 pt-2 border-t border-[#504441]/50">
                    <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#9d8d8a] hover:text-[#eac349] transition-colors">
                      <Pencil size={12} /> Editar
                    </button>
                    <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#9d8d8a] hover:text-[#ffb4ab] transition-colors ml-auto">
                      <Trash2 size={12} /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
