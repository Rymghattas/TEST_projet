import { Link } from 'react-router-dom'
import { Github, Linkedin, Youtube, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-main">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark">D</span><span>Dev<span>OnDeck</span></span></Link>
          <p>Connect. Build. Launch.</p>
        </div>
        <div className="footer-links">
          <a href="#about">À propos</a><a href="#footer">Contact</a><a href="#footer">FAQ</a><a href="#footer">Confidentialité</a>
        </div>
        <div className="socials"><a href="#footer" aria-label="LinkedIn"><Linkedin/></a><a href="#footer" aria-label="Github"><Github/></a><a href="#footer" aria-label="Youtube"><Youtube/></a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 DevOnDeck. Tous droits réservés.</span><span>Fait pour connecter les talents et les opportunités <ArrowUpRight size={13}/></span></div>
    </footer>
  )
}
