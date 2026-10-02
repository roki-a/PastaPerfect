# Security Checklist — Pasta Perfect

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` contains `.env`, `git check-ignore -v server/.env` confirmed it is ignored, and `git ls-files server/.env` returned nothing. |
| 2 | A `.env.example` with placeholder values only is committed | Yes | `server/.env.example` contains `YOUR_PASSWORD` instead of a real database password, and the file is tracked in the repository. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | I searched the project excluding `.git`, `node_modules` and build output; the only real database password found was in the ignored local `server/.env`. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Searches of the repository and Git history found no committed `roki_winter` database password or other real credential. |
| 5 | Any credential that was ever committed has been rotated | N/A | No real credential was found in the committed repository history, so there was no committed credential requiring rotation. |
| 6 | Production credentials live only in my hosting provider's environment settings | Yes | The production API is deployed on Render. The database connection is configured through the Render DATABASE_URL environment variable, and the app username and password are configured through the Render APP_USERNAME and APP_PASSWORD environment variables. These credentials are not stored in the GitHub repository. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | `.github/workflows/deploy-pages.yml` contains no database password, API key or other secret value; `VITE_API_BASE_URL` points to the Render API and contains no credential. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | N/A | The Pages workflow does not require an Actions secret for the API password. The production app password is stored in Render as `APP_PASSWORD`, not in the GitHub Actions workflow. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | Yes | The workflow contains no `echo`, environment dump or debug command for secrets; the build passes only the required public API configuration to the Vite build. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | The Pages workflow uploads only `client/dist` using `actions/upload-pages-artifact`. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | No | The workflow currently uses version tags: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`. |
| 12 | Secret scanning and push protection are enabled on the repository | No | GitHub Advanced Security was checked, but repository-level push protection was not verified as enabled. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | Yes | `server/pastaRepo.js` uses PostgreSQL parameters such as `$1`, `$2`, `$3` for search terms, IDs and pasta data. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | Yes | Production uses Render PostgreSQL through the backend API. The database connection is made by the Render-hosted API using `DATABASE_URL`; the frontend does not connect directly to PostgreSQL. |
| 15 | The database user the app connects as has only the permissions it needs | No | The local application currently connects using the PostgreSQL `postgres` user, and least-privilege permissions have not been configured. |
| 16 | Seed and sample data is invented, not real people's data | Yes | `server/db/seed.sql` contains pasta preset/sample data and no real people's personal information. |
| 17 | Debug, seed and reset routes are removed before going public | Yes | `server/server.js` contains application API routes but no HTTP debug, seed or database-reset routes. The SQL seed script remains a setup script, not an HTTP route. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | Yes | Pasta Perfect uses an app-level password. The client displays an app-password gate, and the Render API requires a valid Authorization: Basic ... header before allowing access to /api routes. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | N/A | Pasta Perfect uses PostgreSQL with the Node/Express API, not Supabase or Firebase. |
| 20 | If Zero Trust: `tjakoen.s@gmail.com` is on the access policy. If an app password: the credentials are in my private workspace `project/README.md` | Yes | Pasta Perfect uses an app-level password. The app username and password are stored as the Render APP_USERNAME and APP_PASSWORD environment variables, and the credentials are documented in the private workspace project/README.md for assessment access. The credentials are not stored in the public GitHub repository. |
| 21 | The gate covers every route, including the ones that only change data | Yes | `app.use('/api', requireAppPassword)` applies the password middleware to the `/api` namespace, covering both read and data-changing API routes. |
| 22 | The credentials for the gate are environment variables, not in source | Yes | The production app username and password are stored in Render as APP_USERNAME and APP_PASSWORD. No real app credentials are hardcoded in the source code or public GitHub repository. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | Yes | `server/server.js` validates pasta names, images, cooking times and route IDs before calling the repository layer. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | The client renders application data through React rather than inserting user-provided values as raw HTML. |
| 25 | Error responses do not expose stack traces, file paths or connection details | Yes | The Express error handler logs the full error server-side but returns only `Something went wrong on the server` to the client; validation errors return controlled messages. |
| 26 | CORS is not a wildcard on routes that change data | Yes | CORS uses the `CORS_ORIGINS` environment variable and defaults to `http://localhost:5173`; it is not configured as `*`. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | No | Recent Git history contains the personal email `mendozashane0820@gmail.com` and the author name `SHANEMENDOZA\mendo`. Git has now been configured to use `roki-a@users.noreply.github.com` for future commits. The existing commit history still contains the old email. |
| 28 | No classmate's personal data in the repository | Yes | Searches performed on the project found no classmate personal information; the seed data contains pasta information rather than people's data. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | The project dependencies are installed through npm and `node_modules` is excluded from Git. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | No | Some project assets still need their original source or licensing/credit information verified before this can be marked Yes. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | The GitHub repository was opened in GitHub settings and its public repository configuration was checked after the latest push. |

## Anything I found and fixed

The checklist caught that the local database password was present in `server/.env`; this file is correctly ignored by Git and was not found in the tracked repository. It also caught that Git was using a personal Gmail address for commit metadata, so Git has now been configured to use the GitHub `noreply` address for future commits. The existing commit history still contains the old email and is reported honestly above rather than being rewritten.

An app-level password access layer was subsequently added to Pasta Perfect. The production password is stored in Render as the `APP_PASSWORD` environment variable rather than in source code. The Express API uses `requireAppPassword` middleware on `/api`, requiring a valid `Authorization: Bearer` header before API routes can be accessed. The client includes an app-password gate and stores the entered password only for the current browser session. The production API is deployed on Render and the frontend is deployed through GitHub Pages. The Render API and PostgreSQL database are separate from the public frontend, with the database accessed through the backend rather than directly from the browser.

The access-control implementation was tested by sending requests to the production API with an authorization header, including testing incorrect credentials. The Render database was also temporarily suspended during testing, which caused `/readyz` to return `503`; the database was subsequently resumed and the issue was resolved.
