# DevOnDeck — Frontend React

Interface frontend React + Vite inspirée de la maquette fournie : palette violet, indigo, blanc et bleu lavande.

## Installation

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée par Vite (généralement http://localhost:5173).

## Commandes

```bash
npm run build
npm run preview
```

## Structure

- `src/components/common` : composants réutilisables (boutons, badges, cartes)
- `src/components/layout` : navigation et pied de page
- `src/components/offers` : composants liés aux offres
- `src/components/developers` : composants liés aux profils développeurs
- `src/components/applications` : composants de candidature
- `src/pages` : pages de l'application
- `src/data` : données de démonstration
- `src/services` : couche API à connecter à Spring Boot
- `src/styles` : styles globaux

## Important : état actuel

Cette version est un **prototype frontend fonctionnel avec données de démonstration locales**. Les recherches, filtres, favoris, formulaires de démonstration et changements visuels de statut fonctionnent côté navigateur. Aucune donnée n'est encore enregistrée dans une base de données et aucune API Spring Boot n'est appelée.

Les services dans `src/services` sont préparés pour le futur branchement avec le backend. Les règles d'authentification, autorisations, validation serveur et persistance devront être implémentées côté Spring Boot.

## Git en équipe

Ne partagez pas `node_modules`. Chaque membre clone le dépôt puis exécute `npm install`. Travaillez sur des branches dédiées et utilisez des Pull Requests pour intégrer les changements dans `main`.
