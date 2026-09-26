import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import {
  getPasta,
  updatePasta,
  updatePastaTime,
  resetPastaTime,
} from '../api/httpApi'
import '../styles/editPasta.css'

// ---------------------------------------------------------
// TIME HELPERS
// ---------------------------------------------------------

function secondsToMinutes(seconds) {
  const totalSeconds = Number(seconds || 0)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

function minutesToSeconds(value) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    return 0
  }

  const parts = value.split(':')

  if (parts.length === 2) {
    const minutes = Number(parts[0])
    const seconds = Number(parts[1])

    if (
      !Number.isInteger(minutes) ||
      !Number.isInteger(seconds) ||
      minutes < 0 ||
      seconds < 0 ||
      seconds > 59
    ) {
      return 0
    }

    return minutes * 60 + seconds
  }

  const minutes = Number(value)

  if (!Number.isFinite(minutes)) {
    return 0
  }

  return Math.round(minutes * 60)
}

// ---------------------------------------------------------
// EDIT PASTA
// ---------------------------------------------------------

export default function EditPasta() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [pasta, setPasta] = useState(null)

  const [form, setForm] = useState({
    name: '',
    image: '',
    alDenteMinutes: '',
    firmMinutes: '',
    softMinutes: '',
  })

  const [originalTimes, setOriginalTimes] = useState({
    alDenteMinutes: '',
    firmMinutes: '',
    softMinutes: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)

  // -------------------------------------------------------
  // LOAD PASTA
  // -------------------------------------------------------

  useEffect(() => {
    let cancelled = false

    async function loadPasta() {
      setLoading(true)
      setError('')

      try {
        const data = await getPasta(id)

        if (cancelled) {
          return
        }

        // ---------------------------------------------------
        // PREDEFINED PASTA
        // ---------------------------------------------------

        if (!data.isCustom) {
          const alDenteSeconds =
            data.customAlDenteSeconds ??
            data.alDenteSeconds

          const firmSeconds =
            data.customFirmSeconds ??
            data.firmSeconds

          const softSeconds =
            data.customSoftSeconds ??
            data.softSeconds

          const currentTimes = {
            alDenteMinutes:
              secondsToMinutes(alDenteSeconds),

            firmMinutes:
              secondsToMinutes(firmSeconds),

            softMinutes:
              secondsToMinutes(softSeconds),
          }

          const recommendedTimes = {
            alDenteMinutes:
              secondsToMinutes(
                data.alDenteSeconds,
              ),

            firmMinutes:
              secondsToMinutes(
                data.firmSeconds,
              ),

            softMinutes:
              secondsToMinutes(
                data.softSeconds,
              ),
          }

          setPasta(data)

          setForm({
            name: data.name,
            image: data.image,
            ...currentTimes,
          })

          setOriginalTimes(
            recommendedTimes,
          )

          setLoading(false)
          return
        }

        // ---------------------------------------------------
        // USER-ADDED PASTA
        // ---------------------------------------------------

        setPasta(data)

        setForm({
          name: data.name,
          image: data.image,
          alDenteMinutes:
            secondsToMinutes(
              data.alDenteSeconds,
            ),
          firmMinutes:
            secondsToMinutes(
              data.firmSeconds,
            ),
          softMinutes:
            secondsToMinutes(
              data.softSeconds,
            ),
        })

        setOriginalTimes({
          alDenteMinutes:
            secondsToMinutes(
              data.alDenteSeconds,
            ),

          firmMinutes:
            secondsToMinutes(
              data.firmSeconds,
            ),

          softMinutes:
            secondsToMinutes(
              data.softSeconds,
            ),
        })
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError.message ||
              'Could not load pasta.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPasta()

    return () => {
      cancelled = true
    }
  }, [id])

  // -------------------------------------------------------
  // HANDLE INPUT
  // -------------------------------------------------------

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // -------------------------------------------------------
  // HANDLE IMAGE
  // -------------------------------------------------------

  function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (file.type !== 'image/png') {
      setError(
        'Please choose a PNG image.',
      )
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  // -------------------------------------------------------
  // PREDEFINED PASTA TIME STATUS
  // -------------------------------------------------------

  const hasChanged =
    form.alDenteMinutes !==
      originalTimes.alDenteMinutes ||
    form.firmMinutes !==
      originalTimes.firmMinutes ||
    form.softMinutes !==
      originalTimes.softMinutes

  // -------------------------------------------------------
  // RESET PREDEFINED PASTA TIME
  // -------------------------------------------------------

  async function handleReset() {
    setError('')
    setResetting(true)

    try {
      const reset =
        await resetPastaTime(id)

      setPasta(reset)

      const recommendedTimes = {
        alDenteMinutes:
          secondsToMinutes(
            reset.alDenteSeconds,
          ),

        firmMinutes:
          secondsToMinutes(
            reset.firmSeconds,
          ),

        softMinutes:
          secondsToMinutes(
            reset.softSeconds,
          ),
      }

      setForm((current) => ({
        ...current,
        name: reset.name,
        image: reset.image,
        ...recommendedTimes,
      }))

      setOriginalTimes(
        recommendedTimes,
      )
    } catch (requestError) {
      console.error(
        'Could not reset pasta time:',
        requestError,
      )

      setError(
        requestError.message ||
          'Could not reset pasta time.',
      )
    } finally {
      setResetting(false)
    }
  }

  // -------------------------------------------------------
  // SAVE USER-ADDED PASTA
  // -------------------------------------------------------

  async function handleCustomSubmit(event) {
    event.preventDefault()

    setError('')

    if (!form.name.trim()) {
      setError(
        'Pasta name is required.',
      )
      return
    }

    if (!form.image.trim()) {
      setError(
        'Pasta image is required.',
      )
      return
    }

    const alDenteSeconds =
      minutesToSeconds(
        form.alDenteMinutes,
      )

    const firmSeconds =
      minutesToSeconds(
        form.firmMinutes,
      )

    const softSeconds =
      minutesToSeconds(
        form.softMinutes,
      )

    if (
      alDenteSeconds <= 0 ||
      firmSeconds <= 0 ||
      softSeconds <= 0
    ) {
      setError(
        'Cooking times must be greater than 0.',
      )
      return
    }

    setSaving(true)

    try {
      await updatePasta(id, {
        name: form.name.trim(),
        image: form.image.trim(),
      })

      navigate('/presets')
    } catch (requestError) {
      console.error(
        'Could not update pasta:',
        requestError,
      )

      setError(
        requestError.message ||
          'Could not update pasta.',
      )
    } finally {
      setSaving(false)
    }
  }

  // -------------------------------------------------------
  // SAVE PREDEFINED PASTA TIME
  // -------------------------------------------------------

  async function handlePresetSubmit(event) {
    event.preventDefault()

    setError('')

    const alDenteSeconds =
      minutesToSeconds(
        form.alDenteMinutes,
      )

    const firmSeconds =
      minutesToSeconds(
        form.firmMinutes,
      )

    const softSeconds =
      minutesToSeconds(
        form.softMinutes,
      )

    if (
      alDenteSeconds <= 0 ||
      firmSeconds <= 0 ||
      softSeconds <= 0
    ) {
      setError(
        'Cooking times must be greater than 0.',
      )
      return
    }

    if (
      !Number.isInteger(
        alDenteSeconds,
      ) ||
      !Number.isInteger(
        firmSeconds,
      ) ||
      !Number.isInteger(
        softSeconds,
      )
    ) {
      setError(
        'Cooking times must be valid times.',
      )
      return
    }

    setSaving(true)

    try {
      const updated =
        await updatePastaTime(id, {
          alDenteSeconds,
          firmSeconds,
          softSeconds,
        })

      setPasta(updated)

      setForm((current) => ({
        ...current,
        alDenteMinutes:
          secondsToMinutes(
            updated.customAlDenteSeconds ??
              updated.alDenteSeconds,
          ),

        firmMinutes:
          secondsToMinutes(
            updated.customFirmSeconds ??
              updated.firmSeconds,
          ),

        softMinutes:
          secondsToMinutes(
            updated.customSoftSeconds ??
              updated.softSeconds,
          ),
      }))

      navigate('/presets')
    } catch (requestError) {
      console.error(
        'Could not update pasta:',
        requestError,
      )

      setError(
        requestError.message ||
          'Could not update pasta.',
      )
    } finally {
      setSaving(false)
    }
  }

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (loading) {
    return (
      <Layout>
        <main className="edit-pasta-page">
          <div className="edit-pasta-header">
            <h1>Edit pasta</h1>

            <p>
              Loading pasta...
            </p>
          </div>
        </main>
      </Layout>
    )
  }

  // -------------------------------------------------------
  // NOT FOUND
  // -------------------------------------------------------

  if (!pasta) {
    return (
      <Layout>
        <main className="edit-pasta-page">
          <div className="edit-pasta-header">
            <Link
              className="edit-pasta-back"
              to="/presets"
            >
              ← Back to pasta
            </Link>

            <h1>Edit pasta</h1>

            <p className="edit-pasta-error">
              {error ||
                'Pasta not found.'}
            </p>
          </div>
        </main>
      </Layout>
    )
  }

  // -------------------------------------------------------
  // USER-ADDED PASTA PAGE
  // -------------------------------------------------------

  if (pasta.isCustom) {
    return (
      <Layout>
        <main className="edit-pasta-page">

          <div className="edit-pasta-header">

            <Link
              className="edit-pasta-back"
              to="/presets"
            >
              ← Back to pasta
            </Link>

            <h1>
              Edit pasta
            </h1>

            <p>
              Change your pasta name,
              photo, and cooking times.
            </p>

          </div>

          <form
            className="edit-pasta-form"
            onSubmit={
              handleCustomSubmit
            }
          >

            {error && (
              <p
                className="edit-pasta-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* -------------------------------------------------
                PASTA INFORMATION
                ------------------------------------------------- */}

            <section className="edit-pasta-info">

              <div className="edit-pasta-image">

                <img
                    src={
                        pasta.image?.startsWith('data:')
                        ? pasta.image
                        : `/${pasta.image}`
                    }
                    alt={`${pasta.name} pasta`}
                />

              </div>

              <div className="edit-pasta-details">

                <span className="edit-pasta-badge">
                  Added pasta
                </span>

                <h2>
                  {form.name}
                </h2>

                <p>
                  This pasta was added
                  by you.
                </p>

                <small>
                  You can change the
                  pasta name and photo.
                </small>

              </div>

            </section>

            {/* -------------------------------------------------
                NAME
                ------------------------------------------------- */}

            <section className="edit-pasta-section">

              <h2>
                Pasta information
              </h2>

            </section>

            <div className="edit-pasta-field">

              <label htmlFor="name">
                Pasta name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={
                  handleChange
                }
                placeholder="Pasta name"
                required
              />

            </div>

            {/* -------------------------------------------------
                IMAGE
                ------------------------------------------------- */}

            <div className="edit-pasta-field">

              <label htmlFor="image">
                Pasta photo
              </label>

              <input
                id="image"
                type="file"
                accept="image/png"
                onChange={
                  handleImageChange
                }
              />

              <small>
                PNG images only.
              </small>

            </div>

            {/* -------------------------------------------------
                COOKING TIMES
                ------------------------------------------------- */}

            <section className="edit-pasta-section">

              <h2>
                Cooking times
              </h2>

              <p>
                Enter the cooking time
                in minutes or
                minutes:seconds.
              </p>

            </section>

            <div className="edit-pasta-times">

              <div className="edit-pasta-field">

                <label htmlFor="alDenteMinutes">
                  Al dente
                </label>

                <input
                  id="alDenteMinutes"
                  name="alDenteMinutes"
                  type="text"
                  inputMode="decimal"
                  placeholder="7:00"
                  value={
                    form.alDenteMinutes
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="edit-pasta-field">

                <label htmlFor="firmMinutes">
                  Firm
                </label>

                <input
                  id="firmMinutes"
                  name="firmMinutes"
                  type="text"
                  inputMode="decimal"
                  placeholder="8:00"
                  value={
                    form.firmMinutes
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="edit-pasta-field">

                <label htmlFor="softMinutes">
                  Soft
                </label>

                <input
                  id="softMinutes"
                  name="softMinutes"
                  type="text"
                  inputMode="decimal"
                  placeholder="10:00"
                  value={
                    form.softMinutes
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>

            {/* -------------------------------------------------
                BUTTONS
                ------------------------------------------------- */}

            <div className="edit-pasta-actions">

              <Link
                className="edit-pasta-button secondary"
                to="/presets"
              >
                Cancel
              </Link>

              <button
                className="edit-pasta-button"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : 'Save changes'}
              </button>

            </div>

          </form>

        </main>
      </Layout>
    )
  }

  // -------------------------------------------------------
  // PREDEFINED PASTA PAGE
  // -------------------------------------------------------

  return (
    <Layout>
      <main className="edit-pasta-page">

        <div className="edit-pasta-header">

          <Link
            className="edit-pasta-back"
            to="/presets"
          >
            ← Back to pasta
          </Link>

          <h1>
            Edit pasta
          </h1>

          <p>
            Update the cooking times
            for this predefined pasta.
          </p>

        </div>

        <form
          className="edit-pasta-form"
          onSubmit={
            handlePresetSubmit
          }
        >

          {error && (
            <p
              className="edit-pasta-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* -------------------------------------------------
              PASTA INFORMATION
              ------------------------------------------------- */}

          <section className="edit-pasta-info">

            <div className="edit-pasta-image">

              <img
                src={
                    pasta.image?.startsWith('data:')
                    ? pasta.image
                    : `/${pasta.image}`
                }
                alt={`${pasta.name} pasta`}
            />

            </div>

            <div className="edit-pasta-details">

              <span className="edit-pasta-badge">
                Recommended
              </span>

              <h2>
                {pasta.name}
              </h2>

              <p>
                This pasta is part of
                the predefined Pasta
                Perfect presets.
              </p>

              <small>
                Pasta name and image
                cannot be changed.
              </small>

            </div>

          </section>

          {/* -------------------------------------------------
              COOKING TIMES
              ------------------------------------------------- */}

          <section className="edit-pasta-section">

            <h2>
              Cooking times
            </h2>

            <p>
              Enter the cooking time
              in minutes or
              minutes:seconds.
            </p>

          </section>

          <div className="edit-pasta-times">

            <div className="edit-pasta-field">

              <label htmlFor="alDenteMinutes">
                Al dente
              </label>

              <input
                id="alDenteMinutes"
                name="alDenteMinutes"
                type="text"
                inputMode="decimal"
                placeholder="7:00"
                value={
                  form.alDenteMinutes
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div className="edit-pasta-field">

              <label htmlFor="firmMinutes">
                Firm
              </label>

              <input
                id="firmMinutes"
                name="firmMinutes"
                type="text"
                inputMode="decimal"
                placeholder="8:00"
                value={
                  form.firmMinutes
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div className="edit-pasta-field">

              <label htmlFor="softMinutes">
                Soft
              </label>

              <input
                id="softMinutes"
                name="softMinutes"
                type="text"
                inputMode="decimal"
                placeholder="10:00"
                value={
                  form.softMinutes
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

          </div>

          {/* -------------------------------------------------
              STATUS
              ------------------------------------------------- */}

          <div
            className={
              hasChanged
                ? 'edit-pasta-status my-time'
                : 'edit-pasta-status recommended'
            }
          >

            <strong>
              {hasChanged
                ? 'My time'
                : 'Recommended'}
            </strong>

            <span>
              {hasChanged
                ? 'You have customized the cooking time for this pasta.'
                : 'Using the original Pasta Perfect recommendation.'}
            </span>

          </div>

          {/* -------------------------------------------------
              BUTTONS
              ------------------------------------------------- */}

          <div className="edit-pasta-actions">

            <Link
              className="edit-pasta-button secondary"
              to="/presets"
            >
              Cancel
            </Link>

            <button
              className="edit-pasta-button reset"
              type="button"
              onClick={handleReset}
              disabled={
                !hasChanged ||
                saving ||
                resetting
              }
            >
              {resetting
                ? 'Resetting...'
                : 'Reset'}
            </button>

            <button
              className="edit-pasta-button"
              type="submit"
              disabled={
                saving ||
                resetting
              }
            >
              {saving
                ? 'Saving...'
                : 'Save changes'}
            </button>

          </div>

        </form>

      </main>
    </Layout>
  )
}