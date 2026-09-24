// Data-access layer for Pasta Perfect.
//
// Database values are always passed through PostgreSQL parameters rather than
// being inserted directly into SQL strings.

export async function getAll(pool) {
  const result = await pool.query(
    `SELECT
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds"
     FROM pasta
     ORDER BY id ASC`
  )

  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query(
    `SELECT
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds"
     FROM pasta
     WHERE id = $1`,
    [id]
  )

  return result.rows[0] ?? null
}