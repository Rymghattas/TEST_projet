
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

const categories = [
  'Toutes',
  'Web Development',
  'Data Science',
  'Cloud & DevOps',
  'Mobile Development',
  'AI & Machine Learning',
  'Design'
]

const skills = [
  'Toutes',
  'React',
  'JavaScript',
  'Python',
  'SQL',
  'Java',
  'Figma',
  'Docker'
]

const villes = [
  'Toutes',
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Le Kef',
  'Siliana',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Gabès',
  'Médenine',
  'Tataouine',
  'Gafsa',
  'Tozeur',
  'Kébili'
]

export default function OfferFilters({ filters, setFilters, compact = false }) {
  const update = (key, value) => {
    setFilters(current => ({ ...current, [key]: value }))
  }

  return (
    <div className={`filter-panel ${compact ? 'filter-compact' : ''}`}>

      <div className="search-field">
        <Search size={18} />
        <input
          value={filters.keyword}
          onChange={e => update('keyword', e.target.value)}
          placeholder="Rechercher une offre..."
        />
      </div>

      <label className="select-field">
        <SlidersHorizontal size={16} />
        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'Toutes' ? 'Toutes catégories' : c}
            </option>
          ))}
        </select>
      </label>

      <label className="select-field">
        <MapPin size={16} />
        <select
          value={filters.location}
          onChange={e => update('location', e.target.value)}
        >
          <option value="Toutes">Toutes les villes</option>
          {villes.slice(1).map(ville => (
            <option key={ville}>{ville}</option>
          ))}
        </select>
      </label>

      <label className="select-field">
        <select
          value={filters.contract}
          onChange={e => update('contract', e.target.value)}
        >
          <option value="Tous">Type de contrat</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
        </select>
      </label>

      <label className="select-field">
        <select
          value={filters.mode}
          onChange={e => update('mode', e.target.value)}
        >
          <option value="Tous">Mode de travail</option>
          <option>Remote</option>
          <option>Hybride</option>
          <option>Présentiel</option>
        </select>
      </label>

      <label className="select-field">
        <select
          value={filters.education}
          onChange={e => update('education', e.target.value)}
        >
          <option value="Toutes">Niveau d'étude</option>
          <option>Licence</option>
          <option>Master</option>
          <option>Doctorat</option>
        </select>
      </label>

      <label className="select-field">
        <select
          value={filters.skill}
          onChange={e => update('skill', e.target.value)}
        >
          {skills.map(skill => (
            <option key={skill} value={skill}>
              {skill === 'Toutes' ? 'Toutes les compétences' : skill}
            </option>
          ))}
        </select>
      </label>

      <button
        className="btn btn-primary filter-submit"
        onClick={() => {}}
      >
        <Search size={16} /> Rechercher
      </button>

    </div>
  )
}

export { categories }
