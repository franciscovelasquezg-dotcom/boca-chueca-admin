import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute }   from './components/auth/ProtectedRoute'
import { AdminLayout }      from './layouts/AdminLayout'
import { Login }            from './pages/Login'
import { Dashboard }        from './pages/Dashboard'
import { Reservas }         from './pages/Reservas'
import { MenuEditor }       from './pages/MenuEditor'
import { Agenda }           from './pages/Agenda'
import { InboxIdeas }       from './pages/InboxIdeas'
import { MarketResearch }   from './pages/MarketResearch'
import { RecipeLab }        from './pages/RecipeLab'
import { Settings }         from './pages/Settings'
import { SpecEditor }       from './pages/SpecEditor'

const Stub = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-64 gap-3">
    <p className="font-display text-[#ecbbb0] italic font-black text-3xl">{name}</p>
    <p className="text-[#9d8d8a] text-sm uppercase tracking-widest">Próximamente</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index              element={<Dashboard />}     />
          <Route path="reservas"    element={<Reservas />}      />
          <Route path="menu"        element={<MenuEditor />}    />
          <Route path="jarras"      element={<Stub name="Jarras" />} />
          <Route path="legendario"  element={<Stub name="Menú Legendario" />} />
          <Route path="agenda"      element={<Agenda />}        />
          <Route path="inbox"       element={<InboxIdeas />}    />
          <Route path="mercado"     element={<MarketResearch />}/>
          <Route path="recetas"     element={<RecipeLab />}     />
          <Route path="spec"        element={<SpecEditor />}    />
          <Route path="settings"    element={<Settings />}      />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
