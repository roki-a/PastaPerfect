# Pasta Perfect

Pasta Perfect is a web application that helps users choose a pasta preset, select their preferred doneness, and cook pasta using a simple countdown timer.

**Live site:** https://roki-a.github.io/pasta-perfect/

**API:** Not deployed yet

**Demo video:** Add your demo video link here

![Pasta Perfect screenshot](docs/assets/screenshot.png)

## What it does

Pasta Perfect provides predefined pasta cooking presets with recommended cooking times for different doneness levels.

Users can:

- Browse available pasta presets
- Search for a specific pasta
- Choose between Al dente, Firm, and Soft
- View the recommended cooking time
- Start a countdown timer
- Pause the timer
- Reset the timer
- Choose another pasta

The application uses PostgreSQL to store pasta preset data and an Express API to retrieve the data.

## Built with

- React
- Vite
- React Router
- Express
- PostgreSQL
- Node.js

The front end is located in `client/` and the Express API is located in `server/`.

## How it works

The application follows a client-server-database architecture.

The React client provides the user interface and sends requests to the Express API.

The Express server handles API requests and communicates with PostgreSQL.

PostgreSQL stores the pasta preset information.

```text
User
  |
  v
React + Vite
  |
  | HTTP request
  v
Express API
  |
  | SQL query
  v
PostgreSQL
````

## API

### Get all pasta presets

```text
GET /api/pasta
```

The endpoint returns all available pasta presets.

### Search pasta presets

```text
GET /api/pasta?search=spaghetti
```

The search parameter can be used to find pasta presets by name.

### Get one pasta preset

```text
GET /api/pasta/:id
```

Returns a single pasta preset using its ID.

### Health check

```text
GET /healthz
```

Confirms that the Express API is running.

### Database readiness check

```text
GET /readyz
```

Checks whether the API can connect to PostgreSQL.

## Database

Pasta Perfect uses PostgreSQL.

The main database table is:

```text
pasta
```

It contains the following fields:

| Column             | Type    | Description           |
| ------------------ | ------- | --------------------- |
| `id`               | SERIAL  | Unique pasta ID       |
| `name`             | TEXT    | Pasta name            |
| `image`            | TEXT    | Image reference       |
| `al_dente_seconds` | INTEGER | Al dente cooking time |
| `firm_seconds`     | INTEGER | Firm cooking time     |
| `soft_seconds`     | INTEGER | Soft cooking time     |

The database schema is located at:

```text
server/db/schema.sql
```

Sample development data is located at:

```text
server/db/seed.sql
```

## Running the project locally

### PostgreSQL

Pasta Perfect requires PostgreSQL to be running.

The server database connection is configured in:

```text
server/.env
```

Example:

```env
DATABASE_URL=postgresql://postgres:devpassword@localhost:5432/pasta_perfect
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```

Do not commit `.env` to GitHub.

### Install server dependencies

```powershell
cd D:\APSI\PastaPerfect\server
npm install
```

### Create the database tables

```powershell
node --env-file=.env db/run.js db/schema.sql
```

### Add sample pasta data

```powershell
node --env-file=.env db/run.js db/seed.sql
```

### Start the API

```powershell
npm run dev
```

The API normally runs at:

```text
http://localhost:3000
```

Test it with:

```powershell
Invoke-RestMethod http://localhost:3000/api/pasta
```

### Start the client

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

## Environment variables

### Server

| Variable       | Purpose                      |
| -------------- | ---------------------------- |
| `DATABASE_URL` | PostgreSQL connection string |
| `CORS_ORIGINS` | Allowed browser origins      |
| `NODE_ENV`     | Application environment      |
| `PORT`         | Port used by the API         |

### Client

| Variable            | Purpose             |
| ------------------- | ------------------- |
| `VITE_API_BASE_URL` | Public API base URL |

Variables beginning with `VITE_` are included in the browser build.

Do not put passwords, database credentials, or private API keys in `VITE_` variables.

## Production build

To create a production build:

```powershell
cd client
npm run build
```

The production files are generated in:

```text
client/dist/
```

The project also creates a `404.html` file from `index.html` to support client-side routing when deployed to static hosting.

## Project structure

```text
PastaPerfect/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── httpApi.js
│   │   │   ├── index.js
│   │   │   ├── mockApi.js
│   │   │   └── seed.json
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │   ├── Cook.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Presets.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── db/
│   │   ├── pool.js
│   │   ├── run.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── pastaRepo.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── compose.yml
├── README.md
└── LICENSE
```

## Architecture

Pasta Perfect has three main layers.

The React client is responsible for the user interface, pasta selection, doneness selection, and timer.

The Express API is responsible for handling requests from the client.

The PostgreSQL database stores the pasta preset information.

```text
React Client
     |
     | HTTP
     v
Express Server
     |
     | SQL
     v
PostgreSQL
```

The database queries are kept in `server/pastaRepo.js`, separating database access from the Express routes.

## Security

The server uses parameterized PostgreSQL queries.

Database values are passed to PostgreSQL as parameters instead of being directly inserted into SQL strings.

The PostgreSQL connection string is stored in `.env` locally.

Production database credentials should be configured through the hosting provider's environment variables.

The `.env` file should never be committed to GitHub.

CORS is also configured using the `CORS_ORIGINS` environment variable.

## Current status

The current Pasta Perfect implementation includes:

* Pasta preset selection
* Pasta search
* Doneness selection
* Al dente, Firm, and Soft cooking times
* Countdown timer
* Start control
* Pause control
* Reset control
* Express API
* PostgreSQL database
* PostgreSQL repository layer
* Database schema
* Development seed data
* Production client build

The client production build has been tested successfully using:

```powershell
npm run build
```

## What I would do next

* Deploy the Express API.
* Connect the production client to the deployed API.
* Test the complete client → API → PostgreSQL flow in production.
* Add the final live API URL to this README.
* Add the final screenshot.
* Record and link the project demonstration video.

## Author

Roki

APSI - Pasta Perfect

## AI use

This project was developed with AI assistance.

AI was used to assist with code implementation, debugging, project structure, documentation, and development guidance.

The project code was reviewed and tested during development, and implementation decisions were made as part of the development process.

Detailed AI usage information is documented in:

[AI-USAGE.md](AI-USAGE.md)

![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)
