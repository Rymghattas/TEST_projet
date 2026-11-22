import { useMemo, useState } from 'react'
import { applicationsSeed, offers } from '../data/mockData'
import ApplicationRow from '../components/applications/ApplicationRow'
import SectionTitle from '../components/common/SectionTitle'

export default function ApplicationsPage() {
  const [apps, setApps] = useState(applicationsSeed)
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase()

    return apps.filter(app => {
      const company = offers.find(offer => offer.id === app.offerId)?.company ?? ''
      const matchesStatus = filter === 'Tous' || app.status === filter
      const matchesSearch = `${app.offer} ${company} ${app.developer} ${app.email}`
        .toLowerCase()
        .includes(query)

      return matchesStatus && matchesSearch
    })
  }, [apps, filter, search])

  const changeStatus = (id, status) => {
    setApps(current => current.map(app => app.id === id ? { ...app, status } : app))
  }

  return (
    <div className="container page-shell">
      <div className="page-intro">
        <span className="eyebrow">ESPACE ORGANISATION</span>
        <h1>Gérez vos <span>candidatures.</span></h1>
        <p>Consultez les candidatures reçues pour vos offres et prenez une décision.</p>
      </div>

      <div className="dashboard-stats">
        <div><span>Total candidatures</span><strong>{apps.length}</strong></div>
        <div><span>En attente</span><strong>{apps.filter(app => app.status === 'En attente').length}</strong></div>
        <div><span>Acceptées</span><strong>{apps.filter(app => app.status === 'Acceptée').length}</strong></div>
        <div><span>Refusées</span><strong>{apps.filter(app => app.status === 'Refusée').length}</strong></div>
      </div>

      <section className="table-panel">
        <SectionTitle title="Candidatures reçues" subtitle="Données de démonstration — actions locales." />

        <div className="application-filters">
          <input
            type="search"
            aria-label="Rechercher une candidature"
            placeholder="Rechercher un candidat, une offre ou une entreprise..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <select
            aria-label="Filtrer par statut"
            value={filter}
            onChange={event => setFilter(event.target.value)}
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Acceptée">Acceptées</option>
            <option value="Refusée">Refusées</option>
          </select>
        </div>

        <div className="application-table-head">
          <span>Candidat</span><span>Offre / Date</span><span>Statut</span><span>Actions</span>
        </div>
        {filteredApps.length > 0 ? filteredApps.map(app => (
          <ApplicationRow key={app.id} application={app} onStatus={changeStatus} />
        )) : (
          <div className="empty-state application-empty">
            <h3>Aucune candidature trouvée</h3>
            <p>Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </section>
    </div>
  )
}
