import { MapPin, Clock3, Bookmark, ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'
import Tag from '../common/Tag'
import { useState } from 'react'

export default function OfferCard({ offer }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="offer-card">
      <div className="offer-card-top">
        <div className="company-logo">{offer.logo}</div>
        <div className="offer-title-wrap">
          <Link to={`/offers/${offer.id}`} className="offer-title">{offer.title}</Link>
          <span className="company-name">{offer.company}</span>
        </div>
        {offer.urgent && <span className="urgent">Urgent</span>}
        <button className={`bookmark ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)} aria-label="Ajouter aux favoris"><Bookmark size={17} fill={saved ? 'currentColor' : 'none'}/></button>
      </div>
      <div className="offer-meta">
        <span><MapPin size={14}/>{offer.location}</span>
        <span><BriefcaseBusiness size={14}/>{offer.contract}</span>
        <span><Clock3 size={14}/>{offer.level}</span>
      </div>
      <p className="offer-description">{offer.description}</p>
      <div className="tag-row">{offer.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
      <div className="offer-card-bottom">
        <span className="posted"><Clock3 size={13}/>{offer.posted}</span>
        <Link to={`/offers/${offer.id}`} className="btn btn-dark btn-apply">Voir l'offre <ArrowUpRight size={14}/></Link>
      </div>
    </article>
  )
}
