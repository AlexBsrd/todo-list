# Todo List App

Une application de gestion de tâches développée avec React, TypeScript et Next.js dans le cadre d'un test technique.
Le résultat est disponible sur https://alexbsrd.github.io/todo-list/.

## 🚀 Fonctionnalités présentes (03/02/25 21h30)

- Création de nouvelles tâches
- Persistence des données dans le localStorage du navigateur
- Recherche parmi les tâches existantes
- Marquage des tâches comme terminées
- Suppression globale de toutes les tâches
- Thème clair/sombre (via les préférences système)

## 🛠 Technologies/Librairies utilisées

- **Next.js** - Framework React
- **TypeScript** - Pour le typage
- **React Context** - Pour la gestion d'état globale
- **TailwindCSS** - Framework CSS
- **Lucide Icons** - Bibliothèque d'icônes modernes

## 🏗 Architecture du projet

### Structure des Components
```
src/
├─ components/      # Composants React réutilisables
│  ├─ TaskForm/    # Formulaire d'ajout de tâches
│  ├─ TaskList/    # Liste des tâches et items individuels
│  └─ TaskSearch/  # Barre de recherche
├─ contexts/       # Context React pour la gestion d'état
├─ types/         # Types TypeScript
└─ utils/         # Utilitaires (localStorage, etc.)
```

## 🚗 Démarrage rapide en local

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev
```

## 💭 Commentaires

Merci pour l'intitulé, j'ai passé environ deux heures sur ce projet en m'aidant de Claude.ai pour apprendre les bases de Next.js que j'utilisais pour la première fois.

Claude m'a également aidé pour poser l'arborescence du projet étant donné qu'elle est dirigée par les contraintes/avantages (au choix 😉) de Next.js, mais également pour tout le design. Même si j'en avais entendu parler je n'avais jamais utilisé Tailwind et c'est conforme aux retours que j'avais lu : très verbeux mais très pratique. 😄

J'ai beaucoup apprécié découvrir ce nouveau framework, j'étais un peu rouillé en React mais j'ai vite retrouvé les bases acquises pendant mes études. Durant mes échanges avec Claude j'ai également quelques fois fait le "pendant" avec la manière dont telle ou telle fonctionnalité est implémentée en Angular et ce fut très intéressant !

Je trouves super sympa la possibilité de choisir directement par composant le fait de faire le rendering côté client ou côté serveur, je n'avais encore jamais vu ça et c'est vrai que cette gestion là est beaucoup plus globale en angular.

Il s'agit vraiment d'une base de projet, je pourrais passer des jours à implémenter des fonctionnalités qui me viennent en tête.

Je fais la liste ci-dessous, je pourrai éventuellement les implémenter si besoin 😊.

## 🎯 Futures améliorations envisagées

- [ ] Ajout de catégories pour les tâches (notamment avec des couleurs)
- [ ] Filtres avancés (par statut, date, catégorie, etc.)
- [ ] Support des sous-tâches (je penses notamment aux devs avec des features et des US 😉)
- [ ] Ajout de dates d'échéance
- [ ] Notifications pour les tâches importantes (ex: recevoir un mail quotidien récapitulatif ou une notification quand une tâche approche de sa date d'échéance)
- [ ] Chiffrer le titre des tâches dans le localStorage pour éviter la fuite d'infos confidentielles (tiré par les cheveux je l'avoue, mais possible avec du cross-site scripting...)
- [ ] Stocker les tâches dans une BDD et faire un mécanisme très simple de compte, par exemple un uuid utilisateur que je pourrais rentrer sur l'interface sur mon téléphone pour récupérer mes tâches (UUID pour limiter la possibilité de brute-force)
