
import { useState } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import DeveloperCard from '../components/developers/DeveloperCard'
import { searchDevelopers } from '../services/developerService'

export default function DevelopersPage() {
  const [keyword, setKeyword] = useState('')
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(value) {
    setKeyword(value)

    if (!value.trim()) {
      setDevelopers([])
      setError('')
      return
    }

    setLoading(true)
    setError('')

    try {
       const search = value.trim()
       const data = await searchDevelopers(search)

      const results = data.map(d => ({
        ...d,
        id: d.id ?? d.idDeveloper ?? d.id_developer,
        name: d.name ?? d.fullName ?? d.full_name,
        skills: (d.skills || []).map(skill =>
          typeof skill === 'string' ? skill : skill.name
        )
      }))

      setDevelopers(results)
    } catch (err) {
      setError('Impossible de charger les développeurs.')
      setDevelopers([])
    } finally {
      setLoading(false)
    }
  }

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
          onChange={e => handleSearch(e.target.value)}
          placeholder="Rechercher par nom, compétence ou technologie..."
        />

        {keyword && (
          <button
            type="button"
            onClick={() => handleSearch('')}
            title="Effacer la recherche"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      <div className="results-line">
        <strong>{developers.length} profils</strong>
        <span>Résultats de recherche</span>
      </div>

      {loading && <p>Recherche en cours...</p>}

      {error && (
        <div className="empty-state">{error}</div>
      )}

      {!loading && !error && (
        <div className="developers-grid">
          {developers.map(d => (
            <DeveloperCard key={d.id} developer={d} />
          ))}
        </div>
      )}

      {!loading && !error && keyword && developers.length === 0 && (
        <div className="empty-state">
          Aucun profil ne correspond à votre recherche.
        </div>
      )}

    </div>
  )
}
