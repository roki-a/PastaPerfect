import express from 'express'
import cors from 'cors'
import { pool } from './db/pool.js'
import * as pasta from './pastaRepo.js'

const app = express()

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))

// Allow image data URLs when creating a pasta.
// Pixel-art PNG images are usually small, but 5 MB gives enough room.
app.use(express.json({ limit: '5mb' }))

// ---------------------------------------------------------
// HEALTH CHECK
// ---------------------------------------------------------

app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')

    response.json({
      ok: true,
      db: 'up',
    })
  } catch (error) {
    console.error('readyz failed:', error.message)

    response.status(503).json({
      ok: false,
      db: 'down',
    })
  }
})

// ---------------------------------------------------------
// GET ALL PASTA
// ---------------------------------------------------------

// GET /api/pasta
// GET /api/pasta?search=penne

app.get(
  '/api/pasta',
  async (request, response, next) => {
    try {
      const search =
        typeof request.query.search === 'string'
          ? request.query.search.trim()
          : ''

      const rows = await pasta.getAll(
        pool,
        search,
      )

      response.json(rows)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// GET ONE PASTA
// ---------------------------------------------------------

app.get(
  '/api/pasta/:id',
  async (request, response, next) => {
    try {
      const row = await pasta.getById(
        pool,
        request.params.id,
      )

      if (!row) {
        return response.status(404).json({
          error: 'Pasta not found',
        })
      }

      response.json(row)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// CREATE PASTA
// ---------------------------------------------------------

app.post(
  '/api/pasta',
  async (request, response, next) => {
    try {
      const {
        name,
        image,
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      } = request.body

      if (
        typeof name !== 'string' ||
        !name.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta name is required.',
        })
      }

      if (
        typeof image !== 'string' ||
        !image.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta image is required.',
        })
      }

      const times = [
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      ]

      if (
        times.some(
          (value) =>
            !Number.isInteger(value) ||
            value <= 0,
        )
      ) {
        return response.status(400).json({
          error:
            'Cooking times must be positive whole seconds.',
        })
      }

      if (
        image.startsWith('data:image/') &&
        !image.startsWith(
          'data:image/png;base64,',
        )
      ) {
        return response.status(400).json({
          error: 'Uploaded images must be PNG files.',
        })
      }

      const created = await pasta.create(
        pool,
        {
          name: name.trim(),
          image: image.trim(),
          alDenteSeconds,
          firmSeconds,
          softSeconds,
        },
      )

      response.status(201).json(created)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// UPDATE USER-ADDED PASTA
// ---------------------------------------------------------

app.put(
  '/api/pasta/:id',
  async (request, response, next) => {
    try {
      const {
        name,
        image,
      } = request.body

      if (
        typeof name !== 'string' ||
        !name.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta name is required.',
        })
      }

      if (
        typeof image !== 'string' ||
        !image.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta image is required.',
        })
      }

      if (
        image.startsWith('data:image/') &&
        !image.startsWith(
          'data:image/png;base64,',
        )
      ) {
        return response.status(400).json({
          error: 'Uploaded images must be PNG files.',
        })
      }

      const updated =
        await pasta.updateCustomDetails(
          pool,
          request.params.id,
          {
            name: name.trim(),
            image: image.trim(),
          },
        )

      if (!updated) {
        return response.status(404).json({
          error:
            'Only added pasta can be edited.',
        })
      }

      response.json(updated)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// UPDATE PREDEFINED PASTA COOKING TIME
// ---------------------------------------------------------

app.put(
  '/api/pasta/:id/time',
  async (request, response, next) => {
    try {
      const {
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      } = request.body

      const times = [
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      ]

      if (
        times.some(
          (value) =>
            !Number.isInteger(value) ||
            value <= 0,
        )
      ) {
        return response.status(400).json({
          error:
            'Cooking times must be positive whole seconds.',
        })
      }

      const updated =
        await pasta.updatePresetTime(
          pool,
          request.params.id,
          {
            alDenteSeconds,
            firmSeconds,
            softSeconds,
          },
        )

      if (!updated) {
        return response.status(404).json({
          error:
            'Only predefined pasta can use this route.',
        })
      }

      response.json(updated)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// RESET PREDEFINED PASTA TO RECOMMENDED TIME
// ---------------------------------------------------------

app.post(
  '/api/pasta/:id/reset-time',
  async (request, response, next) => {
    try {
      const reset =
        await pasta.resetPresetTime(
          pool,
          request.params.id,
        )

      if (!reset) {
        return response.status(404).json({
          error:
            'Only predefined pasta can be reset.',
        })
      }

      response.json(reset)
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// DELETE USER-ADDED PASTA
// ---------------------------------------------------------

app.delete(
  '/api/pasta/:id',
  async (request, response, next) => {
    try {
      const deleted =
        await pasta.deleteCustom(
          pool,
          request.params.id,
        )

      if (!deleted) {
        return response.status(404).json({
          error:
            'Only added pasta can be deleted.',
        })
      }

      response.status(204).send()
    } catch (error) {
      next(error)
    }
  },
)

// ---------------------------------------------------------
// UNKNOWN ROUTES
// ---------------------------------------------------------

app.use(
  (request, response) => {
    response.status(404).json({
      error: 'No such route',
    })
  },
)

// ---------------------------------------------------------
// SERVER ERRORS
// ---------------------------------------------------------

app.use(
  (
    error,
    request,
    response,
    next,
  ) => {
    console.error(error)

    if (error.code === '23505') {
      return response.status(409).json({
        error:
          'A pasta with that name already exists.',
      })
    }

    response.status(500).json({
      error:
        'Something went wrong on the server',
    })
  },
)

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(
    `Pasta Perfect API listening on http://localhost:${port}`,
  )

  console.log(
    `CORS allows: ${allowedOrigins.join(', ')}`,
  )
})