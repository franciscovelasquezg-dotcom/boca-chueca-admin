interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold'
}

const variants: Record<string, string> = {
  default: 'bg-[#353534] text-[#e5e2e1]',
  success: 'bg-[#14321a] text-[#4ade80] border border-[#4ade80]/40',
  warning: 'bg-[#3c2f00] text-[#eac349]',
  danger:  'bg-[#93000a] text-[#ffb4ab]',
  gold:    'bg-[#cca830] text-[#3c2f00]',
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${variants[variant]}`}>
      {label}
    </span>
  )
}
