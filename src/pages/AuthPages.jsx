import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Building2, ArrowLeft } from 'lucide-react'
import { createOrganization } from '../services/organisationService'

// ======================================
// SAUVEGARDE DU CV DANS INDEXEDDB
// ======================================

const openCvDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DevOnDeckDB', 1)

    request.onupgradeneeded = event => {
      const db = event.target.result

      if (!db.objectStoreNames.contains('cvFiles')) {
        db.createObjectStore('cvFiles')
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const saveCvFile = async (id, file) => {
  const db = await openCvDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('cvFiles', 'readwrite')
    const store = transaction.objectStore('cvFiles')
    const request = store.put(file, id)

    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)

    transaction.oncomplete = () => db.close()
  })
}

export const getCvFile = async id => {
  const db = await openCvDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('cvFiles', 'readonly')
    const store = transaction.objectStore('cvFiles')
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)

    transaction.oncomplete = () => db.close()
  })
}

// ======================================
// TECHNOLOGIES
// ======================================

const technologies = [
  'Python', 'Java', 'C', 'R', 'PHP', 'C++',
  'JavaScript', 'TypeScript', 'C#', 'Go', 'Autre'
]

const requiredFieldsByRole = {
  Développeur: ['fullName', 'email', 'password', 'passwordConfirmation', 'birthDate', 'phone', 'technologies'],
  Organisation: ['organizationName', 'email', 'password', 'passwordConfirmation', 'phone', 'sector', 'address', 'description'],
}

// ======================================
// VALIDATION DES CHAMPS
// ======================================

function validateRegistrationField(name, value, form, role) {
  const isRequired = requiredFieldsByRole[role].includes(name)

  const normalizedValue =
    typeof value === 'string' ? value.trim() : value

  if (
    isRequired &&
    (Array.isArray(value) ? value.length === 0 : !normalizedValue)
  ) {
    return 'Ce champ est obligatoire.'
  }

  if (!normalizedValue) return ''

  if (name === 'fullName' || name === 'organizationName') {
    return normalizedValue.length < 2
      ? 'Saisissez au moins 2 caractères.'
      : ''
  }

  if (name === 'education') {
    if (normalizedValue.length < 2) {
      return 'Saisissez au moins 2 caractères.'
    }

    return normalizedValue.length <= 100
      ? ''
      : 'Limitez le niveau d’étude à 100 caractères.'
  }

  if (name === 'experience') {
    if (normalizedValue.length < 10) {
      return 'Décrivez votre expérience en au moins 10 caractères.'
    }

    return normalizedValue.length <= 2000
      ? ''
      : 'Limitez la description à 2 000 caractères.'
  }
  if (name === 'description') {
    if (normalizedValue.length < 10) return 'La description doit contenir au moins 10 caractères.'
    return normalizedValue.length <= 2000 ? '' : 'Limitez la description à 2 000 caractères.'
  }
  if (name === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
      ? ''
      : 'Saisissez une adresse e-mail valide.'
  }

  if (name === 'password') {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
      ? ''
      : 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.'
  }

  if (name === 'passwordConfirmation') {
    return value === form.password
      ? ''
      : 'Les mots de passe ne correspondent pas.'
  }

  if (name === 'birthDate') {
    const today = new Date()

    const localToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    return value <= localToday
      ? ''
      : 'La date de naissance ne peut pas être dans le futur.'
  }

  if (name === 'phone') {
    return /^\d{8}$/.test(value.replace(/[\s().-]/g, ''))
      ? ''
      : 'Saisissez un numéro tunisien de 8 chiffres.'
  }

  if (['website', 'linkedin', 'github'].includes(name)) {
    try {
      const url = new URL(value)

      return ['http:', 'https:'].includes(url.protocol)
        ? ''
        : 'Le lien doit commencer par http:// ou https://.'
    } catch {
      return 'Saisissez une URL valide (ex. https://exemple.com).'
    }
  }

  if (name === 'cv') {
    const validExtension = /\.(pdf|doc|docx)$/i.test(value.name || '')

    if (!validExtension) {
      return 'Le CV doit être au format PDF, DOC ou DOCX.'
    }

    if (value.size > 5 * 1024 * 1024) {
      return 'Le CV ne doit pas dépasser 5 Mo.'
    }
  }

  return ''
}

// ======================================
// PAGE CONNEXION
// ======================================

export function LoginPage() {
  const navigate = useNavigate()

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
    setMessage('')

    if (Object.keys(nextErrors).length > 0) return

    const savedAccount = JSON.parse(
      localStorage.getItem('devondeck_account') || 'null'
    )

    if (
      !savedAccount ||
      savedAccount.email.toLowerCase() !== email.trim().toLowerCase() ||
      savedAccount.password !== password
    ) {
      setMessage('Email ou mot de passe incorrect.')
      return
    }

   localStorage.setItem(
  'devondeck_current_user',
  JSON.stringify(savedAccount.profile)
)

if (savedAccount.role === 'Organisation') {
  navigate('/organization/profile')
} else {
  navigate('/profile')
}
  }

  return (
    <div className="container auth-shell">
      <div className="auth-card">
        <span className="eyebrow">BON RETOUR</span>

        <h1>Connectez-vous.</h1>

        <p>Retrouvez votre espace DevOnDeck.</p>

        <form noValidate onSubmit={handleLogin}>
          <label>
            Email

            <div className="input-wrap">
              <Mail />

              <input
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setErrors(current => ({ ...current, email: '' }))
                  setMessage('')
                }}
                placeholder="vous@exemple.com"
                aria-invalid={Boolean(errors.email)}
              />
            </div>

            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </label>

          <label>
            Mot de passe

            <div className="input-wrap">
              <Lock />

              <input
                type="password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setErrors(current => ({ ...current, password: '' }))
                  setMessage('')
                }}
                placeholder="Votre mot de passe"
                aria-invalid={Boolean(errors.password)}
              />
            </div>

            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </label>

          <Link className="auth-forgot-link" to="/forgot-password">
            Mot de passe oublié ?
          </Link>

          <button className="btn btn-primary full-width">
            Se connecter
          </button>
        </form>

        {message && (
          <p className="field-error">{message}</p>
        )}

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}

// ======================================
// MOT DE PASSE OUBLIE
// ======================================

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="container auth-shell">
      <div className="auth-card">
        <span className="eyebrow">RÉINITIALISATION</span>

        <h1>Mot de passe oublié ?</h1>

        <p>Indiquez l’adresse e-mail associée à votre compte.</p>

        <form
          onSubmit={e => {
            e.preventDefault()

            setMessage(
              'Demande de démonstration enregistrée. L’envoi réel du lien sera connecté ensuite.'
            )
          }}
        >
          <label>
            Email

            <div className="input-wrap">
              <Mail />

              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
              />
            </div>
          </label>

          <button className="btn btn-primary full-width">
            Envoyer le lien de réinitialisation
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="auth-switch">
          <Link to="/login">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  )
}

// ======================================
// PAGE INSCRIPTION
// ======================================

export function RegisterPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Développeur')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  // Mise à jour des champs
  const updateField = (name, value) => {
    const nextForm = { ...form, [name]: value }

    setForm(nextForm)

    if (errors[name]) {
      setErrors(current => ({
        ...current,
        [name]: validateRegistrationField(
          name,
          value,
          nextForm,
          role
        )
      }))
    }
  }

  // Vérification des champs
  const validateFields = names => {
    const nextErrors = {}

    names.forEach(name => {
      const error = validateRegistrationField(
        name,
        form[name],
        form,
        role
      )

      if (error) {
        nextErrors[name] = error
      }
    })

    setErrors(current => ({
      ...current,
      ...nextErrors,
      ...Object.fromEntries(
        names
          .filter(name => !nextErrors[name])
          .map(name => [name, ''])
      )
    }))

    return Object.keys(nextErrors).length === 0
  }

  // Affichage des champs
  const renderField = (label, name, placeholder, type = 'text') => {
    const errorId = `${name}-error`

    return (
      <label key={name}>
        {label}

        <input
          type={type}
          value={form[name] || ''}
          onChange={e => updateField(name, e.target.value)}
          placeholder={placeholder}
          required={requiredFieldsByRole[role].includes(name)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId : undefined}
        />

        {errors[name] && (
          <span className="field-error" id={errorId} role="alert">
            {errors[name]}
          </span>
        )}
      </label>
    )
  }

  // Technologies préférées
  const renderTechnologies = () => (
    <fieldset
      className="preference-field"
      aria-invalid={Boolean(errors.technologies)}
    >
      <legend>Langages de programmation préférés</legend>

      <div className="preference-options">
        {technologies.map(technology => (
          <label className="checkbox-option" key={technology}>
            <input
              type="checkbox"
              checked={(form.technologies || []).includes(technology)}
              onChange={e => {
                const selected = form.technologies || []

                updateField(
                  'technologies',
                  e.target.checked
                    ? [...selected, technology]
                    : selected.filter(item => item !== technology)
                )
              }}
            />

            {technology}
          </label>
        ))}
      </div>

      {errors.technologies && (
        <span className="field-error">{errors.technologies}</span>
      )}
    </fieldset>
  )

  // Téléphone
  const renderPhone = () => (
    <label>
      Numéro de téléphone

      <div className="phone-input">
        <span>+216</span>

        <input
          type="tel"
          value={form.phone || ''}
          onChange={e => updateField('phone', e.target.value)}
          placeholder="12 345 678"
          required={requiredFieldsByRole[role].includes('phone')}
          aria-invalid={Boolean(errors.phone)}
        />
      </div>

      {errors.phone && (
        <span className="field-error">{errors.phone}</span>
      )}
    </label>
  )

  // Création du compte et sauvegarde des informations
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

    // Compte développeur (sauvegarde locale pour MyProfilePage)
    const profileId = Date.now()

    const developerProfile = {
      id: profileId,

      fullName: form.fullName,
      name: form.fullName,

      initials: form.fullName
        .trim()
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .toUpperCase(),

      email: form.email,
      birthDate: form.birthDate,
      phone: '+216 ' + form.phone,

      city: form.city || 'Non renseignée',

      role: 'Développeur',

      level: form.education || 'Non renseigné',
      education: form.education || 'Non renseigné',

      bio: form.bio || 'Aucune présentation renseignée.',

      experience: form.experience
        ? [{
            title: 'Expérience professionnelle',
            company: 'Non précisé',
            period: 'Non précisée',
            description: form.experience
          }]
        : [],

      languages: form.technologies || [],
      skills: form.technologies || [],

      frameworks: form.frameworks
        ? form.frameworks
            .split(',')
            .map(item => item.trim())
            .filter(Boolean)
        : [],

      cv: form.cv ? form.cv.name : '',
      cvId: form.cv ? profileId : null,

      linkedin: form.linkedin || '',
      github: form.github || ''
    }

    // Sauvegarder le vrai fichier CV dans IndexedDB
    try {
      if (form.cv) {
        await saveCvFile(profileId, form.cv)
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du CV :', error)
      setMessage('Impossible de sauvegarder le CV. Réessayez.')
      return
    }

    // Informations du compte pour la connexion
    const account = {
      email: form.email.trim(),
      password: form.password,
      role: 'Développeur',
      profile: developerProfile
    }

    // Sauvegarder le compte
    localStorage.setItem(
      'devondeck_account',
      JSON.stringify(account)
    )

    // Sauvegarder les informations du profil
    localStorage.setItem(
      'devondeck_profile',
      JSON.stringify(developerProfile)
    )

    // Ouvrir directement le profil
    localStorage.setItem(
      'devondeck_current_user',
      JSON.stringify(developerProfile)
    )

    navigate('/profile')
  }

  // Changement de rôle
  const changeRole = selectedRole => {
    setRole(selectedRole)
    setStep(1)
    setMessage('')
    setRequestError('')
    setErrors({})
    setForm({})
  }

  return (
    <div className="container auth-shell">
      <div className="auth-card auth-card-register">

        <span className="eyebrow">REJOIGNEZ-NOUS</span>

        <h1>Créez votre compte.</h1>

        <p>Choisissez votre espace pour commencer.</p>

        <div className="role-choice">
          <button
            type="button"
            className={role === 'Développeur' ? 'selected' : ''}
            onClick={() => changeRole('Développeur')}
          >
            <User /> Développeur
          </button>

          <button
            type="button"
            className={role === 'Organisation' ? 'selected' : ''}
            onClick={() => changeRole('Organisation')}
          >
            <Building2 /> Organisation
          </button>
        </div>

        {role === 'Développeur' ? (
          <>
            <div className="register-progress">
              Étape {step} sur 2

              <span>
                {step === 1
                  ? 'Informations principales'
                  : 'Profil complémentaire (facultatif)'}
              </span>
            </div>

            {step === 1 ? (
              <form
                noValidate
                onSubmit={e => {
                  e.preventDefault()

                  if (validateFields(requiredFieldsByRole[role])) {
                    setStep(2)
                    setMessage('')
                  }
                }}
              >
                {renderField(
                  'Nom complet',
                  'fullName',
                  'Votre nom et prénom'
                )}

                {renderField(
                  'Email',
                  'email',
                  'vous@exemple.com',
                  'email'
                )}

                {renderField(
                  'Mot de passe',
                  'password',
                  'Votre mot de passe',
                  'password'
                )}

                {renderField(
                  'Confirmer le mot de passe',
                  'passwordConfirmation',
                  'Confirmez votre mot de passe',
                  'password'
                )}

                {renderField(
                  'Date de naissance',
                  'birthDate',
                  '',
                  'date'
                )}

                {renderPhone()}

                {renderTechnologies()}

                <button className="btn btn-primary full-width">
                  Suivant
                </button>
              </form>
            ) : (
              <form noValidate onSubmit={finishRegistration}>

                {renderField(
                  'Bio',
                  'bio',
                  'Présentez-vous en quelques mots'
                )}

                {renderField(
                  'Niveau d’étude',
                  'education',
                  'Ex. Licence, Master, autodidacte'
                )}

                <label>
                  Expériences

                  <textarea
                    value={form.experience || ''}
                    onChange={e => updateField('experience', e.target.value)}
                    placeholder="Décrivez vos expériences professionnelles"
                    maxLength={2000}
                    aria-invalid={Boolean(errors.experience)}
                  />

                  {errors.experience && (
                    <span className="field-error">
                      {errors.experience}
                    </span>
                  )}
                </label>

                <label>
                  CV

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => updateField('cv', e.target.files[0] || '')}
                    aria-invalid={Boolean(errors.cv)}
                  />

                  {errors.cv && (
                    <span className="field-error">{errors.cv}</span>
                  )}
                </label>

                {renderField(
                  'Lien LinkedIn',
                  'linkedin',
                  'https://linkedin.com/in/...',
                  'url'
                )}

                {renderField(
                  'Lien GitHub',
                  'github',
                  'https://github.com/...',
                  'url'
                )}

                {renderField(
                  'Frameworks préférés',
                  'frameworks',
                  'Ex. React, Spring Boot, Django'
                )}

                <div className="register-actions">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={15} /> Précédent
                  </button>

                  <button className="btn btn-primary">
                    Créer mon compte
                  </button>

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