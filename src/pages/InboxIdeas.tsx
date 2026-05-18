import { useState, type FormEvent } from 'react'
import { Send, ArrowUpRight, CheckCheck, Trash2, Lightbulb, User, Eye, Star } from 'lucide-react'
import { useIdeaStore } from '../store/ideaStore'
import type { IdeaSource } from '../types/hub'

const sourceConfig: Record<IdeaSource, { label: string; color: string; icon: typeof User }> = {
  cliente:     { label: 'Cliente',     color: 'text-[#ecbbb0] border-[#8e241e]  bg-[#2b110b]', icon: User        },
  staff:       { label: 'Staff',       color: 'text-[#93c5fd] border-[#1d4ed8]  bg-[#0d1a2b]', icon: Star        },
  francisco:   { label: 'Francisco',   color: 'text-[#eac349] border-[#cca830]  bg-[#3c2f00]', icon: Lightbulb   },
  observacion: { label: 'Observación', color: 'text-[#86efac] border-[#16a34a]  bg-[#1a2b0d]', icon: Eye         },
}

export function InboxIdeas() {
  const { ideas, addIdea, convertToTask, removeIdea } = useIdeaStore()
  const [text, setText]     = useState('')
  const [source, setSource] = useState<IdeaSource>('cliente')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addIdea(text.trim(), source)
    setText('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 1500)
  }

  const pending   = ideas.filter(i => !i.converted)
  const converted = ideas.filter(i =>  i.converted)

  return (
    <div className="space-y-6 max-w-3xl">

      {/* ── Captura de ideas ── */}
      <div className="border-2 border-[#504441] bg-[#1c1b1b] shadow-[4px_4px_0_0_#8e241e]">
        <div className="px-5 py-3 border-b border-[#504441] flex items-center gap-2">
          <Lightbulb size={16} className="text-[#eac349]" />
          <h2 className="font-display text-[#ecbbb0] italic font-bold text-lg">Captura de Ideas</h2>
          <span className="ml-auto text-[10px] text-[#504441] uppercase tracking-widest">
            Inbox → Agenda automático
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Fuente */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-2">Fuente de la idea</label>
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(sourceConfig) as [IdeaSource, typeof sourceConfig[IdeaSource]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSource(key)}
                  className={`
                    px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border
                    transition-all duration-100
                    ${source === key ? cfg.color : 'bg-transparent border-[#504441] text-[#504441]'}
                  `}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* TextArea */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-2">
              ¿Qué se oyó, se vio o se pensó?
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={
                source === 'cliente'     ? '"La señora de la mesa 3 preguntó si hay algo sin gluten..."' :
                source === 'staff'       ? '"El mozo sugiere agregar una opción sin alcohol al menú de jarras..."' :
                source === 'francisco'   ? '"Idea: ofrecer tabla del día según lo que llegó en el camión..."' :
                '"Observé que los clientes siempre preguntan por el baño apenas se sientan..."'
              }
              className="
                w-full bg-[#131313] border-2 border-[#504441]
                focus:border-[#eac349] text-[#e5e2e1] text-sm
                px-4 py-3 outline-none resize-none transition-colors
                placeholder:text-[#504441]
              "
            />
            <p className="text-right text-[10px] text-[#504441] mt-1">{text.length} caracteres</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!text.trim()}
              className="
                flex items-center gap-2 px-6 py-2.5
                bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-sm
                shadow-[3px_3px_0_0_#eac349] hover:bg-[#8e241e]/80
                disabled:opacity-40 disabled:cursor-not-allowed
                active:shadow-none active:translate-x-0.5 active:translate-y-0.5
                transition-all duration-100
              "
            >
              <Send size={14} />
              Capturar idea
            </button>
            {success && (
              <span className="flex items-center gap-1 text-[#4ade80] text-xs font-bold uppercase tracking-wider animate-pulse">
                <CheckCheck size={13} /> ¡Guardada!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* ── Ideas pendientes ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-display text-[#e5e2e1] italic font-bold text-lg">Por convertir</h3>
          <span className="bg-[#8e241e] text-[#ffb4aa] text-[10px] font-black px-2 py-0.5">{pending.length}</span>
        </div>

        {pending.length === 0 && (
          <p className="text-[#504441] text-sm text-center py-10 border border-[#504441]/30 uppercase tracking-widest">
            Sin ideas pendientes — todo convertido
          </p>
        )}

        <div className="space-y-2">
          {pending.map(idea => {
            const cfg = sourceConfig[idea.source]
            return (
              <div key={idea.id} className="bg-[#201f1f] border border-[#504441] p-4 flex gap-3 hover:border-[#9d8d8a] transition-colors group">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e5e2e1] text-sm leading-relaxed">{idea.text}</p>
                  <p className="text-[#504441] text-[10px] mt-1 uppercase tracking-wider">
                    {new Date(idea.created_at).toLocaleString('es-CL')}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => convertToTask(idea.id)}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#eac349] hover:text-[#ecbbb0] transition-colors whitespace-nowrap"
                    title="Convertir en tarea"
                  >
                    <ArrowUpRight size={13} /> A Agenda
                  </button>
                  <button
                    onClick={() => removeIdea(idea.id)}
                    className="text-[#504441] hover:text-[#ffb4ab] transition-colors self-start"
                    title="Eliminar"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Ideas convertidas ── */}
      {converted.length > 0 && (
        <section>
          <h3 className="font-display text-[#504441] italic font-bold text-base mb-3 flex items-center gap-2">
            <CheckCheck size={16} /> Convertidas en tarea ({converted.length})
          </h3>
          <div className="space-y-1.5">
            {converted.map(idea => (
              <div key={idea.id} className="bg-[#1c1b1b] border border-[#504441]/40 px-4 py-2.5 flex items-center gap-3 opacity-60">
                <CheckCheck size={13} className="text-[#4ade80] shrink-0" />
                <p className="text-[#9d8d8a] text-sm truncate">{idea.text}</p>
                <span className="ml-auto text-[10px] text-[#504441] uppercase tracking-wider shrink-0">
                  {sourceConfig[idea.source].label}
                </span>
                <button onClick={() => removeIdea(idea.id)} className="text-[#504441] hover:text-[#ffb4ab] transition-colors shrink-0">
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
