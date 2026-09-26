import { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import Layout from '../components/Layout'

import {
  listPasta,
  deletePasta,
} from '../api/httpApi'

const DONENESS = {
  al_dente: 'Al dente',
  firm: 'Firm',
  soft: 'Soft',
}

function secondsLabel(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.max(
    0,
    seconds % 60,
  )

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`
}

function Tag({
  children,
  tone = 'info',
}) {
  return (
    <span className={`tag ${tone}`}>
      {children}
    </span>
  )
}

function Segmented({
  value,
  onChange,
}) {
  return (
    <div
      className="segments"
      role="group"
      aria-label="Doneness"
    >
      {Object.entries(DONENESS).map(
        ([key, label]) => (
          <button
            key={key}
            type="button"
            className={
              value === key
                ? 'selected'
                : ''
            }
            onClick={() => onChange(key)}
            aria-pressed={value === key}
          >
            {label}
          </button>
        ),
      )}
    </div>
  )
}

function PastaCard({
  pasta,
  doneness,
  onDelete,
  deleting,
}) {
  const recommended =
    doneness === 'firm'
      ? pasta.firmSeconds
      : doneness === 'soft'
        ? pasta.softSeconds
        : pasta.alDenteSeconds

  const custom =
    doneness === 'firm'
      ? pasta.customFirmSeconds
      : doneness === 'soft'
        ? pasta.customSoftSeconds
        : pasta.customAlDenteSeconds

  /*
   * IMPORTANT:
   *
   * If custom is NULL, the pasta is using
   * its original recommended time.
   *
   * If custom has a value, the pasta is
   * using the user's customized time.
   */
  const hasCustomTime =
  custom != null &&
  Number(custom) !== Number(recommended)

  const seconds = hasCustomTime
    ? custom
    : recommended

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${pasta.name}"?`,
    )

    if (!confirmed) {
      return
    }

    await onDelete(pasta.id)
  }

  return (
    <article className="card pasta-card">
      <div className="card-top">
        <div className="pasta-icon">
          <img
            src={pasta.image}
            alt={`${pasta.name} pasta`}
          />
        </div>

        <div className="pasta-info">
          <h2>
            {pasta.name}
          </h2>

          <Tag
            tone={
              pasta.isCustom
                ? 'mine'
                : hasCustomTime
                  ? 'mine'
                  : 'recommended'
            }
          >
            {pasta.isCustom
              ? 'Added pasta'
              : hasCustomTime
                ? 'My time'
                : 'Recommended'}
          </Tag>
        </div>
      </div>

      <div className="card-bottom">
        <div className="card-time">
          <div className="time">
            {secondsLabel(seconds)}
          </div>

          <p className="muted">
            {DONENESS[doneness]}
          </p>
        </div>

        <div className="pasta-actions">
          <Link
            className="button"
            to={`/cook/${pasta.id}?doneness=${doneness}`}
          >
            Start
          </Link>

          {pasta.isCustom && (
            <>
              <Link
                className="button"
                to={`/pasta/${pasta.id}/edit`}
              >
                Edit
              </Link>

              <div className="delete-pasta-row">
                <button
                  type="button"
                  className="delete-pasta-button"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Presets() {
  const location = useLocation()

  const [pasta, setPasta] = useState([])
  const [search, setSearch] = useState('')
  const [doneness, setDoneness] =
    useState('al_dente')
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] =
    useState(null)

  async function loadPasta() {
    setError('')

    try {
      const data = await listPasta(search)

      setPasta(data)
    } catch (requestError) {
      console.error(
        'Could not load pasta:',
        requestError,
      )

      setError(
        requestError.message ||
          'Could not load pasta.',
      )
    }
  }

  /*
   * Reload the pasta whenever:
   *
   * - the page first opens
   * - search changes
   * - navigation returns to Presets
   *
   * This is important after Edit/Reset.
   */
  useEffect(() => {
    loadPasta()
  }, [search, location.key])

  async function handleDelete(id) {
    setError('')
    setDeletingId(id)

    try {
      await deletePasta(id)

      setPasta((current) =>
        current.filter(
          (item) => item.id !== id,
        ),
      )
    } catch (requestError) {
      console.error(
        'Could not delete pasta:',
        requestError,
      )

      setError(
        requestError.message ||
          'Could not delete pasta.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Layout>
      <section className="page-heading presets-heading">
        <h1>Pick a pasta</h1>
      </section>

      <section className="filter-panel">
        <label className="search">
          <span>
            Search Pasta
          </span>

          <div className="search-controls">
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value,
                )
              }}
              placeholder="Search Pasta"
              aria-label="Search Pasta"
            />

            <button
              type="button"
              className="search-button"
            >
              Search
            </button>
          </div>
        </label>

        <div className="doneness-filter">
          <span className="field-label">
            Doneness
          </span>

          <Segmented
            value={doneness}
            onChange={setDoneness}
          />
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
            onDelete={handleDelete}
            deleting={
              deletingId === item.id
            }
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