# Pasta Perfect — Final Project Proposal

## Project idea

Pasta Perfect is a web application that helps people save and reuse
their preferred cooking times for different pasta types. Instead of
relying on one cooking time printed on a package, users can choose
their preferred doneness and use a personalized countdown timer.

## Problem

Pasta packages usually provide a single recommended cooking time, but
the preferred texture can vary from person to person. Users may also
forget the cooking time that previously gave them the texture they
liked.

A normal phone timer does not remember the pasta or doneness being
cooked. Pasta Perfect combines pasta selection, cooking preferences,
saved times, and a countdown timer in one place.

## Target users

Pasta Perfect is intended for people who cook pasta at home and want
an easier way to remember and reuse cooking times that work for them.

## Main user flow

The main thing a user does is:

1. Choose a pasta.
2. Select a preferred doneness.
3. Review or customize the cooking time.
4. Start the countdown timer.
5. Reuse the customized time when cooking the same pasta again.

## Main features

### Pasta presets and search

Users can browse predefined pasta types and search for a pasta by name.

### Three doneness levels

Each pasta provides recommended times for:
- Al dente
- Firm
- Soft

### My Time

Users can customize a cooking time and distinguish their personalized
time from the recommended time. They can also reset their time back to
the recommendation.

### Interactive cook timer

Users can start, pause, and reset the timer. The tomato control can be
dragged to adjust the cooking time.

### Custom pasta

Users can add their own pasta with an image and cooking times. Custom
pasta can also be edited or deleted.

### Recipes

Users can browse pasta recipes with ingredients, instructions, and a
link to the cooking flow.

## Data

The application stores pasta information including:

- Pasta name
- Image
- Recommended cooking times
- Customized cooking times
- Whether the pasta was user-added

The project uses PostgreSQL for persistent backend data.

## Technology

The frontend uses React and Vite.

The backend uses Node.js and Express.

PostgreSQL is used for persistent data storage.

The frontend communicates with the backend through a REST API.

## Deployment

The frontend is deployed through GitHub Pages and Render.

The Express API and PostgreSQL database are deployed through Render.

The production API is protected with an application-level username
and password stored as environment variables.

## Project risks and decisions

The main technical risks during development were database connectivity,
GitHub Pages routing and asset paths, API integration, and handling
uploaded images.

These were addressed through browser testing, API testing, environment
configuration, and separating the frontend API layer from the individual
pages.

## Final scope

The final project focuses on helping users choose pasta, personalize
their cooking time, and use a dedicated timer. Custom pasta management
and recipes extend the original idea while keeping the main purpose of
saving and reusing preferred pasta cooking times.
