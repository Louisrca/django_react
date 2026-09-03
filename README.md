# Elec Dashboard — diagnostic de consommation électrique

Un dashboard qui transforme une série de relevés de consommation électrique en
diagnostic lisible en quelques secondes : chauffage électrique ou non,
dysfonctionnement durable de l'installation, et courbe de consommation sur
l'historique complet.

Projet personnel, construit pour explorer une architecture Django (API JSON) + SPA
React typée de bout en bout, et pour me faire un terrain de jeu propre sur les
composants "maison" et Storybook.

## Ce que fait l'application

**Côté consultation (`/`)**

1. **Recherche d'un client** par nom ou identifiant, au fil de la frappe.
2. **Courbe de consommation** sur les 12 derniers mois, sur une année précise ou
   sur tout l'historique.
3. **Diagnostic** : identifiant, nom, présence d'un chauffage électrique,
   dysfonctionnement éventuel sur l'installation.

**Côté staff (`/admin/clients`)**

4. **Liste paginée des clients**, pour repérer d'un coup d'œil ceux qui ont un
   chauffage électrique ou une anomalie.

## Contraintes que je me suis fixées

- **Mobile-first.** Le dashboard doit rester utilisable sur un téléphone.
- **Passer à l'échelle.** Le jeu de données de dev fait 5 000 clients, mais tout est
  pensé pour une base à plusieurs centaines de milliers de lignes : pagination côté
  serveur, recherche déléguée à la base, jamais de liste complète chargée en mémoire.
- **Pas d'authentification.** Hors scope ici, l'intérêt du projet est ailleurs.

## Les données

Jeu de données synthétique : 5 000 clients, une mesure de consommation par mois et
par client de mars 2018 à août 2026, plus le prix de l'électricité sur la même
période. La base `hwjob/db.sqlite3` est versionnée et déjà peuplée, pour que le
projet tourne sans étape de seed.

Le diagnostic est calculé côté back-end :

| Champ              | Signification                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `has_elec_heating` | La consommation des mois froids est disproportionnée par rapport aux mois chauds, signe d'un chauffage électrique. |
| `has_anomaly`      | Un mois consomme beaucoup plus que le même mois un an plus tôt : l'installation a un dysfonctionnement durable.    |
| `anomaly_date`     | Le premier mois anormal (`null` s'il n'y a pas d'anomalie).                                                        |

## L'API

### `GET /api/search-clients`

Recherche paginée, 10 clients par page.

| Paramètre | Défaut | Rôle                                                           |
| --------- | ------ | -------------------------------------------------------------- |
| `query`   | —      | Identifiant exact, ou fragment de nom (insensible à la casse). |
| `page`    | `1`    | Numéro de page.                                                |

### `GET /api/client/<client_id>`

Le détail d'un client, son diagnostic et sa série de consommations.

| Paramètre | Défaut | Rôle                                                                                               |
| --------- | ------ | -------------------------------------------------------------------------------------------------- |
| `year`    | —      | `2025` pour une année précise, `all` pour tout l'historique, absent pour les **12 derniers mois**. |

## Stack

- **Back-end** : Python 3.14, Django 5.2, SQLite
- **Front-end** : React, TypeScript, Vite, Tailwind, react-router, React Query, Radix UI
- **Outillage** : Storybook (addon a11y), Vitest en navigateur

## Lancer le projet

Le front React vit dans `frontend/`, le back Django dans `hwjob/`. Il faut lancer
les deux, chacun dans son terminal.

**1. Front-end React** (depuis `frontend/`)

```bash
cd frontend
npm install
npm run dev
```

**2. Back-end Django** (depuis `hwjob/`)

```bash
cd hwjob
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

L'application est alors accessible sur http://localhost:5173/

L'admin Django (`/admin/`) permet d'explorer les données brutes — clients,
consommations, prix. Pour y accéder :

```bash
python manage.py createsuperuser
```

### Storybook & tests (depuis `frontend/`)

```bash
npm run storybook   # vue des composants sur http://localhost:6006
npm test            # run les play functions des stories (Vitest + navigateur)
```

## Choix techniques

- **SPA React, Django réduit à une API JSON.** Séparation nette front / back :
  Django n'expose que `/api/*`, le front est une SPA autonome servie par Vite, et le
  routing (`/` consultation, `/admin/clients` staff) est géré côté client par
  react-router. Le back reste concentré sur les données et le calcul du diagnostic.

- **TypeScript + Tailwind.** Typage de bout en bout des payloads de l'API pour des
  composants fiables ; Tailwind pour écrire vite un rendu responsive mobile-first.

- **Radix UI** pour les primitives (menu, dialog, select, onglets…). Toute
  l'accessibilité difficile est déjà là (navigation clavier, gestion du focus,
  attributs ARIA, focus-trap) et je garde la main sur le style via Tailwind. Plus
  fiable et plus rapide que de réimplémenter ces patterns à la main.

- **React Query** pour la couche données : cache, déduplication des requêtes, états
  loading / error, et `placeholderData` pour une recherche au fil de la frappe et une
  pagination sans "clignotement".

- **Composants "maison", inspirés de shadcn/ui et de l'API de MUI.** Plutôt qu'une
  librairie de composants clé en main, j'ai écrit mes propres primitives (Button,
  Badge, Input, Select…) : l'approche "code copié chez soi" de shadcn pour garder la
  main totale sur le markup et le style, et des props façon MUI (`variant`, `size`,
  `icon`…) pour une API familière.

- **`cn` + `cva` + Storybook.** `cn` (clsx + tailwind-merge) fusionne les classes
  sans conflit quand un composant accepte un `className` ; `cva` centralise les
  variantes d'un composant avec les types de props dérivés, sans
  `Record<Variant, string>` à maintenir en parallèle. Storybook sert d'atelier isolé
  pour développer et contrôler chaque primitive — états, responsive, accessibilité
  (addon a11y).

## Pistes d'amélioration

- **MSW.** Mocker les endpoints `/api/*` au niveau réseau avec Mock Service Worker
  débloquerait des tests de composants réalistes (recherche, pagination, états
  d'erreur) et des stories Storybook alimentées sans back-end.

- **Couverture de tests.** Aujourd'hui seul `ClientDetails` (le composant le moins
  trivial) est testé, via des `play` functions sur ses stories lancées par Vitest en
  navigateur (`npm test`). Les données viennent du cache React Query, donc sans API
  ni MSW. La suite logique : des tests unitaires sur chaque primitive et quelques
  parcours e2e.

- **Filtres sur la liste staff.** Pouvoir n'afficher que les clients avec chauffage
  électrique, ou seulement ceux qui présentent une anomalie.

- **Persistance côté client** des préférences d'affichage (année sélectionnée,
  filtres, dernière recherche).
