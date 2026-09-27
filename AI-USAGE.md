# AI Usage

This project was developed with assistance from AI tools, primarily ChatGPT and Claude. AI was used for planning, explaining code, debugging, reviewing implementation decisions, and assisting with UI and interaction development.

All AI-assisted code was reviewed, tested, adapted, and modified as needed to fit the Pasta Perfect project and my UI/UX design.

## AI Usage Entries

### Entry 1 — Navigation Bar

- Tool: ChatGPT
- Date: September 23, 2026
- Request: Help implement and organize the navigation bar for the Pasta Perfect application.
- What I kept or changed: I used the suggested navigation structure and adapted the implementation to the existing Pasta Perfect React project.
- Commit: https://github.com/roki-a/PastaPerfect/commit/ef963ca

### Entry 2 — Pasta Presets UI and Navigation

- Tool: ChatGPT
- Date: September 24, 2026
- Request: Help refine the Pasta Presets page, navigation state, routing, and UI/UX to match the Pasta Perfect design.
- What I kept or changed: I used the suggested React and CSS structure and adapted the layout, navigation, spacing, typography, and visual styling to my UI/UX design.
- Commit: https://github.com/roki-a/PastaPerfect/commit/2f91658

### Entry 3 — Pasta Presets Database Integration

- Tool: ChatGPT
- Date: September 24, 2026
- Request: Help connect the pasta presets page to the PostgreSQL database through the Express API and troubleshoot database connection and seeding issues.
- What I kept or changed: I followed the debugging and integration guidance, tested the API using PowerShell, and adapted the database configuration and seed data to my local PostgreSQL setup.
- Commit: https://github.com/roki-a/PastaPerfect/commit/10c8b5a

### Entry 4 — Cook Timer Page

- Tool: ChatGPT
- Date: September 24, 2026
- Request: Help implement and debug the pasta cooking timer page, including timer state, doneness settings, start, pause, reset, and loading pasta data from the API.
- What I kept or changed: I used the suggested React timer structure as a starting point and modified the implementation and styling to fit the Pasta Perfect UI/UX requirements.
- Commit: https://github.com/roki-a/PastaPerfect/commit/b6b2b84

### Entry 5 — Tomato Timer Interaction

- Tool: Claude
- Date: September 24, 2026
- Request: Help improve the tomato-shaped timer interface and its drag interaction for adjusting cooking time.
- What I kept or changed: I used Claude's assistance for the tomato timer visual structure and interaction. I then tested and refined the implementation so dragging left decreases the cooking time, dragging right increases the cooking time, and the ruler-like indicator follows the drag direction.
- Commit: https://github.com/roki-a/PastaPerfect/commit/60f256a

### Entry 6 — Presets “My time” / “Recommended” Status

- Tool: ChatGPT
- Date: September 26, 2026
- Request: Help fix the Pasta Presets status label so that a customized cooking time is shown as “My time”, while resetting the customized time correctly changes the label back to “Recommended”.
- What I kept or changed: I used ChatGPT's assistance to debug the relationship between the customized cooking-time values and the status displayed on the Presets cards. I kept and adapted the suggested logic so that when the custom time is reset, the original recommended time is used and the card displays “Recommended” instead of “My time”.
- Commit: https://github.com/roki-a/PastaPerfect/commit/a7c91d2

### Entry 7 — GitHub Pages Deployment and Mock API

- Tool: ChatGPT
- Date: September 27, 2026
- Request: Help make the Pasta Perfect frontend work correctly when deployed to GitHub Pages, including routing, API handling, asset paths, and production build testing.
- What I kept or changed: I used ChatGPT's assistance to troubleshoot GitHub Pages routing and 404 errors, configure the Vite base path, add a mock API for the deployed demo, and update the application so it could use the mock API on GitHub Pages while still using the real Express API locally. I tested the production build with `npm run build` and inspected browser developer tools to identify deployment problems.
- Commits:
  - https://github.com/roki-a/PastaPerfect/commit/6920b13
  - https://github.com/roki-a/PastaPerfect/commit/6a95d4e
  - https://github.com/roki-a/PastaPerfect/commit/88f17b0

### Entry 8 — Cook Page API Loading

- Tool: ChatGPT
- Date: September 27, 2026
- Request: Help fix the Cook page so it could load pasta data correctly when the application is deployed using the mock API.
- What I kept or changed: I identified that Cook.jsx was still making a direct `/api/pasta/:id` request instead of using the shared API layer. I changed the page to use `getPasta(id)`, allowing the Cook page to work with the same API selection used by the rest of the application.
- Commit: https://github.com/roki-a/PastaPerfect/commit/daeeaaa

### Entry 9 — Uploaded Pasta Image Paths

- Tool: ChatGPT
- Date: September 27, 2026
- Request: Help fix uploaded pasta images that were not displaying correctly on the deployed Pasta Presets page.
- What I kept or changed: I identified that predefined pasta images and user-uploaded images were stored differently. Predefined images use paths from the public folder and need the GitHub Pages base path, while uploaded images are stored as data URLs and must be used directly. I adapted the image handling so uploaded pasta images could display correctly.
- Commit: https://github.com/roki-a/PastaPerfect/commit/2315a13

## Where AI Got It Wrong

### Case 1 — Tomato Timer Layout

- AI output: The initial tomato timer implementation produced a tomato shape and timer layout that did not closely match my UI/UX design.
- What was wrong: The timer window was positioned incorrectly, and the tomato proportions and surrounding layout were not consistent with the intended design.
- How I fixed it: I tested the page against my UI/UX reference and repeatedly adjusted the tomato structure and CSS until the timer was positioned and styled more appropriately.
- Commit: https://github.com/roki-a/PastaPerfect/commit/60f256a

### Case 2 — Timer Drag Direction

- AI output: The initial drag behavior did not match the intended direction for changing the timer.
- What was wrong: The interaction direction was reversed from the intended design.
- How I fixed it: I changed the interaction so dragging left decreases the timer and dragging right increases the timer. I also adjusted the ruler-like indicator so it follows the drag direction.
- Commit: https://github.com/roki-a/PastaPerfect/commit/60f256a

### Case 3 — Presets Navigation Active State

- AI output: The initial navigation implementation did not correctly keep the active line under Presets when navigating between routes.
- What was wrong: The active navigation state disappeared or was not correctly associated with the Presets route.
- How I fixed it: I updated the route detection in Header.jsx so both `/` and `/presets` are treated as the Presets section and verified the navigation behavior in the browser.
- Commit: https://github.com/roki-a/PastaPerfect/commit/2f91658

### Case 4 — GitHub Pages Routing and Asset Paths

- AI output: The initial deployment configuration did not fully account for GitHub Pages serving the application from the `/PastaPerfect/` repository path.
- What was wrong: The deployed application initially produced route and asset 404 errors because some paths were being treated as if the application was hosted at the root of the domain.
- How I fixed it: I tested the deployed application using the browser developer tools, identified the incorrect paths, and updated the Vite base path, React Router configuration, and asset/API handling to work with the GitHub Pages repository path.
- Commits:
  - https://github.com/roki-a/PastaPerfect/commit/6a95d4e
  - https://github.com/roki-a/PastaPerfect/commit/88f17b0

### Case 5 — Direct API Request on the Cook Page

- AI output: The Cook page continued making a direct `/api` request even after the deployed version was configured to use the mock API.
- What was wrong: This caused the deployed GitHub Pages version to request an API endpoint that does not exist on GitHub Pages.
- How I fixed it: I identified the direct `fetch()` call in Cook.jsx and changed the page to use the shared `getPasta()` API function so the application can use the mock API on GitHub Pages and the real API when configured for the backend.
- Commit: https://github.com/roki-a/PastaPerfect/commit/daeeaaa

### Case 6 — Uploaded Pasta Image Path

- AI output: The initial image-path solution treated uploaded pasta images the same way as predefined images stored in the public folder.
- What was wrong: Uploaded pasta images are stored as data URLs in the mock API/localStorage, so adding the GitHub Pages base path to every image path caused the uploaded image to fail.
- How I fixed it: I identified that predefined pasta images and uploaded images require different handling. Predefined image paths use the GitHub Pages base path, while uploaded images stored as data URLs must be used directly without adding the base path.
- Commit: https://github.com/roki-a/PastaPerfect/commit/2315a13

## My Own Work

The following parts were written, adapted, tested, or substantially changed by me:

- Designing and adapting the Pasta Perfect interface based on my UI/UX design.
- Deciding the overall page structure, navigation, content organization, and user flow.
- Adapting AI-assisted React and CSS implementations to the existing Pasta Perfect project.
- Testing the application in the browser and identifying visual, routing, interaction, and deployment problems.
- Adjusting the tomato timer layout, drag direction, and ruler interaction.
- Configuring and testing the PostgreSQL database and seed data.
- Testing the Express API using PowerShell and verifying that the pasta preset data was returned correctly.
- Troubleshooting PostgreSQL startup and connection issues during local development.
- Testing the GitHub Pages deployment and using browser developer tools to identify 404 errors, routing problems, and incorrect asset/API paths.
- Testing the production build using `npm run build` before deploying the application.
- Reviewing the GitHub Actions deployment configuration and verifying that the Vite base path was correctly applied for the `/PastaPerfect/` GitHub Pages repository path.
- Adapting the application so GitHub Pages can use the mock API while the local application can still use the real Express API.
- Identifying that the Cook page was still making a direct API request and verifying that it needed to use the shared API layer.
- Identifying the difference between predefined pasta images stored in the public folder and uploaded pasta images stored as data URLs.
- Testing and fixing the display of uploaded pasta images on the Pasta Presets page.
- Testing navigation and routing directly on the deployed GitHub Pages site.
- Using PowerShell commands such as `git diff`, `git status`, `git log`, and `npm run build` to inspect, verify, and test my changes before committing them.
- Reviewing the changes shown by Git before committing and deciding which files and changes should be included in each commit.
- Reviewing and modifying AI-assisted code before keeping it in the project.
- Verifying that resetting a customized preset restores the recommended status and time in the UI.
- Making final decisions about which AI suggestions to keep, modify, or reject based on testing and the intended Pasta Perfect design.

I reviewed and tested AI-assisted code before keeping it in the project.