import { Check, X, ExternalLink } from 'lucide-react'

export default function ApplicationRow({ application, onStatus }) {
  const statusClass = application.status === 'Acceptée' ? 'status-accepted' : application.status === 'Refusée' ? 'status-rejected' : 'status-pending'
  return (
    <div className="application-row">
      <div className="avatar avatar-small">{application.developer.split(' ').map(x => x[0]).slice(0,2).join('')}</div>
      <div className="application-person"><strong>{application.developer}</strong><span>{application.email}</span><small>{application.skills.join(' · ')}</small></div>
      <div className="application-offer">{application.offer}<small>{application.date}</small></div>
      <span className={`status-pill ${statusClass}`}>{application.status}</span>
      <div className="application-actions">
        <button className="action-accept" title="Accepter" onClick={() => onStatus(application.id, 'Acceptée')}><Check size={16}/></button>
        <button className="action-reject" title="Refuser" onClick={() => onStatus(application.id, 'Refusée')}><X size={16}/></button>
        <button className="action-view" title="Voir le profil"><ExternalLink size={15}/></button>
      </div>
    </div>
  )
}
