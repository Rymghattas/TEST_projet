import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Building2, ArrowLeft } from 'lucide-react'

const technologies = ['Python', 'Java', 'C', 'R', 'PHP', 'C++', 'JavaScript', 'TypeScript', 'C#', 'Go', 'Autre']

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  return <div className="container auth-shell"><div className="auth-card"><span className="eyebrow">BON RETOUR</span><h1>Connectez-vous.</h1><p>Retrouvez votre espace DevOnDeck.</p><form onSubmit={e => { e.preventDefault(); setMessage('Connexion de démonstration : le backend Spring Boot sera connecté ensuite.') }}><label>Email<div className="input-wrap"><Mail/><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com"/></div></label><label>Mot de passe<div className="input-wrap"><Lock/><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Votre mot de passe"/></div></label><Link className="auth-forgot-link" to="/forgot-password">Mot de passe oublié ?</Link><button className="btn btn-primary full-width">Se connecter</button></form>{message && <p className="form-message">{message}</p>}<p className="auth-switch">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p></div></div>
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
  const [role, setRole] = useState('Développeur')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({})

  const updateField = (name, value) => {
    setForm(current => ({ ...current, [name]: value }))
  }

  const renderField = (label, name, placeholder, type = 'text') => (
    <label key={name}>{label}<input type={type} value={form[name] || ''} onChange={e => updateField(name, e.target.value)} placeholder={placeholder}/></label>
  )

  const renderTechnologies = () => (
    <fieldset className="preference-field">
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
    </fieldset>
  )

  const renderPhone = () => (
    <label>Numéro de téléphone
      <div className="phone-input"><span>+216</span><input type="tel" value={form.phone || ''} onChange={e => updateField('phone', e.target.value)} placeholder="12 345 678"/></div>
    </label>
  )

  const finishRegistration = e => {
    e.preventDefault()
    setMessage('Inscription de démonstration. La création réelle du compte sera gérée par Spring Boot.')
  }

  const changeRole = selectedRole => {
    setRole(selectedRole)
    setStep(1)
    setMessage('')
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
              <form onSubmit={e => { e.preventDefault(); setStep(2); setMessage('') }}>
                {renderField('Nom complet', 'fullName', 'Votre nom et prénom')}
                {renderField('Email', 'email', 'vous@exemple.com')}
                {renderField('Mot de passe', 'password', 'Votre mot de passe', 'password')}
                {renderField('Confirmer le mot de passe', 'passwordConfirmation', 'Confirmez votre mot de passe', 'password')}
                {renderField('Date de naissance', 'birthDate', '', 'date')}
                {renderPhone()}
                {renderTechnologies()}
                <button className="btn btn-primary full-width">Suivant</button>
              </form>
            ) : (
              <form onSubmit={finishRegistration}>
                {renderField('Bio', 'bio', 'Présentez-vous en quelques mots')}
                {renderField('Niveau d’étude', 'education', 'Ex. Licence, Master, autodidacte')}
                <label>Expériences<textarea value={form.experience || ''} onChange={e => updateField('experience', e.target.value)} placeholder="Décrivez vos expériences professionnelles"/></label>
                <label>CV<input type="file" accept=".pdf,.doc,.docx"/></label>
                {renderField('Lien LinkedIn', 'linkedin', 'https://linkedin.com/in/...')}
                {renderField('Lien GitHub', 'github', 'https://github.com/...')}
                {renderField('Frameworks préférés', 'frameworks', 'Ex. React, Spring Boot, Django')}
                <div className="register-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={15}/> Précédent</button>
                  <button className="btn btn-primary">Créer mon compte</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <form onSubmit={finishRegistration}>
            {renderField("Nom de l'organisation", 'organizationName', 'Nom de votre organisation')}
            {renderField('Email professionnel', 'email', 'contact@organisation.com')}
            {renderField('Mot de passe', 'password', 'Votre mot de passe', 'password')}
            {renderField('Confirmer le mot de passe', 'passwordConfirmation', 'Confirmez votre mot de passe', 'password')}
            {renderField('Site web', 'website', 'https://www.organisation.com')}
            <div className="form-grid">
              {renderField('Ville', 'city', 'Ex. Tunis')}
              {renderField('Pays', 'country', 'Ex. Tunisie')}
            </div>
            {renderPhone()}
            {renderField("Secteur d'activité", 'sector', 'Ex. Technologies, finance')}
            {renderField("Taille de l'organisation", 'organizationSize', 'Ex. 10–50 employés')}
            <label>Présentation de l’organisation<textarea value={form.description || ''} onChange={e => updateField('description', e.target.value)} placeholder="Présentez votre organisation"/></label>
            <button className="btn btn-primary full-width">Créer mon compte</button>
          </form>
        )}

        {message && <p className="form-message">{message}</p>}
        <p className="auth-switch">Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  )
}
