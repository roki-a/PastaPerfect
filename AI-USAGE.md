# AI usage

Pasta Perfect was built with AI assistance, mainly ChatGPT and Claude. I used
them for planning, explaining code, debugging, reviewing decisions, and help with
the UI and interactions. Everything they gave me was run, tested in the browser,
and adapted to my UI/UX design before I kept it. This file is the record.

## 1. How I used AI

### 2026-09-23 - Navigation bar

- **Tool:** ChatGPT
- **What I asked for:** Help implementing and organizing the navigation bar.
- **What it gave back:** A suggested navigation structure.
- **What I kept, what I changed, and why:** I kept the structure and adapted it to the existing Pasta Perfect React project so it matched my design.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/ef963ca

### 2026-09-24 - Pasta Presets UI and navigation

- **Tool:** ChatGPT
- **What I asked for:** Help refining the Presets page, navigation state, routing, and UI/UX.
- **What it gave back:** A React and CSS structure for the page.
- **What I kept, what I changed, and why:** I kept the structure but changed the layout, navigation, spacing, typography, and visual styling to match my UI/UX design.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2f91658

### 2026-09-24 - Presets database integration

- **Tool:** ChatGPT
- **What I asked for:** Help connecting the Presets page to PostgreSQL through the Express API, and fixing connection and seeding problems.
- **What it gave back:** Debugging and integration guidance.
- **What I kept, what I changed, and why:** I followed the guidance, tested the API with PowerShell, and changed the database configuration and seed data to fit my local PostgreSQL setup.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/10c8b5a

### 2026-09-24 - Cook timer page

- **Tool:** ChatGPT
- **What I asked for:** Help building and debugging the cook timer: timer state, doneness settings, start, pause, reset, and loading pasta data from the API.
- **What it gave back:** A React timer structure.
- **What I kept, what I changed, and why:** I used it as a starting point, then changed the code and styling to fit my UI/UX requirements.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/b6b2b84

### 2026-09-24 - Tomato timer interaction

- **Tool:** Claude
- **What I asked for:** Help improving the tomato-shaped timer and its drag interaction for adjusting cooking time.
- **What it gave back:** The tomato's visual structure and a drag interaction.
- **What I kept, what I changed, and why:** I kept the structure, then tested and refined it so dragging left lowers the time, dragging right raises it, and the ruler indicator follows the drag.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/60f256a

### 2026-09-26 - "My time" / "Recommended" label

- **Tool:** ChatGPT
- **What I asked for:** Help fixing the Presets card label so a customized time shows "My time" and resetting it goes back to "Recommended".
- **What it gave back:** Logic linking the custom time values to the label.
- **What I kept, what I changed, and why:** I kept and adapted the logic so a reset uses the original recommended time and the card shows "Recommended". I checked the reset in the UI.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/a7c91d2

### 2026-09-27 - GitHub Pages deployment and mock API

- **Tool:** ChatGPT
- **What I asked for:** Help making the frontend work on GitHub Pages: routing, API handling, asset paths, and production build testing.
- **What it gave back:** Fixes for the Pages routing and 404 errors, the Vite base path setup, and a mock API for the deployed demo.
- **What I kept, what I changed, and why:** I kept the mock API so Pages works without a server, while the app still uses the real Express API locally. I tested with `npm run build` and browser developer tools.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/6920b13 (also https://github.com/roki-a/PastaPerfect/commit/6a95d4e and https://github.com/roki-a/PastaPerfect/commit/88f17b0)

### 2026-09-27 - Cook page API loading

- **Tool:** ChatGPT
- **What I asked for:** Help making the Cook page load pasta data when deployed with the mock API.
- **What it gave back:** Guidance on the failing request.
- **What I kept, what I changed, and why:** I found that Cook.jsx still made a direct `/api/pasta/:id` request, and changed it to use `getPasta(id)` from the shared API layer.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/daeeaaa

### 2026-09-27 - Uploaded pasta image paths

- **Tool:** ChatGPT
- **What I asked for:** Help fixing uploaded pasta images that did not show on the deployed Presets page.
- **What it gave back:** An image-path fix.
- **What I kept, what I changed, and why:** I found that predefined images come from the public folder and need the Pages base path, while uploaded images are data URLs and must be used as they are. I changed the image handling to treat the two differently.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2315a13

## 2. Where the AI got it wrong

### Case 1 - Tomato timer layout

- **What it gave me:** A tomato shape and timer layout.
- **What was wrong with it:** The timer window was in the wrong place and the tomato proportions did not match my UI/UX design.
- **What I did instead:** I compared the page with my design reference and adjusted the tomato structure and CSS until it matched.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/60f256a

### Case 2 - Timer drag direction

- **What it gave me:** A drag interaction for changing the timer.
- **What was wrong with it:** The direction was reversed from my design.
- **What I did instead:** I changed it so dragging left lowers the timer and dragging right raises it, and made the ruler indicator follow the drag.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/60f256a

### Case 3 - Presets active state in the navigation

- **What it gave me:** A navigation that should keep the active line under Presets.
- **What was wrong with it:** The active state disappeared when moving between routes, because `/` and `/presets` were not both treated as Presets.
- **What I did instead:** I changed the route detection in Header.jsx so both paths count as Presets, then checked it in the browser.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2f91658

### Case 4 - GitHub Pages routing and asset paths

- **What it gave me:** A first deployment configuration.
- **What was wrong with it:** It did not account for Pages serving the app from `/PastaPerfect/`, so routes and assets returned 404 errors.
- **What I did instead:** I found the wrong paths with browser developer tools and changed the Vite base path, the React Router configuration, and the asset and API handling.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/6a95d4e (also https://github.com/roki-a/PastaPerfect/commit/88f17b0)

### Case 5 - Direct API request on the Cook page

- **What it gave me:** A deployed setup that was meant to use the mock API.
- **What was wrong with it:** The Cook page still called `/api` directly, which does not exist on GitHub Pages.
- **What I did instead:** I found the direct `fetch()` in Cook.jsx and replaced it with the shared `getPasta()` function.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/daeeaaa

### Case 6 - Uploaded image path

- **What it gave me:** An image-path fix that treated every image the same.
- **What was wrong with it:** Uploaded images are data URLs saved by the mock API in localStorage, so adding the Pages base path to them broke them.
- **What I did instead:** I used the base path only for predefined images and used data URLs directly.
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2315a13

## 3. Who wrote what

### Written by me

- **File:** Header.jsx
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2f91658
- **What it does and why it is built this way:** The header decides which nav link gets the active line from the current route. The AI's version lost the line on Presets, so I made both `/` and `/presets` count as the Presets section, since the home page is the Presets page.

- **File:** Cook.jsx
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/daeeaaa
- **What it does and why it is built this way:** The Cook page loads the pasta it is timing. I replaced its direct `fetch('/api/pasta/:id')` with `getPasta(id)`, so every page asks one shared API layer for data and the app picks the mock API on GitHub Pages or Express locally.

- **File:** TODO: the file where uploaded and predefined images are shown
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/2315a13
- **What it does and why it is built this way:** Predefined images are files in the public folder, so they need the Pages base path in front. Uploaded images are data URLs, which already contain the whole image, so they are used as they are.

- **File:** TODO: the tomato timer component and its CSS
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/60f256a
- **What it does and why it is built this way:** Dragging the tomato changes the cooking time: left lowers it, right raises it, and the ruler indicator moves with the drag so you can see how much you changed. I set the direction and layout to match my design.

I also designed the interface and page structure, set up and seeded PostgreSQL, tested the API with PowerShell, and reviewed every `git diff` before committing.

### The AI-written part I understand best

- **File:** TODO: the mock API file (I believe `client/src/api/httpApi.js`; check the repo)
- **Commit:** https://github.com/roki-a/PastaPerfect/commit/6920b13
- **What it does and why we kept it:** GitHub Pages can only host static files, so there is no Express server or database there. The mock API answers the same calls from data kept in the browser, and one shared API layer chooses between the mock and the real Express API. We kept it so the deployed demo works without a server, while local development still uses PostgreSQL.
