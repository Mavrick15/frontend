# Frontend Zetoun Labs

Application React (Vite, TypeScript) pour le site Zetoun Labs. Déployée sur Cloudflare Pages.

## Démarrage rapide

```bash
# Installation
npm install

# Variables d'environnement
cp .env.example .env
# Éditer .env (VITE_API_URL, etc.)

# Développement
npm run dev

# Build production
npm run build

# Prévisualisation du build
npm run preview
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (sortie dans `dist/`) |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | Vérification ESLint |
| `npm test` | Tests Vitest |
| `npm run type-check` | Vérification TypeScript |

## Déploiement (Cloudflare Pages)

Le déploiement utilise Wrangler. Configuration dans `wrangler.toml`.

- **Build** : `npm run build`
- **Deploy** : `npx wrangler deploy --assets=./dist`

## Structure

- `src/components/` – Composants React (layout, UI, pages métier)
- `src/pages/` – Pages et routes
- `src/hooks/` – Hooks personnalisés (auth, formations, panier, etc.)
- `src/config/` – Configuration API
- `src/utils/` – Utilitaires (messages API, validation)
- `public/` – Assets statiques

## Licence

Voir [LICENSE](LICENSE).
