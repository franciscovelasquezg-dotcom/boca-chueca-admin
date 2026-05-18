import { useState, type FormEvent } from 'react'
import { Plus, Trash2, ExternalLink, BarChart2, TrendingUp, Users, BookOpen } from 'lucide-react'
import { useMarketStore } from '../store/marketStore'
import type { MarketCardType } from '../types/hub'

const typeConfig: Record<MarketCardType, { label: string; color: string; icon: typeof BarChart2 }> = {
  competidor:  { label: 'Competidor',  color: 'border-[#8e241e]  text-[#ecbbb0] bg-[#2b110b]',  icon: Users      },
  tendencia:   { label: 'Tendencia',   color: 'border-[#eac349]  text-[#eac349] bg-[#3c2f00]',  icon: TrendingUp },
  analisis:    { label: 'Análisis',    color: 'border-[#7c3aed]  text-[#c4b5fd] bg-[#1a0d2b]',  icon: BarChart2  },
  referencia:  { label: 'Referencia',  color: 'border-[#16a34a]  text-[#86efac] bg-[#1a2b0d]',  icon: BookOpen   },
}

function NewCardModal({ onClose }: { onClose: () => void }) {
  const addCard = useMarketStore(s => s.addCard)
  const [form, setForm] = useState({
    title: '', description: '', url: '', type: 'competidor' as MarketCardType, tags: '',
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    addCard({
      title: form.title.trim(),
      description: form.description.trim(),
      url: form.url.trim() || undefined,
      type: form.type,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    })
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1c1b1b] border-2 border-[#504441] w-full max-w-md shadow-[4px_4px_0_0_#8e241e]">
        <div className="px-5 py-4 border-b border-[#504441] flex items-center justify-between">
          <h3 className="font-display text-[#ecbbb0] italic font-bold text-lg">Nueva tarjeta</h3>
          <button onClick={onClose} className="text-[#504441] hover:text-[#9d8d8a] text-xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Tipo</label>
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(typeConfig) as [MarketCardType, typeof typeConfig[MarketCardType]][]).map(([k, c]) => (
                <button key={k} type="button" onClick={() => setForm(f => ({...f, type: k}))}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border transition-all ${form.type === k ? c.color : 'border-[#504441] text-[#504441]'}`}
                >{c.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Título *</label>
            <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} autoFocus
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none" placeholder="Nombre del competidor, tendencia..."/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Descripción</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none" placeholder="Notas clave, debilidades, oportunidades..."/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">URL (opcional)</label>
            <input value={form.url} onChange={e => setForm(f=>({...f,url:e.target.value}))} type="url"
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none" placeholder="https://..."/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Tags (separados por coma)</label>
            <input value={form.tags} onChange={e => setForm(f=>({...f,tags:e.target.value}))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none" placeholder="barrio italia, cerveza artesanal..."/>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-2.5 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0_0_#eac349]">Guardar</button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-[#504441] text-[#9d8d8a] text-sm font-bold uppercase">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function MarketResearch() {
  const { cards, removeCard } = useMarketStore()
  const [modal, setModal]   = useState(false)
  const [filter, setFilter] = useState<MarketCardType | 'all'>('all')

  const visible = filter === 'all' ? cards : cards.filter(c => c.type === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === 'all' ? 'bg-[#3c2f00] border-[#eac349] text-[#eac349]' : 'border-[#504441] text-[#504441]'}`}>
            Todas ({cards.length})
          </button>
          {(Object.entries(typeConfig) as [MarketCardType, typeof typeConfig[MarketCardType]][]).map(([k, c]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === k ? c.color : 'border-[#504441] text-[#504441]'}`}>
              {c.label} ({cards.filter(card => card.type === k).length})
            </button>
          ))}
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0_0_#eac349] hover:bg-[#8e241e]/80 transition-all">
          <Plus size={14} /> Nueva tarjeta
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map(card => {
          const cfg = typeConfig[card.type]
          const Icon = cfg.icon
          return (
            <div key={card.id} className="bg-[#201f1f] border border-[#504441] p-4 hover:border-[#9d8d8a] transition-colors group flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 border inline-flex items-center gap-1 ${cfg.color}`}>
                  <Icon size={10} /> {cfg.label}
                </span>
                <button onClick={() => removeCard(card.id)} className="opacity-0 group-hover:opacity-100 text-[#504441] hover:text-[#ffb4ab] transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
              <div>
                <h4 className="font-bold text-[#e5e2e1] text-sm mb-1">{card.title}</h4>
                {card.description && <p className="text-[#9d8d8a] text-xs leading-relaxed">{card.description}</p>}
              </div>
              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {card.tags.map(t => <span key={t} className="text-[9px] text-[#504441] bg-[#131313] px-1.5 py-0.5 uppercase">{t}</span>)}
                </div>
              )}
              {card.url && (
                <a href={card.url} target="_blank" className="flex items-center gap-1 text-[11px] text-[#eac349] hover:text-[#ecbbb0] transition-colors mt-auto font-bold">
                  <ExternalLink size={11} /> Ver enlace
                </a>
              )}
              <p className="text-[9px] text-[#504441] uppercase tracking-wider">{new Date(card.created_at).toLocaleDateString('es-CL')}</p>
            </div>
          )
        })}
        {visible.length === 0 && (
          <p className="col-span-full text-[#504441] text-center py-16 text-sm uppercase tracking-widest">Sin tarjetas. Agrega la primera.</p>
        )}
      </div>

      {modal && <NewCardModal onClose={() => setModal(false)} />}
    </div>
  )
}
