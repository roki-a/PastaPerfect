# Security and privacy checklist

This is the security and privacy review for Pasta Perfect: a React/Vite
frontend on GitHub Pages, an Express API on Render, and a PostgreSQL
database on Render. It follows the class checklist. Ticked items were
checked; unticked items are open or not implemented, and each one says why.

## Before the first push

- [x] `.gitignore` includes `.env`, and `git check-ignore -v server/.env`
      confirms it is ignored
- [x] `git ls-files server/.env` prints nothing, so no env file is tracked
- [x] `.env.example` is committed with placeholder values only
- [x] No connection string, key or password is in the repository source or
      comments. The only real database password is in the ignored local
      `server/.env`
- [ ] No name, student number or email of mine in the repository. **Not
      fully met:** an older commit author email and name remain in Git
      history. Future commits use the GitHub `noreply` address. The history
      has not been rewritten, so this is reported openly

Production credentials live only in Render's environment settings (the
database connection string and the app password). They are not in GitHub.

If a credential were ever committed, it would be rotated at the service
first and the history cleaned second.

## The application

- [x] Every SQL query is parameterised. `server/pastaRepo.js` passes values
      as `$1`, `$2`, `$3` for searches, IDs and pasta data
- [x] Input is validated on the server. `server/server.js` checks pasta
      names, images, cooking times and route IDs before calling the
      repository
- [x] CORS names its origins through the `CORS_ORIGINS` environment variable
      (default `http://localhost:5173`). It is not a wildcard
- [x] Error responses carry no stack trace, file path or connection detail.
      The error handler logs the full error on the server and sends only a
      generic message to the client
- [ ] `NODE_ENV=production` on the host. Not verified in Render's settings
- [ ] `helmet` installed. **Not implemented**
- [ ] Rate limiting on the password gate. **Not implemented.** Repeated
      password guesses are not throttled
- [x] Passwords hashed with bcrypt: **N/A.** There are no user accounts. The
      single app password is read from an environment variable and compared
      on the server, and it is never stored in the database
- [x] Ownership checks (`AND user_id = $2`): **N/A.** There are no user
      accounts, so no user owns data. This is a scope limit, and accounts
      would need ownership checks in each query
- [ ] `npm audit` run once in `client/` and `server/`, with the easy fixes
      taken. **Not yet recorded** (result to be added here)

### Access control

The API is protected by an application-level password rather than user
accounts. The client shows a password gate, and the API requires a valid
`Authorization` header on every `/api` route:

```js
app.use('/api', requireAppPassword)
```

Because the middleware covers the whole `/api` namespace, read routes and
data-changing routes are both protected. The password is a Render
environment variable. The client keeps what was typed only for the current
browser session.

### Database

The browser never connects to PostgreSQL. Only the Render-hosted API does.
The local database user is `postgres`, and a least-privilege user has not
been set up, which is a known limitation.

### GitHub Actions

The Pages workflow contains no secret. It passes only the public Render API
URL to the Vite build and uploads `client/dist`. Third-party actions are
referenced by version tags (`@v4`, `@v3`), not pinned to commit SHAs, and
GitHub push protection has not been verified as enabled.

## Privacy

- [x] No real classmates' names, numbers, emails or photos in the code, seed
      data or documentation
- [x] Seed data is invented. `server/db/seed.sql` holds pasta names and
      cooking times only
- [x] Real testers' data: **N/A.** The app has no accounts and stores no data
      about people, only pasta records
- [x] The app collects nothing about anyone. It has no profile, name, email
      or location fields. Notes are saved in the browser's `localStorage`,
      not in the database
- [x] No faces in screenshots or the demo
- [ ] Assets are mine, licensed or credited. **Partly verified:** the logo is
      my own design, and the pixel icons and tomato were made with AI help.
      Recipe image sources and licences still need to be confirmed

## Known limitations

- Old commit author information remains in Git history
- No `helmet`, and no rate limiting on the password gate
- `npm audit` results not yet recorded
- GitHub Actions pinned by tag, not by SHA
- Push protection and secret scanning not verified
- App-level password instead of individual accounts, so no per-user data
- The database user is not least-privilege
- Recipe image licences not yet confirmed

These are listed so the document does not claim controls that are not in
place.