# Pasta Perfect — Final Project Proposal

## What the app is for

Pasta Perfect is a web application that helps home cooks choose a
pasta and quickly start a cooking timer based on their preferred
doneness.

The original project idea was to help users save and reuse their
preferred cooking times for different pasta types so they can avoid
overcooking or undercooking pasta. This remains the main purpose of the
final project.

## Who it is for

Pasta Perfect is intended for home cooks who prepare dried pasta and
often forget the cooking time that gives them the texture they prefer.

The main situation is when pasta is about to go into the water and the
user wants the correct cooking time without having to remember it or
look it up again.

## Original core scope

The original proposal identified the Presets, Cook, and Preset Form as
the core parts of the application. These remain the main workflow.

Recipes were originally identified as a stretch feature because they
were not required for the main pasta-timer workflow.

## Final implemented features

### Presets

Users can:

- Browse available pasta types.
- Search for pasta by name.
- Select a preferred doneness.
- View the recommended cooking time.
- Use a saved personalized cooking time when one exists.
- Start cooking.
- Add a custom pasta.

The available doneness levels are:

- Al dente
- Firm
- Soft

### Cook

The Cook screen provides the countdown timer for the selected pasta.

Users can:

- Start the timer.
- Pause the timer.
- Reset the timer.
- Change the selected doneness.
- Adjust the cooking time.
- Save a customized time.
- Return to the recommended time.

The timer also includes the interactive tomato control used to adjust
the cooking time.

### Custom pasta

Users can add their own pasta and provide:

- Pasta name
- Image
- Al dente time
- Firm time
- Soft time
- Notes

User-added pasta can be edited or deleted. Editing a custom pasta also
updates its Al dente, Firm, and Soft cooking times.

Predefined pasta is protected from custom edit and delete operations.

### Recipes

Recipes were originally identified as a stretch feature and were
implemented in the final project.

The Recipes screen contains recipe cards with ingredients,
instructions, and a "Cook this pasta" option when the recipe is
associated with a pasta.

## Data

The application stores pasta information including:

- Pasta name
- Image
- Recommended Al dente cooking time
- Recommended Firm cooking time
- Recommended Soft cooking time
- Customized cooking times
- Whether the pasta is user-added

The project uses PostgreSQL for persistent pasta data.

The Notes field is available in the user interface, but notes are
currently stored in the browser's localStorage rather than persisted in
the PostgreSQL database.

The timer also maintains temporary cooking state such as the selected
doneness, target time, remaining time, and timer status.

## What changed from the original proposal

The main purpose of the project did not change. The final application
still focuses on helping users choose pasta and reuse preferred cooking
times.

The implementation became more complete than the original proposal:

- Search was implemented for the pasta presets.
- Three doneness levels were implemented.
- The "My Time" and "Recommended" states were implemented.
- The interactive cooking timer was implemented.
- Custom pasta creation, editing, and deletion were implemented.
- Custom cooking times can be edited and saved.
- The Recipes screen was implemented even though it was originally a
  stretch feature.

The original proposal listed serving size and notes as stored pasta
data. Serving size was not kept as a final database field. Notes are
still available in the interface, but they are stored locally in the
browser rather than in PostgreSQL.

## Technology

The frontend uses React and Vite.

The backend uses Node.js and Express.

PostgreSQL is used for persistent data storage.

The frontend communicates with the backend through a REST API.

The project uses a shared frontend API layer so the application can
communicate with the backend without putting API requests directly
inside individual pages.

## Hosting and deployment

The frontend is deployed through GitHub Pages:

https://roki-a.github.io/PastaPerfect/

A Render-hosted frontend is also available:

https://pasta-perfect.onrender.com

The Express API is deployed separately on Render:

https://pasta-perfect-api.onrender.com

The PostgreSQL database is hosted through Render.

The production frontend is configured to use the deployed Render API
instead of the mock API.

The API is protected by an application-level username and password.
The production credentials are stored as Render environment variables
and are not committed to the public repository.

The Render free tier can sleep when inactive, so the first request
after inactivity may take longer while the service wakes up.

## Demo mode

The original project was developed with a mock API so the frontend
could be developed before the real backend was available.

The final deployed application no longer uses the mock API. The
GitHub Pages production build uses the Render API.

The production build is configured with:

- `VITE_USE_MOCK_API=false`
- `VITE_API_BASE_URL=https://pasta-perfect-api.onrender.com`

## Risks and what happened

### Database and API connectivity

Connecting the Express API to PostgreSQL was one of the main
development risks.

This was resolved by configuring PostgreSQL locally, creating the
database schema and seed data, and connecting the Express API through
the PostgreSQL client.

The production API and database are now deployed through Render.

### GitHub Pages paths

GitHub Pages uses the repository name as part of the deployed URL.
This caused asset and routing issues during development.

The project was updated to use the Vite base path and `BASE_URL` for
deployment-sensitive paths.

### Timer accuracy and interaction

The original proposal identified timer accuracy as a risk because a
simple interval-based countdown can drift when the browser is in the
background.

The final implementation uses a one-second interval to update the
countdown. This is simpler than the originally planned end-time
approach, but browser timers can still be delayed when a tab is
inactive.

The tomato interaction was also refined so dragging right subtracts
time and dragging left adds time.

### Custom pasta data

Custom pasta editing initially did not save the updated cooking times
correctly.

The API and frontend were updated so the custom Al dente, Firm, and
Soft times are saved to PostgreSQL when a custom pasta is edited.

### Image and asset paths

The deployed application also required fixes for image paths under
GitHub Pages. Asset references were updated to work correctly with the
repository base path.

## Final scope

The final project keeps the original goal of helping users remember
and reuse preferred pasta cooking times.

The completed application expands that idea into a full workflow:
users can search pasta, select a preferred doneness, customize their
time, use the cooking timer, add and manage their own pasta, and browse
recipes.

The application is deployed with a React frontend, Express API, and
PostgreSQL database.