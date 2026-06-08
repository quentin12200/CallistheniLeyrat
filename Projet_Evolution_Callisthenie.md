# Projet Évolution Callisthénie

## Contexte

Le projet actuel est une application HTML de suivi d'un programme de callisthénie inspiré du programme Decathlon sur 28 jours.

L'objectif est désormais de transformer cette application en une véritable application mobile (PWA) moderne, utilisable quotidiennement par deux utilisateurs distincts : **Quentin** et **Sophie**.

## Gestion multi-utilisateurs

Au lancement de l'application, afficher un écran de sélection du profil :

- Quentin
- Sophie

Chaque utilisateur doit disposer de :

- Son propre calendrier
- Son propre historique
- Son propre niveau
- Ses statistiques
- Ses rappels et notifications
- Son propre programme

Les données doivent être totalement indépendantes.

## Expérience smartphone

L'application doit être conçue en priorité pour une utilisation sur smartphone.

**Objectifs :**

- Interface responsive
- Utilisation confortable à une main
- Boutons larges
- Police lisible
- Compatible Android et iPhone
- Installation possible sur l'écran d'accueil
- Transformation en Progressive Web App (PWA)

## Notifications

Mettre en place un système de notifications personnalisées.

### Notifications quotidiennes

Exemples :

- C'est l'heure de ta séance du jour
- Plus qu'une séance pour battre ton record de régularité !
- Ton futur toi te remerciera.

### Notifications de relance

Si aucune séance n'est réalisée :

- **Après 1 jour** : petit rappel bienveillant.
- **Après 3 jours** : notification de motivation.
- **Après 7 jours** : notification plus insistante pour reprendre l'entraînement.

Chaque utilisateur choisit :

- Heure de notification
- Activation ou désactivation

> **Cible : Android.** L'application est utilisée sur Android. Les notifications doivent donc s'appuyer sur l'API Notification + service worker, qui fonctionnent bien sur Android (contrairement à iOS où elles sont très limitées). Pour les rappels à heure fixe et les relances après 1 / 3 / 7 jours sans serveur (pas de backend autorisé), planifier les notifications à l'ouverture de l'application via le service worker. Demander la permission de notification au bon moment (pas dès le premier lancement, mais après une première interaction positive).

## Calendrier

Créer un calendrier complet.

Chaque journée doit afficher :

- Séance prévue
- Séance réalisée
- Séance manquée
- Jour de repos

**Couleurs :**

- 🟢 Vert : séance réalisée
- 🔴 Rouge : séance manquée
- 🔵 Bleu : repos
- 🟠 Orange : jour actuel

Possibilité de consulter les mois précédents.

## Programme progressif infini

Le programme actuel se termine au bout de 28 jours. Je souhaite qu'il continue automatiquement sans limite.

- **Cycle 1 — Jours 1 à 28** : programme débutant.
- **Cycle 2 — Jours 29 à 56** : augmentation de +10 % de répétitions et +5 secondes de gainage.
- **Cycle 3 — Jours 57 à 84** : augmentation de +10 % de répétitions et réduction légère du temps de récupération.
- **Cycles suivants** : la progression continue automatiquement.

L'utilisateur ne doit jamais atteindre la fin du programme.

## Adaptation automatique de la difficulté

L'application doit s'adapter au niveau réel de l'utilisateur.

- Si plusieurs séances sont réussies facilement : augmenter légèrement la difficulté.
- Si plusieurs séances sont échouées : réduire temporairement la difficulté.

**Objectif :** maintenir un niveau stimulant mais réalisable.

## Système de niveaux

Créer un système RPG.

**Niveaux :**

- Niveau 1 : Débutant
- Niveau 2 : Apprenti
- Niveau 3 : Confirmé
- Niveau 4 : Avancé
- Niveau 5 : Expert
- Niveau 6 : Maître

Le niveau progresse grâce :

- Aux séances réalisées
- À la régularité
- Aux séries de jours consécutifs

## Expérience RPG

Ajouter une dimension jeu vidéo.

Chaque séance rapporte :

- XP (points d'expérience)
- Progression du niveau

**Bonus :**

- Série quotidienne
- Objectifs atteints
- Défis terminés

### Succès et badges

Exemples :

- Première séance
- 7 jours consécutifs
- 30 séances réalisées
- 100 pompes cumulées
- 10 heures d'entraînement
- 100 jours d'utilisation

## Tableau de bord

Afficher :

**Statistiques**

- Poids actuel
- Poids de départ
- Évolution du poids
- Nombre de séances
- Temps total d'entraînement
- Série actuelle
- Meilleure série

**Progression**

- XP actuelle
- Niveau
- Objectif suivant

## Gestion du poids

Permettre l'enregistrement :

- Poids
- Tour de taille
- Observations

Afficher les évolutions sous forme de graphiques.

## Chronomètre avancé

Améliorer le timer actuel.

**Fonctionnalités :**

- Compte à rebours
- Signal sonore
- Vibration
- Pause
- Reprise
- Séries automatiques

## Bibliothèque d'exercices

Créer une fiche détaillée pour chaque exercice.

**Contenu :**

- Nom
- Description simple
- Muscles travaillés
- Illustration
- Erreurs fréquentes
- Conseils pour débutants

## Personnalisation

Chaque utilisateur doit pouvoir choisir :

**Objectif**

- Perte de poids
- Remise en forme
- Renforcement musculaire
- Endurance

**Rythme**

- 3 jours par semaine
- 4 jours par semaine
- 5 jours par semaine
- Quotidien

**Niveau**

- Débutant
- Intermédiaire
- Avancé

## Sauvegarde

Prévoir :

- **Version actuelle** : sauvegarde locale dans le navigateur.
- **Évolution future** : synchronisation cloud, compte utilisateur, synchronisation multi-appareils.

## Vision finale

Créer une application de coaching sportif personnelle pour Quentin et Sophie.

L'application doit :

- Être simple à utiliser
- Être agréable sur smartphone
- Motiver dans la durée
- Adapter automatiquement la difficulté
- Fournir un programme sans fin
- Donner envie de revenir chaque jour grâce à un système RPG, des statistiques et des récompenses

### Ton et état d'esprit (priorité forte)

L'application doit être **profondément encourageante**, jamais culpabilisante.

- Chaque écran doit valoriser l'effort, pas juste le résultat.
- Après chaque séance terminée : message de félicitations chaleureux et varié (pour éviter la répétition).
- En cas d'absence : ton bienveillant, jamais de reproche (« on reprend en douceur » plutôt que « tu as raté X jours »).
- Mettre en avant les progrès et les séries plutôt que les manques.
- Les notifications doivent motiver, pas faire culpabiliser.
- Vocabulaire positif et tutoiement amical partout (« Bravo », « Tu assures », « Ton futur toi te remerciera »).

---

# Consignes de développement pour l'IA

Avant de coder, analyser le fichier HTML existant.

Objectif : transformer le fichier actuel en application mobile PWA sans casser les fonctions déjà présentes.

## Contraintes

- Ne pas utiliser de backend.
- Ne pas demander de compte utilisateur.
- Sauvegarder les données avec localStorage.
- Séparer totalement les données de Quentin et Sophie.
- Garder le timer existant ou l'améliorer.
- Garder le programme 28 jours comme base.
- Ajouter une progression automatique après 28 jours.
- Le code doit être clair, commenté et maintenable.
- L'application doit fonctionner sur smartphone.
- L'application doit pouvoir être installée comme PWA.
- L'application doit être encourageante et bienveillante dans tous ses textes (jamais culpabilisante).
- Cible principale : **Android**.

## Fichiers attendus

- index.html
- style.css
- app.js
- manifest.json
- service-worker.js

## Priorités

1. Application fonctionnelle.
2. Gestion Quentin / Sophie.
3. Sauvegarde séparée.
4. Calendrier.
5. Timer.
6. Progression après 28 jours.
7. Notifications.
8. Système RPG.

## Interdictions

- Ne pas supprimer les fonctionnalités existantes.
- Ne pas rendre obligatoire une connexion internet.
- Ne pas créer de système de compte.
- Ne pas compliquer inutilement l'interface.
- Ne pas mettre trop de texte sur l'écran principal.

## Résultat attendu

Une application simple, claire, utilisable tous les jours sur téléphone, avec un choix de profil au démarrage, un suivi personnel et une progression automatique.

---

# Données à fournir / décisions à trancher

Cette section comble les zones que le fichier HTML existant ne définit pas. Les valeurs ci-dessous sont des **propositions par défaut** : à valider ou modifier. Si rien n'est précisé, l'IA applique ces valeurs par défaut.

## 1. Bien distinguer les deux notions de « niveau »

Le fichier actuel utilise « niveau » pour le **niveau de départ** (Reprise tranquille / Normal / Déjà à l'aise). Le cahier des charges utilise « niveau » pour le **système RPG** (Débutant → Maître). Ce sont deux choses différentes : ne pas écraser l'une avec l'autre.

- **Niveau de départ** : conservé tel quel, choisi une fois dans les réglages.
- **Niveau RPG** : gagné progressivement avec l'XP (voir ci-dessous).

## 2. Système RPG — XP et paliers (valeurs par défaut proposées)

- Séance terminée : **+100 XP**
- Séance terminée sans en avoir raté la veille (régularité) : **+20 XP bonus**
- Série de jours consécutifs : **+10 XP par jour de série**
- Défi / objectif atteint : **+50 XP**

Paliers de niveau RPG :

| Niveau | Nom        | XP cumulée requise |
|--------|------------|--------------------|
| 1      | Débutant   | 0                  |
| 2      | Apprenti   | 500                |
| 3      | Confirmé   | 1 500              |
| 4      | Avancé     | 3 500              |
| 5      | Expert     | 7 000              |
| 6      | Maître     | 12 000             |

## 3. Règle d'adaptation automatique de la difficulté (valeurs par défaut proposées)

Le code actuel ne réagit pas aux réussites/échecs : il faut l'ajouter.

- Après **3 séances réussies « facilement » d'affilée** (l'utilisateur le signale via un bouton après la séance : « facile / ok / dur ») : augmenter légèrement la difficulté (1 tour de circuit ou +5 reps, jamais les deux).
- Après **2 séances marquées « trop dures » ou échouées** : réduire temporairement (–1 tour ou –5 reps) pendant le cycle en cours.
- Toujours rester dans la logique de cycles existante : jamais d'augmentation brutale.

## 4. Suivi du poids et du tour de taille

Non présent dans le fichier actuel — à ajouter.

- Stocker par profil : date, poids, tour de taille, observation libre.
- Affichage en courbe simple. **Pas de dépendance externe lourde** : privilégier un graphique en `<canvas>` maison ou SVG léger pour rester installable hors-ligne.

## 5. Migration des données existantes (point technique)

Le fichier actuel sauvegarde sous des clés communes : `startDate`, `level`, `done_1`, `done_2`…

- Préfixer toutes les clés par profil : `quentin_done_1`, `sophie_done_1`, etc.
- Au premier lancement de la nouvelle version, proposer de rattacher les anciennes données (non préfixées) au profil de Quentin par défaut, pour ne rien perdre.

## 6. PWA et icônes

- `manifest.json` avec icônes **192×192** et **512×512** (placeholders générés acceptés, à remplacer plus tard).
- `service-worker.js` pour le mode hors-ligne (mise en cache des fichiers) et la planification des notifications.
- Couleur de thème : reprendre le rouge existant (`#d71920`) et le fond sombre (`#171717`).

## 7. Calendrier — autorisation de modifier le code couleur

Le calendrier actuel ne gère que « fait » (vert) et « aujourd'hui » (contour rouge). L'IA **a le droit** de retoucher ce code couleur pour appliquer le schéma demandé : vert = réalisée, rouge = manquée, bleu = repos, orange = jour actuel. Cela ne compte pas comme « casser l'existant ».

## 8. Programme 28 jours — déjà fourni

Inutile de re-fournir le programme : il est entièrement codé dans la fonction `workout(day)` du fichier HTML existant (exercices, séries, répétitions, logique de cycles et de progression). L'IA doit s'appuyer dessus et l'étendre, pas le réécrire de zéro.
