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

## My Own Work

The following parts were written, adapted, tested, or substantially changed by me:

- Adapting the AI-assisted React and CSS implementations to my Pasta Perfect UI/UX design.
- Testing the application and identifying visual, routing, and interaction problems.
- Adjusting the tomato timer layout, drag direction, and ruler interaction.
- Configuring and testing the PostgreSQL database and seed data.
- Testing the Express API using PowerShell and verifying that the pasta preset data was returned correctly.
- Reviewing and modifying AI-assisted code before keeping it in the project.

I reviewed and tested AI-assisted code before keeping it in the project.