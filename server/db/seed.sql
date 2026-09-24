TRUNCATE TABLE pasta RESTART IDENTITY CASCADE;

INSERT INTO pasta (
  name,
  image,
  al_dente_seconds,
  firm_seconds,
  soft_seconds
)
VALUES
  ('Angel hair', 'angel-hair.png', 180, 150, 240),
  ('Spaghetti', 'spaghetti.png', 480, 420, 540),
  ('Fettuccine', 'fettuccine.png', 600, 540, 660),
  ('Macaroni', 'macaroni.png', 480, 420, 540),
  ('Fusilli', 'fusilli.png', 540, 480, 600),
  ('Penne', 'penne.png', 600, 540, 660),
  ('Farfalle', 'farfalle.png', 600, 540, 660),
  ('Rigatoni', 'rigatoni.png', 720, 660, 780),
  ('Ravioli (fresh)', 'ravioli.png', 180, 150, 240);