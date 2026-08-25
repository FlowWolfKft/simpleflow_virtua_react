import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import ImpressumPage from './pages/ImpressumPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adatkezeles" element={<LegalPage />} />
      <Route path="/impresszum" element={<ImpressumPage />} />
    </Routes>
  )
}
