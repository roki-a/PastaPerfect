# Final Project

## My project repository

Public repository: https://github.com/roki-a/PastaPerfect

Live app: https://roki-a.github.io/PastaPerfect/
          https://pasta-perfect-api.onrender.com

Production API: https://pasta-perfect-api.onrender.com

## What it is

Pasta Perfect is a full-stack web application based on the Pasta Perfect V8 UI/UX design. It helps users choose a pasta, select a preferred doneness, customize cooking time, and use a countdown cooking timer.

The application includes pasta presets, recipes, custom pasta creation, editing and deletion, and a PostgreSQL-backed Express API.

## How to run it

### 1. Set up the database

Pasta Perfect uses PostgreSQL.

Create a local database named `pasta_perfect`, then create `server/.env` from `server/.env.example`.

Example:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/pasta_perfect
APP_PASSWORD=your_app_password
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
PORT=3000
```

Do not commit the real `.env` file.

### 2. Install server dependencies

```powershell
cd D:\APSI\PastaPerfect\server
npm install
```

### 3. Create the database tables

```powershell
node --env-file=.env db/run.js db/schema.sql
```

### 4. Add the development seed data

```powershell
node --env-file=.env db/run.js db/seed.sql
```

### 5. Start the Express API

```powershell
npm run dev
```

The API normally runs at:

```text
http://localhost:3000
```

Health checks:

```text
http://localhost:3000/healthz
http://localhost:3000/readyz
```

### 6. Start the React client

Open another PowerShell window:

```powershell
cd D:\APSI\PastaPerfect\client
npm install
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

For a production build and preview:

```powershell
npm run build
npm run preview
```

## Presentation

- Video (public Google Drive link): https://...
- Slides (link or PDF): https://...
- Square image: to be added to the project workspace/folder.

## AI usage

AI was used for planning, code explanation, debugging, implementation assistance, UI/UX refinement, deployment troubleshooting, and reviewing implementation decisions.

All AI-assisted work was tested, adapted, and modified to fit the Pasta Perfect project.

Detailed AI usage is documented here:

(AI-USAGE.md)[AI-USAGE.md]

## Current deployment

The React frontend is deployed through GitHub Pages and Render:

https://roki-a.github.io/PastaPerfect/
https://pasta-perfect-api.onrender.com

The Express API is deployed separately on Render:

https://pasta-perfect-api.onrender.com

The API uses PostgreSQL for persistent pasta data. Production environment values such as `DATABASE_URL` and `APP_PASSWORD` are stored in the hosting environment and are not committed to the repository.
