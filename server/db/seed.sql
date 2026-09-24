-- Sample pasta presets for Pasta Perfect development.

TRUNCATE TABLE pasta RESTART IDENTITY CASCADE;

INSERT INTO pasta (
  name,
  image,
  al_dente_seconds,
  firm_seconds,
  soft_seconds
) VALUES
  (
    'Spaghetti',
    'spaghetti.png',
    540,
    480,
    600
  ),
  (
    'Penne',
    'penne.png',
    600,
    540,
    660
  ),
  (
    'Farfalle',
    'farfalle.png',
    720,
    660,
    780
  );