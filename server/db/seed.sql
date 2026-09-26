TRUNCATE TABLE pasta RESTART IDENTITY CASCADE;

INSERT INTO pasta (
  name,
  image,
  al_dente_seconds,
  firm_seconds,
  soft_seconds,
  is_custom
)
VALUES
  ('Angel hair', 'angel-hair.png', 180, 150, 240, FALSE),
  ('Spaghetti', 'spaghetti.png', 480, 420, 540, FALSE),
  ('Fettuccine', 'fettuccine.png', 600, 540, 660, FALSE),
  ('Macaroni', 'macaroni.png', 480, 420, 540, FALSE),
  ('Fusilli', 'fusilli.png', 540, 480, 600, FALSE),
  ('Penne', 'penne.png', 600, 540, 660, FALSE),
  ('Farfalle', 'farfalle.png', 600, 540, 660, FALSE),
  ('Rigatoni', 'rigatoni.png', 720, 660, 780, FALSE),
  ('Ravioli', 'ravioli.png', 180, 150, 240, FALSE);