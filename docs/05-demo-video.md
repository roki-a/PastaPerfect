# Demo video

The Pasta Perfect video presentation is approximately three minutes long
and presents the completed application using the deployed version of the
project.

**Link:** [Pasta Perfect Video Presentation](https://drive.google.com/drive/folders/1J7wz1OzFR-NcnpTJEWidAGLEkMY425zr)

## The structure

### 1. Introduction

The presentation introduces Pasta Perfect and explains its purpose.

Pasta Perfect is a web application designed for home cooks who want to
quickly choose a pasta and start a cooking timer based on their
preferred doneness.

The presentation introduces the main parts of the application and
shows the actual interface rather than relying only on presentation
slides.

### 2. Main application flow

The presentation demonstrates the main Pasta Perfect workflow using
prepared pasta data.

The walkthrough includes:

- Opening the deployed Pasta Perfect application.
- Viewing the available pasta presets.
- Searching for a pasta.
- Selecting the preferred doneness:
  - Al dente
  - Firm
  - Soft
- Viewing the recommended cooking time.
- Viewing and using a saved My Time value.
- Starting the cooking timer.
- Pausing and resetting the timer.
- Adjusting the cooking time.
- Saving a customized cooking time.
- Using the recommended cooking time again.
- Adding a custom pasta.
- Setting separate cooking times for Al dente, Firm, and Soft.
- Starting a timer for a custom pasta.
- Editing a custom pasta.
- Deleting a custom pasta.
- Opening the Recipes screen.
- Viewing recipe information.
- Using Cook this pasta when the recipe has an associated pasta.

The presentation uses the deployed application rather than the local
development environment.

### 3. Technical implementation

The presentation explains the main technologies used to build Pasta
Perfect.

The frontend uses React and Vite. The backend uses Node.js and Express,
while PostgreSQL is used for persistent pasta data.

The frontend communicates with the Express backend through the
application's API layer.

The presentation also discusses development decisions and debugging
work that were necessary to make the application work as a complete
system. These include handling customized cooking times, connecting
recipes to the correct pasta, and fixing issues with custom pasta
deletion and image loading.

### 4. Reflection

The presentation ends with an honest reflection about an area that
could be improved in a future version.

One area for further improvement is the timer implementation. The
current timer uses a one-second interval to update the countdown.
Browser timers can be delayed when a page is inactive, so a future
version could use a more precise timing approach.

Further visual refinement could also be made to continue improving the
pixel-style presentation of the timer and other visual assets.

## Before recording

- [x] The deployed application was used instead of `localhost`.
- [x] Existing pasta data was prepared before recording.
- [x] The main application flow was practiced before recording.
- [x] The presentation was recorded with my own voice.
- [x] Personal messages and unrelated information were kept out of the
      recording.
- [x] The presentation demonstrates the completed application rather
      than an empty database.
- [x] The recording is within the required three-to-five-minute range.

## Fallback

The video presentation is stored in the linked Google Drive folder.

If the deployed application is temporarily unavailable, the project
documentation and screenshots provide additional evidence of the
implemented interface and features.

The repository also contains the project source code, design
documentation, and supporting project materials.