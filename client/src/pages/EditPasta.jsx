import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import {
  getPasta,
  updatePasta,
} from '../api/httpApi'

import '../styles/addPasta.css'

const INITIAL_FORM = {
  name: '',
  image: '',
  alDenteMinutes: '3',
  firmMinutes: '2',
  softMinutes: '4',
}

function minutesToSeconds(value) {
  return Math.round(Number(value) * 60)
}

function secondsToMinutes(seconds) {
  return String(Number(seconds || 0) / 60)
}

export default function EditPasta() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPasta() {
      setLoading(true)
      setError('')

      try {
        const pasta = await getPasta(id)

        if (cancelled) {
          return
        }

        if (!pasta.isCustom) {
          setError(
            'Default pasta presets cannot be edited.',
          )

          setLoading(false)
          return
        }

        setForm({
          name: pasta.name || '',
          image: pasta.image || '',
          alDenteMinutes: secondsToMinutes(
            pasta.alDenteSeconds,
          ),
          firmMinutes: secondsToMinutes(
            pasta.firmSeconds,
          ),
          softMinutes: secondsToMinutes(
            pasta.softSeconds,
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

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    if (!form.name.trim()) {
      setError('Please enter a pasta name.')
      return
    }

    if (!form.image.trim()) {
      setError('Please upload a pasta image.')
      return
    }

    const alDenteSeconds = minutesToSeconds(
      form.alDenteMinutes,
    )

    const firmSeconds = minutesToSeconds(
      form.firmMinutes,
    )

    const softSeconds = minutesToSeconds(
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
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      })

      navigate('/presets')
    } catch (requestError) {
      setError(
        requestError.message ||
          'Could not update pasta.',
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <main className="add-pasta-page">
          <div className="add-pasta-header">
            <h1>Edit pasta</h1>
            <p>Loading pasta...</p>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="add-pasta-page">
        <div className="add-pasta-header">
          <Link
            className="add-pasta-back"
            to="/presets"
          >
            ← Back to pasta
          </Link>

          <h1>Edit pasta</h1>

          <p>
            Update your pasta preset and its
            recommended cooking times.
          </p>
        </div>

        <form
          className="add-pasta-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <p
              className="add-pasta-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="add-pasta-field">
            <label htmlFor="name">
              Pasta name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Linguine"
              required
            />
          </div>

          <div className="add-pasta-field">
            <label htmlFor="image">
              Image
            </label>

            <input
              id="image"
              name="image"
              type="text"
              value={form.image}
              onChange={handleChange}
              required
            />

            <small>
              Your existing pasta image will be kept
              unless you replace it.
            </small>
          </div>

          <div className="add-pasta-section">
            <h2>Cooking times</h2>

            <p>
              Enter the recommended time in minutes.
            </p>
          </div>

          <div className="add-pasta-times">
            <div className="add-pasta-field">
              <label htmlFor="alDenteMinutes">
                Al dente
              </label>

              <input
                id="alDenteMinutes"
                name="alDenteMinutes"
                type="number"
                min="0.1"
                step="0.1"
                value={form.alDenteMinutes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-pasta-field">
              <label htmlFor="firmMinutes">
                Firm
              </label>

              <input
                id="firmMinutes"
                name="firmMinutes"
                type="number"
                min="0.1"
                step="0.1"
                value={form.firmMinutes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-pasta-field">
              <label htmlFor="softMinutes">
                Soft
              </label>

              <input
                id="softMinutes"
                name="softMinutes"
                type="number"
                min="0.1"
                step="0.1"
                value={form.softMinutes}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="add-pasta-actions">
            <Link
              className="add-pasta-button secondary"
              to="/presets"
            >
              Cancel
            </Link>

            <button
              className="add-pasta-button"
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