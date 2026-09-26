import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
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

            <span className="brand-name">
              Pasta Perfect
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="main-nav"
            aria-label="Main navigation"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Presets
            </NavLink>

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Recipes
            </NavLink>
          </nav>

          <Link
            to="/presets/new"
            className="add-link"
          >
            + Add pasta
          </Link>

          {/* THREE DOTS */}
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            •••
          </button>
        </div>

        {/* MOBILE / TABLET MENU */}
        {menuOpen && (
          <nav
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'mobile-menu-link active'
                  : 'mobile-menu-link'
              }
              onClick={() => setMenuOpen(false)}
            >
              Presets
            </NavLink>

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? 'mobile-menu-link active'
                  : 'mobile-menu-link'
              }
              onClick={() => setMenuOpen(false)}
            >
              Recipes
            </NavLink>

            <Link
              to="/presets/new"
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              + Add pasta
            </Link>
          </nav>
        )}

        <div className="checker" />
      </header>

      <main>
        {children}
      </main>

      <div className="checker" />

      <footer>
        <p>
          Pasta Perfect · your pasta, your time.
        </p>
      </footer>
    </div>
  )
}