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
       soft_seconds AS "softSeconds",
       is_custom AS "isCustom"
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
       soft_seconds AS "softSeconds",
       is_custom AS "isCustom"
     FROM pasta
     WHERE id = $1`,
    [id],
  )

  return result.rows[0] ?? null
}

export async function create(pool, pasta) {
  const result = await pool.query(
    `INSERT INTO pasta (
       name,
       image,
       al_dente_seconds,
       firm_seconds,
       soft_seconds,
       is_custom
     )
     VALUES ($1, $2, $3, $4, $5, TRUE)
     RETURNING
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       is_custom AS "isCustom"`,
    [
      pasta.name,
      pasta.image,
      pasta.alDenteSeconds,
      pasta.firmSeconds,
      pasta.softSeconds,
    ],
  )

  return result.rows[0]
}

export async function deleteCustom(pool, id) {
  const result = await pool.query(
    `DELETE FROM pasta
     WHERE id = $1
       AND is_custom = TRUE
     RETURNING id`,
    [id],
  )

  return result.rows[0] ?? null
}