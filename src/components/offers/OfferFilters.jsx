import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

const categories = ['Toutes', 'Web Development', 'Data Science', 'Cloud & DevOps', 'Mobile Development', 'AI & Machine Learning', 'Design']

export default function OfferFilters({ filters, setFilters, compact = false }) {
  const update = (key, value) => setFilters(current => ({ ...current, [key]: value }))
  return (
    <div className={`filter-panel ${compact ? 'filter-compact' : ''}`}>
      <div className="search-field"><Search size={18}/><input value={filters.keyword} onChange={e => update('keyword', e.target.value)} placeholder="Poste, compétence ou technologie..."/></div>
      <label className="select-field"><SlidersHorizontal size={16}/><select value={filters.category} onChange={e => update('category', e.target.value)}><option value="Toutes">Toutes catégories</option>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label>
      <label className="select-field"><MapPin size={16}/><select value={filters.location} onChange={e => update('location', e.target.value)}><option value="Toutes">Toutes les villes</option><option>Tunis</option><option>Sousse</option><option>Sfax</option><option>Remote</option></select></label>
      {!compact && <label className="select-field"><select value={filters.mode} onChange={e => update('mode', e.target.value)}><option value="Tous">Mode de travail</option><option>Remote</option><option>Hybride</option><option>Présentiel</option></select></label>}
      <button className="btn btn-primary filter-submit" onClick={() => {}}><Search size={16}/> Rechercher</button>
    </div>
  )
}

export { categories }
