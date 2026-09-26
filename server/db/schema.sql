-- Pasta Perfect database schema.

CREATE TABLE IF NOT EXISTS pasta (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  image             TEXT NOT NULL,
  al_dente_seconds  INTEGER NOT NULL,
  firm_seconds      INTEGER NOT NULL,
  soft_seconds      INTEGER NOT NULL,
  is_custom         BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX IF NOT EXISTS pasta_name_idx
  ON pasta (name);