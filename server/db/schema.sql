-- Pasta Perfect database schema.
--
-- This file defines the data required by the Pasta Perfect application.
-- It is safe to run against an empty database and safe to run more than once.

CREATE TABLE IF NOT EXISTS pasta (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  image             TEXT NOT NULL,
  al_dente_seconds  INTEGER NOT NULL,
  firm_seconds      INTEGER NOT NULL,
  soft_seconds      INTEGER NOT NULL
);

-- Keeps pasta names easy to search and prevents duplicate preset names.
CREATE UNIQUE INDEX IF NOT EXISTS pasta_name_idx
  ON pasta (name);