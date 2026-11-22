import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Building2, ArrowLeft } from 'lucide-react'
import { createOrganization } from '../services/organisationService'

const technologies = ['Python', 'Java', 'C', 'R', 'PHP', 'C++', 'JavaScript', 'TypeScript', 'C#', 'Go', 'Autre']

const requiredFieldsByRole = {
  Développeur: ['fullName', 'email', 'password', 'passwordConfirmation', 'birthDate', 'phone', 'technologies'],
  Organisation: ['organizationName', 'email', 'password', 'passwordConfirmation', 'phone', 'sector', 'address', 'description'],
}

function validateRegistrationField(name, value, form, role) {
  const isRequired = requiredFieldsByRole[role].includes(name)
  const normalizedValue = typeof value === 'string' ? value.trim() : value

  if (isRequired && (Array.isArray(value) ? value.length === 0 : !normalizedValue)) {
    return 'Ce champ est obligatoire.'
  }
  if (!normalizedValue) return ''

  if (name === 'fullName' || name === 'organizationName') {
    return normalizedValue.length < 2 ? 'Saisissez au moins 2 caractères.' : ''
  }
  if (name === 'education') {
    if (normalizedValue.length < 2) return 'Saisissez au moins 2 caractères.'
    return normalizedValue.length <= 100 ? '' : 'Limitez le niveau d’étude à 100 caractères.'
  }
  if (name === 'experience') {
    if (normalizedValue.length < 10) return 'Décrivez votre expérience en au moins 10 caractères.'
    return normalizedValue.length <= 2000 ? '' : 'Limitez la description à 2 000 caractères.'
  }
  if (name === 'description') {
    if (normalizedValue.length < 10) return 'La description doit contenir au moins 10 caractères.'
    return normalizedValue.length <= 2000 ? '' : 'Limitez la description à 2 000 caractères.'
  }
  if (name === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue) ? '' : 'Saisissez une adresse e-mail valide.'
  }
  if (name === 'password') {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
      ? ''
      : 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.'
  }
  if (name === 'passwordConfirmation') {
    return value === form.password ? '' : 'Les mots de passe ne correspondent pas.'
  }
  if (name === 'birthDate') {
    const today = new Date()
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return value <= localToday ? '' : 'La date de naissance ne peut pas être dans le futur.'
  }
  if (name === 'phone') {
    return /^\d{8}$/.test(value.replace(/[\s().-]/g, ''))
      ? ''
      : 'Saisissez un numéro tunisien de 8 chiffres.'
  }
  if (['website', 'linkedin', 'github'].includes(name)) {
    try {
      const url = new URL(value)
      return ['http:', 'https:'].includes(url.protocol) ? '' : 'Le lien doit commencer par http:// ou https://.'
    } catch {
      return 'Saisissez une URL valide (ex. https://exemple.com).'
    }
  }
  if (name === 'cv') {
    const validExtension = /\.(pdf|doc|docx)$/i.test(value.name)
    if (!validExtension) return 'Le CV doit être au format PDF, DOC ou DOCX.'
    if (value.size > 5 * 1024 * 1024) return 'Le CV ne doit pas dépasser 5 Mo.'
  }
  return ''
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const handleLogin = e => {
    e.preventDefault()
    const nextErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Saisissez une adresse e-mail valide.'
    }
    if (!password) {
      nextErrors.password = 'Le mot de passe est obligatoire.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setMessage('Connexion de démonstration : le backend Spring Boot sera connecté ensuite.')
  }

  return (
    <div className="container auth-shell">
      <div className="auth-card">
        <span className="eyebrow">BON RETOUR</span>
        <h1>Connectez-vous.</h1>
        <p>Retrouvez votre espace DevOnDeck.</p>
        <form noValidate onSubmit={handleLogin}>
          <label>Email
            <div className="input-wrap"><Mail/><input type="email" required value={email} onChange={e => { setEmail(e.target.value); setErrors(current => ({ ...current, email: '' })) }} placeholder="vous@exemple.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined}/></div>
            {errors.email && <span className="field-error" id="login-email-error" role="alert">{errors.email}</span>}
          </label>
          <label>Mot de passe
            <div className="input-wrap"><Lock/><input type="password" required value={password} onChange={e => { setPassword(e.target.value); setErrors(current => ({ ...current, password: '' })) }} placeholder="Votre mot de passe" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined}/></div>
            {errors.password && <span className="field-error" id="login-password-error" role="alert">{errors.password}</span>}
          </label>
          <Link className="auth-forgot-link" to="/forgot-password">Mot de passe oublié ?</Link>
          <button className="btn btn-primary full-width">Se connecter</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="auth-switch">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
      </div>
    </div>
  )
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="container auth-shell">
      <div className="auth-card">
        <span className="eyebrow">RÉINITIALISATION</span>
        <h1>Mot de passe oublié ?</h1>
        <p>Indiquez l’adresse e-mail associée à votre compte.</p>
        <form onSubmit={e => {
          e.preventDefault()
          setMessage('Demande de démonstration enregistrée. L’envoi réel du lien sera connecté ensuite.')
        }}>
          <label>Email
            <div className="input-wrap"><Mail/><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com"/></div>
          </label>
          <button className="btn btn-primary full-width">Envoyer le lien de réinitialisation</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="auth-switch"><Link to="/login">Retour à la connexion</Link></p>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Développeur')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const updateField = (name, value) => {
    const nextForm = { ...form, [name]: value }
    setForm(nextForm)
    if (errors[name]) {
      setErrors(current => ({ ...current, [name]: validateRegistrationField(name, value, nextForm, role) }))
    }
  }

  const validateFields = names => {
    const nextErrors = {}
    names.forEach(name => {
      const error = validateRegistrationField(name, form[name], form, role)
      if (error) nextErrors[name] = error
    })
    setErrors(current => ({ ...current, ...nextErrors, ...Object.fromEntries(names.filter(name => !nextErrors[name]).map(name => [name, ''])) }))
    return Object.keys(nextErrors).length === 0
  }

  const renderField = (label, name, placeholder, type = 'text') => {
    const errorId = `${name}-error`
    return (
      <label key={name}>{label}
        <input
          type={type}
          value={form[name] || ''}
          onChange={e => updateField(name, e.target.value)}
          placeholder={placeholder}
          required={requiredFieldsByRole[role].includes(name)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId : undefined}
        />
        {errors[name] && <span className="field-error" id={errorId} role="alert">{errors[name]}</span>}
      </label>
    )
  }

  const renderTechnologies = () => (
    <fieldset className="preference-field" aria-invalid={Boolean(errors.technologies)} aria-describedby={errors.technologies ? 'technologies-error' : undefined}>
      <legend>Langages de programmation préférés</legend>
      <div className="preference-options">
        {technologies.map(technology => (
          <label className="checkbox-option" key={technology}>
            <input
              type="checkbox"
              checked={(form.technologies || []).includes(technology)}
              onChange={e => {
                const selected = form.technologies || []
                updateField('technologies', e.target.checked
                  ? [...selected, technology]
                  : selected.filter(item => item !== technology))
              }}
            />
            {technology}
          </label>
        ))}
      </div>
      {errors.technologies && <span className="field-error" id="technologies-error" role="alert">{errors.technologies}</span>}
    </fieldset>
  )

  const renderPhone = () => (
    <label>Numéro de téléphone
      <div className="phone-input"><span>+216</span><input type="tel" value={form.phone || ''} onChange={e => updateField('phone', e.target.value)} placeholder="12 345 678" required={requiredFieldsByRole[role].includes('phone')} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined}/></div>
      {errors.phone && <span className="field-error" id="phone-error" role="alert">{errors.phone}</span>}
    </label>
  )

  const finishRegistration = async e => {
    e.preventDefault()
    const fields = role === 'Développeur'
      ? ['education', 'experience', 'linkedin', 'github', 'cv']
      : [...requiredFieldsByRole.Organisation, 'website']
    if (!validateFields(fields)) return

    if (role === 'Organisation') {
      setSubmitting(true)
      setRequestError('')
      setMessage('')

      try {
        const result = await createOrganization({
          name: form.organizationName.trim(),
          email: form.email.trim(),
          password: form.password,
          description: form.description.trim(),
          sector: form.sector,
          website: form.website?.trim() || '',
          address: form.address.trim(),
          phone: `+216 ${form.phone.trim()}`,
          role: 'ORGANIZATION',
        })
        const token = result?.token || result?.accessToken
        if (token) {
          window.localStorage.setItem('token', token)
          navigate('/organization/profile')
        } else {
          setMessage('Compte organisation créé. Connectez-vous pour accéder à votre profil et le modifier.')
        }
      } catch (error) {
        setRequestError(error.message || 'Impossible de créer le compte organisation.')
      } finally {
        setSubmitting(false)
      }
      return
    }

    setMessage('Inscription de démonstration. La création réelle du compte sera gérée par Spring Boot.')
  }

  const changeRole = selectedRole => {
    setRole(selectedRole)
    setStep(1)
    setMessage('')
    setRequestError('')
    setErrors({})
  }

  return (
    <div className="container auth-shell">
      <div className="auth-card auth-card-register">
        <span className="eyebrow">REJOIGNEZ-NOUS</span>
        <h1>Créez votre compte.</h1>
        <p>Choisissez votre espace pour commencer.</p>
        <div className="role-choice">
          <button type="button" className={role === 'Développeur' ? 'selected' : ''} onClick={() => changeRole('Développeur')}><User/>Développeur</button>
          <button type="button" className={role === 'Organisation' ? 'selected' : ''} onClick={() => changeRole('Organisation')}><Building2/>Organisation</button>
        </div>

        {role === 'Développeur' ? (
          <>
            <div className="register-progress">Étape {step} sur 2 <span>{step === 1 ? 'Informations principales' : 'Profil complémentaire (facultatif)'}</span></div>
            {step === 1 ? (
              <form noValidate onSubmit={e => { e.preventDefault(); if (validateFields(requiredFieldsByRole[role])) { setStep(2); setMessage('') } }}>
                {renderField('Nom complet', 'fullName', 'Votre nom et prénom')}
                {renderField('Email', 'email', 'vous@exemple.com', 'email')}
                {renderField('Mot de passe', 'password', 'Votre mot de passe', 'password')}
                {renderField('Confirmer le mot de passe', 'passwordConfirmation', 'Confirmez votre mot de passe', 'password')}
                {renderField('Date de naissance', 'birthDate', '', 'date')}
                {renderPhone()}
                {renderTechnologies()}
                <button className="btn btn-primary full-width">Suivant</button>
              </form>
            ) : (
              <form noValidate onSubmit={finishRegistration}>
                {renderField('Bio', 'bio', 'Présentez-vous en quelques mots')}
                {renderField('Niveau d’étude', 'education', 'Ex. Licence, Master, autodidacte')}
                <label>Expériences<textarea value={form.experience || ''} onChange={e => updateField('experience', e.target.value)} placeholder="Décrivez vos expériences professionnelles" maxLength={2000} aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? 'experience-error' : undefined}/>{errors.experience && <span className="field-error" id="experience-error" role="alert">{errors.experience}</span>}</label>
                <label>CV<input type="file" accept=".pdf,.doc,.docx" onChange={e => updateField('cv', e.target.files[0] || '')} aria-invalid={Boolean(errors.cv)} aria-describedby={errors.cv ? 'cv-error' : undefined}/>{errors.cv && <span className="field-error" id="cv-error" role="alert">{errors.cv}</span>}</label>
                {renderField('Lien LinkedIn', 'linkedin', 'https://linkedin.com/in/...', 'url')}
                {renderField('Lien GitHub', 'github', 'https://github.com/...', 'url')}
                {renderField('Frameworks préférés', 'frameworks', 'Ex. React, Spring Boot, Django')}
                <div className="register-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={15}/> Précédent</button>
                  <button className="btn btn-primary">Créer mon compte</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <form noValidate onSubmit={finishRegistration}>
            {renderField("Nom de l'organisation", 'organizationName', 'Nom de votre organisation')}
            {renderField('Email professionnel', 'email', 'contact@organisation.com', 'email')}
            {renderField('Mot de passe', 'password', 'Votre mot de passe', 'password')}
            {renderField('Confirmer le mot de passe', 'passwordConfirmation', 'Confirmez votre mot de passe', 'password')}
            {renderField('Site web', 'website', 'https://www.organisation.com', 'url')}
            {renderPhone()}
            <label>Secteur d'activité
              <select
                value={form.sector || ''}
                onChange={e => updateField('sector', e.target.value)}
                required
                aria-invalid={Boolean(errors.sector)}
                aria-describedby={errors.sector ? 'sector-error' : undefined}
              >
                <option value="">Sélectionner un secteur</option>
                <option value="Informatique">Informatique</option>
                <option value="Finance">Finance</option>
                <option value="Education">Éducation</option>
                <option value="Industrie">Industrie</option>
                <option value="Commerce">Commerce</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.sector && <span className="field-error" id="sector-error" role="alert">{errors.sector}</span>}
            </label>
            {renderField('Adresse', 'address', 'Adresse de l’organisation')}
            <label>Description de l’organisation
              <textarea
                value={form.description || ''}
                onChange={e => updateField('description', e.target.value)}
                placeholder="Présentez votre organisation..."
                maxLength={2000}
                required
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? 'description-error' : undefined}
              />
              {errors.description && <span className="field-error" id="description-error" role="alert">{errors.description}</span>}
            </label>
            <button className="btn btn-primary full-width" disabled={submitting}>
              {submitting ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          </form>
        )}

        {message && <p className="form-message">{message}</p>}
        {requestError && <p className="field-error" role="alert">{requestError}</p>}
        <p className="auth-switch">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  )
}
