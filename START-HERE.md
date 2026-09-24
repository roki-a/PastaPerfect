# Pasta Perfect — Start Here

Pasta Perfect is a full-stack pasta cooking timer application.

This project is being developed from the Pasta Perfect V8 design and will include:

* React frontend
* Express backend
* PostgreSQL database
* Pasta presets
* Doneness selection
* Cooking timer
* Saved personal pasta times
* Recipe management
* Responsive UI

## Project structure

```text
PastaPerfect/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── styles.css
│   └── package.json
│
├── server/
│   ├── db/
│   ├── pastaRepo.js
│   ├── server.js
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
└── compose.yml
```

## Development setup

The frontend is located in `client/`.

Run:

```powershell
cd client
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The backend is located in `server/`.

Run:

```powershell
cd server
npm install
npm run dev
```

The API runs locally at:

```text
http://localhost:3000
```

## Environment files

Client:

```text
client/.env
```

Current local API configuration:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Server:

```text
server/.env
```

Current local database configuration:

```env
DATABASE_URL=postgresql://postgres:devpassword@localhost:5432/pasta_perfect
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```

Do not commit `.env` files.

## Development order

The project will be developed in stages.

### Stage 1 — UI/UX

Rebuild the frontend to closely match the Pasta Perfect V8 design.

Focus on:

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

Connect the UI interactions to the React application.

This includes:

* Searching pasta
* Selecting doneness
* Starting a timer
* Completing a timer
* Adding pasta
* Editing pasta
* Deleting pasta
* Managing recipes

### Stage 3 — Backend

Connect the React frontend to the Express API.

The backend will handle:

* Pasta data
* Pasta cooking times
* Recipes
* CRUD operations
* Database communication

### Stage 4 — PostgreSQL

Use PostgreSQL as the project's database.

The database schema and seed data are located in:

```text
server/db/
```

### Stage 5 — Testing and deployment

After the application is working locally:

* Test all major user flows
* Check responsive layouts
* Check accessibility
* Check API behavior
* Build the production client
* Deploy the application
* Verify the deployed version

## Important

Do not add external database or hosting services unless they are actually required by the project.

The current priority is to build the Pasta Perfect application locally and make the UI closely match the V8 design before deployment.

## Current development rule

Work one section at a time.

1. Make the change.
2. Run the application.
3. Check the result against the V8 design.
4. Fix visual or functional problems.
5. Commit the working change.
