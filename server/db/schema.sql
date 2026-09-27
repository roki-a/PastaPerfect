-- Pasta Perfect database schema.

CREATE TABLE IF NOT EXISTS pasta (
  id                       SERIAL PRIMARY KEY,
  name                     TEXT NOT NULL,
  image                    TEXT NOT NULL,
  al_dente_seconds         INTEGER NOT NULL,
  firm_seconds             INTEGER NOT NULL,
  soft_seconds             INTEGER NOT NULL,
  is_custom                BOOLEAN NOT NULL DEFAULT FALSE,
  custom_al_dente_seconds  INTEGER,
  custom_firm_seconds      INTEGER,
  custom_soft_seconds      INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS pasta_name_idx
  ON pasta (name);