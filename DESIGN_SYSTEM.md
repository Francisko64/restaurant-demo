# Design System — restaurant-demo

Description factuelle du design actuel de l'application, à utiliser comme référence pour tout développement futur (nouveaux composants, refactoring, ou reprise par un autre développeur/IA).

## 1. Stack & architecture

- **React 19** + **Vite 8**, pas de framework CSS (pas de Tailwind, pas de CSS-in-JS) : un fichier `App.css` global + `index.css` pour les resets.
- 3 composants fonctionnels dans `src/components/` : `Menu`, `Cart`, `PaymentModal`. Pas de sous-dossiers par composant (pas de `Component/index.jsx` + `Component.css` séparé) : tout le style vit dans `App.css`.
- État géré au niveau `App.jsx` (cart, catégorie sélectionnée, ouverture du modal) et redescendu par props (`onAddToCart`, `onRemove`, `onCheckout`) — pas de context, pas de state manager externe.
- Données statiques dans `src/data.js` (`dishes`, `deliveryInfo`), pas d'appel API.

## 2. Palette de couleurs

Inspirée de Deliveroo, valeurs codées en dur (pas de variables CSS custom properties actuellement) :

| Rôle | Couleur | Usage |
|---|---|---|
| Primaire (accent) | `#00c1b2` (teal) | logo texte, badges, boutons primaires, focus, bordures actives |
| Primaire hover | `#00a99c` | hover des boutons pleins |
| Primaire active | `#008f84` | active/pressed |
| Texte principal / dark | `#1a271f` | titres, texte fort, overlay modal (`rgba(26,39,31,.55)`) |
| Texte secondaire | `#6b7c71` | descriptions, labels de totaux |
| Texte tertiaire / muted | `#9aaba0` | quantités, sous-textes, placeholders d'état vide |
| Fond app | `#f8f4ef` | fond général (beige clair) |
| Fond composant | `#ffffff` | header, cartes, cart, modal |
| Bordures neutres | `#e8e4df`, `#ede9e4`, `#d8d4cf` | séparateurs, bordures de champs/boutons secondaires |
| Erreur | `#e03030` | hover du bouton "remove" (seule couleur d'erreur du système) |
| Disabled | `#d8d4cf` (fond) / `#a8a4a0` (texte) | boutons désactivés |
| Teal clair (surfaces) | `#e6faf8`, `#d4f5f1`, `#e8f8f7` | badge ETA (gradient), fond du spinner |

**Constat** : les couleurs sont répétées telles quelles dans chaque règle CSS. Aucune `--variable` n'est déclarée. C'est la première dette à corriger si le système grandit (voir §9).

## 3. Typographie

- Font stack : `"Helvetica Neue", Helvetica, Arial, sans-serif` (défini dans `App.css`, body) — `index.css` définit une autre stack système (`-apple-system...`) qui est écrasée par `App.css`, à noter comme incohérence mineure.
- Échelle utilisée (pas de scale formalisée, valeurs en `rem`) :
  - `1.75rem` / `800` — titre de section (`Menu`)
  - `1.25rem` / `800` — logo, titres de modal
  - `1.2rem` / `800` — titre "Your Order"
  - `1rem` / `800` — totaux finaux, boutons primaires larges
  - `0.975rem` / `700` — nom de plat, prix
  - `0.875–0.95rem` / `500–800` — texte courant, boutons, inputs
  - `0.8rem` / `500–700` — texte secondaire, labels
  - `0.65–0.75rem` — badges, quantités
- Poids : uniquement `500`, `600`, `700`, `800` (jamais de `400` normal, jamais de `300`/`900`).
- `letter-spacing` légèrement négatif (`-0.3` à `-0.5px`) sur les titres marquants, légèrement positif (`0.1`–`0.3px`) sur les boutons/labels — signature typographique du système.
- Labels de formulaire en `uppercase` (`.card-label`).

## 4. Espacement, rayons, layout

- **Rayons** : deux valeurs seulement — `4px` (boutons, inputs, filtres, cartes plats) et `8–12px` (dish-card, modal). `50%` pour les éléments ronds (badges, spinner, success-icon).
- **Grille de plats** : `repeat(auto-fill, minmax(290px, 1fr))`, gap `16px`.
- **Layout global** : header sticky (`64px` de haut) + `main` en flex 2 colonnes : `Menu` (`flex:1`) + `Cart` (largeur fixe `360px`, sticky). Pas de breakpoints/media queries — l'app n'est pas responsive actuellement (aucun comportement mobile défini).
- Paddings de conteneur habituels : `32px 40px` (menu), `28px 24px` (cart), `32px` (modal).
- Gaps verticaux entre blocs : `16px`/`14px`/`10px` selon la densité de l'information.

## 5. Ombres & transitions

- Ombre de survol carte plat : `0 4px 16px rgba(26,39,31,.10)` + `translateY(-1px)`.
- Ombre modal : `0 20px 60px rgba(26,39,31,.2)`.
- Transitions courtes et systématiques : `0.15s` (couleurs/bordures/fond des boutons et inputs), `0.2s` (ombre/transform des cartes).
- Deux animations `@keyframes` : `eta-pulse` (opacité, badge ETA) et `spin` (rotation, spinner de paiement).

## 6. Patterns de composants UI

- **Bouton** : pas de composant `<Button>` réutilisable — 5 variantes de classes CSS parallèles avec les mêmes règles dupliquées : `.filter-btn`, `.add-btn`, `.checkout-btn`, `.modal-btn-primary`, `.modal-btn-secondary`. Toutes suivent le même schéma visuel (fond teal plein *ou* bordure grise + hover teal), mais sans classe de base commune.
- **Carte** (`.dish-card`) : fond blanc, bordure fine, rayon `8px`, layout `emoji + info flex`, hover = ombre + léger lift.
- **Badge** : cercle plein teal avec texte blanc en gras (`.cart-badge`, réutilisé visuellement par `.success-icon`).
- **Pill / tag** : `.delivery-eta`, `border-radius: 999px`, dégradé clair + bordure + point pulsant — seul élément avec un `linear-gradient`.
- **Modal** : overlay plein écran centré (`position: fixed; inset:0`), clic sur l'overlay ferme sauf pendant l'étape `processing` ; le modal est un **state machine à 4 étapes** (`summary → card → processing → success`) piloté par un seul `useState("step")`, chaque étape étant un bloc JSX conditionnel avec sa propre classe `.modal-step` (+ variante `.modal-step-centered` pour les étapes non-listées).
- **Formulaire de carte** : inputs avec label au-dessus (`.card-label` en uppercase), formatage live (regex) pour le numéro de carte et la date d'expiration, validation dérivée (`canPay`) plutôt que stockée en state.
- **Listes de lignes** (panier, résumé de commande, reçu) : même pattern répété 3 fois (`.cart-item`, `.modal-item-row` x2) — emoji + nom (flex:1) + quantité + prix, sans composant partagé.
- **États vides/désactivés** : texte gris centré (`.cart-empty`), boutons disabled avec fond/texte gris dédiés.
- **Iconographie** : emojis natifs uniquement (🛒 🛵 🍔 ✕ ✓...), pas de librairie d'icônes SVG.

## 7. Conventions de nommage CSS

- `kebab-case` partout, classes utilitaires-descriptives à plat (pas de BEM strict, mais un début de convention modificateur avec `--` sur 1 cas : `.modal-item-list--receipt`) et un état `.active` / `:disabled` / `:hover` géré en CSS natif plutôt qu'en classes conditionnelles (sauf `.filter-btn.active` et `.modal-step-centered`).
- Préfixe par domaine : `modal-*` pour tout ce qui est dans `PaymentModal`, `cart-*` pour `Cart`, `dish-*`/`menu`/`category-*`/`filter-*` pour `Menu`.

## 8. Conventions React

- Composants fonctionnels, props destructurées en signature.
- Pas de `PropTypes`/TypeScript — projet en JS pur.
- Génération d'ID/valeurs dérivées via `useState(fn)` (lazy init) : `useState(generateOrderNumber)`, `useState(() => new Date())`.
- `useEffect` utilisé uniquement pour le minuteur de simulation de paiement (`processing → success` après 2s).
- Handlers d'input inline avec regex de formatage (carte bancaire, expiry) définis comme fonctions nommées dans le composant plutôt qu'inline JSX quand la logique dépasse une ligne.
- Style inline (`style={{...}}`) utilisé ponctuellement dans `App.jsx` pour un cas isolé (logo/titre) — seule dérogation au tout-CSS-externe.

## 9. Points d'attention pour l'évolution future

- **Pas de design tokens** : couleurs/tailles dupliquées en dur. Premier chantier recommandé : extraire des `:root { --color-primary: #00c1b2; ... }` et migrer les valeurs.
- **Pas de composant `Button`/`Row`/`PriceLine` partagés** malgré 5 variantes de boutons et 3 listes de lignes quasi identiques — bon candidat de factorisation avant d'ajouter de nouveaux écrans.
- **Aucune media query** : tout nouveau développement mobile nécessitera de définir les breakpoints et le comportement du layout 2 colonnes (menu/cart) en dessous d'une certaine largeur.
- **Incohérence de font-family** entre `index.css` et `App.css` (la seconde gagne toujours) à nettoyer si `index.css` doit un jour servir.
- **Emojis comme unique système d'icônes** : à remplacer par une librairie SVG si le produit doit gérer plusieurs plateformes/rendus cohérents.

Ce document reflète l'état du code au 2026-07-01. À mettre à jour si la palette, la typographie ou les patterns de composants évoluent.
