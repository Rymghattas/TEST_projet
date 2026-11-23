import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { applicationsSeed, currentDeveloper, offers } from '../data/mockData'
import SectionTitle from '../components/common/SectionTitle'

export default function ApplicationsPage() {
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const developer = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('devondeck_profile')) || currentDeveloper
    } catch {
      return currentDeveloper
    }
  }, [])
  const developerName = developer.fullName || developer.name || currentDeveloper.fullName

  const myApps = useMemo(
    () => applicationsSeed.filter(app => app.developer === developerName),
    [developerName]
  )

  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase()

    return myApps.filter(app => {
      const company = offers.find(offer => offer.id === app.offerId)?.company ?? ''
      const matchesStatus = filter === 'Tous' || app.status === filter
      const matchesSearch = `${app.offer} ${company}`.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [filter, myApps, search])

  return (
    <div className="container page-shell">
      <div className="page-intro">
        <span className="eyebrow">ESPACE DÉVELOPPEUR</span>
        <h1>Mes <span>candidatures.</span></h1>
        <p>Retrouvez les offres auxquelles vous avez postulé et suivez leur statut.</p>
      </div>

      <div className="dashboard-stats">
        <div><span>Total candidatures</span><strong>{myApps.length}</strong></div>
        <div><span>En attente</span><strong>{myApps.filter(app => app.status === 'En attente').length}</strong></div>
        <div><span>Acceptées</span><strong>{myApps.filter(app => app.status === 'Acceptée').length}</strong></div>
        <div><span>Refusées</span><strong>{myApps.filter(app => app.status === 'Refusée').length}</strong></div>
      </div>

      <section className="table-panel">
        <SectionTitle title="Offres auxquelles j’ai postulé" subtitle="Suivez ici l’avancement de vos candidatures." />

        <div className="application-filters">
          <input
            type="search"
            aria-label="Rechercher une candidature"
            placeholder="Rechercher une offre ou une entreprise..."
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

        <div className="developer-applications-head">
          <span>Offre / Organisation</span><span>Date de candidature</span><span>Statut</span>
        </div>
        {filteredApps.length > 0 ? filteredApps.map(app => {
          const company = offers.find(offer => offer.id === app.offerId)?.company ?? 'Organisation inconnue'

          return (
            <div className="developer-application-row" key={app.id}>
              <div className="developer-application-offer">
                <Link to={`/offers/${app.offerId}`}>{app.offer}</Link>
                <span>{company}</span>
              </div>
              <span className="developer-application-date">{app.date}</span>
              <span className={`status-pill ${app.status === 'Acceptée' ? 'status-accepted' : app.status === 'Refusée' ? 'status-rejected' : 'status-pending'}`}>
                {app.status}
              </span>
            </div>
          )
        }) : (
          <div className="empty-state application-empty">
            <h3>{myApps.length ? 'Aucune candidature trouvée' : 'Vous n’avez pas encore postulé'}</h3>
            <p>{myApps.length ? 'Essayez de modifier vos critères de recherche.' : 'Parcourez les offres et postulez à celles qui vous intéressent.'}</p>
            {!myApps.length && <Link to="/offers" className="text-link">Découvrir les offres</Link>}
          </div>
        )}
      </section>
    </div>
  )
}
