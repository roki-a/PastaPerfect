import { useState } from 'react'
import {
  setAppPassword,
  clearAppPassword,
} from '../api/httpApi'

export default function AppPassword({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedPassword = password.trim()

    if (!trimmedPassword) {
      setError('Please enter the app password.')
      return
    }

    setChecking(true)
    setError('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/pasta`,
        {
          headers: {
            Authorization: `Bearer ${trimmedPassword}`,
          },
        },
      )

      if (!response.ok) {
        clearAppPassword()
        setAuthenticated(false)
        setError('Incorrect app password.')
        return
      }

      // Only save the password after Render accepts it.
      setAppPassword(trimmedPassword)
      setAuthenticated(true)
      setPassword('')
    } catch {
      clearAppPassword()
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
          Enter the app password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="app-password">
            App password
          </label>

          <input
            id="app-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            autoComplete="current-password"
            disabled={checking}
          />

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