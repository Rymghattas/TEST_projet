
import { Link } from 'react-router-dom'
import {
  UserRound,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  FileText,
  Linkedin,
  Github,
  ArrowLeft,
  Download
} from 'lucide-react'

import { currentDeveloper } from '../data/mockData'
import { getCvFile } from './AuthPages'

export default function MyProfilePage() {
  const dev = (() => {
    try {
      return JSON.parse(localStorage.getItem('devondeck_profile')) || currentDeveloper
    } catch {
      return currentDeveloper
    }
  })()

  const initials = (dev.fullName || dev.name || '')
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Télécharger le vrai fichier CV
  const handleDownloadCV = async () => {
    try {
      if (!dev.cvId) {
        alert('Aucun CV disponible. Veuillez ajouter votre CV.')
        return
      }

      const file = await getCvFile(dev.cvId)

      if (!file) {
        alert('Le fichier CV est introuvable. Veuillez ajouter à nouveau votre CV.')
        return
      }

      const fileUrl = URL.createObjectURL(file)
      const link = document.createElement('a')

      link.href = fileUrl
      link.download = dev.cv || 'CV'
      document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)

    } catch (error) {
      console.error('Erreur de téléchargement du CV :', error)
      alert('Impossible de télécharger le CV.')
    }
  }

  return (
    <div className="container page-shell my-profile-page">

      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        Retour à l'accueil
      </Link>

      {/* En-tête du profil */}
      <section className="my-profile-header">

        <div className="avatar avatar-xl">
          {initials}
        </div>

        <div className="my-profile-heading">
          <span className="eyebrow">MON ESPACE PERSONNEL</span>
          <h1>{dev.fullName || dev.name}</h1>
          <p className="my-profile-role">{dev.role}</p>
        </div>

      </section>

      {/* Informations personnelles */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <UserRound size={19} />
          <h2>Informations personnelles</h2>
        </div>

        <div className="my-profile-grid">

          <div className="my-profile-info">
            <Mail />
            <div>
              <span>Email</span>
              <strong>{dev.email}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Phone />
            <div>
              <span>Téléphone</span>
              <strong>{dev.phone}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Calendar />
            <div>
              <span>Date de naissance</span>
              <strong>
                {dev.birthDate
                  ? new Date(dev.birthDate + 'T00:00:00').toLocaleDateString('fr-FR')
                  : 'Non renseignée'}
              </strong>
            </div>
          </div>

        </div>
      </section>

      {/* Présentation professionnelle */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <Briefcase size={19} />
          <h2>Présentation professionnelle</h2>
        </div>

        <p className="my-profile-bio">
          {dev.bio}
        </p>

        <div className="my-profile-info education-info">
          <GraduationCap />
          <div>
            <span>Niveau d'études</span>
            <strong>{dev.education || dev.level || 'Non renseigné'}</strong>
          </div>
        </div>

      </section>

      {/* Expériences */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <Briefcase size={19} />
          <h2>Expériences professionnelles</h2>
        </div>

        {dev.experience?.length > 0 ? (
          dev.experience.map((exp, index) => (
            <div className="experience-item" key={index}>
              <h3>{exp.title}</h3>
              <strong>{exp.company}</strong>
              <span>{exp.period}</span>
              <p>{exp.description}</p>
            </div>
          ))
        ) : (
          <p>Aucune expérience renseignée.</p>
        )}

      </section>

      {/* Compétences */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <Code2 size={19} />
          <h2>Compétences</h2>
        </div>

        <h3 className="my-profile-subtitle">
          Langages de programmation
        </h3>

        <div className="tag-row">
          {(dev.languages || dev.skills || []).map(language => (
            <span className="tag" key={language}>
              {language}
            </span>
          ))}
        </div>

        <h3 className="my-profile-subtitle">
          Frameworks préférés
        </h3>

        <div className="tag-row">
          {(dev.frameworks || []).map(framework => (
            <span className="tag" key={framework}>
              {framework}
            </span>
          ))}
        </div>

      </section>

      {/* CV et réseaux sociaux */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <FileText size={19} />
          <h2>Documents et réseaux sociaux</h2>
        </div>

        <div className="my-profile-links">

          {/* CV téléchargeable */}
          <div className="my-profile-document">
            <FileText size={21} />

            <div>
              <button
                type="button"
                onClick={handleDownloadCV}
                className="cv-download-link"
                disabled={!dev.cv}
              >
                <strong>{dev.cv || 'Aucun CV ajouté'}</strong>
              </button>

              <span>CV du développeur</span>
            </div>

            <button
              type="button"
              onClick={handleDownloadCV}
              aria-label="Télécharger le CV"
              className="cv-download-icon"
              disabled={!dev.cv}
            >
              <Download size={18} />
            </button>
          </div>

          {/* LinkedIn */}
          {dev.linkedin && (
            <a
              href={dev.linkedin.startsWith('http')
                ? dev.linkedin
                : `https://${dev.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-social-link"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          )}

          {/* GitHub */}
          {dev.github && (
            <a
              href={dev.github.startsWith('http')
                ? dev.github
                : `https://${dev.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-social-link"
            >
              <Github size={18} />
              GitHub
            </a>
          )}

        </div>
      </section>

    </div>
  )
}
