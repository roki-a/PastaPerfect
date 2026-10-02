import { useState } from 'react'
import {
  setAppCredentials,
  clearAppCredentials,
} from '../api/httpApi'

export default function AppPassword({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      setError('Please enter your username and password.')
      return
    }

    setChecking(true)
    setError('')

    try {
      const credentials = btoa(
        `${trimmedUsername}:${trimmedPassword}`,
      )

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/pasta`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        },
      )

      if (!response.ok) {
        clearAppCredentials()
        setAuthenticated(false)
        setError('Incorrect username or password.')
        return
      }

      setAppCredentials(
        trimmedUsername,
        trimmedPassword,
      )

      setAuthenticated(true)
      setUsername('')
      setPassword('')
    } catch {
      clearAppCredentials()
      setAuthenticated(false)
      setError('Unable to connect to the API.')
    } finally {
      setChecking(false)
    }
  }

  if (authenticated) {
    return children
  }

  return (
    <div className="password-gate">
      <div className="password-gate-card">
        <h1>Pasta Perfect</h1>

        <p>
          Enter the app username and password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="app-username">
            Username
          </label>

          <input
            id="app-username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
              setError('')
            }}
            autoComplete="username"
            disabled={checking}
          />

          <label htmlFor="app-password">
            Password
          </label>

          <div className="password-input-wrapper">
            <input
              id="app-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
              autoComplete="current-password"
              disabled={checking}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              disabled={checking}
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <p className="password-gate-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={checking}
          >
            {checking ? 'Checking...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}