import { Button } from '../components/ui/Button'

export function Settings() {
  return (
    <div className="space-y-8 max-w-xl">

      <section className="border-2 border-[#504441] p-6 space-y-4">
        <h3 className="font-display text-[#ecbbb0] italic font-bold text-xl">Supabase</h3>
        <div className="space-y-3">
          {[
            { label: 'VITE_SUPABASE_URL',      placeholder: 'https://xxxx.supabase.co' },
            { label: 'VITE_SUPABASE_ANON_KEY', placeholder: 'eyJh...' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">
                {f.label}
              </label>
              <input
                type="text"
                placeholder={f.placeholder}
                readOnly
                className="w-full bg-[#0e0e0e] border-2 border-[#504441] text-[#9d8d8a] px-3 py-2 text-sm font-mono"
              />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#9d8d8a]">Configura las variables en <code className="bg-[#201f1f] px-1">.env.local</code></p>
      </section>

      <section className="border-2 border-[#504441] p-6 space-y-4">
        <h3 className="font-display text-[#ecbbb0] italic font-bold text-xl">WhatsApp</h3>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9d8d8a] mb-1">
            Número de contacto
          </label>
          <input
            type="text"
            placeholder="+56 9 xxxx xxxx"
            className="w-full bg-[#0e0e0e] border-2 border-[#504441] focus:border-[#eac349] text-[#e5e2e1] px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>
        <Button variant="secondary" size="sm">Guardar</Button>
      </section>

    </div>
  )
}
