import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, User, Building2 } from 'lucide-react'

export function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  return <div className="container auth-shell"><div className="auth-card"><span className="eyebrow">BON RETOUR</span><h1>Connectez-vous.</h1><p>Retrouvez votre espace DevOnDeck.</p><form onSubmit={e=>{e.preventDefault();setMessage('Connexion de démonstration : le backend Spring Boot sera connecté ensuite.')}}><label>Email<div className="input-wrap"><Mail/><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.com"/></div></label><label>Mot de passe<div className="input-wrap"><Lock/><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Votre mot de passe"/></div></label><button className="btn btn-primary full-width">Se connecter</button></form>{message&&<p className="form-message">{message}</p>}<p className="auth-switch">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p></div></div>
}

export function RegisterPage() {
  const [role,setRole]=useState('Développeur')
  const [message,setMessage]=useState('')
  return <div className="container auth-shell"><div className="auth-card"><span className="eyebrow">REJOIGNEZ-NOUS</span><h1>Créez votre compte.</h1><p>Choisissez votre espace pour commencer.</p><div className="role-choice"><button className={role==='Développeur'?'selected':''} onClick={()=>setRole('Développeur')}><User/>Développeur</button><button className={role==='Organisation'?'selected':''} onClick={()=>setRole('Organisation')}><Building2/>Organisation</button></div><form onSubmit={e=>{e.preventDefault();setMessage('Inscription de démonstration. La création réelle du compte sera gérée par Spring Boot.')}}><label>Nom complet / Organisation<input required placeholder="Votre nom"/></label><label>Email<input type="email" required placeholder="vous@exemple.com"/></label><label>Mot de passe<input type="password" required minLength="6" placeholder="6 caractères minimum"/></label><button className="btn btn-primary full-width">Créer mon compte</button></form>{message&&<p className="form-message">{message}</p>}<p className="auth-switch">Déjà inscrit ? <Link to="/login">Se connecter</Link></p></div></div>
}
