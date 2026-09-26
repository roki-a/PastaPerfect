// Data-access layer for Pasta Perfect.

export async function getAll(
  pool,
  search = '',
) {
  const result = await pool.query(
    `SELECT
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
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

export async function getById(
  pool,
  id,
) {
  const result = await pool.query(
    `SELECT
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
       is_custom AS "isCustom"
     FROM pasta
     WHERE id = $1`,
    [id],
  )

  return result.rows[0] ?? null
}

export async function create(
  pool,
  pasta,
) {
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
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
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

// ---------------------------------------------------------
// UPDATE USER-ADDED PASTA DETAILS
// ---------------------------------------------------------

// Only user-added pasta can be changed here.
//
// Predefined pasta has is_custom = FALSE,
// so it cannot be updated using this function.

export async function updateCustomDetails(
  pool,
  id,
  pasta,
) {
  const result = await pool.query(
    `UPDATE pasta
     SET
       name = $1,
       image = $2
     WHERE id = $3
       AND is_custom = TRUE
     RETURNING
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
       is_custom AS "isCustom"`,
    [
      pasta.name,
      pasta.image,
      id,
    ],
  )

  return result.rows[0] ?? null
}

export async function deleteCustom(
  pool,
  id,
) {
  const result = await pool.query(
    `DELETE FROM pasta
     WHERE id = $1
       AND is_custom = TRUE
     RETURNING id`,
    [id],
  )

  return result.rows[0] ?? null
}

export async function updateCustom(
  pool,
  id,
  pasta,
) {
  const result = await pool.query(
    `UPDATE pasta
     SET
       name = $1,
       image = $2,
       al_dente_seconds = $3,
       firm_seconds = $4,
       soft_seconds = $5
     WHERE id = $6
       AND is_custom = TRUE
     RETURNING
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
       is_custom AS "isCustom"`,
    [
      pasta.name,
      pasta.image,
      pasta.alDenteSeconds,
      pasta.firmSeconds,
      pasta.softSeconds,
      id,
    ],
  )

  return result.rows[0] ?? null
}

export async function updatePresetTime(
  pool,
  id,
  times,
) {
  const result = await pool.query(
    `UPDATE pasta
     SET
       custom_al_dente_seconds = $1,
       custom_firm_seconds = $2,
       custom_soft_seconds = $3
     WHERE id = $4
       AND is_custom = FALSE
     RETURNING
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
       is_custom AS "isCustom"`,
    [
      times.alDenteSeconds,
      times.firmSeconds,
      times.softSeconds,
      id,
    ],
  )

  return result.rows[0] ?? null
}

export async function resetPresetTime(
  pool,
  id,
) {
  const result = await pool.query(
    `UPDATE pasta
     SET
       custom_al_dente_seconds = NULL,
       custom_firm_seconds = NULL,
       custom_soft_seconds = NULL
     WHERE id = $1
       AND is_custom = FALSE
     RETURNING
       id,
       name,
       image,
       al_dente_seconds AS "alDenteSeconds",
       firm_seconds AS "firmSeconds",
       soft_seconds AS "softSeconds",
       custom_al_dente_seconds AS "customAlDenteSeconds",
       custom_firm_seconds AS "customFirmSeconds",
       custom_soft_seconds AS "customSoftSeconds",
       is_custom AS "isCustom"`,
    [id],
  )

  return result.rows[0] ?? null
}