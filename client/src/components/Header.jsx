import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const isPresets =
    location.pathname === '/' ||
    location.pathname === '/presets'

  const isRecipes =
    location.pathname === '/recipes'

  return (
    <header className="site-header">
      <div className="header-main">

        <Link
          to="/"
          className="brand"
          aria-label="Pasta Perfect home"
        >
          <img
            src="/logo-green.png"
            alt="Pasta Perfect"
          />

          <span>Pasta Perfect</span>
        </Link>

        <nav aria-label="Main navigation">

          <Link
            to="/"
            className={isPresets ? 'active' : ''}
          >
            Presets
          </Link>

          <Link
            to="/recipes"
            className={isRecipes ? 'active' : ''}
          >
            Recipes
          </Link>

          <Link
            className="add-link"
            to="/presets/new"
          >
            + Add pasta
          </Link>

        </nav>
      </div>

      <div
        className="checker"
        aria-hidden="true"
      />
    </header>
  )
}