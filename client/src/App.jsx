import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Presets from './pages/Presets'
import Cook from './pages/Cook'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Presets />}
        />

        <Route
          path="/presets"
          element={<Presets />}
        />

        <Route
          path="/cook/:id"
          element={<Cook />}
        />

        <Route
          path="/recipes"
          element={<Home />}
        />

        <Route
          path="/presets/new"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  )
}