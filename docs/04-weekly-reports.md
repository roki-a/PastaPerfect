# Weekly Reports

This journal records the development progress of Pasta Perfect during
the final project. Each week's entry records what was completed, what
went wrong, the approximate time spent, and the next planned work.

---

## Week of 2026-09-23

**Done.**

- Continued developing Pasta Perfect based on the low-fidelity Figma
  wireframes and the project's design direction.
- Implemented the main Presets screen with pasta cards, search,
  doneness selection, recommended cooking times, and My Time.
- Implemented the Cook screen and the tomato timer.
- Added Start, Pause, Reset, +30 seconds, and -30 seconds controls.
- Added separate cooking times for Al dente, Firm, and Soft.
- Separated Recommended Time and My Time.
- Fixed the cooking-time system so changing My Time for one doneness
  does not change the other doneness values.
- Kept Recommended Time visible after a My Time value is saved.
- Added Use Recommended Time so the timer can return to the recommended
  value without deleting the saved My Time.
- Added editable pasta notes.
- Implemented the Add My Pasta flow.
- Added independent Al dente, Firm, and Soft values to the Add My Pasta
  form.
- Implemented the Recipes screen based on the Figma layout.
- Added recommended doneness information to recipes.
- Connected Cook this pasta to the pasta timer using the recipe's
  recommended doneness.
- Adjusted search behaviour so the pasta list does not immediately
  change after only one letter is typed.
- Kept predefined pasta and recipe information separate from the user's
  editable cooking preferences.
- Used the tomato timer prototype as the basis for the timer interaction
  and completed state.
- Tested the application and fixed several development issues.

**Stuck.**

Several issues appeared during testing. The Al dente timer could display
`NaN:NaN` because the recommended-time value was not mapped correctly.
Changing one doneness could also affect another, and saving My Time
could replace or hide Recommended Time. The Use Recommended Time control
also needed correction, and the Notes field initially was not editable.
The Add My Pasta form also needed independent values for each doneness.

The temporary tomato timer and recipe images were still being used for
testing and did not yet represent the final visual direction.

**Hours.**

Approximately 24 hrs

**Next.**

- Continue testing Presets, Cook, Add My Pasta, Edit Pasta, and Recipes.
- Continue checking the application against the Figma wireframes and
  design system.

---

## Week of 2026-09-27

**Done.**

- Fixed the delete-pasta route so user-added pasta can be deleted
  correctly.
- Fixed the Cook screen pasta image so it uses the image value returned
  by the API, including uploaded image data URLs.
- Rebuilt the Recipes page routing so recipes open the correct
  associated pasta timer.
- Removed the Cook this pasta button from recipes without a matching
  pasta preset, such as lasagna.
- Updated Recipes styling to use the project's existing CSS colour
  variables.
- Implemented separate recommended and customized cooking-time values
  in the database.
- Implemented reset behaviour for customized predefined pasta.
- Fixed the Recommended / My time status logic on the Presets page.
- Continued auditing the repository against the professor's
  final-project template.
- Continued updating project documentation and deployment
  configuration.

**Stuck.**

The delete-pasta request initially returned a generic 500 error. The
problem was traced from the server route into `pastaRepo.js`: the route
called `deleteUserPasta`, while the repository exported
`deleteCustom`.

The Cook screen image problem was caused by reconstructing an image
filename from the pasta name instead of using the actual image field
returned by the API.

The Recipes page also initially used the same route for every
`Cook this pasta` action, so the recipe-to-pasta connection needed to be
corrected.

**Hours.**

Approximately 16 hrs

**Next.**

- Complete end-to-end testing of Presets, Cook, Add Pasta, Edit Pasta,
  Delete Pasta, and Recipes.
- Complete the remaining project documentation and final submission
  materials.

---

## Week of 2026-10-03

**Done.**

- Continued final-project documentation and repository cleanup.
- Updated the final proposal documentation to reflect the implemented
  project scope.
- Documented the low-fidelity Figma wireframes and the high-fidelity
  interface implemented in the React application.
- Added high-fidelity screenshots for the implemented Presets, Cook,
  Add Pasta, Edit Pasta, and Recipes screens.
- Documented the project's design system, including colour tokens,
  typography, spacing, reusable components, responsive behaviour, and
  accessibility rules.
- Continued final review of the deployed application and project
  documentation.

**Stuck.**

The remaining work is primarily final documentation and submission
verification rather than implementing the main application workflow.

The mockup documentation still needs to satisfy the requirement for an
implemented mobile view and an empty-state example if those screenshots
are not yet included in the high-fidelity assets.

**Hours.**

Approximately 6 hrs

**Next.**

- Finish the remaining documentation files and final presentation
  materials.
- Perform the final end-to-end check of the deployed application and
  repository before submission.