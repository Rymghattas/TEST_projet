import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { organizations } from '../data/mockData'

export default function ProfilPublicOrganisationPage() {
  const { id } = useParams()
  const organization = organizations.find(item => item.id === Number(id))

  if (!organization) {
    return (
      <div className="container page-shell empty-state">
        <h2>Organisation introuvable</h2>
        <Link to="/offers">Retour aux opportunités</Link>
      </div>
    )
  }

  return (
    <div className="container page-shell narrow-page">
      <Link to="/offers" className="back-link"><ArrowLeft size={16}/> Retour aux opportunités</Link>
      <section className="profile-panel">
        <div className="avatar avatar-xl"><Building2 size={36}/></div>
        <span className="eyebrow">PROFIL ORGANISATION</span>
        <h1>{organization.name}</h1>
        <h3>{organization.sector}</h3>
        <p><MapPin size={15}/> {organization.address}</p>
        <p className="profile-bio">{organization.description}</p>
        <div className="profile-social">
          <a href={`mailto:${organization.email}`}><Mail/> Email</a>
          <a href={`tel:${organization.phone.replace(/\s/g, '')}`}><Phone/> Téléphone</a>
          <a href={organization.website} target="_blank" rel="noreferrer"><Globe/> Site web</a>
        </div>
      </section>
    </div>
  )
}
