# Blog (MERN)

 Blog (MERN) est une application basée sur le stack MERN (MongoDB, Express.js, React.js, Node.js) qui permet de créer un espace membre avec un blog intégré. Les utilisateurs peuvent s'inscrire, se connecter, créer des billets, gérer les commentaires et interagir avec d'autres blogs.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js
- MongoDB

## Installation

1. Clonez ce dépôt dans votre répertoire local :

   ```
   git clone ce_projet
   ```

2. Accédez au répertoire du projet :

   ```
   cd blog-mern
   ```

3. Installez les dépendances nécessaires :

   ```
   npm install
   ```

4. Mettez à jour le fichier `package.json` pour refléter les paquets utilisés dans le projet.

## Configuration

Avant de lancer l'application, vous devez effectuer les configurations suivantes :

1. Configurer la base de données MongoDB :
   - Ouvrez le fichier `server/config/db.js`
   - Modifiez l'URL de la base de données en remplaçant `mongodb://localhost/blog` par votre URL de base de données MongoDB.

2. Configurer les variables d'environnement :
   - Dupliquez le fichier `.env.example` et renommez-le en `.env`
   - Remplissez les valeurs des variables d'environnement dans le fichier `.env` en fonction de votre configuration.

## Utilisation

1. Lancez le serveur Node.js :

   ```
   npm run server
   ```

2. Démarrez l'application React :

   ```
   npm run client
   ```

3. Accédez à l'application dans votre navigateur :

   ```
   http://localhost:3000
   ```

## Fonctionnalités

- **Espace Membre** : Les utilisateurs peuvent s'inscrire et se connecter à leur compte.
- **Blogs Personnels** : Chaque membre a un blog accessible à l'adresse `http://localhost:4242/<login>`, où `<login>` est le nom du membre.
- **Opérations CRUD** : Les utilisateurs peuvent créer, lire, mettre à jour et supprimer des billets sur leur blog.
- **Commentaires** : Les utilisateurs peuvent voir les commentaires associés à leurs billets et les supprimer.
- **Exploration des Blogs** : Les utilisateurs peuvent voir les billets des autres blogs et laisser des commentaires.
- **Liste des Blogs** : La page d'accueil `http://localhost:4242` affiche la liste de tous les blogs existants.
- **Recherche** : Les utilisateurs peuvent effectuer une recherche dans les titres et le contenu des billets.

## Bonus

- **Réponses aux Commentaires** : Les utilisateurs peuvent répondre aux commentaires et aux réponses des commentaires sans limite de niveaux.

## Catégories (Exercice bonus)

- **Catégories** : Les utilisateurs peuvent attribuer des catégories aux billets, permettant une meilleure organisation et navigation.

---

N'hésitez pas à explorer le code source pour plus de détails sur l'implémentation de chaque fonctionnalité. Amusez-vous bien avec Blog (MERN

) !

**Note :** Ce projet a été réalisé dans le cadre d'un exercice scolaire et peut être soumis à des améliorations et des optimisations.
