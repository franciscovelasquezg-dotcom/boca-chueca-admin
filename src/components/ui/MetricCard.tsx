import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  accent?: 'gold' | 'red' | 'green' | 'default'
  trend?: { value: number; label: string }
}

const accents = {
  gold:    { border: 'border-[#eac349]',    icon: 'text-[#eac349]',   shadow: 'shadow-[3px_3px_0_0_#eac349]' },
  red:     { border: 'border-[#8e241e]',    icon: 'text-[#ffb4aa]',   shadow: 'shadow-[3px_3px_0_0_#8e241e]' },
  green:   { border: 'border-[#4ade80]/40]',icon: 'text-[#4ade80]',   shadow: 'shadow-[3px_3px_0_0_#14321a]' },
  default: { border: 'border-[#504441]',    icon: 'text-[#ecbbb0]',   shadow: '' },
}

export function MetricCard({ title, value, subtitle, icon: Icon, accent = 'default', trend }: MetricCardProps) {
  const a = accents[accent]
  return (
    <div className={`bg-[#201f1f] border-2 ${a.border} p-5 flex flex-col gap-3 ${a.shadow} transition-transform hover:-translate-y-0.5`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9d8d8a]">{title}</p>
          <p className="font-display text-4xl font-black text-[#e5e2e1] mt-1">{value}</p>
          {subtitle && <p className="text-[12px] text-[#d5c3bf] mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-[#131313] border border-[#504441] ${a.icon}`}>
          <Icon size={22} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-[12px]">
          <span className={trend.value >= 0 ? 'text-[#4ade80]' : 'text-[#ffb4ab]'}>
            {trend.value >= 0 ? '▲' : '▼'} {Math.abs(trend.value)}%
          </span>
          <span className="text-[#9d8d8a]">{trend.label}</span>
        </div>
      )}
    </div>
  )
}
