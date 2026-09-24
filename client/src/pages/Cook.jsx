import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import './Cook.css'

const API = '/api'

const DONENESS = {
  al_dente: 'Al dente',
  firm: 'Firm',
  soft: 'Soft',
}

const MAX_SECONDS = 3600

// Ruler movement
const DIAL_PX = 3
const TICK_CYCLE = DIAL_PX * 60

// Screen pixels needed to change one second
const DRAG_PX_PER_SECOND = 3

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
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

function readStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable
  }
}

const notesKey = (id) => `cooktimer:notes:${id}`
const myTimeKey = (id, doneness) => `cooktimer:mytime:${id}:${doneness}`

/* =========================================================
   PASTA THUMBNAIL
   Uses the image already defined by the pasta data.
   ========================================================= */

function PastaThumb({ src, name }) {
  if (src) {
    return (
      <img
        className="pasta-thumb"
        src={src}
        alt={name}
      />
    )
  }

  return (
    <div className="pasta-thumb" aria-hidden="true">
      <svg viewBox="0 0 118 118">
        <ellipse
          cx="59"
          cy="82"
          rx="42"
          ry="11"
          fill="#c5bd8f"
        />

        <path
          d="M18 74 C18 40 42 28 59 28 C76 28 100 40 100 74 Z"
          fill="#dc3c41"
          stroke="#123f19"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}

/* =========================================================
   TOMATO TIMER
   ========================================================= */

function Tomato({ seconds, label }) {
  /*
   * IMPORTANT:
   *
   * The ruler must visually move in the same direction
   * as the user's drag.
   *
   * Right drag:
   *   time goes DOWN
   *   ruler moves RIGHT
   *
   * Left drag:
   *   time goes UP
   *   ruler moves LEFT
   *
   * Therefore the ruler position is inverted relative
   * to the number of seconds.
   */

  const tickShift =
    ((220 - seconds * DIAL_PX) % TICK_CYCLE + TICK_CYCLE) %
      TICK_CYCLE -
    3

  return (
    <svg
      className="tomato-svg"
      viewBox="0 0 440 340"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Tomato shape */}
        <path
          id="tomato-body-shape"
          d="
            M220 78
            C260 58 330 58 375 100
            C415 140 415 230 380 268
            C350 300 290 302 220 300
            C150 302 90 300 60 268
            C25 230 25 140 65 100
            C110 58 180 58 220 78
            Z
          "
        />

        <clipPath id="tomato-body-clip">
          <use href="#tomato-body-shape" />
        </clipPath>

        <clipPath id="ruler-clip">
          <rect
            x="90"
            y="248"
            width="260"
            height="38"
            rx="8"
          />
        </clipPath>

        {/* Moving ruler */}
        <pattern
          id="ruler-ticks"
          width={TICK_CYCLE}
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${tickShift} 248)`}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={i === 0 ? 0.5 : i * 30 + 1.5}
              y="0"
              width={i === 0 ? 5 : 3}
              height={i === 0 ? 26 : 14}
              rx="1.5"
              fill="#efe7b8"
            />
          ))}
        </pattern>
      </defs>

      {/* =====================================================
          TOMATO FEET / SIDE PARTS
          ===================================================== */}

      <rect
        x="148"
        y="284"
        width="44"
        height="38"
        rx="18"
        fill="#ef2b2b"
      />

      <rect
        x="248"
        y="284"
        width="44"
        height="38"
        rx="18"
        fill="#c71927"
      />

      <ellipse
        cx="28"
        cy="212"
        rx="18"
        ry="21"
        fill="#ef2b2b"
      />

      <ellipse
        cx="412"
        cy="212"
        rx="18"
        ry="21"
        fill="#c71927"
      />

      {/* =====================================================
          TOMATO BODY
          ===================================================== */}

      <use
        href="#tomato-body-shape"
        fill="#c71927"
      />

      <g clipPath="url(#tomato-body-clip)">
        <use
          href="#tomato-body-shape"
          fill="#ef2b2b"
          transform="translate(-18 -8)"
        />
      </g>

      {/* =====================================================
          HIGHLIGHT
          ===================================================== */}

      <path
        d="M92 116 L82 152"
        stroke="#ffe8a6"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* =====================================================
          TOMATO STEM
          ===================================================== */}

      <g transform="translate(220 76)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-15"
            rx="9"
            ry="18"
            fill="#2fcf2f"
            transform={`rotate(${angle})`}
          />
        ))}

        <circle
          r="4"
          fill="#123f19"
        />
      </g>

      {/* =====================================================
          TOMATO FACE
          ===================================================== */}

      <circle
        cx="186"
        cy="114"
        r="4.5"
        fill="#123f19"
      />

      <circle
        cx="254"
        cy="114"
        r="4.5"
        fill="#123f19"
      />

      <ellipse
        cx="220"
        cy="116"
        rx="9"
        ry="6.5"
        fill="#ffb3b8"
      />

      <ellipse
        cx="220"
        cy="116"
        rx="4"
        ry="2.6"
        fill="#fff4f4"
      />

      <path
        d="M207 126 V132 H233 V126"
        stroke="#123f19"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* =====================================================
          TIMER WINDOW
          ===================================================== */}

      <rect
        x="154"
        y="149"
        width="140"
        height="90"
        rx="16"
        fill="#123f19"
        opacity="0.28"
      />

      <rect
        x="150"
        y="145"
        width="140"
        height="90"
        rx="16"
        fill="#efe7b8"
      />

      <text
        x="220"
        y="192"
        textAnchor="middle"
        className="tomato-digits"
      >
        {formatTime(seconds)}
      </text>

      <text
        x="220"
        y="220"
        textAnchor="middle"
        className="tomato-status"
      >
        {label}
      </text>

      {/* =====================================================
          RULER
          ===================================================== */}

      <rect
        x="90"
        y="248"
        width="260"
        height="38"
        rx="8"
        fill="#8e1019"
      />

      <rect
        x="90"
        y="248"
        width="260"
        height="38"
        fill="url(#ruler-ticks)"
        clipPath="url(#ruler-clip)"
      />

      {/* Fixed center marker */}
      <rect
        x="218.5"
        y="248"
        width="3"
        height="38"
        fill="#ffd54a"
      />

      <polygon
        points="209,238 231,238 220,251"
        fill="#ffd54a"
      />
    </svg>
  )
}

/* =========================================================
   COOK PAGE
   ========================================================= */

export default function Cook() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const doneness =
    searchParams.get('doneness') || 'al_dente'

  const [pasta, setPasta] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  const [myTime, setMyTime] = useState(null)

  const initialSeconds = useMemo(
    () => getSeconds(pasta, doneness),
    [pasta, doneness],
  )

  /* =========================================================
     LOAD PASTA
     ========================================================= */

  useEffect(() => {
    let cancelled = false

    async function loadPasta() {
      setError('')

      try {
        const response = await fetch(
          `${API}/pasta/${id}`,
        )

        if (!response.ok) {
          throw new Error('Could not load pasta.')
        }

        const data = await response.json()

        if (!cancelled) {
          const savedTime = Number(
            readStorage(
              myTimeKey(id, doneness),
            ),
          )

          setPasta(data)

          setNotes(
            readStorage(notesKey(id)) ??
              data.notes ??
              '',
          )

          setMyTime(
            savedTime > 0
              ? savedTime
              : null,
          )

          setSecondsLeft(
            getSeconds(data, doneness),
          )

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

  /* =========================================================
     TIMER
     ========================================================= */

  useEffect(() => {
    if (!running) return

    const timer = setInterval(() => {
      setSecondsLeft((current) =>
        Math.max(0, current - 1),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [running])

  /* =========================================================
     FINISH TIMER
     ========================================================= */

  useEffect(() => {
    if (running && secondsLeft === 0) {
      setRunning(false)
      setDone(true)
    }
  }, [running, secondsLeft])

  /* =========================================================
     START
     ========================================================= */

  function handleStart() {
    if (secondsLeft > 0) {
      setRunning(true)
      setDone(false)
    }
  }

  /* =========================================================
     PAUSE
     ========================================================= */

  function handlePause() {
    setRunning(false)
  }

  /* =========================================================
     RESET
     ========================================================= */

  function handleReset() {
    setRunning(false)
    setDone(false)
    setSecondsLeft(initialSeconds)
  }

  /* =========================================================
     NOTES
     ========================================================= */

  function handleNotesChange(event) {
    const value = event.target.value

    setNotes(value)
    writeStorage(notesKey(id), value)
  }

  /* =========================================================
     SAVE MY TIME
     ========================================================= */

  function handleSaveMyTime() {
    if (secondsLeft <= 0) return

    writeStorage(
      myTimeKey(id, doneness),
      String(secondsLeft),
    )

    setMyTime(secondsLeft)
  }

  /* =========================================================
     +30 / -30
     ========================================================= */

  function changeTime(amount) {
    setSecondsLeft((current) =>
      clamp(
        current + amount,
        0,
        MAX_SECONDS,
      ),
    )

    if (amount > 0) {
      setDone(false)
    }
  }

  /* =========================================================
     TOMATO DRAG
     
     IMPORTANT DIRECTION:

     RIGHT  → LEFT
     pointer moves right → REMOVE time
     pointer moves left  → ADD time

     Vertical movement controls precision.
     ========================================================= */

  function handlePointerDown(event) {
    if (running) return

    event.preventDefault()

    const startY = event.clientY

    let lastX = event.clientX
    let carry = 0

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault()

      const verticalDistance = Math.abs(
        moveEvent.clientY - startY,
      )

      /*
       * Normal:
       * 1 second per movement unit
       *
       * Move up/down:
       * smaller and slower adjustments
       */

      let precision = 1

      if (verticalDistance > 130) {
        precision = 0.1
      } else if (verticalDistance > 50) {
        precision = 0.25
      }

      /*
       * THIS IS THE IMPORTANT PART.
       *
       * Normal X movement:
       *
       * move RIGHT:
       *   positive delta
       *   negative time
       *
       * move LEFT:
       *   negative delta
       *   positive time
       *
       * Therefore:
       *
       * current - horizontal movement
       */

      const horizontalMovement =
        moveEvent.clientX - lastX

      carry +=
        (-horizontalMovement /
          DRAG_PX_PER_SECOND) *
        precision

      lastX = moveEvent.clientX

      const whole = Math.trunc(carry)

      if (whole !== 0) {
        carry -= whole

        setSecondsLeft((current) =>
          clamp(
            current + whole,
            0,
            MAX_SECONDS,
          ),
        )

        if (whole > 0) {
          setDone(false)
        }
      }
    }

    const handlePointerUp = () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      window.removeEventListener(
        'pointerup',
        handlePointerUp,
      )

      window.removeEventListener(
        'pointercancel',
        handlePointerUp,
      )
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: false },
    )

    window.addEventListener(
      'pointerup',
      handlePointerUp,
    )

    window.addEventListener(
      'pointercancel',
      handlePointerUp,
    )
  }

  /* =========================================================
     KEYBOARD
     ========================================================= */

  function handleKeyDown(event) {
    const step = event.shiftKey ? 10 : 1

    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault()
      changeTime(-step)
    }

    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault()
      changeTime(step)
    }
  }

  /* =========================================================
     ERROR
     ========================================================= */

  if (error) {
    return (
      <Layout>
        <p
          className="error"
          role="alert"
        >
          {error}
        </p>

        <Link
          className="button"
          to="/"
        >
          Back to pasta
        </Link>
      </Layout>
    )
  }

  /* =========================================================
     LOADING
     ========================================================= */

  if (!pasta) {
    return (
      <Layout>
        <p className="muted">
          Loading pasta...
        </p>
      </Layout>
    )
  }

  const controlClass = [
    'tomato-control',
    running ? 'is-running' : '',
    done ? 'is-done' : '',
  ]
    .filter(Boolean)
    .join(' ')

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <Layout>
        <Link
          className="back"
          to="/"
        >
          ‹ All Presets
        </Link>
      <section className="cook-layout">

        {/* ===================================================
            LEFT SIDE
            =================================================== */}

        <div className="cook-main">


          <div className="cook-timer">

            <div className="cook-label">
              CookTimer
            </div>

            <div
              className={controlClass}
              role="slider"
              tabIndex={0}
              aria-label="Adjust cooking time"
              aria-valuemin={0}
              aria-valuemax={MAX_SECONDS}
              aria-valuenow={secondsLeft}
              aria-valuetext={formatTime(
                secondsLeft,
              )}
              onPointerDown={
                handlePointerDown
              }
              onKeyDown={handleKeyDown}
            >
              <Tomato
                seconds={secondsLeft}
                label={
                  done
                    ? 'Done!'
                    : DONENESS[doneness]
                }
              />
            </div>

            <p className="timer-help">
              Drag the tomato left or right to
              adjust the time. Drag right to
              subtract time and left to add time.
              Move up or down while dragging to
              make smaller adjustments. Arrow
              keys work too.
            </p>

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
                  className="button"
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

            <div className="timer-adjust-controls">

              <button
                className="button secondary"
                type="button"
                onClick={() =>
                  changeTime(-30)
                }
              >
                -30s
              </button>

              <button
                className="button secondary"
                type="button"
                onClick={() =>
                  changeTime(30)
                }
              >
                +30s
              </button>

            </div>

          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
            =================================================== */}

        <aside className="cook-details">

          <div className="pasta-header">

            <PastaThumb
              src={`/` + pasta.name.toLowerCase().replace(/\s+/g, "-") + ".png"}
              name={pasta.name}
            />

            <div>

              <h1>
                {pasta.name}
              </h1>

              {pasta.recommended && (
                <span className="tag-recommended">
                  Recommended
                </span>
              )}

            </div>

          </div>

          <div
            className="doneness-tabs"
            role="tablist"
            aria-label="Doneness"
          >

            {Object.entries(DONENESS).map(
              ([key, text]) => (
                <Link
                  key={key}
                  to={{
                    search: `?doneness=${key}`,
                  }}
                  role="tab"
                  aria-selected={
                    key === doneness
                  }
                  className={
                    key === doneness
                      ? 'doneness-tab active'
                      : 'doneness-tab'
                  }
                >
                  {text}
                </Link>
              ),
            )}

          </div>

          <p className="time-line">
            Recommended:{' '}
            {formatTime(initialSeconds)}
          </p>

          <p className="time-line">

            My time:{' '}

            {myTime
              ? formatTime(myTime)
              : 'not saved yet'}
          </p>

          <label
            className="notes-label"
            htmlFor="pasta-notes"
          >
            Notes
          </label>

          <textarea
            id="pasta-notes"
            className="notes-input"
            rows={6}
            placeholder="Add notes about this pasta…"
            value={notes}
            onChange={
              handleNotesChange
            }
          />

          <Link
            className="button secondary wide"
            to={`/pasta/${id}/edit`}
          >
            Edit this pasta
          </Link>

        </aside>

      </section>
    </Layout>
  )
}