
import { useMemo, useState } from 'react';
import { offers } from '../data/mockData';
import OfferCard from '../components/offers/OfferCard';
import OfferFilters from '../components/offers/OfferFilters';

export default function OffersPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'Toutes',
    location: 'Toutes',
    mode: 'Tous'
  });

  const filtered = useMemo(() => {
    return offers.filter(offer => {
      const keyword = filters.keyword.toLowerCase().trim();

      const text = `
        ${offer.title}
        ${offer.company}
        ${offer.description}
        ${(offer.tags || []).join(' ')}
      `.toLowerCase();

      const matchKeyword = text.includes(keyword);

      const matchCategory =
        filters.category === 'Toutes' ||
        offer.category === filters.category;

      const matchLocation =
        filters.location === 'Toutes' ||
        offer.location?.includes(filters.location);

      const matchMode =
        filters.mode === 'Tous' ||
        offer.mode === filters.mode;

      return (
        matchKeyword &&
        matchCategory &&
        matchLocation &&
        matchMode
      );
    });
  }, [filters]);

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

      <OfferFilters
        filters={filters}
        setFilters={setFilters}
      />

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
          Aucune offre trouvée. Essayez un autre mot-clé.
        </div>
      )}

    </div>
  );
}
