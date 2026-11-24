
import { useMemo, useState } from 'react'
import { applicationsSeed, offers, organizations } from '../data/mockData'
import ApplicationRow from '../components/applications/ApplicationRow'
import SectionTitle from '../components/common/SectionTitle'

export default function OrganizationApplicationsPage() {
  const [applications, setApplications] = useState(applicationsSeed)
  const [filter, setFilter] = useState('Tous')
  const [selectedOffer, setSelectedOffer] = useState('Toutes')
  const [search, setSearch] = useState('')

  const organization = (() => {
    try {
      return JSON.parse(localStorage.getItem('devondeck_organization_profile'))
        || JSON.parse(localStorage.getItem('devondeck_current_user'))
        || organizations[0]
    } catch {
      return organizations[0]
    }
  })()

  const organizationName =
    organization.organizationName || organization.name || 'TechNova'

  const organizationOffers = useMemo(
    () => offers.filter(offer => offer.company === organizationName),
    [organizationName]
  )

  const receivedApplications = useMemo(
    () => applications.filter(application =>
      organizationOffers.some(offer => offer.id === application.offerId)
    ),
    [applications, organizationOffers]
  )

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase()

    return receivedApplications.filter(application => {
      const matchesStatus =
        filter === 'Tous' || application.status === filter

      const matchesOffer =
        selectedOffer === 'Toutes' ||
        String(application.offerId) === selectedOffer

      const matchesSearch =
        `${application.developer} ${application.email} ${application.offer}`
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesOffer && matchesSearch
    })
  }, [receivedApplications, filter, selectedOffer, search])

  const handleStatus = (applicationId, newStatus) => {
    setApplications(current =>
      current.map(application =>
        application.id === applicationId
          ? { ...application, status: newStatus }
          : application
      )
    )
  }

  return (
    <div className="container page-shell">
      <div className="page-intro">
        <span className="eyebrow">ESPACE ORGANISATION</span>
        <h1>Gestion des <span>candidatures.</span></h1>
        <p>
          Consultez les candidatures reçues pour vos offres et gérez
          les réponses aux développeurs.
        </p>
      </div>

      <div className="dashboard-stats">
        <div>
          <span>Total candidatures</span>
          <strong>{receivedApplications.length}</strong>
        </div>
        <div>
          <span>En attente</span>
          <strong>
            {receivedApplications.filter(app => app.status === 'En attente').length}
          </strong>
        </div>
        <div>
          <span>Acceptées</span>
          <strong>
            {receivedApplications.filter(app => app.status === 'Acceptée').length}
          </strong>
        </div>
        <div>
          <span>Refusées</span>
          <strong>
            {receivedApplications.filter(app => app.status === 'Refusée').length}
          </strong>
        </div>
      </div>

      <section className="table-panel">
        <SectionTitle
          title="Candidatures reçues"
          subtitle={`Consultez les candidatures reçues par ${organizationName}.`}
        />

        <div className="application-filters">
          <input
            type="search"
            placeholder="Rechercher un développeur ou une offre..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <select
            value={selectedOffer}
            onChange={event => setSelectedOffer(event.target.value)}
          >
            <option value="Toutes">Toutes les offres</option>
            {organizationOffers.map(offer => (
              <option key={offer.id} value={String(offer.id)}>
                {offer.title}
              </option>
            ))}
          </select>

          <select
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
          <span>Développeur</span>
          <span>Offre</span>
          <span>Statut</span>
          <span>Actions</span>
        </div>

        {filteredApplications.length > 0 ? (
          filteredApplications.map(application => (
            <ApplicationRow
              key={application.id}
              application={application}
              onStatus={handleStatus}
            />
          ))
        ) : (
          <div className="empty-state application-empty">
            <h3>Aucune candidature trouvée</h3>
            <p>
              Aucune candidature ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

