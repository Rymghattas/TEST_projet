import { useState } from 'react'
import { applicationsSeed } from '../data/mockData'
import ApplicationRow from '../components/applications/ApplicationRow'
import SectionTitle from '../components/common/SectionTitle'
import { ClipboardList } from 'lucide-react'

export default function ApplicationsPage() {
  const [apps,setApps] = useState(applicationsSeed)
  const changeStatus = (id,status) => setApps(old=>old.map(a=>a.id===id?{...a,status}:a))
  return <div className="container page-shell"><div className="page-intro"><span className="eyebrow">ESPACE ORGANISATION</span><h1>Gérez vos <span>candidatures.</span></h1><p>Consultez les candidatures reçues pour vos offres et prenez une décision.</p></div><div className="dashboard-stats"><div><span>Total candidatures</span><strong>{apps.length}</strong></div><div><span>En attente</span><strong>{apps.filter(a=>a.status==='En attente').length}</strong></div><div><span>Acceptées</span><strong>{apps.filter(a=>a.status==='Acceptée').length}</strong></div></div><section className="table-panel"><SectionTitle title="Candidatures reçues" subtitle="Données de démonstration — actions locales."/><div className="application-table-head"><span>Candidat</span><span>Offre / Date</span><span>Statut</span><span>Actions</span></div>{apps.map(app=><ApplicationRow key={app.id} application={app} onStatus={changeStatus}/>)}</section></div>
}
