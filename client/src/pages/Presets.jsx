import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const DONENESS = {
  al_dente: 'Al dente',
  firm: 'Firm',
  soft: 'Soft',
}

const PASTA = [
  {
    id: 1,
    name: 'Spaghetti',
    image: 'spaghetti.png',
    alDenteSeconds: 540,
    firmSeconds: 480,
    softSeconds: 600,
  },
  {
    id: 2,
    name: 'Penne',
    image: 'penne.png',
    alDenteSeconds: 600,
    firmSeconds: 540,
    softSeconds: 660,
  },
  {
    id: 3,
    name: 'Farfalle',
    image: 'farfalle.png',
    alDenteSeconds: 720,
    firmSeconds: 660,
    softSeconds: 780,
  },
]

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`
}

export default function Presets() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [doneness, setDoneness] = useState('al_dente')

  const filteredPasta = PASTA.filter((pasta) =>
    pasta.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Layout>
      <section className="page-heading">
        <span className="tag info">Pasta timer</span>

        <h1>
          Pick your pasta.
          <br />
          Cook it your way.
        </h1>

        <p>
          Choose how you like it, then start a timer that remembers
          your own time when you save one.
        </p>
      </section>

      <section className="filter-row">
        <label className="search">
          <span>Search</span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="spaghetti, penne..."
          />
        </label>

        <div>
          <span className="field-label">Doneness</span>

          <div
            className="segments"
            role="group"
            aria-label="Doneness"
          >
            {Object.entries(DONENESS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={doneness === key ? 'selected' : ''}
                onClick={() => setDoneness(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid" aria-label="Pasta presets">
        {filteredPasta.map((pasta) => {
          const timeKey =
            doneness === 'al_dente'
              ? 'alDenteSeconds'
              : `${doneness}Seconds`

          const seconds = pasta[timeKey]

          return (
            <article key={pasta.id} className="card pasta-card">
              <div className="card-top">
                <div className="pasta-icon">
                    <img
                        src={`/${pasta.image}`}
                        alt={`${pasta.name} pasta`}
                    />
                    </div>

                <div>
                  <h2>{pasta.name}</h2>

                  <span className="tag recommended">
                    Recommended
                  </span>
                </div>
              </div>

              <div className="time">
                {formatTime(seconds)}
              </div>

              <p className="muted">
                {DONENESS[doneness]} starting point
              </p>

              <button
                className="button"
                type="button"
                onClick={() =>
                    navigate('/cook', {
                    state: {
                        pasta: {
                        name: pasta.name,
                        seconds,
                        doneness: DONENESS[doneness],
                        },
                    },
                    })
                }
                >
                Start
                </button>
            </article>
          )
        })}
      </section>

      {filteredPasta.length === 0 && (
        <p className="muted">
          No pasta matches your search.
        </p>
      )}
    </Layout>
  )
}