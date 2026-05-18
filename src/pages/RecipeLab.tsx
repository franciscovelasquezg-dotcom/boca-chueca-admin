import { useState, type FormEvent } from 'react'
import { Plus, Trash2, ChevronDown, CheckCircle, XCircle, FlaskConical, Clock } from 'lucide-react'
import { useRecipeStore } from '../store/recipeStore'
import type { RecipeStatus, RecipeCategoria } from '../types/hub'

const statusConfig: Record<RecipeStatus, { label: string; color: string; icon: typeof Clock }> = {
  a_probar:  { label: 'A probar',         color: 'border-[#504441]  text-[#9d8d8a] bg-[#1c1b1b]',  icon: Clock        },
  en_prueba: { label: 'En prueba',         color: 'border-[#eac349]  text-[#eac349] bg-[#3c2f00]',  icon: FlaskConical },
  aprobada:  { label: 'Aprobada — Menú',  color: 'border-[#16a34a]  text-[#86efac] bg-[#1a2b0d]',  icon: CheckCircle  },
  descartada:{ label: 'Descartada',        color: 'border-[#8e241e]  text-[#ffb4ab] bg-[#2b110b]',  icon: XCircle      },
}

const categoriasLabel: Record<RecipeCategoria, string> = {
  tapa: 'Tapa', tabla: 'Tabla', plato: 'Plato',
  legendario: 'Legendario', bebida: 'Bebida', postre: 'Postre',
}

function NewRecipeModal({ onClose }: { onClose: () => void }) {
  const addRecipe = useRecipeStore(s => s.addRecipe)
  const [form, setForm] = useState({
    titulo: '', descripcion: '', ingredientes: '', categoria: 'tapa' as RecipeCategoria,
    status: 'a_probar' as RecipeStatus, notas: '',
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    addRecipe({
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim() || undefined,
      ingredientes: form.ingredientes.split(',').map(i => i.trim()).filter(Boolean),
      categoria: form.categoria,
      status: form.status,
      notas: form.notas.trim() || undefined,
    })
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1c1b1b] border-2 border-[#504441] w-full max-w-lg my-4 shadow-[4px_4px_0_0_#eac349]">
        <div className="px-5 py-4 border-b border-[#504441] flex items-center justify-between">
          <h3 className="font-display text-[#ecbbb0] italic font-bold text-lg">Nueva receta</h3>
          <button onClick={onClose} className="text-[#504441] hover:text-[#9d8d8a] text-xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Título *</label>
            <input autoFocus value={form.titulo} onChange={e => setForm(f=>({...f,titulo:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none" placeholder="Nombre de la receta"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Descripción breve</label>
            <textarea rows={2} value={form.descripcion} onChange={e => setForm(f=>({...f,descripcion:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none" placeholder="Concepto, inspiración..."/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Ingredientes clave (separados por coma)</label>
            <textarea rows={2} value={form.ingredientes} onChange={e => setForm(f=>({...f,ingredientes:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none" placeholder="pulpo, pebre, aceite de oliva, limón..."/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Categoría</label>
              <select value={form.categoria} onChange={e => setForm(f=>({...f,categoria:e.target.value as RecipeCategoria}))}
                className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none">
                {Object.entries(categoriasLabel).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Estado</label>
              <select value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value as RecipeStatus}))}
                className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none">
                {Object.entries(statusConfig).map(([v,c]) => <option key={v} value={v}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Notas del chef</label>
            <textarea rows={2} value={form.notas} onChange={e => setForm(f=>({...f,notas:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none" placeholder="Observaciones, sustituciones, temperatura..."/>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0_0_#eac349]">Guardar receta</button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-[#504441] text-[#9d8d8a] text-sm font-bold uppercase">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: ReturnType<typeof useRecipeStore.getState>['recipes'][0] }) {
  const { updateStatus, removeRecipe } = useRecipeStore()
  const [expanded, setExpanded] = useState(false)
  const cfg = statusConfig[recipe.status]
  const Icon = cfg.icon

  const nextStatus: Partial<Record<RecipeStatus, RecipeStatus>> = {
    a_probar: 'en_prueba', en_prueba: 'aprobada',
  }

  return (
    <div className={`bg-[#201f1f] border-l-4 border border-[#504441] transition-all hover:border-[#9d8d8a] ${
      recipe.status === 'aprobada' ? 'border-l-[#16a34a]' :
      recipe.status === 'en_prueba' ? 'border-l-[#eac349]' :
      recipe.status === 'descartada' ? 'border-l-[#8e241e] opacity-60' : 'border-l-[#504441]'
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3 justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#504441] bg-[#131313] px-1.5 py-0.5">
                {categoriasLabel[recipe.categoria]}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 border inline-flex items-center gap-1 ${cfg.color}`}>
                <Icon size={9} /> {cfg.label}
              </span>
            </div>
            <h4 className="font-bold text-[#e5e2e1] text-sm leading-snug">{recipe.titulo}</h4>
            {recipe.descripcion && <p className="text-[#9d8d8a] text-xs mt-1">{recipe.descripcion}</p>}
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-[#504441] hover:text-[#9d8d8a] shrink-0 transition-colors mt-0.5">
            <ChevronDown size={15} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Ingredientes siempre visibles como chips */}
        {recipe.ingredientes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.ingredientes.map(ing => (
              <span key={ing} className="text-[10px] text-[#eac349] bg-[#3c2f00] px-2 py-0.5">{ing}</span>
            ))}
          </div>
        )}

        {/* Expandido */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[#504441]/50 space-y-2">
            {recipe.notas && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#504441] mb-1">Notas</p>
                <p className="text-[#9d8d8a] text-xs">{recipe.notas}</p>
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {nextStatus[recipe.status] && (
                <button onClick={() => updateStatus(recipe.id, nextStatus[recipe.status]!)}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#eac349] hover:text-[#ecbbb0] transition-colors">
                  → Avanzar estado
                </button>
              )}
              {recipe.status !== 'descartada' && (
                <button onClick={() => updateStatus(recipe.id, 'descartada')}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#504441] hover:text-[#ffb4ab] transition-colors">
                  Descartar
                </button>
              )}
              <button onClick={() => removeRecipe(recipe.id)}
                className="ml-auto text-[#504441] hover:text-[#ffb4ab] transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function RecipeLab() {
  const recipes   = useRecipeStore(s => s.recipes)
  const [modal, setModal]   = useState(false)
  const [filter, setFilter] = useState<RecipeStatus | 'all'>('all')

  const visible = filter === 'all' ? recipes : recipes.filter(r => r.status === filter)
  const counts  = Object.keys(statusConfig).reduce((acc, k) => {
    acc[k as RecipeStatus] = recipes.filter(r => r.status === k).length
    return acc
  }, {} as Record<RecipeStatus, number>)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === 'all' ? 'bg-[#3c2f00] border-[#eac349] text-[#eac349]' : 'border-[#504441] text-[#504441]'}`}>
            Todas ({recipes.length})
          </button>
          {(Object.entries(statusConfig) as [RecipeStatus, typeof statusConfig[RecipeStatus]][]).map(([k, c]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === k ? c.color : 'border-[#504441] text-[#504441]'}`}>
              {c.label} ({counts[k]})
            </button>
          ))}
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0_0_#eac349] hover:bg-[#8e241e]/80 transition-all">
          <Plus size={14} /> Nueva receta
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {visible.map(r => <RecipeCard key={r.id} recipe={r} />)}
        {visible.length === 0 && (
          <p className="col-span-full text-[#504441] text-center py-16 text-sm uppercase tracking-widest">Sin recetas en este estado.</p>
        )}
      </div>

      {modal && <NewRecipeModal onClose={() => setModal(false)} />}
    </div>
  )
}
