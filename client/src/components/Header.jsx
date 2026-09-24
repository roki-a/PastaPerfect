import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-main">
        <Link to="/" className="brand" aria-label="Pasta Perfect home">
          <img src="/logo-cream.png" alt="Pasta Perfect" />
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/">Presets</Link>

          <Link to="/recipes">Recipes</Link>

          <Link className="add-link" to="/presets/new">
            + Add pasta
          </Link>
        </nav>
      </div>

      <div className="checker" aria-hidden="true" />
    </header>
  )
}