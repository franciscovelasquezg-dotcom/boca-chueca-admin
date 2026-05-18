import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export function Login() {
  const [key, setKey]         = useState('')
  const [show, setShow]       = useState(false)
  const [error, setError]     = useState(false)
  const [shaking, setShaking] = useState(false)
  const login    = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(false)
    const ok = login(key.trim())
    if (ok) {
      navigate('/', { replace: true })
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-4">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
        }}
      />

      <div className={`w-full max-w-sm transition-transform duration-100 ${shaking ? 'translate-x-2' : ''}`}>

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#8e241e] border-2 border-[#eac349] mb-4 shadow-[4px_4px_0_0_#eac349]">
            <span className="font-display text-[#eac349] font-black italic text-lg">BC</span>
          </div>
          <h1 className="font-display text-[#ecbbb0] font-black italic text-3xl leading-tight">
            La Tapería del<br />
            <span className="text-[#eac349]">Boca Chueca</span>
          </h1>
          <p className="text-[#9d8d8a] text-xs uppercase tracking-widest mt-2">
            Hub de Desarrollo · Acceso Interno
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-[#504441] bg-[#131313] p-6 space-y-4 shadow-[4px_4px_0_0_#8e241e]">

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-2">
                Clave maestra
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#504441]">
                  <Lock size={15} />
                </div>
                <input
                  type={show ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => { setKey(e.target.value); setError(false) }}
                  placeholder="••••••••••••"
                  autoFocus
                  className={`
                    w-full bg-[#0e0e0e] pl-9 pr-10 py-3
                    text-[#e5e2e1] text-sm font-mono
                    border-2 outline-none transition-colors duration-100
                    ${error
                      ? 'border-[#8e241e] focus:border-[#ffb4ab]'
                      : 'border-[#504441] focus:border-[#eac349]'
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#504441] hover:text-[#9d8d8a] transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#ffb4ab] text-xs bg-[#93000a]/20 border border-[#8e241e] px-3 py-2">
                <AlertCircle size={13} />
                <span>Clave incorrecta. Intenta nuevamente.</span>
              </div>
            )}

            <button
              type="submit"
              className="
                w-full py-3 font-bold uppercase tracking-widest text-sm
                bg-[#8e241e] text-[#e5e2e1] border-2 border-[#8e241e]
                hover:bg-[#8e241e]/80 active:translate-x-0.5 active:translate-y-0.5
                shadow-[3px_3px_0_0_#eac349] active:shadow-none
                transition-all duration-100
              "
            >
              Ingresar al Hub
            </button>
          </div>

          <p className="text-center text-[10px] text-[#504441] uppercase tracking-wider">
            Acceso restringido — Solo Francisco Velásquez
          </p>
        </form>
      </div>
    </div>
  )
}
