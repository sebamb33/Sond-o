# Sondéo - Plateforme de Sondage avec Statistiques

Sondéo est une plateforme de sondage en ligne qui permet aux utilisateurs de créer des sondages, de recueillir des réponses et d'analyser les statistiques. Ce projet utilise Next.js avec Vite pour une expérience front-end rapide et moderne, et un backend Express.js pour gérer les API. Les données sont stockées dans une base de données MySQL.

## Caractéristiques

- Création et gestion de sondages
- Analyse statistique des résultats des sondages
- Interface utilisateur responsive et moderne
- Backend API avec Node.js et Express
- Base de données MySQL pour le stockage des données

## Démarrage rapide

Pour lancer le projet sur votre machine locale à des fins de développement et de test, suivez ces étapes.

### Prérequis

- Docker
- Node.js (pour le développement local sans Docker)

### Installation

1. Clonez le dépôt sur votre machine locale.

   ```sh
   git clone https://github.com/sebamb33/Sond-o.git
   cd sondeo

   ```

2. Initilisé le front :

   ```sh
   npm i

   ```

3. Initialisé le back
   ```sh
   cd backend/sandeoDB/src
   mv exemple-data-source.ts data-source.ts #Change value for connect BD
   npm i
   npm start
   ```

Executé les migrations:
    ```sh
    npx typeorm-ts-node-commonjs  migration:run -d src/data-source.ts
    ```
