import { useMemo, useState } from 'react'
import { offers } from '../data/mockData'
import OfferCard from '../components/offers/OfferCard'
import OfferFilters from '../components/offers/OfferFilters'
import SectionTitle from '../components/common/SectionTitle'

export default function OffersPage() {
  const [filters, setFilters] = useState({ keyword: '', category: 'Toutes', location: 'Toutes', mode: 'Tous' })
  const filtered = useMemo(() => offers.filter(o => (filters.category === 'Toutes' || o.category === filters.category) && (filters.location === 'Toutes' || o.location.includes(filters.location) || o.mode === filters.location) && (filters.mode === 'Tous' || o.mode === filters.mode) && (`${o.title} ${o.company} ${o.tags.join(' ')}`.toLowerCase().includes(filters.keyword.toLowerCase()))), [filters])
  return <div className="page-shell container"><div className="page-intro"><span className="eyebrow">OPPORTUNITÉS</span><h1>Trouvez le poste qui vous <span>correspond.</span></h1><p>Explorez les offres et trouvez votre prochaine aventure professionnelle.</p></div><OfferFilters filters={filters} setFilters={setFilters}/><div className="results-line"><strong>{filtered.length} opportunités</strong><span>Résultats de démonstration</span></div><div className="offers-grid">{filtered.map(o=><OfferCard key={o.id} offer={o}/>)}</div>{!filtered.length && <div className="empty-state">Aucune offre trouvée. Essayez d'autres critères.</div>}</div>
}
