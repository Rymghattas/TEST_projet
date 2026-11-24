
import { MapPin, Clock3, Bookmark, ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Tag from '../common/Tag'

export default function OfferCard({ offer }) {
  const [saved, setSaved] = useState(false)

  const formatDate = (date) => {
    if (!date) return 'Date non disponible'

    return new Date(date).toLocaleDateString('fr-FR')
  }

  return (
    <article className="offer-card">

      <div className="offer-card-top">
        <div className="company-logo">
          <BriefcaseBusiness size={22} />
        </div>

        <div className="offer-title-wrap">
          <Link
            to={`/offers/${offer.id_offer}`}
            className="offer-title"
          >
            {offer.title}
          </Link>

          <span className="company-name">
            {offer.organization?.name || 'Organisation'}
          </span>
        </div>

        <button
          className={`bookmark ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label="Ajouter aux favoris"
        >
          <Bookmark
            size={17}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="offer-meta">
        <span>
          <MapPin size={14} />
          {offer.city || 'Non précisée'}
        </span>

        <span>
          <BriefcaseBusiness size={14} />
          {offer.contract_type || 'Non précisé'}
        </span>

        <span>
          <Clock3 size={14} />
          {offer.study_level || 'Tous niveaux'}
        </span>
      </div>

      <p className="offer-description">
        {offer.description}
      </p>

      <div className="tag-row">
        {(offer.skills || []).map(skill => (
          <Tag key={skill.id_skill || skill.name}>
            {skill.name}
          </Tag>
        ))}
      </div>

      <div className="offer-card-bottom">
        <span className="posted">
          <Clock3 size={13} />
          {formatDate(offer.publication_date)}
        </span>

        <Link
          to={`/offers/${offer.id_offer}`}
          className="btn btn-dark btn-apply"
        >
          Voir l'offre
          <ArrowUpRight size={14} />
        </Link>
      </div>

    </article>
  )
}
