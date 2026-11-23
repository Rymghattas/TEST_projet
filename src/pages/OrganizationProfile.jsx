
import { Link } from 'react-router-dom'
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Users,
  FileText,
  ArrowLeft
} from 'lucide-react'

export default function OrganizationProfile() {
  const organization = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('devondeck_organization_profile')
      ) || JSON.parse(
        localStorage.getItem('devondeck_current_user')
      ) || {}
    } catch {
      return {}
    }
  })()

  const initials = (organization.organizationName || organization.name || '')
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="container page-shell my-profile-page">

      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        Retour à l'accueil
      </Link>

      {/* En-tête du profil */}
      <section className="my-profile-header">

        <div className="avatar avatar-xl">
          {initials || <Building2 />}
        </div>

        <div className="my-profile-heading">
          <span className="eyebrow">MON ESPACE ORGANISATION</span>

          <h1>
            {organization.organizationName || organization.name || 'Mon organisation'}
          </h1>

          <p className="my-profile-role">
            Organisation
          </p>
        </div>

      </section>

      {/* Informations générales */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <Building2 size={19} />
          <h2>Informations générales</h2>
        </div>

        <div className="my-profile-grid">

          <div className="my-profile-info">
            <Mail />
            <div>
              <span>Email professionnel</span>
              <strong>{organization.email || 'Non renseigné'}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Phone />
            <div>
              <span>Téléphone</span>
              <strong>{organization.phone || 'Non renseigné'}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Globe />
            <div>
              <span>Site web</span>

              {organization.website ? (
                <a
                  href={organization.website.startsWith('http')
                    ? organization.website
                    : `https://${organization.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {organization.website}
                </a>
              ) : (
                <strong>Non renseigné</strong>
              )}
            </div>
          </div>

          <div className="my-profile-info">
            <MapPin />
            <div>
              <span>Ville</span>
              <strong>{organization.city || 'Non renseignée'}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Globe />
            <div>
              <span>Pays</span>
              <strong>{organization.country || 'Non renseigné'}</strong>
            </div>
          </div>

        </div>
      </section>

      {/* Présentation de l'organisation */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <Briefcase size={19} />
          <h2>Présentation de l'organisation</h2>
        </div>

        <p className="my-profile-bio">
          {organization.description || 'Aucune présentation renseignée.'}
        </p>

      </section>

      {/* Informations professionnelles */}
      <section className="my-profile-card">

        <div className="my-profile-section-title">
          <FileText size={19} />
          <h2>Informations professionnelles</h2>
        </div>

        <div className="my-profile-grid">

          <div className="my-profile-info">
            <Briefcase />
            <div>
              <span>Secteur d'activité</span>
              <strong>{organization.sector || 'Non renseigné'}</strong>
            </div>
          </div>

          <div className="my-profile-info">
            <Users />
            <div>
              <span>Taille de l'organisation</span>
              <strong>{organization.organizationSize || 'Non renseignée'}</strong>
            </div>
          </div>

        </div>

      </section>

    </div>
  )
}
