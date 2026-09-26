import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import { createPasta } from '../api/httpApi'
import '../styles/addPasta.css'

const INITIAL_FORM = {
  name: '',
  alDenteMinutes: '3',
  alDenteSeconds: '0',
  firmMinutes: '2',
  firmSeconds: '0',
  softMinutes: '4',
  softSeconds: '0',
  notes: '',
}

const PIXEL_SIZE = 3

// Standard 16-color PICO-8 palette.
const PICO8_PALETTE = [
  '#000000',
  '#1D2B53',
  '#7E2553',
  '#008751',
  '#AB5236',
  '#5F574F',
  '#C2C3C7',
  '#FFF1E8',
  '#FF004D',
  '#FFA300',
  '#FFEC27',
  '#00E436',
  '#29ADFF',
  '#83769C',
  '#FF77A8',
  '#FFCCAA',
]

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

const PICO8_RGB = PICO8_PALETTE.map(hexToRgb)

function findClosestPico8Color(r, g, b) {
  let closest = PICO8_RGB[0]
  let smallestDistance = Infinity

  for (const color of PICO8_RGB) {
    const redDistance = r - color.r
    const greenDistance = g - color.g
    const blueDistance = b - color.b

    const distance =
      redDistance * redDistance +
      greenDistance * greenDistance +
      blueDistance * blueDistance

    if (distance < smallestDistance) {
      smallestDistance = distance
      closest = color
    }
  }

  return closest
}

function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(
        new Error('Could not read the selected image.'),
      )
    }

    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)

    image.onerror = () => {
      reject(
        new Error('Could not load the selected image.'),
      )
    }

    image.src = dataUrl
  })
}

async function createPixelArt(dataUrl) {
  const image = await loadImage(dataUrl)

  const sourceWidth = image.naturalWidth
  const sourceHeight = image.naturalHeight

  if (!sourceWidth || !sourceHeight) {
    throw new Error('The selected image has no valid size.')
  }

  // First canvas:
  // shrink the image by the pixel-size factor.
  const pixelWidth = Math.max(
    1,
    Math.floor(sourceWidth / PIXEL_SIZE),
  )

  const pixelHeight = Math.max(
    1,
    Math.floor(sourceHeight / PIXEL_SIZE),
  )

  const smallCanvas = document.createElement('canvas')

  smallCanvas.width = pixelWidth
  smallCanvas.height = pixelHeight

  const smallContext = smallCanvas.getContext('2d', {
    willReadFrequently: true,
  })

  smallContext.imageSmoothingEnabled = false

  smallContext.clearRect(
    0,
    0,
    pixelWidth,
    pixelHeight,
  )

  smallContext.drawImage(
    image,
    0,
    0,
    pixelWidth,
    pixelHeight,
  )

  const imageData = smallContext.getImageData(
    0,
    0,
    pixelWidth,
    pixelHeight,
  )

  const pixels = imageData.data

  // Replace each pixel with its closest PICO-8 color.
  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3]

    // Keep transparent pixels transparent.
    if (alpha < 16) {
      continue
    }

    const color = findClosestPico8Color(
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
    )

    pixels[index] = color.r
    pixels[index + 1] = color.g
    pixels[index + 2] = color.b
  }

  smallContext.putImageData(
    imageData,
    0,
    0,
  )

  // Second canvas:
  // scale the pixelated image back up with nearest-neighbor scaling.
  const finalCanvas = document.createElement('canvas')

  finalCanvas.width = sourceWidth
  finalCanvas.height = sourceHeight

  const finalContext = finalCanvas.getContext('2d')

  finalContext.imageSmoothingEnabled = false

  finalContext.clearRect(
    0,
    0,
    sourceWidth,
    sourceHeight,
  )

  finalContext.drawImage(
    smallCanvas,
    0,
    0,
    pixelWidth,
    pixelHeight,
    0,
    0,
    sourceWidth,
    sourceHeight,
  )

  return finalCanvas.toDataURL(
    'image/png',
  )
}

function timeToSeconds(minutes, seconds) {
  const minuteValue = Number(minutes) || 0
  const secondValue = Number(seconds) || 0

  return Math.round(
    minuteValue * 60 + secondValue,
  )
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(
    totalSeconds / 60,
  )

  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

export default function AddPasta() {
  const navigate = useNavigate()

  const [form, setForm] = useState(INITIAL_FORM)

  const [imagePreview, setImagePreview] =
    useState('')

  const [imageProcessing, setImageProcessing] =
    useState(false)

  const [error, setError] = useState('')

  const [saving, setSaving] = useState(false)

  const [selectedDoneness, setSelectedDoneness] =
    useState('alDente')

  useEffect(() => {
    return () => {
      // Nothing to revoke because previews are data URLs.
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setError('')
    setImageProcessing(true)

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error(
          'Please choose an image file.',
        )
      }

      const originalDataUrl =
        await imageFileToDataUrl(file)

      const processedDataUrl =
        await createPixelArt(
          originalDataUrl,
        )

      setImagePreview(processedDataUrl)
    } catch (processingError) {
      setImagePreview('')

      setError(
        processingError.message ||
          'Could not process the image.',
      )
    } finally {
      setImageProcessing(false)
    }
  }

  function handleDonenessChange(value) {
    setSelectedDoneness(value)
  }

  function getRecommendedSeconds() {
    if (selectedDoneness === 'firm') {
      return timeToSeconds(
        form.firmMinutes,
        form.firmSeconds,
      )
    }

    if (selectedDoneness === 'soft') {
      return timeToSeconds(
        form.softMinutes,
        form.softSeconds,
      )
    }

    return timeToSeconds(
      form.alDenteMinutes,
      form.alDenteSeconds,
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    if (!form.name.trim()) {
      setError('Please enter a pasta name.')
      return
    }

    if (!imagePreview) {
      setError('Please upload a pasta image.')
      return
    }

    const alDenteSeconds = timeToSeconds(
      form.alDenteMinutes,
      form.alDenteSeconds,
    )

    const firmSeconds = timeToSeconds(
      form.firmMinutes,
      form.firmSeconds,
    )

    const softSeconds = timeToSeconds(
      form.softMinutes,
      form.softSeconds,
    )

    if (
      alDenteSeconds <= 0 ||
      firmSeconds <= 0 ||
      softSeconds <= 0
    ) {
      setError(
        'All cooking times must be greater than 0.',
      )
      return
    }

    setSaving(true)

    try {
      await createPasta({
        name: form.name.trim(),

        // Save the processed PICO-8 PNG.
        image: imagePreview,

        alDenteSeconds,
        firmSeconds,
        softSeconds,
      })

      navigate('/')
    } catch (requestError) {
      setError(
        requestError.message ||
          'Could not add pasta.',
      )
    } finally {
      setSaving(false)
    }
  }

  const recommendedSeconds =
    getRecommendedSeconds()

  return (
    <Layout>
      <main className="add-pasta-page">
        <div className="add-pasta-header">
          <Link
            className="add-pasta-back"
            to="/"
          >
            ← All Presets
          </Link>

          <span className="add-pasta-label">
            New pasta
          </span>

          <h1>Add my pasta / Edit pasta</h1>

          <p>
            Add a pasta you cook at home and set
            its times.
          </p>
        </div>

        <form
          className="add-pasta-layout"
          onSubmit={handleSubmit}
        >
          <section className="add-pasta-form">
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
                placeholder="e.g. Tagliatelle"
                required
              />
            </div>

            <div className="add-pasta-field">
              <label htmlFor="image">
                Pasta image
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
              />

              <small>
                Your image is automatically
                converted to pixel art.
              </small>

              <div className="pixel-settings">
                <span>
                  Pixel size: <strong>3</strong>
                </span>

                <span>
                  Palette: <strong>PICO-8</strong>
                </span>
              </div>
            </div>

            <div className="add-pasta-section">
              <h2>Doneness</h2>

              <div className="doneness-tabs">
                <button
                  type="button"
                  className={
                    selectedDoneness === 'alDente'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    handleDonenessChange(
                      'alDente',
                    )
                  }
                >
                  Al dente
                </button>

                <button
                  type="button"
                  className={
                    selectedDoneness === 'firm'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    handleDonenessChange(
                      'firm',
                    )
                  }
                >
                  Firm
                </button>

                <button
                  type="button"
                  className={
                    selectedDoneness === 'soft'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    handleDonenessChange(
                      'soft',
                    )
                  }
                >
                  Soft
                </button>
              </div>
            </div>

            <div className="time-groups">
              <div className="time-group">
                <h3>Recommended time</h3>

                <div className="time-inputs">
                  <input
                    name="alDenteMinutes"
                    type="number"
                    min="0"
                    step="1"
                    value={
                      form.alDenteMinutes
                    }
                    onChange={handleChange}
                    aria-label="Al dente minutes"
                    placeholder="min"
                  />

                  <input
                    name="alDenteSeconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={
                      form.alDenteSeconds
                    }
                    onChange={handleChange}
                    aria-label="Al dente seconds"
                    placeholder="sec"
                  />
                </div>
              </div>

              <div className="time-group">
                <h3>Firm time</h3>

                <div className="time-inputs">
                  <input
                    name="firmMinutes"
                    type="number"
                    min="0"
                    step="1"
                    value={form.firmMinutes}
                    onChange={handleChange}
                    aria-label="Firm minutes"
                    placeholder="min"
                  />

                  <input
                    name="firmSeconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={form.firmSeconds}
                    onChange={handleChange}
                    aria-label="Firm seconds"
                    placeholder="sec"
                  />
                </div>
              </div>

              <div className="time-group">
                <h3>Soft time</h3>

                <div className="time-inputs">
                  <input
                    name="softMinutes"
                    type="number"
                    min="0"
                    step="1"
                    value={form.softMinutes}
                    onChange={handleChange}
                    aria-label="Soft minutes"
                    placeholder="min"
                  />

                  <input
                    name="softSeconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    value={form.softSeconds}
                    onChange={handleChange}
                    aria-label="Soft seconds"
                    placeholder="sec"
                  />
                </div>
              </div>
            </div>

            <div className="add-pasta-field">
              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add notes about this pasta..."
                rows="4"
              />
            </div>

            <p className="add-pasta-help">
              Each doneness has its own recommended
              time and its own cooking time.
            </p>

            <div className="add-pasta-actions">
              <Link
                className="add-pasta-button secondary"
                to="/"
              >
                Cancel
              </Link>

              <button
                className="add-pasta-button"
                type="submit"
                disabled={
                  saving ||
                  imageProcessing
                }
              >
                {saving
                  ? 'Saving...'
                  : imageProcessing
                    ? 'Processing...'
                    : 'Save'}
              </button>
            </div>
          </section>

          <aside className="add-pasta-preview-panel">
            <h2>Live preview</h2>

            <div className="pasta-preview-card">
              <div className="pasta-preview-image">
                {imageProcessing ? (
                  <span>
                    Processing...
                  </span>
                ) : imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={
                      form.name ||
                      'Pasta preview'
                    }
                  />
                ) : (
                  <div className="empty-preview">
                    <span>🍅</span>
                  </div>
                )}
              </div>

              <div className="pasta-preview-content">
                <h3>
                  {form.name ||
                    'Your pasta'}
                </h3>

                <span className="recommended-badge">
                  Recommended
                </span>

                <div className="preview-bottom">
                  <div>
                    <strong>
                      {formatTime(
                        recommendedSeconds,
                      )}
                    </strong>

                    <span>
                      {selectedDoneness ===
                      'firm'
                        ? 'Firm'
                        : selectedDoneness ===
                            'soft'
                          ? 'Soft'
                          : 'Al dente'}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </Layout>
  )
}