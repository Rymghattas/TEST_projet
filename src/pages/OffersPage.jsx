
import { useMemo, useState } from 'react'
import { offers } from '../data/mockData'
import OfferCard from '../components/offers/OfferCard'
import OfferFilters from '../components/offers/OfferFilters'

export default function OffersPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'Toutes',
    location: 'Toutes',
    mode: 'Tous',
    contract: 'Tous',
    education: 'Toutes',
    skill: 'Toutes'
  })

  const filtered = useMemo(() => {
    return offers.filter(offer => {
      const keyword = filters.keyword.toLowerCase()

      const text = `${offer.title} ${offer.company} ${offer.tags.join(' ')}`.toLowerCase()

      return (
        text.includes(keyword) &&
        (filters.category === 'Toutes' || offer.category === filters.category) &&
        (filters.location === 'Toutes' || offer.location.includes(filters.location)) &&
        (filters.mode === 'Tous' || offer.mode === filters.mode) &&
        (filters.contract === 'Tous' || offer.contract === filters.contract) &&
        (filters.education === 'Toutes' || offer.education === filters.education) &&
        (filters.skill === 'Toutes' || offer.tags.includes(filters.skill))
      )
    })
  }, [filters])

  return (
    <div className="page-shell container">
      <div className="page-intro">
        <span className="eyebrow">OPPORTUNITÉS</span>
        <h1>
          Trouvez le poste qui vous <span>correspond.</span>
        </h1>
        <p>
          Explorez les offres et trouvez votre prochaine aventure professionnelle.
        </p>
      </div>

      <OfferFilters filters={filters} setFilters={setFilters} />

      <div className="results-line">
        <strong>{filtered.length} opportunités</strong>
        <span>Résultats de recherche</span>
      </div>

      <div className="offers-grid">
        {filtered.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          Aucune offre trouvée. Essayez d'autres critères.
        </div>
      )}
    </div>
  )
}
