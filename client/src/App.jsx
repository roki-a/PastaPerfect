import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Presets from './pages/Presets'
import Cook from './pages/Cook'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Presets />} />
        <Route path="/cook/:id" element={<Cook />} />
      </Routes>
    </BrowserRouter>
  )
}