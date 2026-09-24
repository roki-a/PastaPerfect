import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`
}

export default function Cook() {
  const location = useLocation()

  const pasta = location.state?.pasta

  const initialSeconds = pasta?.seconds ?? 540

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

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

  return (
    <Layout>
      <div className="back">
        <Link to="/">← Back to presets</Link>
      </div>

      <section className={`cook-layout ${done ? 'done' : ''}`}>
        <div className="cook-timer card">
          <div className="tomato">
            <div className="stem" aria-hidden="true">
              🍃
            </div>

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
          </div>

          <div className="timer-controls">
            {!running && !done && (
              <button className="button" type="button" onClick={handleStart}>
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

          <h1>{pasta?.name ?? 'Spaghetti'}</h1>

          <p>
            {pasta?.doneness ?? 'Al dente'} starting point.
          </p>

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