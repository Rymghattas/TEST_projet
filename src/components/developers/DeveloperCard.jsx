import { MapPin, Star, ArrowUpRight } from 'lucide-react'
import Tag from '../common/Tag'
import { Link } from 'react-router-dom'

export default function DeveloperCard({ developer }) {
  return (
    <article className="developer-card">
      <div className="developer-card-head"><div className="avatar">{developer.initials}</div><span className="rating"><Star size={14} fill="currentColor"/> {developer.rating}</span></div>
      <h3>{developer.name}</h3><p className="developer-role">{developer.role}</p>
      <div className="developer-location"><MapPin size={14}/>{developer.city} · {developer.level}</div>
      <p className="developer-bio">{developer.bio}</p>
      <div className="tag-row">{developer.skills.map(skill => <Tag key={skill}>{skill}</Tag>)}</div>
      <Link className="text-link" to={`/developers/${developer.id}`}>Voir le profil <ArrowUpRight size={15}/></Link>
    </article>
  )
}
