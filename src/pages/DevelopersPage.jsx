
import { useMemo, useState } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import { developers } from '../data/mockData'
import DeveloperCard from '../components/developers/DeveloperCard'

export default function DevelopersPage() {
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() =>
    developers.slice(0, 2).filter(d =>
      `${d.name} ${d.role} ${d.city} ${d.skills.join(' ')}`
        .toLowerCase()
        .includes(keyword.toLowerCase())
    ), [keyword])

  return (
    <div className="container page-shell">

      <div className="page-intro">
        <h1>Découvrez les <span>développeurs.</span></h1>
        <p>
          Explorez les profils, les compétences et les parcours
          de la communauté DevOnDeck.
        </p>
      </div>

      <div className="search-field standalone-search">
        <Search size={18} />
        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Rechercher par nom, compétence ou technologie..."
        />

        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword('')}
            title="Effacer la recherche"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      <div className="results-line">
        <strong>{filtered.length} profils</strong>
        <span>Profils de démonstration</span>
      </div>

      <div className="developers-grid">
        {filtered.map(d => (
          <DeveloperCard key={d.id} developer={d} />
        ))}
      </div>

      {!filtered.length && (
        <div className="empty-state">
          Aucun profil ne correspond à votre recherche.
        </div>
      )}

    </div>
  )
}
