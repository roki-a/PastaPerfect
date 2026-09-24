import { NavLink, Link } from 'react-router-dom'

export default function Layout({ children }) {
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

          <nav
            className="main-nav"
            aria-label="Main navigation"
          >
            <NavLink
              to="/presets"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Presets
            </NavLink>

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Recipes
            </NavLink>
          </nav>

          <Link
            to="/add"
            className="add-link"
          >
            + Add pasta
          </Link>

        </div>

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