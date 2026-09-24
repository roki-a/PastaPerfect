import express from 'express'
import cors from 'cors'
import { pool } from './db/pool.js'
import * as pasta from './pastaRepo.js'

const app = express()

const allowedOrigins = (
  process.env.CORS_ORIGINS || 'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '100kb' }))

// Basic server health check
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Database health check
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// Get all pasta presets
app.get('/api/pasta', async (request, response, next) => {
  try {
    response.json(await pasta.getAll(pool))
  } catch (error) {
    next(error)
  }
})

// Get one pasta preset
app.get('/api/pasta/:id', async (request, response, next) => {
  try {
    const row = await pasta.getById(pool, request.params.id)

    if (!row) {
      return response.status(404).json({
        error: 'Pasta not found',
      })
    }

    response.json(row)
  } catch (error) {
    next(error)
  }
})

// 404 handler
app.use((request, response) => {
  response.status(404).json({
    error: 'No such route',
  })
})

// Error handler
app.use((error, request, response, next) => {
  console.error(error)

  response.status(500).json({
    error: 'Something went wrong on the server',
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log(`CORS allows: ${allowedOrigins.join(', ')}`)
})