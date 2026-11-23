
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

export default function OfferFilters({ filters, setFilters }) {
  const update = (key, value) =>
    setFilters(current => ({ ...current, [key]: value }))

  return (
    <div className="filter-panel">
      <div className="search-field">
        <Search size={18}/>
        <input
          value={filters.keyword}
          onChange={e => update('keyword', e.target.value)}
          placeholder="Rechercher par titre, description ou compétence..."
        />
      </div>

      <label className="select-field">
        <SlidersHorizontal size={16}/>
        <select value={filters.contract} onChange={e => update('contract', e.target.value)}>
          <option value="Tous">Tous les contrats</option>
          <option>Stage</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
        </select>
      </label>

      <label className="select-field">
        <MapPin size={16}/>
        <select value={filters.location} onChange={e => update('location', e.target.value)}>
          <option value="Toutes">Toutes les villes</option>
          <option value="Toutes">Toutes les villes</option>
          <option>Tunis</option>
          <option>Ariana</option>
          <option>Ben Arous</option>
          <option>Manouba</option>
          <option>Nabeul</option>
          <option>Zaghouan</option>
          <option>Bizerte</option>
          <option>Béja</option>
          <option>Jendouba</option>
          <option>Le Kef</option>
          <option>Siliana</option>
          <option>Sousse</option>
          <option>Monastir</option>
          <option>Mahdia</option>
          <option>Sfax</option>
          <option>Kairouan</option>
          <option>Kasserine</option>
          <option>Sidi Bouzid</option>
          <option>Gabès</option>
          <option>Médenine</option>
          <option>Tataouine</option>
          <option>Gafsa</option>
          <option>Tozeur</option>
          <option>Kébili</option>
        </select>
      </label>

      <label className="select-field">
        <select value={filters.mode} onChange={e => update('mode', e.target.value)}>
          <option value="Tous">Tous les modes</option>
          <option>Hybride</option>
          <option>Présentiel</option>
        </select>
      </label>
    </div>
  )
}
