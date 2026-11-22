import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getMyOrganization, updateMyOrganization } from '../services/organisationService'

const emptyOrganization = {
  name: '',
  email: '',
  phone: '',
  sector: '',
  website: '',
  address: '',
  description: '',
}

export default function OrganizationProfilePage() {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true

    getMyOrganization()
      .then(organization => {
        if (!organization) throw new Error('L’API n’a retourné aucun profil organisation.')
        if (active) setForm({ ...emptyOrganization, ...organization })
      })
      .catch(requestError => {
        if (active) setError(requestError.message || 'Impossible de charger le profil.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setError('')
    setMessage('')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const organizationData = Object.fromEntries(
        Object.keys(emptyOrganization).map(key => [key, form[key] || ''])
      )
      const updatedOrganization = await updateMyOrganization(organizationData)
      if (updatedOrganization) {
        setForm({ ...emptyOrganization, ...updatedOrganization })
      }
      setMessage('Les modifications ont été enregistrées.')
    } catch (requestError) {
      setError(requestError.message || 'Impossible d’enregistrer les modifications.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="container page-shell"><div className="empty-state">Chargement du profil...</div></div>
  }

  if (!form) {
    return (
      <div className="container page-shell">
        <div className="empty-state" role="alert">
          <h2>Profil indisponible</h2>
          <p>{error}</p>
          <p>Vérifiez que le backend est démarré et que vous êtes connecté à votre compte organisation.</p>
          <Link className="text-link" to="/login">Se connecter</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-shell narrow-page">
      <Link to="/offers" className="back-link"><ArrowLeft size={16}/> Retour aux opportunités</Link>
      <section className="auth-card auth-card-register organization-profile-card">
        <span className="eyebrow">ESPACE ORGANISATION</span>
        <h1>Mon profil</h1>
        <p>Modifiez les informations de votre organisation.</p>

        <form onSubmit={handleSubmit}>
          <label>Nom de l’organisation
            <input name="name" value={form.name || ''} onChange={handleChange} required minLength={2}/>
          </label>
          <label>Email professionnel
            <input name="email" type="email" value={form.email || ''} onChange={handleChange} required/>
          </label>
          <label>Téléphone
            <input name="phone" type="tel" value={form.phone || ''} onChange={handleChange} required/>
          </label>
          <label>Secteur d’activité
            <select name="sector" value={form.sector || ''} onChange={handleChange} required>
              <option value="">Sélectionner un secteur</option>
              <option value="Informatique">Informatique</option>
              <option value="Finance">Finance</option>
              <option value="Education">Éducation</option>
              <option value="Industrie">Industrie</option>
              <option value="Commerce">Commerce</option>
              <option value="Autre">Autre</option>
            </select>
          </label>
          <label>Site web
            <input name="website" type="url" value={form.website || ''} onChange={handleChange} placeholder="https://..."/>
          </label>
          <label>Adresse
            <input name="address" value={form.address || ''} onChange={handleChange} required/>
          </label>
          <label>Description
            <textarea name="description" value={form.description || ''} onChange={handleChange} required minLength={10} maxLength={2000}/>
          </label>
          {error && <span className="field-error" role="alert">{error}</span>}
          {message && <p className="form-message" role="status">{message}</p>}
          <button className="btn btn-primary full-width" type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </section>
    </div>
  )
}
