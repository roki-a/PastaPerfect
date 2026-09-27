# Pasta Perfect — Start Here

Pasta Perfect is a full-stack pasta cooking timer application developed from the Pasta Perfect V8 design.

## Features

- React frontend
- Express backend
- PostgreSQL database
- Pasta presets
- Pasta search
- Al dente, Firm, and Soft doneness selection
- Cooking timer
- Custom cooking times
- `My time` / `Recommended` status
- Reset customized times to recommended values
- Custom pasta creation
- Custom pasta editing
- Custom pasta deletion
- Protection of predefined pasta from editing and deletion
- Recipe page with expandable recipe details
- Responsive UI
- GitHub Pages frontend deployment

## Project Structure

```text
PastaPerfect/
├── client/
│   ├── public/
│   │   └── pasta and recipe images
│   ├── src/
│   │   ├── api/
│   │   │   └── httpApi.js
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── AddPasta.jsx
│   │   │   ├── Cook.jsx
│   │   │   ├── EditPasta.jsx
│   │   │   ├── Presets.jsx
│   │   │   └── Recipes.jsx
│   │   ├── styles/
│   │   │   └── page-specific stylesheets
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── db/
│   │   ├── pool.js
│   │   ├── run.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── pastaRepo.js
│   ├── server.js
│   └── package.json
│
├── docs/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── compose.yml
├── README.md
├── AI-USAGE.md
└── START-HERE.md
```

## Development Setup

### Client

```powershell
cd client
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

### Server

```powershell
cd server
npm install
npm run dev
```

The API runs locally at:

```text
http://localhost:3000
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

Example client configuration:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Example server configuration:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/pasta_perfect
CORS_ORIGINS=http://localhost:5173,http://localhost:4173
NODE_ENV=development
PORT=3000
```

Do not commit `.env` files.

## Database

Pasta Perfect uses PostgreSQL for persistent pasta data.

Database files are located in:

```text
server/db/
```

Schema:

```text
server/db/schema.sql
```

Seed data:

```text
server/db/seed.sql
```

## Database Structure

| Column | Type | Description |
|---|---|---|
| `id` | SERIAL | Unique pasta ID |
| `name` | TEXT | Pasta name |
| `image` | TEXT | Pasta image reference or image data |
| `al_dente_seconds` | INTEGER | Recommended Al dente time |
| `firm_seconds` | INTEGER | Recommended Firm time |
| `soft_seconds` | INTEGER | Recommended Soft time |
| `custom_al_dente_seconds` | INTEGER | User-customized Al dente time when set |
| `custom_firm_seconds` | INTEGER | User-customized Firm time when set |
| `custom_soft_seconds` | INTEGER | User-customized Soft time when set |
| `is_custom` | BOOLEAN | Identifies user-added pasta |

## Main Application Pages

### Presets

The Presets page allows users to:

- Browse predefined pasta
- Search for pasta
- Select doneness
- View recommended cooking times
- Customize cooking times
- See `My time` when a customized time is being used
- See `Recommended` when the recommended time is being used
- Reset customized times back to recommended values

Predefined pasta cannot be edited as a custom pasta and cannot be deleted.

### Cook

The Cook page provides the cooking timer.

Users can:

- Start the timer
- Pause the timer
- Reset the timer
- Adjust the cooking time
- Select doneness

The tomato timer interaction was refined so dragging left decreases the cooking time and dragging right increases it.

### Add Pasta

Users can add their own pasta by providing:

- Pasta name
- Pasta image
- Al dente cooking time
- Firm cooking time
- Soft cooking time

### Edit Pasta

Only user-added pasta can be edited.

Users can modify their custom pasta information while predefined pasta remains protected.

### Delete Pasta

Only user-added pasta can be deleted.

Predefined pasta cannot be deleted.

### Recipes

The Recipes page contains recipe cards with:

- Recipe images
- Recipe descriptions
- Time and serving information
- Recommended doneness
- Ingredients
- Cooking steps

Recipe cards can be expanded and collapsed.

## API

The Express API is implemented in:

```text
server/server.js
```

### Health Check

```text
GET /healthz
```

### Database Readiness

```text
GET /readyz
```

### Get All Pasta

```text
GET /api/pasta
```

### Search Pasta

```text
GET /api/pasta?search=penne
```

### Get One Pasta

```text
GET /api/pasta/:id
```

### Create Pasta

```text
POST /api/pasta
```

### Update Predefined Pasta Cooking Time

```text
PUT /api/pasta/:id/time
```

### Reset Predefined Pasta Time

```text
POST /api/pasta/:id/reset-time
```

### Delete Custom Pasta

```text
DELETE /api/pasta/:id
```

Only pasta marked as `is_custom = TRUE` can be deleted.

## Deployment

The frontend is deployed using GitHub Pages.

Live application:

https://roki-a.github.io/PastaPerfect/

GitHub repository:

https://github.com/roki-a/PastaPerfect

To create a production build:

```powershell
cd client
npm run build
```

The production build is generated in:

```text
client/dist/
```

The GitHub Pages workflow is located at:

```text
.github/workflows/deploy-pages.yml
```

The current GitHub Pages deployment hosts the frontend. The Express/PostgreSQL backend is configured for local development.

## Development Workflow

The project was developed incrementally from the Pasta Perfect V8 design.

The main development stages included:

1. Building the UI/UX.
2. Implementing navigation and routing.
3. Connecting the presets page to PostgreSQL.
4. Implementing the cooking timer.
5. Refining the tomato timer interaction.
6. Adding custom pasta creation.
7. Adding custom pasta editing and deletion.
8. Implementing customizable cooking times.
9. Fixing the `My time` / `Recommended` status behavior.
10. Adding the Recipes page.
11. Testing responsive layouts and interactions.
12. Building the production frontend.
13. Deploying the frontend through GitHub Pages.

## Security

- `.env` files should not be committed.
- Database credentials should remain in environment variables.
- The API validates pasta names, images, and cooking times.
- Predefined pasta is protected from custom edit and delete operations.

## AI-Assisted Development

This project was developed with assistance from AI tools, primarily ChatGPT and Claude.

AI was used for:

- Planning
- Explaining code
- Debugging
- Reviewing implementation decisions
- UI and interaction development

All AI-assisted code was reviewed, tested, adapted, and modified as needed to fit the Pasta Perfect project and UI/UX design.

Detailed AI usage is documented in:


[AI-USAGE.md](AI-USAGE.md)

## Project Status

The Pasta Perfect application is implemented and tested locally, with the frontend deployed through GitHub Pages.

Completed areas include the pasta presets, cooking timer, custom pasta management, recipe page, PostgreSQL integration, Express API, responsive UI, and frontend deployment.
