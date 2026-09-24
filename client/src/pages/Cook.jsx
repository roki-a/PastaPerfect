import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'

const API = '/api'

const DONENESS = {
  al_dente: 'Al dente',
  firm: 'Firm',
  soft: 'Soft',
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`
}

function getSeconds(pasta, doneness) {
  if (!pasta) return 0

  if (doneness === 'firm') {
    return pasta.firmSeconds
  }

  if (doneness === 'soft') {
    return pasta.softSeconds
  }

  return pasta.alDenteSeconds
}

export default function Cook() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const doneness = searchParams.get('doneness') || 'al_dente'

  const [pasta, setPasta] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const initialSeconds = useMemo(
    () => getSeconds(pasta, doneness),
    [pasta, doneness],
  )

  useEffect(() => {
    let cancelled = false

    async function loadPasta() {
      setError('')

      try {
        const response = await fetch(`${API}/pasta/${id}`)

        if (!response.ok) {
          throw new Error('Could not load pasta.')
        }

        const data = await response.json()

        if (!cancelled) {
          setPasta(data)
          setSecondsLeft(getSeconds(data, doneness))
          setDone(false)
          setRunning(false)
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
  }, [id, doneness])

  useEffect(() => {
    if (!running || secondsLeft <= 0) return

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(timer)
          setRunning(false)
          setDone(true)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [running, secondsLeft])

  function handleStart() {
    if (secondsLeft > 0) {
      setRunning(true)
      setDone(false)
    }
  }

  function handlePause() {
    setRunning(false)
  }

  function handleReset() {
    setRunning(false)
    setDone(false)
    setSecondsLeft(initialSeconds)
  }

  if (error) {
    return (
      <Layout>
        <p className="error" role="alert">
          {error}
        </p>

        <Link className="button" to="/">
          Back to pasta
        </Link>
      </Layout>
    )
  }

  if (!pasta) {
    return (
      <Layout>
        <p className="muted">Loading pasta...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="cook-layout">
        <div className="cook-main">
          <Link className="back" to="/">
            ← Back to pasta
          </Link>

          <div className="timer-window">
            <strong>{formatTime(secondsLeft)}</strong>

            <span>
              {done
                ? 'Done!'
                : running
                  ? 'Cooking'
                  : 'Ready'}
            </span>
          </div>

          <div className="timer-controls">
            {!running && !done && (
              <button
                className="button"
                type="button"
                onClick={handleStart}
              >
                Start
              </button>
            )}

            {running && (
              <button
                className="button secondary"
                type="button"
                onClick={handlePause}
              >
                Pause
              </button>
            )}

            <button
              className="button secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          <p className="timer-help">
            {done
              ? 'Your pasta timer is finished.'
              : 'Adjust your pasta and keep an eye on the timer.'}
          </p>
        </div>

        <aside className="cook-details">
          <span className="tag info">Cooking</span>

          <h1>{pasta.name}</h1>

          <p>{DONENESS[doneness]} starting point.</p>

          <h3>While it cooks</h3>

          <p>
            Give the pasta a stir so it cooks evenly. Taste it near
            the end and adjust the timing if needed.
          </p>

          <div className="button-stack">
            <Link className="button secondary" to="/">
              Choose another pasta
            </Link>
          </div>
        </aside>
      </section>
    </Layout>
  )
}