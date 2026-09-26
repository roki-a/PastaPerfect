import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import Presets from './pages/Presets'
import Cook from './pages/Cook'
import Home from './pages/Home'
import AddPasta from './pages/AddPasta'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
          element={<AddPasta />}
        />
      </Routes>
    </BrowserRouter>
  )
}