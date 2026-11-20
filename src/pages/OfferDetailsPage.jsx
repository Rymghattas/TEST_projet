import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, MapPin, BriefcaseBusiness, Clock3, CheckCircle2, Building2 } from 'lucide-react'
import { offers } from '../data/mockData'
import Tag from '../components/common/Tag'

export default function OfferDetailsPage() {
  const { id } = useParams()
  const offer = offers.find(o => o.id === Number(id))
  const [applied, setApplied] = useState(false)
  if (!offer) return <div className="container page-shell empty-state">Offre introuvable. <Link to="/offers">Retour aux offres</Link></div>
  return <div className="container page-shell detail-layout"><div><Link to="/offers" className="back-link"><ArrowLeft size={16}/> Retour aux offres</Link><article className="detail-card"><div className="detail-heading"><div className="company-logo large-logo">{offer.logo}</div><div><span className="eyebrow">{offer.company}</span><h1>{offer.title}</h1><div className="offer-meta"><span><MapPin size={14}/>{offer.location}</span><span><BriefcaseBusiness size={14}/>{offer.contract}</span><span><Clock3 size={14}/>{offer.level}</span></div></div></div><hr/><h2>Description du poste</h2><p>{offer.description}</p><p>Vous rejoindrez une équipe dynamique et participerez à des projets concrets. Cette offre est une opportunité de développer vos compétences dans un environnement collaboratif.</p><h2>Compétences recherchées</h2><div className="tag-row">{offer.tags.map(t=><Tag key={t}>{t}</Tag>)}</div><h2>À propos de l'organisation</h2><p><Building2 size={15} className="inline-icon"/> {offer.company} accompagne ses équipes dans la réalisation de produits numériques innovants.</p></article></div><aside className="apply-card"><span className="eyebrow">CANDIDATURE</span><h3>Cette opportunité vous intéresse ?</h3><p>Envoyez votre candidature en quelques instants.</p><button className="btn btn-primary full-width" onClick={()=>setApplied(true)} disabled={applied}>{applied ? <><CheckCircle2 size={17}/> Candidature envoyée</> : 'Postuler maintenant'}</button>{applied && <div className="success-note"><CheckCircle2 size={16}/> Statut : <strong>En attente</strong><br/><small>Démo locale : le statut réel sera géré par le backend.</small></div>}<div className="apply-note">En postulant, votre profil sera transmis à l'organisation.</div></aside></div>
}
