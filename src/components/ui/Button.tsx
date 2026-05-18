import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary:   'bg-[#8e241e] text-[#e5e2e1] border-2 border-[#8e241e] hover:bg-[#8e241e]/80 shadow-[3px_3px_0_0_#8e241e] active:shadow-none active:translate-x-0.5 active:translate-y-0.5',
  secondary: 'bg-transparent text-[#eac349] border-2 border-[#eac349] hover:bg-[#eac349]/10 shadow-[3px_3px_0_0_#eac349] active:shadow-none active:translate-x-0.5 active:translate-y-0.5',
  ghost:     'bg-transparent text-[#d5c3bf] border-2 border-[#504441] hover:border-[#9d8d8a] hover:text-[#e5e2e1]',
  danger:    'bg-[#93000a] text-[#ffb4ab] border-2 border-[#93000a] hover:bg-[#93000a]/80',
}

const sizes = {
  sm: 'px-3 py-1.5 text-[11px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-7 py-3.5 text-[14px]',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 font-bold uppercase tracking-wider
        transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
