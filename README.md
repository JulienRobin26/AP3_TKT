# AP3_TKT

Application React de gestion pour le parc Disneyland Paris, avec authentification par cookie JWT.

## Stack technique

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Base de donnees: MySQL (mysql2)
- Authentification: JWT + cookie httpOnly

## Prerequis

- Node.js 18+
- npm
- MySQL

## Structure du projet

Le projet est organise en deux parties principales:

- `AP3_TKT/` : frontend React (Vite)
- `AP3_TKT/API/` : backend Express

## Installation

Depuis la racine du workspace:

```bash
cd AP3_TKT
npm install

cd API
npm install
```

## Configuration des variables d'environnement

Creer un fichier `.env` dans `AP3_TKT/API/` avec le contenu suivant:

```env
API_PORT=3006
JWT_SECRET=change_me_super_secret
NODE_ENV=development

host=localhost
user=root
password=mot_de_passe_mysql
database=nom_de_ta_base
db_port=3306
```

Important:

- Le frontend appelle l'API sur `http://localhost:3006`.
- Si tu changes `API_PORT`, pense a mettre a jour les URLs `fetch` cote frontend.

## Lancer le projet

Ouvrir deux terminaux.

Terminal 1 (backend):

```bash
cd AP3_TKT/API
npm start
```

Terminal 2 (frontend):

```bash
cd AP3_TKT
npm run dev
```

## Acces

- Frontend: http://localhost:5173
- API: http://localhost:3006
- Test API: http://localhost:3006/

## Scripts utiles

### Frontend (`AP3_TKT/package.json`)

- `npm run dev` : demarre le serveur Vite
- `npm run build` : build de production
- `npm run preview` : previsualisation du build
- `npm run lint` : verification ESLint

### Backend (`AP3_TKT/API/package.json`)

- `npm start` : demarre le serveur avec nodemon

## Endpoints principaux

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/recup_infos`
- `GET /users`, `GET /attraction`, `GET /missions`, etc. selon les routes metier

## Fonctionnalites principales

- Connexion utilisateur
- Gestion des utilisateurs (admin)
- Gestion des missions (Admin)
- Gestion des attractions (Admin)
- Gestion des alertes (User peux crée des alertes mais les Admin seulement peuvent les modifier et suprimer)
- Affichage des attractions
- Affichages des alertes
- Affichages des mission User/Admin
- affichages des Users (Admin)
- Déconnection 
- Profil utilisateur

## Jeu d'essai utilisateurs

Les identifiants ci-dessous peuvent servir pour les tests de connexion:

| ID | Nom | Email | Mot de passe |
| --- | --- | --- | --- |
| LMartin | Léa Martin | lea.martin@disneyland.fr | L7m@N9qP2xVb |
| LBernard | Lucas Bernard | lucas.bernard@disneyland.fr | aT8#rK3vN9sD |
| EDubois | Emma Dubois | emma.dubois@disneyland.fr | Z2w$L9pQ7mRx |
| HLaurent | Hugo Laurent | hugo.laurent@disneyland.fr | qH6!tB8nV3kP |
| CMoreau | Chloé Moreau | chloe.moreau@disneyland.fr | M9y@dF4sJ7xL |

## Depannage rapide

- Erreur CORS: verifier que le frontend tourne sur `http://localhost:5173`.
- Erreur de connexion API: verifier que `API_PORT=3006` dans `.env`.
- Erreur MySQL: verifier les identifiants (`host`, `user`, `password`, `database`, `db_port`).

## Auteur

- Julien Robin
- Alexis Dejean