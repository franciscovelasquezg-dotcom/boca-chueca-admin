interface ToggleProps {
  active: boolean
  onChange?: (v: boolean) => void
}

export function Toggle({ active, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange?.(!active)}
      className={`
        relative w-10 h-5 border-2 transition-colors duration-150 shrink-0
        ${active ? 'bg-[#14321a] border-[#4ade80]' : 'bg-[#131313] border-[#504441]'}
      `}
      title={active ? 'Disponible — click para desactivar' : 'No disponible — click para activar'}
    >
      <span
        className={`
          absolute top-0.5 w-3 h-3 transition-all duration-150
          ${active ? 'left-5 bg-[#4ade80]' : 'left-0.5 bg-[#504441]'}
        `}
      />
    </button>
  )
}
