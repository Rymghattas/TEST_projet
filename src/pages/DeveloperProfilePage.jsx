import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, Github, Linkedin } from 'lucide-react'
import { developers } from '../data/mockData'
import Tag from '../components/common/Tag'

export default function DeveloperProfilePage() {
  const { id } = useParams()
  const dev = developers.find(d=>d.id===Number(id))
  if (!dev) return <div className="container page-shell empty-state">Profil introuvable. <Link to="/developers">Retour</Link></div>
  return <div className="container page-shell narrow-page"><Link to="/developers" className="back-link"><ArrowLeft size={16}/> Retour aux développeurs</Link><section className="profile-panel"><div className="avatar avatar-xl">{dev.initials}</div><span className="rating"><Star size={14} fill="currentColor"/> {dev.rating}</span><h1>{dev.name}</h1><h3>{dev.role}</h3><p><MapPin size={15}/> {dev.city} · {dev.level}</p><p className="profile-bio">{dev.bio}</p><h3>Compétences</h3><div className="tag-row">{dev.skills.map(s=><Tag key={s}>{s}</Tag>)}</div><div className="profile-social"><a href="#profile"><Linkedin/> LinkedIn</a><a href="#profile"><Github/> GitHub</a></div></section></div>
}
