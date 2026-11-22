import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { apiRequest } from '../services/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (result?.role !== 'ADMIN') {
        throw new Error("Accès réservé à l'administrateur.")
      }
      if (!result.token) {
        throw new Error("Le serveur n'a pas retourné de jeton d'authentification.")
      }

      window.localStorage.setItem('token', result.token)
      setMessage('Connexion réussie. Bienvenue dans l’espace administration.')
    } catch (requestError) {
      setError(requestError.message || 'Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container auth-shell">
      <section className="auth-card admin-login-card">
        <div className="admin-logo" aria-hidden="true">DD</div>
        <span className="eyebrow">ACCÈS SÉCURISÉ</span>
        <h1>Administration</h1>
        <p>Connectez-vous pour accéder à votre espace administrateur.</p>

        <form onSubmit={handleLogin}>
          <label>Email administrateur
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="admin@devondeck.com"
              autoComplete="username"
              required
            />
          </label>
          <label>Mot de passe
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? 'Vérification...' : 'Se connecter'}
          </button>
        </form>

        {error && <p className="field-error" role="alert">{error}</p>}
        {message && <p className="form-message" role="status">{message}</p>}

        <div className="admin-security-note">
          <ShieldCheck size={16}/>
          <span>Accès réservé aux administrateurs.</span>
        </div>
      </section>
    </div>
  )
}
