import { useState } from 'react'
import { Check, X, Pencil, ExternalLink, FileText } from 'lucide-react'

// ─── Tipos mínimos (espejo del portal) ───────────────────────────────────────
type FaseEstado = 'completada' | 'en_curso' | 'pendiente'

interface Fase {
  id: string; numero: number; nombre: string
  descripcion: string; fechaEstimada: string
  estado: FaseEstado; entregables: string[]
}

// ─── Store compartido con el portal (misma key localStorage) ─────────────────
const SPEC_KEY = 'boca-spec'

function loadSpec() {
  try {
    const raw = localStorage.getItem(SPEC_KEY)
    if (!raw) return null
    return JSON.parse(raw)?.state?.spec ?? null
  } catch { return null }
}

function saveSpec(spec: Record<string, unknown>) {
  try {
    const existing = localStorage.getItem(SPEC_KEY)
    const state    = existing ? JSON.parse(existing) : { state: {} }
    state.state.spec = { ...spec, ultimaActualizacion: new Date().toISOString() }
    localStorage.setItem(SPEC_KEY, JSON.stringify(state))
    return true
  } catch { return false }
}

// ─── Field editable inline ────────────────────────────────────────────────────
function EditField({ label, value, onSave, multiline = false }: {
  label: string; value: string; onSave: (v: string) => void; multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(value)
  const commit = () => { if (draft.trim()) onSave(draft.trim()); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (!editing) return (
    <div className="group/ef">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">{label}</p>
      <div className="flex items-start gap-2">
        <p className="text-[#e5e2e1] text-sm leading-relaxed flex-1 whitespace-pre-line">{value || '—'}</p>
        <button onClick={() => { setDraft(value); setEditing(true) }}
          className="opacity-0 group-hover/ef:opacity-100 text-[#504441] hover:text-[#eac349] transition-all shrink-0 p-1">
          <Pencil size={12} />
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#eac349] mb-1">{label}</p>
      {multiline
        ? <textarea rows={4} value={draft} onChange={e => setDraft(e.target.value)} autoFocus
            className="w-full bg-[#0e0e0e] border-2 border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none" />
        : <input value={draft} onChange={e => setDraft(e.target.value)} autoFocus
            className="w-full bg-[#0e0e0e] border-2 border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none" />
      }
      <div className="flex gap-2 mt-1.5">
        <button onClick={commit} className="flex items-center gap-1 text-[10px] font-bold text-[#4ade80] uppercase tracking-wider">
          <Check size={11} /> Guardar
        </button>
        <button onClick={cancel} className="flex items-center gap-1 text-[10px] font-bold text-[#504441] uppercase tracking-wider">
          <X size={11} /> Cancelar
        </button>
      </div>
    </div>
  )
}

const ESTADO_CFG: Record<FaseEstado, { label: string; color: string }> = {
  completada: { label: '✅ Completada', color: 'bg-[#14321a] text-[#4ade80] border-[#4ade80]' },
  en_curso:   { label: '🔄 En curso',   color: 'bg-[#3c2f00] text-[#eac349] border-[#eac349]' },
  pendiente:  { label: '⏳ Pendiente',  color: 'bg-[#1c1b1b] text-[#9d8d8a] border-[#504441]' },
}

// ─── Vista principal ──────────────────────────────────────────────────────────
export function SpecEditor() {
  const [spec, setSpec] = useState(() => loadSpec())
  const [saved, setSaved] = useState(false)

  if (!spec) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <FileText size={40} className="text-[#504441]" />
      <p className="text-[#9d8d8a] text-sm uppercase tracking-wider">Spec no encontrado</p>
      <p className="text-[#504441] text-xs">Entra al Portal del Socio primero para inicializar el spec.</p>
      <a href="https://boca-chueca-socio.vercel.app/spec" target="_blank"
        className="flex items-center gap-2 px-4 py-2 border border-[#eac349] text-[#eac349] text-sm font-bold uppercase tracking-wider hover:bg-[#3c2f00] transition-colors">
        <ExternalLink size={14} /> Abrir Portal del Socio
      </a>
    </div>
  )

  const update = (key: string, value: unknown) => {
    const updated = { ...spec, [key]: value }
    setSpec(updated)
    saveSpec(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateFase = (id: string, estado: FaseEstado) => {
    const fases = spec.fases.map((f: Fase) => f.id === id ? { ...f, estado } : f)
    update('fases', fases)
  }

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[#9d8d8a] text-xs uppercase tracking-wider mb-1">
            Editor del Spec · v{spec.version} · {new Date(spec.ultimaActualizacion).toLocaleDateString('es-CL')}
          </p>
          <h1 className="font-display italic font-bold text-[#eac349] text-2xl">{spec.nombreComercial}</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1 text-[#4ade80] text-xs font-bold uppercase tracking-wider">
              <Check size={13} /> Guardado
            </span>
          )}
          <a href="https://boca-chueca-socio.vercel.app/spec" target="_blank"
            className="flex items-center gap-2 px-4 py-2 border border-[#504441] text-[#9d8d8a] text-xs font-bold uppercase tracking-wider hover:border-[#eac349] hover:text-[#eac349] transition-colors">
            <ExternalLink size={12} /> Ver en portal socio
          </a>
        </div>
      </div>

      {/* Concepto */}
      <div className="bg-[#1c1b1b] border-2 border-[#504441] p-6 space-y-5">
        <h2 className="font-display italic font-bold text-[#ecbbb0] text-lg border-b border-[#504441] pb-2">Concepto del Negocio</h2>
        <EditField label="Propuesta de valor" value={spec.propuestaDeValor} multiline onSave={v => update('propuestaDeValor', v)} />
        <EditField label="Concepto completo"  value={spec.concepto}        multiline onSave={v => update('concepto', v)} />
        <EditField label="Público objetivo"   value={spec.publicoObjetivo} multiline onSave={v => update('publicoObjetivo', v)} />
        <EditField label="Ubicación objetivo" value={spec.ubicacion}               onSave={v => update('ubicacion', v)} />
        <EditField label="Horario"            value={spec.horario}                  onSave={v => update('horario', v)} />
        <EditField label="Modelo de negocio"  value={spec.modeloNegocio}  multiline onSave={v => update('modeloNegocio', v)} />
      </div>

      {/* Fases — control de estado */}
      <div className="bg-[#1c1b1b] border-2 border-[#504441] p-6">
        <h2 className="font-display italic font-bold text-[#ecbbb0] text-lg border-b border-[#504441] pb-2 mb-5">
          Hoja de Ruta — Control de Fases
        </h2>
        <p className="text-[#9d8d8a] text-xs uppercase tracking-wider mb-4">
          Cambia el estado de cada fase — se actualiza en el portal del socio al instante.
        </p>
        <div className="space-y-4">
          {spec.fases.map((fase: Fase) => (
            <div key={fase.id} className="border border-[#504441] p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[#9d8d8a] text-[10px] uppercase tracking-wider">Fase {fase.numero}</p>
                <p className="font-display italic font-bold text-[#e5e2e1]">{fase.nombre}</p>
                <p className="text-[#9d8d8a] text-xs mt-1">{fase.fechaEstimada}</p>
              </div>
              {/* Selector de estado */}
              <div className="flex gap-2 flex-wrap shrink-0">
                {(Object.entries(ESTADO_CFG) as [FaseEstado, typeof ESTADO_CFG[FaseEstado]][]).map(([k, c]) => (
                  <button key={k} onClick={() => updateFase(fase.id, k)}
                    className={`
                      px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all min-h-[36px]
                      ${fase.estado === k ? c.color : 'border-[#504441] text-[#504441] hover:border-[#9d8d8a]'}
                    `}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Socios — participación */}
      <div className="bg-[#1c1b1b] border-2 border-[#504441] p-6 space-y-4">
        <h2 className="font-display italic font-bold text-[#ecbbb0] text-lg border-b border-[#504441] pb-2">Socios</h2>
        {spec.socios.map((s: { nombre: string; rol: string; participacion: string }, i: number) => (
          <div key={i} className="border border-[#504441] p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <EditField label="Nombre" value={s.nombre} onSave={v => {
              const socios = [...spec.socios]; socios[i] = { ...s, nombre: v }; update('socios', socios)
            }} />
            <EditField label="Rol" value={s.rol} onSave={v => {
              const socios = [...spec.socios]; socios[i] = { ...s, rol: v }; update('socios', socios)
            }} />
            <EditField label="Participación %" value={s.participacion} onSave={v => {
              const socios = [...spec.socios]; socios[i] = { ...s, participacion: v }; update('socios', socios)
            }} />
          </div>
        ))}
      </div>

      {/* Nota Supabase */}
      <div className="bg-[#0d1a2b] border border-[#1d4ed8] p-4">
        <p className="text-[#93c5fd] text-xs font-bold uppercase tracking-wider mb-1">ℹ️ Sincronización</p>
        <p className="text-[#93c5fd]/70 text-xs leading-relaxed">
          Actualmente los cambios se guardan en localStorage del mismo navegador. Para sincronizar en tiempo real entre admin y portal del socio, conectar Supabase con la tabla <code className="bg-[#131313] px-1">bc_milestones</code>.
        </p>
      </div>

    </div>
  )
}
