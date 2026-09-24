# Pasta Perfect

Pasta Perfect is a full-stack web application that helps users choose a pasta preset, select their preferred doneness, and cook pasta using a simple countdown timer.

The project is being developed based on the Pasta Perfect V8 design.

**Live site:** [https://roki-a.github.io/pasta-perfect/](https://roki-a.github.io/pasta-perfect/)

**API:** Not deployed yet

**Demo video:** Add demo video link here

## What it does

Pasta Perfect provides pasta cooking presets with recommended cooking times for different doneness levels.

Users can:

* Browse available pasta presets
* Search for a specific pasta
* Choose between Al dente, Firm, and Soft
* View the recommended cooking time
* Start a countdown timer
* Pause the timer
* Reset the timer
* Choose another pasta

The application uses PostgreSQL to store pasta preset data and an Express API to provide the data to the React client.

## Built with

* React
* Vite
* React Router
* Express
* PostgreSQL
* Node.js

The frontend is located in `client/` and the Express API is located in `server/`.

## How it works

The application follows a client-server-database architecture.

The React client provides the user interface and sends HTTP requests to the Express API.

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
```

## API

### Get all pasta presets

```text
GET /api/pasta
```

Returns all available pasta presets.

### Search pasta presets

```text
GET /api/pasta?search=spaghetti
```

Returns pasta presets matching the search term.

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

It contains:

| Column             | Type    | Description           |
| ------------------ | ------- | --------------------- |
| `id`               | SERIAL  | Unique pasta ID       |
| `name`             | TEXT    | Pasta name            |
| `image`            | TEXT    | Pasta image reference |
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

### Server

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

Do not commit `.env` files.

Install the server dependencies:

```powershell
cd D:\APSI\PastaPerfect\server
npm install
```

Create the database tables:

```powershell
node --env-file=.env db/run.js db/schema.sql
```

Add the sample pasta data:

```powershell
node --env-file=.env db/run.js db/seed.sql
```

Start the API:

```powershell
npm run dev
```

The API normally runs at:

```text
http://localhost:3000
```

Test the API:

```powershell
Invoke-RestMethod http://localhost:3000/api/pasta
```

### Client

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

The client uses:

```env
VITE_API_BASE_URL=http://localhost:3000
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

| Variable            | Purpose      |
| ------------------- | ------------ |
| `VITE_API_BASE_URL` | API base URL |

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

The project also creates a `404.html` file from `index.html` to support client-side routing when deployed to GitHub Pages.

## Project structure

```text
PastaPerfect/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── httpApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Cook.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Presets.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
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
├── docs/
│   ├── 01-proposal.md
│   ├── 02-mockup.md
│   ├── 03-design-system.md
│   ├── 04-weekly-reports.md
│   ├── 05-demo-video.md
│   └── 06-security-and-privacy.md
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── compose.yml
├── README.md
└── LICENSE
```

## Architecture

Pasta Perfect has three main layers.

The React client is responsible for the user interface, pasta selection, doneness selection, and cooking timer.

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

Database queries are kept in:

```text
server/pastaRepo.js
```

This separates database access from the Express routes.

## Security

The server uses parameterized PostgreSQL queries.

Database values are passed to PostgreSQL as parameters instead of being directly inserted into SQL strings.

The PostgreSQL connection string is stored in `.env` locally.

Production database credentials should be configured through the hosting provider's environment variables.

The `.env` file should never be committed to GitHub.

CORS is configured using the `CORS_ORIGINS` environment variable.

## Current status

The current project includes:

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
* GitHub Pages deployment configuration

The frontend is currently being rebuilt to closely match the Pasta Perfect V8 design.

## Development plan

### Stage 1 — UI/UX

Rebuild the frontend according to the Pasta Perfect V8 design.

Focus areas:

* Layout
* Typography
* Colors
* Navigation
* Pasta cards
* Search
* Doneness controls
* Cooking page
* Recipe page
* Add pasta page
* Responsive behavior

### Stage 2 — Frontend functionality

Implement and test the main user interactions:

* Search pasta
* Select doneness
* Start a timer
* Pause a timer
* Reset a timer
* Complete a timer
* Add pasta
* Edit pasta
* Delete pasta
* Manage recipes

### Stage 3 — Backend integration

Connect the completed React interface to the Express API.

The backend will handle:

* Pasta data
* Pasta cooking times
* Recipes
* CRUD operations
* Database communication

### Stage 4 — PostgreSQL

Use PostgreSQL as the application's persistent database.

The schema and development seed data are located in:

```text
server/db/
```

### Stage 5 — Testing and deployment

After the application is working locally:

* Test the major user flows
* Check responsive layouts
* Check accessibility
* Check API behavior
* Build the production client
* Deploy the application
* Verify the deployed version

## Development workflow

The project is developed one section at a time.

1. Make the change.
2. Run the application.
3. Compare the result against the Pasta Perfect V8 design.
4. Fix visual or functional problems.
5. Test the affected functionality.
6. Commit the working change.

## Next steps

* Complete the Pasta Perfect V8 frontend redesign.
* Finish the remaining frontend functionality.
* Test the complete client-to-API-to-PostgreSQL flow.
* Deploy the Express API.
* Connect the production client to the deployed API.
* Verify the production application.
* Add the final API URL.
* Add the final project screenshot.
* Record and link the project demonstration video.

## Author

Roki

APSI — Pasta Perfect

## AI use

This project was developed with AI assistance.

AI was used to assist with code implementation, debugging, project structure, documentation, and development guidance.

The project code was reviewed and tested during development, and implementation decisions were made as part of the development process.

Detailed AI usage information is documented in:

[AI-USAGE.md](AI-USAGE.md)