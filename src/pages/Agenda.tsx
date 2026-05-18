import { useState } from 'react'
import { Plus, Trash2, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import type { Task, TaskStatus, TaskType, TaskPriority } from '../types/hub'

// ─── Colores por tipo ─────────────────────────────────────────────────────────
const typeColors: Record<TaskType, string> = {
  user_feedback: 'bg-[#2b110b] text-[#ecbbb0] border-[#8e241e]',
  dev:           'bg-[#0d1a2b] text-[#93c5fd] border-[#1d4ed8]',
  ops:           'bg-[#1a2b0d] text-[#86efac] border-[#16a34a]',
  recipe:        'bg-[#2b1a0d] text-[#fdba74] border-[#c2410c]',
  market:        'bg-[#1a0d2b] text-[#c4b5fd] border-[#7c3aed]',
  general:       'bg-[#1c1b1b] text-[#d5c3bf] border-[#504441]',
}
const typeLabel: Record<TaskType, string> = {
  user_feedback: 'Idea Cliente',
  dev:           'Dev',
  ops:           'Ops',
  recipe:        'Receta',
  market:        'Mercado',
  general:       'General',
}
const priorityColors: Record<TaskPriority, string> = {
  high:   'text-[#ffb4ab]',
  medium: 'text-[#eac349]',
  low:    'text-[#9d8d8a]',
}

// ─── Columna ──────────────────────────────────────────────────────────────────
function Column({ title, status, tasks, icon: Icon, accentColor }: {
  title: string
  status: TaskStatus
  tasks: Task[]
  icon: typeof Clock
  accentColor: string
}) {
  const { updateStatus, removeTask } = useTaskStore()

  const nextStatus: Partial<Record<TaskStatus, TaskStatus>> = {
    pending:     'in_progress',
    in_progress: 'done',
  }

  return (
    <div className="flex flex-col min-w-0">
      {/* Header columna */}
      <div className={`flex items-center gap-2 px-3 py-2.5 mb-3 border-b-2 ${accentColor}`}>
        <Icon size={15} />
        <span className="text-sm font-bold uppercase tracking-wider">{title}</span>
        <span className="ml-auto bg-[#0e0e0e] text-[#9d8d8a] text-[11px] font-black px-2 py-0.5 min-w-[22px] text-center">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2 flex-1 min-h-[120px]">
        {tasks.length === 0 && (
          <p className="text-[#504441] text-xs text-center py-8 uppercase tracking-wider">Vacío</p>
        )}
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-[#201f1f] border border-[#504441] p-3 group hover:border-[#9d8d8a] transition-colors"
          >
            {/* Tags */}
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${typeColors[task.type]}`}>
                {typeLabel[task.type]}
              </span>
              <span className={`text-[10px] font-bold uppercase ${priorityColors[task.priority]}`}>
                {task.priority === 'high' ? '▲ Alta' : task.priority === 'medium' ? '● Media' : '▼ Baja'}
              </span>
            </div>

            {/* Título */}
            <p className="text-[#e5e2e1] text-sm font-medium leading-snug mb-1">{task.title}</p>
            {task.description && (
              <p className="text-[#9d8d8a] text-xs leading-relaxed mb-2">{task.description}</p>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {task.tags.map(t => (
                  <span key={t} className="text-[9px] text-[#504441] bg-[#131313] px-1.5 py-0.5 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-between pt-2 border-t border-[#504441]/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => removeTask(task.id)}
                className="text-[#504441] hover:text-[#ffb4ab] transition-colors p-0.5"
                title="Eliminar"
              >
                <Trash2 size={12} />
              </button>
              {nextStatus[status] && (
                <button
                  onClick={() => updateStatus(task.id, nextStatus[status]!)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#9d8d8a] hover:text-[#eac349] transition-colors"
                >
                  Avanzar <ArrowRight size={11} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Modal nueva tarea ────────────────────────────────────────────────────────
function NewTaskModal({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore((s) => s.addTask)
  const [form, setForm] = useState({
    title: '', description: '', type: 'general' as TaskType, priority: 'medium' as TaskPriority,
  })

  const handleSubmit = () => {
    if (!form.title.trim()) return
    addTask(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1c1b1b] border-2 border-[#504441] w-full max-w-md shadow-[4px_4px_0_0_#8e241e]">
        <div className="px-5 py-4 border-b border-[#504441] flex items-center justify-between">
          <h3 className="font-display text-[#ecbbb0] italic font-bold text-lg">Nueva tarea</h3>
          <button onClick={onClose} className="text-[#504441] hover:text-[#9d8d8a] text-xl leading-none">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Título *</label>
            <input
              autoFocus
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none transition-colors"
              placeholder="¿Qué hay que hacer?"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Descripción</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none resize-none transition-colors"
              placeholder="Detalle opcional..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Tipo</label>
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value as TaskType }))}
                className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none"
              >
                {Object.entries(typeLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">Prioridad</label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value as TaskPriority }))}
                className="w-full bg-[#131313] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none"
              >
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0_0_#eac349] hover:bg-[#8e241e]/80 transition-all"
          >
            Crear tarea
          </button>
          <button onClick={onClose} className="px-4 py-2.5 border border-[#504441] text-[#9d8d8a] hover:text-[#d5c3bf] text-sm font-bold uppercase">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Vista principal ──────────────────────────────────────────────────────────
export function Agenda() {
  const tasks       = useTaskStore((s) => s.tasks)
  const [modal, setModal] = useState(false)

  const byStatus = (s: TaskStatus) => tasks.filter(t => t.status === s)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[#9d8d8a] text-sm">
          <span className="text-[#eac349] font-bold">{tasks.length}</span> tareas en total
        </p>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8e241e] text-[#e5e2e1] font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0_0_#eac349] hover:bg-[#8e241e]/80 transition-all"
        >
          <Plus size={14} /> Nueva tarea
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Column title="Pendientes"   status="pending"     tasks={byStatus('pending')}     icon={Clock}        accentColor="border-[#504441] text-[#9d8d8a]" />
        <Column title="En Progreso"  status="in_progress" tasks={byStatus('in_progress')} icon={Zap}          accentColor="border-[#eac349] text-[#eac349]" />
        <Column title="Completadas"  status="done"        tasks={byStatus('done')}         icon={CheckCircle}  accentColor="border-[#4ade80]/40 text-[#4ade80]" />
      </div>

      {modal && <NewTaskModal onClose={() => setModal(false)} />}
    </div>
  )
}
