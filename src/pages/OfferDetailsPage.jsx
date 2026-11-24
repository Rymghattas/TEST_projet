
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  Building2
} from 'lucide-react'
import { offers } from '../data/mockData'
import Tag from '../components/common/Tag'

export default function OfferDetailsPage() {
  const { id } = useParams()
  const offer = offers.find(o => o.id === Number(id))

  const [application, setApplication] = useState(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [error, setError] = useState('')

    function handleSubmit(e) {
      e.preventDefault()

      if (!coverLetter.trim()) {
        setError('Veuillez écrire votre lettre de motivation.')
        return
      }
      const newApplication = {
        id_offer: offer.id,
        cover_letter: coverLetter,
        status: 'En attente',
        application_date: new Date().toISOString()
      }

      setApplication(newApplication)
      console.log('Nouvelle candidature :', newApplication)

      setError('')
    }
  if (!offer) {
    return (
      <div className="container page-shell empty-state">
        Offre introuvable.
        <Link to="/offers">Retour aux offres</Link>
      </div>
    )
  }

  return (
    <div className="container page-shell detail-layout">

      <div>
        <Link to="/offers" className="back-link">
          <ArrowLeft size={16} /> Retour aux offres
        </Link>

        <article className="detail-card">
          <div className="detail-heading">
            <div className="company-logo large-logo">
              {offer.logo}
            </div>

            <div>
              <span className="eyebrow">{offer.company}</span>
              <h1>{offer.title}</h1>

              <div className="offer-meta">
                <span><MapPin size={14}/>{offer.location}</span>
                <span><BriefcaseBusiness size={14}/>{offer.contract}</span>
                <span><Clock3 size={14}/>{offer.level}</span>
              </div>
            </div>
          </div>

          <hr />

          <h2>Description du poste</h2>
          <p>{offer.description}</p>

          <p>
            Vous rejoindrez une équipe dynamique et participerez
            à des projets concrets. Cette offre est une opportunité
            de développer vos compétences dans un environnement collaboratif.
          </p>

          <h2>Compétences recherchées</h2>

          <div className="tag-row">
            {offer.tags.map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <h2>À propos de l'organisation</h2>
          <p>
            <Building2 size={15} className="inline-icon" />
            {offer.company} accompagne ses équipes dans la réalisation
            de produits numériques innovants.
          </p>
        </article>
      </div>

      <aside className="apply-card">
        <span className="eyebrow">CANDIDATURE</span>

        <h3>Cette opportunité vous intéresse ?</h3>

      {!application ? (
          <form onSubmit={handleSubmit}>
            <p>Envoyez votre lettre de motivation.</p>

           <textarea
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
            placeholder="Écrivez votre lettre de motivation..."
            rows={6}
            required
          />

          <p className="character-count">
            {coverLetter.length} caractères
          </p>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary full-width"
            disabled={!coverLetter.trim()}
          >
            Postuler
          </button>
          </form>
        ) : (
          <div className="success-note">
            <CheckCircle2 size={17} />
            Candidature enregistrée !
            <br />
           <strong>Statut : {application.status}</strong>
          </div>
        )}

        <div className="apply-note">
          En postulant, votre profil sera transmis à l'organisation.
        </div>
      </aside>

    </div>
  )
}
