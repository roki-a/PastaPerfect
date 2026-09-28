import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { pool } from './db/pool.js'
import * as pasta from './pastaRepo.js'

const app = express()

// ---------------------------------------------------------
// BASIC SECURITY
// ---------------------------------------------------------

app.disable('x-powered-by')
app.use(helmet())

// ---------------------------------------------------------
// CORS
// ---------------------------------------------------------

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
  }),
)

// ---------------------------------------------------------
// REQUEST BODY LIMIT
// ---------------------------------------------------------

// Pasta images are stored as PNG data URLs.
// 5 MB is enough for the project's pixel-art images.
app.use(
  express.json({
    limit: '5mb',
  }),
)

// ---------------------------------------------------------
// VALIDATION HELPERS
// ---------------------------------------------------------

function getPastaId(request, response) {
  const id = Number(request.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    response.status(400).json({
      error:
        'Pasta ID must be a positive whole number.',
    })

    return null
  }

  return id
}

function validateCookingTimes(
  alDenteSeconds,
  firmSeconds,
  softSeconds,
) {
  const times = [
    alDenteSeconds,
    firmSeconds,
    softSeconds,
  ]

  return times.every(
    (value) =>
      Number.isInteger(value) &&
      value > 0,
  )
}

function validatePngImage(image) {
  if (
    typeof image !== 'string' ||
    !image.trim()
  ) {
    return false
  }

  // Only restrict data URLs.
  // Normal project image paths such as "angel-hair.png"
  // remain valid.
  if (image.startsWith('data:image/')) {
    return image.startsWith(
      'data:image/png;base64,',
    )
  }

  return true
}

// ---------------------------------------------------------
// HEALTH CHECK
// ---------------------------------------------------------

app.get(
  '/healthz',
  (request, response) => {
    response.json({
      ok: true,
    })
  },
)

// ---------------------------------------------------------
// DATABASE READINESS CHECK
// ---------------------------------------------------------

app.get(
  '/readyz',
  async (request, response) => {
    try {
      await pool.query('SELECT 1')

      response.json({
        ok: true,
        db: 'up',
      })
    } catch (error) {
      console.error(
        'readyz failed:',
        error.message,
      )

      response.status(503).json({
        ok: false,
        db: 'down',
      })
    }
  },
)

// ---------------------------------------------------------
// APP PASSWORD AUTHENTICATION
// ---------------------------------------------------------

const appPassword = process.env.APP_PASSWORD

if (!appPassword) {
  console.error(
    'APP_PASSWORD is not set. Add it to the Render environment variables.'
  )
  process.exit(1)
}

function requireAppPassword(request, response, next) {
  const authorization = request.get('Authorization')

  if (!authorization) {
    return response.status(401).json({
      error: 'App password required.',
    })
  }

  const [scheme, password] = authorization.split(' ')

  if (
    scheme !== 'Bearer' ||
    !password ||
    password !== appPassword
  ) {
    return response.status(401).json({
      error: 'Invalid app password.',
    })
  }

  next()
}

app.use('/api', requireAppPassword)

// ---------------------------------------------------------
// GET ALL PASTA
// ---------------------------------------------------------

// GET /api/pasta
// GET /api/pasta?search=penne

app.get(
  '/api/pasta',
  async (
    request,
    response,
    next,
  ) => {
    try {
      let search =
        typeof request.query.search === 'string'
          ? request.query.search.trim()
          : ''

      // Prevent unnecessarily large search strings.
      if (search.length > 100) {
        return response.status(400).json({
          error:
            'Search must be 100 characters or fewer.',
        })
      }

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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const id = getPastaId(
        request,
        response,
      )

      if (id === null) {
        return
      }

      const row = await pasta.getById(
        pool,
        id,
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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const {
        name,
        image,
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      } = request.body

      // Validate name.
      if (
        typeof name !== 'string' ||
        !name.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta name is required.',
        })
      }

      if (name.trim().length > 100) {
        return response.status(400).json({
          error:
            'Pasta name must be 100 characters or fewer.',
        })
      }

      // Validate image.
      if (
        typeof image !== 'string' ||
        !image.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta image is required.',
        })
      }

      if (!validatePngImage(image)) {
        return response.status(400).json({
          error:
            'Uploaded images must be PNG files.',
        })
      }

      // Validate cooking times.
      if (
        !validateCookingTimes(
          alDenteSeconds,
          firmSeconds,
          softSeconds,
        )
      ) {
        return response.status(400).json({
          error:
            'Cooking times must be positive whole seconds.',
        })
      }

      const created =
        await pasta.create(
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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const id = getPastaId(
        request,
        response,
      )

      if (id === null) {
        return
      }

      const {
        name,
        image,
      } = request.body

      // Validate name.
      if (
        typeof name !== 'string' ||
        !name.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta name is required.',
        })
      }

      if (name.trim().length > 100) {
        return response.status(400).json({
          error:
            'Pasta name must be 100 characters or fewer.',
        })
      }

      // Validate image.
      if (
        typeof image !== 'string' ||
        !image.trim()
      ) {
        return response.status(400).json({
          error: 'Pasta image is required.',
        })
      }

      if (!validatePngImage(image)) {
        return response.status(400).json({
          error:
            'Uploaded images must be PNG files.',
        })
      }

      const updated =
        await pasta.updateCustomDetails(
          pool,
          id,
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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const id = getPastaId(
        request,
        response,
      )

      if (id === null) {
        return
      }

      const {
        alDenteSeconds,
        firmSeconds,
        softSeconds,
      } = request.body

      if (
        !validateCookingTimes(
          alDenteSeconds,
          firmSeconds,
          softSeconds,
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
          id,
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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const id = getPastaId(
        request,
        response,
      )

      if (id === null) {
        return
      }

      const reset =
        await pasta.resetPresetTime(
          pool,
          id,
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
  async (
    request,
    response,
    next,
  ) => {
    try {
      const id = getPastaId(
        request,
        response,
      )

      if (id === null) {
        return
      }

      const deleted =
        await pasta.deleteCustom(
          pool,
          id,
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

    // PostgreSQL unique constraint.
    if (error.code === '23505') {
      return response.status(409).json({
        error:
          'A pasta with that name already exists.',
      })
    }

    // Invalid JSON body.
    if (
      error instanceof SyntaxError &&
      error.status === 400 &&
      'body' in error
    ) {
      return response.status(400).json({
        error: 'Invalid JSON request body.',
      })
    }

    // Request body exceeded express.json limit.
    if (
      error.type === 'entity.too.large'
    ) {
      return response.status(413).json({
        error:
          'Request body is too large.',
      })
    }

    // Never expose database or internal
    // implementation details to the client.
    response.status(500).json({
      error:
        'Something went wrong on the server.',
    })
  },
)

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------

const port =
  process.env.PORT || 3000

app.listen(
  port,
  () => {
    console.log(
      `Pasta Perfect API listening on http://localhost:${port}`,
    )

    console.log(
      `CORS allows: ${allowedOrigins.join(', ')}`,
    )
  },
)