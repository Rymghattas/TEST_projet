import { Link } from 'react-router-dom'
import { ArrowRight, Play, Users, BriefcaseBusiness, Zap, Rocket, Star, Search, Code2, ChartNoAxesColumnIncreasing } from 'lucide-react'
import { useMemo, useState } from 'react'
import { offers } from '../data/mockData'
import OfferCard from '../components/offers/OfferCard'
import OfferFilters from '../components/offers/OfferFilters'
import SectionTitle from '../components/common/SectionTitle'

export default function HomePage() {
  const [filters, setFilters] = useState({ keyword: '', category: 'Toutes', location: 'Toutes', mode: 'Tous' })
  const featured = useMemo(() => offers.filter(o => (filters.category === 'Toutes' || o.category === filters.category) && (filters.location === 'Toutes' || o.location.includes(filters.location) || o.mode === filters.location) && (`${o.title} ${o.company} ${o.tags.join(' ')}`.toLowerCase().includes(filters.keyword.toLowerCase()))).slice(0, 3), [filters])
  return (
    <>
      <section className="hero-section">
        <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-pill"><Zap size={13} fill="currentColor"/> Votre prochaine opportunité vous attend !</span>
            <h1>Connect. Build.<br/><span>Launch.</span></h1>
            <p>Trouvez les bonnes opportunités. Valorisez vos compétences. Construisez votre avenir avec DevOnDeck.</p>
            <div className="hero-actions"><Link to="/offers" className="btn btn-primary btn-large">Explorer les opportunités <ArrowRight size={17}/></Link><a href="#about" className="story-link"><span><Play size={15} fill="currentColor"/></span><div><strong>Découvrir DevOnDeck</strong><small>Comment ça marche</small></div></a></div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
            <div className="hero-laptop"><div className="laptop-screen"><span className="screen-logo">D</span><small>DevOnDeck</small><b>Connect. Build. Launch.</b><div className="screen-bars"><i/><i/><i/></div></div><div className="laptop-base"/></div>
            <div className="float-tile tile-code"><Code2/></div><div className="float-tile tile-user"><Users/></div><div className="float-tile tile-chart"><ChartNoAxesColumnIncreasing/></div><div className="float-tile tile-brief"><BriefcaseBusiness/></div><div className="art-plant">🌿</div><div className="art-cup">☕</div>
          </div>
        </div>
      </section>

      <section className="container home-search-section">
        <OfferFilters filters={filters} setFilters={setFilters} compact/>
        <div className="category-chips">{['Toutes','Web Development','Data Science','Cloud & DevOps','Mobile Development','AI & Machine Learning','Design'].map((c,i)=><button key={c} className={`category-chip ${filters.category === c ? 'active' : ''}`} onClick={()=>setFilters(f=>({...f,category:c}))}>{c}</button>)}</div>
      </section>

      <section className="container section-block">
        <SectionTitle eyebrow="Trouvez votre prochain défi" title="Les dernières opportunités" subtitle="Des offres sélectionnées pour vous aider à passer à la prochaine étape." action={<Link to="/offers" className="text-link">Voir toutes les offres <ArrowRight size={15}/></Link>}/>
        <div className="offers-grid">{featured.length ? featured.map(offer=><OfferCard key={offer.id} offer={offer}/>) : <div className="empty-state">Aucune offre ne correspond à votre recherche.</div>}</div>
      </section>

      <section className="container why-section" id="about">
        <div className="why-content"><SectionTitle eyebrow="Pourquoi DevOnDeck ?" title="Tout commence par la bonne connexion." subtitle="Un espace pensé pour rapprocher les talents tech et les organisations qui innovent."/>
          <div className="benefits-grid"><div><span className="benefit-icon"><Rocket/></span><strong>Développez votre carrière</strong><p>Découvrez des opportunités adaptées à vos ambitions.</p></div><div><span className="benefit-icon"><Users/></span><strong>Rejoignez une communauté</strong><p>Connectez-vous avec des talents et des entreprises.</p></div><div><span className="benefit-icon"><Zap/></span><strong>Valorisez vos compétences</strong><p>Présentez votre parcours et vos réalisations.</p></div><div><span className="benefit-icon"><Star/></span><strong>Allez plus loin</strong><p>Faites le prochain pas vers vos objectifs.</p></div></div>
        </div>
        <div className="why-visual"><div className="visual-blob"/><div className="visual-person">👩🏻‍💻</div><div className="visual-code">{"</>"}</div><div className="visual-bubble">✨</div></div>
      </section>

      <section className="container cta-section"><div className="cta-icon"><Users size={42}/></div><div><h2>Prêt à passer à la prochaine étape ?</h2><p>Rejoignez DevOnDeck et faites partie d'une communauté tech en pleine croissance.</p></div><Link to="/register" className="btn btn-white">Créer votre compte <ArrowRight size={16}/></Link></section>
    </>
  )
}
