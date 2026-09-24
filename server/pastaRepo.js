// Data-access layer for Pasta Perfect.
//
// Database values are passed through PostgreSQL parameters rather than
// being inserted directly into SQL strings.

export async function getAll(pool, search = '') {
  const result = await pool.query(
    `SELECT
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds"
     FROM pasta
     WHERE
       $1 = ''
       OR name ILIKE '%' || $1 || '%'
     ORDER BY id ASC`,
    [search],
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
    [id],
  )

  return result.rows[0] ?? null
}