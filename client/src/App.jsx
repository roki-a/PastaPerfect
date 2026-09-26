import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Presets from './pages/Presets'
import Cook from './pages/Cook'
import AddPasta from './pages/AddPasta'
import EditPasta from './pages/EditPasta'
import Recipes from './pages/Recipes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home / Pasta presets */}
        <Route
          path="/"
          element={<Presets />}
        />

        <Route
          path="/presets"
          element={<Presets />}
        />

        {/* Add pasta */}
        <Route
          path="/add"
          element={<AddPasta />}
        />

        <Route
          path="/presets/new"
          element={<AddPasta />}
        />

        {/* Recipes */}
        <Route
          path="/recipes"
          element={<Recipes />}
        />

        {/* Edit custom pasta */}
        <Route
          path="/pasta/:id/edit"
          element={<EditPasta />}
        />

        {/* Cooking page */}
        <Route
          path="/cook/:id"
          element={<Cook />}
        />

      </Routes>
    </BrowserRouter>
  )
}