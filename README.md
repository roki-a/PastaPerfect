# Pasta Perfect

Pasta Perfect is a full-stack web application designed to help users choose a pasta, select a preferred doneness, and cook it using a simple countdown timer.

The project is based on the Pasta Perfect V8 UI/UX design and was developed as part of the APSI project.

**Live site:** https://roki-a.github.io/PastaPerfect/

**Repository:** https://github.com/roki-a/PastaPerfect

**API:** Local Express API; a production API deployment is not included yet.

## What it does

Pasta Perfect provides pasta presets with recommended cooking times for three doneness levels: Al dente, Firm, and Soft.

Users can:

- Browse predefined pasta presets
- Search for pasta
- Select Al dente, Firm, or Soft doneness
- View recommended cooking times
- Customize cooking times for predefined pasta
- Reset a customized predefined pasta time back to its recommended time
- See whether a preset is using `Recommended` or `My time`
- Start, pause, and reset the cooking timer
- Add a custom pasta
- Upload an image when adding a custom pasta
- Edit the name and image of an added pasta
- Delete an added pasta
- Keep predefined pasta protected from editing and deletion
- Browse the Recipes page
- Expand recipes to view ingredients and cooking steps
- Open the cooking page from supported recipes

## Built with

- React
- Vite
- React Router
- Express
- PostgreSQL
- Node.js
- GitHub Pages for the frontend deployment

## Application Architecture

The project uses a client-server-database architecture:

```
User
  |
  v
React + Vite Client
  |
  | HTTP requests
  v
Express API
  |
  | SQL queries
  v
PostgreSQL
```
The React client handles the interface and user interactions.

The Express API handles pasta-related requests and validation.

PostgreSQL stores the pasta data.

Main Application Pages
Pasta Presets

The main page lets users search and browse pasta presets, choose a doneness, view the current cooking time, and start cooking.

The application distinguishes between predefined pasta and user-added pasta.

Predefined pasta can have its cooking time customized, but its name and image cannot be edited or deleted.

User-added pasta can be edited and deleted.

Cooking Timer

The cooking page provides a countdown timer for the selected pasta and doneness.

Users can:
```
Start the timer
Pause the timer
Reset the timer
Adjust the cooking time
```
The tomato timer interaction was refined so dragging left decreases the cooking time and dragging right increases it, with the ruler indicator following the drag direction.

Add Pasta

Users can create their own pasta by providing:
```
Pasta name
Pasta image
Al dente cooking time
Firm cooking time
Soft cooking time
```
Uploaded pasta images are handled as PNG image data URLs by the API.

Edit Pasta

Only user-added pasta can be edited.

Users can change the:
```
Pasta name
Pasta image
```
Predefined pasta cannot be edited as a custom pasta.

Delete Pasta

Only user-added pasta can be deleted.

Predefined pasta is protected from deletion.

Recipes

The Recipes page contains recipe cards with:
```
Recipe images
Recipe descriptions
Preparation information
Recommended doneness
Ingredients
Cooking steps
```
Recipes can be expanded and collapsed.

Supported recipes also provide a link to cook the associated pasta.

API

The Express API is located in server/.
```
Get all pasta
GET /api/pasta
```
Returns the available pasta records.
```
Search pasta
GET /api/pasta?search=spaghetti
```
Returns pasta records matching the search term.
```
Get one pasta
GET /api/pasta/:id
```
Returns one pasta record by ID.
```
Create custom pasta
POST /api/pasta
```
Creates a user-added pasta after validating its name, image, and cooking times.
```
Edit custom pasta
PUT /api/pasta/:id
```
Updates the name and image of a user-added pasta.

The backend only allows this operation for custom pasta.
```
Update predefined cooking time
PUT /api/pasta/:id/time
```
Updates the cooking times of a predefined pasta.
```
Reset predefined cooking time
POST /api/pasta/:id/reset-time
```
Resets a predefined pasta's customized cooking times back to its recommended values.
```
Delete custom pasta
DELETE /api/pasta/:id
```
Deletes a user-added pasta.

Predefined pasta cannot be deleted through this route.
```
Health check
GET /healthz
```
Confirms that the Express API is running.
```
Database readiness check
GET /readyz
```
Checks whether the API can connect to PostgreSQL.

Database

Pasta Perfect uses PostgreSQL for persistent pasta data.

The main table is:

pasta

It contains pasta information including:
| Column                    | Type    | Description                            |
| ------------------------- | ------- | -------------------------------------- |
| `id`                      | SERIAL  | Unique pasta ID                        |
| `name`                    | TEXT    | Pasta name                             |
| `image`                   | TEXT    | Pasta image reference or image data    |
| `al_dente_seconds`        | INTEGER | Recommended Al dente time              |
| `firm_seconds`            | INTEGER | Recommended Firm time                  |
| `soft_seconds`            | INTEGER | Recommended Soft time                  |
| `custom_al_dente_seconds` | INTEGER | User-customized Al dente time when set |
| `custom_firm_seconds`     | INTEGER | User-customized Firm time when set     |
| `custom_soft_seconds`     | INTEGER | User-customized Soft time when set     |
| `is_custom`               | BOOLEAN | Identifies user-added pasta            |

The database schema is located at:
```
server/db/schema.sql
```
Development seed data is located at:
```
server/db/seed.sql
```
Running the Project Locally
1. Start PostgreSQL

Pasta Perfect requires PostgreSQL to be running.

Configure the server connection in:
```
server/.env
```
Example:
```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/pasta_perfect
CORS_ORIGINS=http://localhost:5173,http://localhost:4173
NODE_ENV=development
PORT=3000
```
Do not commit .env files.

2. Install Server Dependencies```
cd D:\APSI\PastaPerfect\server
npm install```
4. Create the Database Tables```
node --env-file=.env db/run.js db/schema.sql```
5. Add the Development Seed Data```
node --env-file=.env db/run.js db/seed.sql```
6. Start the Express API```
npm run dev```

The API normally runs at:
```
http://localhost:3000
```
Test it with:
```
Invoke-RestMethod http://localhost:3000/api/pasta
```
You can also check:
```
http://localhost:3000/healthz
http://localhost:3000/readyz
```
6. Start the React Client

Open another PowerShell window:
```
cd D:\APSI\PastaPerfect\client
npm install
npm run dev
```
The Vite development server normally runs at:
```
http://localhost:5173
```
For a production preview:
```
npm run build
npm run preview
```
The preview server normally runs at:
```
http://localhost:4173
```
The client API base URL is configured through:
```
VITE_API_BASE_URL=http://localhost:3000
```
## Environment Variables

### Server

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `CORS_ORIGINS` | Allowed browser origins |
| `NODE_ENV` | Application environment |
| `PORT` | Port used by the API |

### Client

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Express API base URL |


Variables beginning with VITE_ are included in the browser build.

Do not put passwords, database credentials, or private API keys in VITE_ variables.

Production Build and Deployment

The frontend is built with Vite:
```
cd client
npm run build
```
The production files are generated in:
```
client/dist/
```
The project includes GitHub Pages deployment configuration under:
```
.github/workflows/deploy-pages.yml
```
The deployed frontend is available at:
```
https://roki-a.github.io/PastaPerfect/
```
The current GitHub Pages deployment is for the React frontend.

The Express/PostgreSQL API remains a local development service until it is deployed separately.

Project Structure
```
PastaPerfect/
│
├── client/
│   ├── public/
│   │   └── pasta and recipe images
│   │
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
│   │   │   ├── AddPasta.jsx
│   │   │   ├── Cook.jsx
│   │   │   ├── EditPasta.jsx
│   │   │   ├── Presets.jsx
│   │   │   └── Recipes.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── page-specific stylesheets
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
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
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── compose.yml
├── README.md
├── AI-USAGE.md
└── LICENSE
```
Security

The server uses parameterized PostgreSQL queries through the repository layer.

Database credentials are stored in the local .env file and should not be committed to GitHub.

CORS is configured using the CORS_ORIGINS environment variable.

The API validates pasta names, images, and cooking times before writing data to PostgreSQL.

The API also prevents the custom-pasta edit and delete routes from modifying predefined pasta.

Development Workflow

The project was developed incrementally:

- Build and refine the UI/UX.
- Implement navigation and routing.
- Connect pasta presets to PostgreSQL through the Express API.
- Implement the cooking timer.
- Add custom pasta creation, editing, and deletion.
- Add cooking-time customization and reset behavior.
- Add the Recipes page.
- Test responsive layouts and user interactions.
- Build the production frontend.
- Deploy the frontend through GitHub Pages.

Changes were tested locally before being committed to the repository.

Current Status

The main Pasta Perfect frontend functionality is implemented and the React client is deployed through GitHub Pages.

Completed functionality includes:

- Pasta preset browsing
- Pasta search
- Doneness selection
- Recommended cooking times
- Custom cooking times for predefined pasta
- My time / Recommended status handling
- Reset to recommended cooking time
- Countdown timer
- Start, pause, and reset timer controls
- Custom pasta creation
- Custom pasta image upload
- Custom pasta editing
- Custom pasta deletion
- Protection of predefined pasta from editing/deletion
- Recipes page
- Expandable recipe details
- Responsive UI adjustments
- Express API
- PostgreSQL database integration
- GitHub Pages frontend deployment

The Express/PostgreSQL API is currently intended for local development and has not been deployed as a production backend.

AI Use

This project was developed with assistance from AI tools, primarily ChatGPT and Claude.

AI was used for planning, explaining code, debugging, reviewing implementation decisions, and assisting with UI and interaction development.

All AI-assisted code was reviewed, tested, adapted, and modified as needed to fit the Pasta Perfect project and UI/UX design.

Detailed AI usage, including specific examples of AI assistance and corrections made during development, is documented in:

AI-USAGE.md

Author

Roki

APSI — Pasta Perfect
