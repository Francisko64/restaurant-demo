# Sélecteur d'humeur — Origin & Vibe (restaurant-demo)

---

# Context & User Persona

Aujourd'hui, la sélection de plats se fait via un filtre par catégorie (Starters/Mains/Desserts) neutre et non personnalisé. Avec un catalogue volontairement restreint (12 à 14 plats visibles sur un seul écran), le problème n'est pas la découvrabilité du menu mais l'absence d'un moment fort et différenciant dans le parcours — rien dans l'interface ne transmet de personnalité ou de plaisir de choix.

**Persona principal :** le *visiteur-évaluateur* — une personne qui teste le prototype restaurant-demo pour juger sa qualité produit/UX (pas un vrai client affamé passant une commande réelle), et qui doit ressentir en quelques secondes que l'app a un point de vue distinctif.

**Persona secondaire (interne) :** le *porteur du projet*, qui présente la démo en live et a besoin que chaque combinaison de sélection reste visuellement cohérente — aucun rendu raté (couleurs qui jurent, dégradé terne) ne doit apparaître pendant une démonstration.

**KPI :** aucun KPI business formel — projet démo/portfolio sans base d'utilisateurs réelle. L'objectif qualitatif (North Star informel) est l'impression de personnalité et de soin perçue par le visiteur-évaluateur dans les premières secondes d'interaction avec le sélecteur.

---

# User Stories

## Epic — Sélecteur Origin & Vibe

**Visiteur-évaluateur**

1. En tant que visiteur-évaluateur, **quand j'arrive sur la page du menu**, je veux voir un sélecteur d'ambiance (Origin + Vibe) clairement distinct du reste de l'interface, afin de comprendre immédiatement qu'il existe une manière personnalisée de choisir mon repas.
2. En tant que visiteur-évaluateur, **quand je sélectionne un ou plusieurs chips Origin**, je veux que le fond de la page change pour refléter cette sélection, afin de ressentir un retour visuel immédiat et gratifiant.
3. En tant que visiteur-évaluateur, **quand je combine plusieurs chips (Origin et/ou Vibe)**, je veux que le menu se filtre selon une logique cohérente, afin de trouver des plats qui correspondent réellement à mes critères combinés.
4. En tant que visiteur-évaluateur, **quand ma combinaison de filtres ne correspond à aucun plat**, je veux voir les plats les plus proches plutôt qu'un écran vide, afin de ne jamais être bloqué dans mon exploration.
5. En tant que visiteur-évaluateur, **quand je fais défiler la liste des plats**, je veux que le sélecteur reste visible en haut de l'écran, afin d'ajuster mes filtres sans remonter en haut de page.

**Porteur du projet (interne)**

6. En tant que porteur du projet, **quand une combinaison de 3 origines ou plus est sélectionnée simultanément**, je veux que l'interface retombe sur un fond neutre plutôt que d'afficher un dégradé non testé, afin d'éviter tout rendu visuel raté lors d'une démonstration.

---

# Releases

**MVP (Release 1) — Sélecteur Origin & Vibe complet**
- Nouveau modèle de données : champs `origin` et `moods` par plat, ajout de 2 plats d'origine asiatique (Vietnamese Spring Rolls, Pad Thai)
- Barre de sélection flottante et sticky, chips Origin + chips Vibe, multi-sélection
- Logique de filtrage combinée (OR intra-axe, AND inter-axes) avec fallback "plats les plus proches"
- Reskin dynamique du fond (pastel, priorité Origin puis Vibe, plafond à 2 couleurs)
- Suppression complète de l'ancien filtre par catégorie

Pas de découpage en releases suivantes : livraison en un seul incrément, choix délibéré (périmètre déjà validé dans son ensemble, rien ne dépend d'un lot ultérieur).

---

# Acceptance Criteria

**Story 1 — Sélecteur visible**
- GIVEN je suis sur la page du menu, WHEN la page se charge, THEN une barre flottante contenant des chips Origin et des chips Vibe est visible juste sous l'en-tête, avant toute interaction.
- GIVEN je regarde la barre de sélection, WHEN aucun chip n'est sélectionné, THEN tous les chips sont affichés en état neutre (fond blanc, bordure grise) et le fond de la page reste crème par défaut.

**Story 2 — Reskin dynamique**
- GIVEN aucun filtre n'est actif, WHEN je sélectionne un unique chip Origin, THEN le fond de la colonne Menu prend la teinte pastel associée à cette origine, et le chip sélectionné se colore avec sa propre couleur pleine.
- GIVEN un chip Origin est déjà sélectionné, WHEN je sélectionne un deuxième chip Origin, THEN le fond devient un dégradé des deux teintes pastel avec un point de passage crème au milieu.
- GIVEN aucun chip Origin n'est sélectionné, WHEN je sélectionne un ou deux chips Vibe, THEN le fond réagit de la même manière (pastel unique ou dégradé à deux teintes) en utilisant les couleurs Vibe.
- GIVEN un chip Origin est actif, WHEN je sélectionne également un chip Vibe, THEN le fond continue d'être piloté uniquement par la sélection Origin.

**Story 3 — Filtrage combiné**
- GIVEN je sélectionne deux chips Origin (ex : Italien + Indien), WHEN le menu se met à jour, THEN tous les plats Italiens OU Indiens s'affichent.
- GIVEN je sélectionne un chip Origin et un chip Vibe, WHEN le menu se met à jour, THEN seuls les plats correspondant à l'origine sélectionnée ET à l'humeur sélectionnée s'affichent.
- GIVEN aucun chip n'est sélectionné dans un axe, WHEN le menu se filtre, THEN cet axe n'exerce aucune contrainte sur le résultat.

**Story 4 — Closest match**
- GIVEN ma combinaison de filtres ne retourne aucun plat, WHEN le menu se met à jour, THEN le titre de la section passe de "Menu" à "Plats les plus proches" et les plats partageant au moins un des tags sélectionnés s'affichent.
- GIVEN je suis en mode "plats les plus proches", WHEN je retire un filtre pour que l'intersection redevienne non vide, THEN le titre repasse à "Menu" et le filtrage strict reprend.

**Story 5 — Barre sticky**
- GIVEN je fais défiler la liste des plats vers le bas, WHEN la barre de sélection sort du haut de l'écran, THEN elle reste fixée sous l'en-tête et reste utilisable.
- GIVEN la barre de sélection est fixée en haut, WHEN je regarde le panneau "Your Order", THEN aucun chevauchement ni proximité visuelle gênante n'existe entre les deux éléments.

**Story 6 — Garde-fou 3+ sélections**
- GIVEN j'ai déjà 2 chips Origin sélectionnés, WHEN je sélectionne un 3ème chip Origin, THEN le fond retombe immédiatement sur le crème neutre par défaut.
- GIVEN 3 chips Origin ou plus sont actifs, WHEN j'en désélectionne un pour revenir à 2, THEN le dégradé à deux couleurs se réaffiche normalement.

---

# Management Rules

**Filtrage**
- Au sein d'un même axe (Origin ou Vibe), les sélections multiples sont combinées en OR.
- Entre les deux axes, la combinaison est en AND.
- Un axe sans sélection n'exerce aucune contrainte.
- Le fallback "closest match" ne s'active que si l'intersection stricte est vide ET qu'au moins un filtre est actif ; jamais quand rien n'est sélectionné.

**Reskin**
- Priorité de la source de couleur : Origin sélectionné(s) > Vibe sélectionné(s) (si aucun Origin actif) > crème par défaut (si rien n'est sélectionné).
- 1 couleur active dans l'axe prioritaire → fond pastel uni.
- 2 couleurs actives → dégradé à 2 teintes pastel avec point de passage crème à 50 %.
- 3 couleurs actives ou plus dans le même axe → fond crème neutre (pas de dégradé).
- Les valeurs pastel sont des constantes précalculées (85 % crème / 15 % teinte d'origine), pas un calcul de mélange en temps réel.

**Données**
- Chaque plat a un `origin` parmi 5 valeurs fixes (Italian, French, American, Indian, Asian) ou `null`, et une liste de 1 à 2 `moods` parmi 5 valeurs fixes (Comforting, Fresh & Light, Bold & Spicy, Treat Yourself, Healthy-ish).
- Les vocabulaires Origin et Vibe sont fermés — pas de valeur libre.

---

# Edge Cases

- Si un plat n'a pas d'`origin` (Soupe, Saumon) et qu'un chip Origin est sélectionné → le plat est exclu du filtre Origin, sauf s'il correspond au filtre Vibe actif.
- Si l'utilisateur sélectionne puis désélectionne rapidement un chip → le fond et le filtrage suivent chaque changement d'état sans lag perceptible ni état transitoire visible.
- Si l'utilisateur a 2 chips Origin et 2 chips Vibe actifs simultanément → le fond reste piloté uniquement par les 2 Origin (règle de priorité), même si les Vibe sont aussi actifs.
- Si le "closest match" est actif et que l'utilisateur ajoute un filtre supplémentaire → le calcul de proximité se relance sur la nouvelle combinaison, avec retour au mode strict si un résultat existe désormais.
- Si tous les chips d'un axe sont désélectionnés d'un coup → retour immédiat à l'état par défaut (crème, pas de filtrage sur cet axe).

---

# Designs & Workflow Diagrams

Pas de prototype Figma externe pour ce projet. Les décisions visuelles (palette, disposition de la barre, formule des dégradés) ont été validées par des tests live directement dans le navigateur au cours de la conception (captures d'écran de la session de conception, pas de lien externe disponible à ce stade).

---

# Tracking

*Pas de KPI business formel (projet démo) — le tracking ci-dessous sert uniquement à l'observation qualitative, pas à la mesure d'un objectif chiffré.*

**chip_selected**
- Trigger : à chaque sélection/désélection d'un chip Origin ou Vibe
- Propriétés clés : `axis` ("origin" | "vibe"), `value` (nom du chip), `action` ("select" | "deselect")
- Métrique servie : aucune — observation de l'usage du picker

**closest_match_shown**
- Trigger : quand le fallback "plats les plus proches" s'active
- Propriétés clés : `active_origins` (liste), `active_vibes` (liste)
- Métrique servie : aucune — signal pour repérer si le fallback se déclenche trop souvent (vocabulaire mal calibré)

**reskin_capped**
- Trigger : quand 3 sélections ou plus dans un même axe forcent le retour au fond neutre
- Propriétés clés : `axis`, `selection_count`
- Métrique servie : aucune — sert à évaluer si la limite à 2 couleurs est trop restrictive en usage réel

---

# Rollout Plan

Projet démo sans base d'utilisateurs segmentable — pas de rollout progressif par cohorte (Alpha/Beta/Stable %).

| Phase | Audience | Timing | État | Objectif |
|---|---|---|---|---|
| Preview locale | Porteur du projet uniquement | Immédiat après implémentation | MVP complet | Valider l'absence de bug bloquant et la cohérence visuelle de toutes les combinaisons |
| Partage public de la démo | Tous les visiteurs du lien démo | Après validation en preview locale | MVP complet | Pas de mesure quantitative — recueil de retours qualitatifs informels |

---

# Testing Plan

**Avant release MVP**
- [ ] La barre de sélection s'affiche sous l'en-tête dès le chargement, sans chevaucher le panneau "Your Order"
- [ ] Chaque chip Origin en sélection unique applique le bon fond pastel (vérifier les 5 couleurs)
- [ ] Chaque combinaison à 2 chips Origin applique le dégradé à 2 teintes avec point de passage crème (vérifier en particulier Indien+Français et Italien+Asiatique, déjà identifiées comme sensibles lors des tests de conception)
- [ ] La sélection de 3 chips Origin ou plus retombe bien sur le fond crème neutre
- [ ] Le comportement Vibe (identique à Origin) fonctionne quand aucun Origin n'est sélectionné
- [ ] La priorité Origin > Vibe est respectée quand les deux axes ont des sélections actives
- [ ] Le filtrage OR intra-axe / AND inter-axes retourne les bons plats sur plusieurs combinaisons testées manuellement
- [ ] Le fallback "plats les plus proches" s'affiche quand l'intersection est vide, avec le bon changement de titre de section
- [ ] La barre reste sticky au scroll sur la liste de plats complète (après ajout des 2 nouveaux plats asiatiques)
- [ ] Les 2 nouveaux plats (Vietnamese Spring Rolls, Pad Thai) apparaissent correctement dans leur catégorie avec leurs tags origin/vibe

**Flows critiques à tester avant toute release**
- Parcours nominal : sélectionner un Origin unique → voir le reskin + filtrage → ajouter un Vibe → voir le filtrage combiné
- Parcours dégradé : sélectionner une combinaison sans aucun plat correspondant → voir le fallback "plats les plus proches" → retirer un filtre → retour au mode strict
- Parcours limite : sélectionner 3 Origins d'affilée → vérifier le retour au fond neutre → désélectionner un → vérifier le retour au dégradé à 2 couleurs
