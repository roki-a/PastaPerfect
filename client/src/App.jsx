import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import Presets from './pages/Presets'
import Cook from './pages/Cook'
import Home from './pages/Home'
import AddPasta from './pages/AddPasta'
import EditPasta from './pages/EditPasta'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Presets />}
        />

        {/* Pasta presets */}
        <Route
          path="/presets"
          element={<Presets />}
        />

        {/* Add pasta */}
        <Route
          path="/add"
          element={<AddPasta />}
        />

        {/* Keep the older add route working too */}
        <Route
          path="/presets/new"
          element={<AddPasta />}
        />

        {/* Edit custom pasta */}
        <Route
          path="/pasta/:id/edit"
          element={<EditPasta />}
        />

        {/* Cook pasta */}
        <Route
          path="/cook/:id"
          element={<Cook />}
        />

        {/* Recipes */}
        <Route
          path="/recipes"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  )
}