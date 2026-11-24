import { Link, NavLink } from 'react-router-dom'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">D</span>
          <span>Dev<span>OnDeck</span></span>
        </Link>
        <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
          {open ? <X size={21}/> : <Menu size={21}/>}
        </button>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Accueil</NavLink>
          <NavLink to="/offers" onClick={() => setOpen(false)}>Opportunités <ChevronDown size={13}/></NavLink>
          <NavLink to="/developers" onClick={() => setOpen(false)}>Développeurs <ChevronDown size={13}/></NavLink>
          <NavLink to="/organization/applications">
            Candidatures reçues
          </NavLink>
          <a href="#about" onClick={() => setOpen(false)}>À propos</a>
          <a href="#footer" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <Link to="/offers" className="icon-button search-nav" aria-label="Rechercher"><Search size={18}/></Link>
          <Link to="/register" className="btn btn-primary btn-small">Créer un compte <span>↗</span></Link>
        </div>
      </div>
    </header>
  )
}
