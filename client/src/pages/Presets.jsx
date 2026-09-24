import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { listPasta } from '../api/httpApi'

const DONENESS = {
  al_dente: 'Al dente',
  firm: 'Firm',
  soft: 'Soft',
}

function secondsLabel(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.max(0, seconds % 60)

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`
}

function Tag({ children, tone = 'info' }) {
  return (
    <span className={`tag ${tone}`}>
      {children}
    </span>
  )
}

function Segmented({ value, onChange }) {
  return (
    <div
      className="segments"
      role="group"
      aria-label="Doneness"
    >
      {Object.entries(DONENESS).map(([key, label]) => (
        <button
          key={key}
          type="button"
          className={value === key ? 'selected' : ''}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function PastaCard({ pasta, doneness }) {
  const recommended =
    doneness === 'firm'
      ? pasta.firmSeconds
      : doneness === 'soft'
        ? pasta.softSeconds
        : pasta.alDenteSeconds

  const seconds = pasta.mySeconds ?? recommended
  const isMine = pasta.mySeconds != null

  return (
    <article className="card pasta-card">
      <div className="card-top">
        <div className="pasta-icon">
          <img
            src={`/${pasta.image}`}
            alt={`${pasta.name} pasta`}
          />
        </div>

        <div>
          <h2>{pasta.name}</h2>

          <Tag tone={isMine ? 'mine' : 'recommended'}>
            {isMine ? 'My time' : 'Recommended'}
          </Tag>
        </div>
      </div>

      <div className="time">
        {secondsLabel(seconds)}
      </div>

      <p className="muted">
        {isMine
          ? `Saved for you · ${DONENESS[doneness]}`
          : `${DONENESS[doneness]} starting point`}
      </p>

      <Link
        className="button"
        to={`/cook/${pasta.id}?doneness=${doneness}`}
      >
        Start
      </Link>
    </article>
  )
}

export default function Presets() {
  const [pasta, setPasta] = useState([])
  const [search, setSearch] = useState('')
  const [doneness, setDoneness] = useState('al_dente')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPasta() {
      setError('')

      try {
        const data = await listPasta(search)

        if (!cancelled) {
          setPasta(data)
        }
      } catch {
        if (!cancelled) {
          setError('Could not load pasta.')
        }
      }
    }

    loadPasta()

    return () => {
      cancelled = true
    }
  }, [search])

  return (
    <Layout>
      <section className="page-heading">
        <div>
          <Tag tone="info">
            Pasta timer
          </Tag>

          <h1>
            Pick your pasta.
            <br />
            Cook it your way.
          </h1>

          <p>
            Choose how you like it, then start
            a timer that remembers your own
            time when you save one.
          </p>
        </div>

        <div className="filter-row">
          <label className="search">
            <span>Search</span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="spaghetti, penne..."
            />
          </label>

          <div>
            <span className="field-label">
              Doneness
            </span>

            <Segmented
              value={doneness}
              onChange={setDoneness}
            />
          </div>
        </div>
      </section>

      {error && (
        <p
          className="error"
          role="alert"
        >
          {error}
        </p>
      )}

      <section
        className="grid"
        aria-label="Pasta presets"
      >
        {pasta.map((item) => (
          <PastaCard
            key={item.id}
            pasta={item}
            doneness={doneness}
          />
        ))}
      </section>

      {!error && pasta.length === 0 && (
        <p className="muted">
          No pasta matches your search.
        </p>
      )}
    </Layout>
  )
}