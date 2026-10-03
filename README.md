# Pasta Perfect

Pasta Perfect is a full-stack web app that helps home cooks pick a pasta,
choose how soft they like it, and cook it with a countdown timer.

**Live site:** https://roki-a.github.io/PastaPerfect/

**Also on Render:** https://pasta-perfect.onrender.com

**API:** https://pasta-perfect-api.onrender.com/healthz

**Demo video:** https://drive.google.com/drive/folders/1J7wz1OzFR-NcnpTJEWidAGLEkMY425zr?usp=sharing

**Repository:** https://github.com/roki-a/PastaPerfect

> **Access.** The API is behind an application password, so the site asks for
> it before showing any pasta. The login details are given with the course
> submission and are not stored in this repository. The API runs on Render's
> free tier, so the first request after a quiet period can take up to a
> minute while it wakes up.

<img width="1920" height="1207" alt="image" src="https://github.com/user-attachments/assets/938053b0-f26f-4de0-9e53-4e52540f998a" />


## What it does

- Browse pasta presets, each with a recommended time
- Search pasta by name
- Choose a doneness: Al dente, Firm or Soft
- See whether a card shows the **Recommended** time or **My time**, and reset
  a changed time back to the recommended one
- Cook with a countdown timer: start, pause, reset, and drag the tomato to
  change the time
- Add your own pasta with a name, an image and three cooking times, then edit
  or delete it
- Browse recipes with ingredients and steps, and jump to the timer from a
  recipe
- Keep notes for a pasta (saved in your browser)

Built-in pasta can have its time customised, but it cannot be renamed or
deleted. Only pasta you add can be edited or deleted.

Pasta data is saved in PostgreSQL through the Express API. Notes are saved in
the browser's `localStorage`, not in the database.

## Built with

- React, Vite and React Router for the front end
- Node.js and Express for the API
- PostgreSQL for the data
- GitHub Pages and Render for the front end; Render for the API and database

## How to run it

Run these from the repository root.

### 1. Set up PostgreSQL

Create a local database named `pasta_perfect`, then copy
`server/.env.example` to `server/.env` and fill it in:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/pasta_perfect
APP_USERNAME=your_app_username
APP_PASSWORD=your_app_password
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
PORT=3000
```

Do not commit the real `.env` file.

### 2. Start the API

```bash
cd server
npm install
node --env-file=.env db/run.js db/schema.sql
node --env-file=.env db/run.js db/seed.sql
npm run dev
```

The seed data is invented pasta and cooking times. The API runs at
`http://localhost:3000`. Check it first:

```bash
curl http://localhost:3000/healthz
curl http://localhost:3000/readyz
```

### 3. Start the client

In a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL=http://localhost:3000` in `client/.env`. The client runs
at `http://localhost:5173`. For a production build:

```bash
npm run build
npm run preview
```

## Environment variables

None of these are committed. Each `.env.example` lists them with placeholder
values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `APP_USERNAME` | server | Username for the application login |
| `APP_PASSWORD` | server | Password for the application login |
| `CORS_ORIGINS` | server | Comma-separated origins allowed to call the API |
| `NODE_ENV` | server | `production` on the host |
| `PORT` | server | Set by the host |
| `VITE_USE_MOCK_API` | client, build time | Only `false` turns the simulated backend off |
| `VITE_API_BASE_URL` | client, build time | The API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is public. Never
put a password or connection string in one.

## Deployment

- **Front end:** GitHub Pages, built by `.github/workflows/deploy-pages.yml`.
  The production build uses the real Render API, not the mock API.
- **API and database:** Render. Production values (`DATABASE_URL`,
  `APP_USERNAME`, `APP_PASSWORD`) are set in Render's environment settings and
  are not in this repository.

## Project structure

```text
client/                 React and Vite front end
  src/api/              the API calls (real and mock versions)
  src/components/       Header, Footer, Layout
  src/pages/            Presets, Cook, AddPasta, EditPasta, Recipes
  src/styles/           design tokens and page styles
server/                 Express API
  db/                   schema.sql, seed.sql, pool.js, run.js
  pastaRepo.js          parameterised SQL queries
  server.js             routes, validation, CORS, authentication
docs/                   planning documents, mockups and security notes
.github/workflows/      GitHub Pages deployment
AI-USAGE.md             record of how AI was used
```

## Architecture

The React client shows the screens and talks to the Express API. The API
checks the application login, validates input, and runs parameterised SQL
against PostgreSQL. The browser never connects to the database.

```text
React and Vite client  (GitHub Pages / Render)
        |
        |  HTTPS, with the application login
        v
Express API  (Render)
        |
        |  parameterised SQL
        v
PostgreSQL  (Render)
```

## Security and privacy

See [docs/06-security-and-privacy.md](docs/06-security-and-privacy.md) for
what is protected and the limitations I know about.

## AI use

![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)

I used ChatGPT and Claude extensively throughout development for planning,
explaining code, debugging, implementation support, the tomato timer
interaction, and GitHub Pages deployment. I tested AI-assisted work in the
browser, changed or fixed suggestions when they did not match the design or
behavior, and kept my own implementation decisions. `AI-USAGE.md` records the
specific AI-assisted work, the cases where the AI got it wrong, and the parts
I wrote myself.

The full record is in [AI-USAGE.md](AI-USAGE.md).

## What I would do next

- Add rate limiting to the password gate, and `helmet` for security headers
- Create a PostgreSQL user with only the permissions the app needs
- Add real user accounts, so custom pasta belongs to each person
- Confirm the licences and credits for the recipe images

## Author

Roki ([@roki-a](https://github.com/roki-a)). Final project for APSI.

## Licence

MIT, see [LICENSE](LICENSE).
