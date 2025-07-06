# 🤝 Guide de Contribution - Gestion-Article

## 📋 Vue d'ensemble

Merci de votre intérêt pour contribuer au projet Gestion-Article ! Ce guide vous aidera à comprendre comment participer au développement de la plateforme.

## 🎯 Comment Contribuer

### 1. Gestion des Tâches avec JIRA

![JIRA Dashboard](jira.png)

Toutes les tâches, bugs et améliorations sont gérés via **JIRA** :

- **Création de tickets** : Utilisez JIRA pour créer des tickets de bug ou de feature
- **Suivi des tâches** : Consultez le backlog et les sprints actifs
- **Collaboration** : Commentez et mettez à jour les tickets
- **Reporting** : Suivez l'avancement du projet

### 2. Workflow de Contribution

#### Pour les Bugs
1. **Vérifier** si le bug existe déjà dans JIRA
2. **Créer un ticket** JIRA avec les détails du bug
3. **Fork** le repository GitHub
4. **Créer une branche** pour la correction
5. **Développer** la solution
6. **Tester** localement
7. **Créer une Pull Request**
8. **Mettre à jour** le ticket JIRA

#### Pour les Nouvelles Fonctionnalités
1. **Discuter** de la fonctionnalité dans JIRA
2. **Créer un ticket** JIRA avec les spécifications
3. **Fork** le repository GitHub
4. **Créer une branche** pour la feature
5. **Développer** la fonctionnalité
6. **Tester** localement
7. **Créer une Pull Request**
8. **Mettre à jour** le ticket JIRA

## 🛠️ Configuration de l'Environnement

### Prérequis
- Node.js (v18+)
- PostgreSQL (v14+)
- Docker et Docker Compose
- Git

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/your-repo/gestion-article.git
cd gestion-article

# Déploiement avec Docker
docker-compose -f docker-compose.global.yml up -d

# Ou déploiement séparé
docker-compose -f back-office/docker-compose.yml up -d
docker-compose -f front-office/docker-compose.yml up -d
```

### Configuration des Variables d'Environnement

```bash
# Back-office
cd back-office/server
cp .env.example .env
# Configurer les variables dans .env

# Front-office
cd front-office/client
cp .env.example .env
# Configurer les variables dans .env
```

## 📝 Standards de Code

### Backend (NestJS)
- **TypeScript** strict mode
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **Tests unitaires** avec Jest
- **Documentation** avec Swagger

### Frontend (React)
- **TypeScript** strict mode
- **ESLint** et **Prettier**
- **Tests** avec React Testing Library
- **Responsive design** obligatoire
- **Accessibilité** (WCAG 2.1)

### Conventions de Nommage
- **Variables** : camelCase
- **Fonctions** : camelCase
- **Classes** : PascalCase
- **Constantes** : UPPER_SNAKE_CASE
- **Fichiers** : kebab-case

## 🧪 Tests

### Tests Backend
```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture de code
npm run test:cov
```

### Tests Frontend
```bash
# Tests unitaires
npm run test

# Tests avec coverage
npm run test:coverage
```

## 📋 Processus de Pull Request

### Avant de Soumettre
- [ ] Code conforme aux standards
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] Ticket JIRA mis à jour
- [ ] Code review effectuée

### Template de Pull Request

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Amélioration
- [ ] Documentation

## Ticket JIRA
Lien vers le ticket JIRA : [JIRA-XXX](url)

## Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests d'intégration passent
- [ ] Tests manuels effectués

## Checklist
- [ ] Code conforme aux standards
- [ ] Documentation mise à jour
- [ ] Variables d'environnement documentées
- [ ] Pas de données sensibles exposées
```

## 🚀 Déploiement

### Environnements
- **Development** : Branche `develop`
- **Staging** : Branche `staging`
- **Production** : Branche `main`

### Processus de Déploiement
1. **Merge** vers la branche cible
2. **Tests automatisés** déclenchés
3. **Build** automatique sur Render
4. **Déploiement** automatique
5. **Tests de régression**
6. **Mise à jour** du ticket JIRA

## 📊 Métriques et Qualité

### Métriques de Code
- **Couverture de tests** : Minimum 80%
- **Complexité cyclomatique** : Maximum 10
- **Duplication de code** : Maximum 5%
- **Vulnérabilités** : Zéro critique/haute

### Outils de Qualité
- **SonarQube** pour l'analyse de code
- **ESLint** pour le linting
- **Prettier** pour le formatage
- **Husky** pour les hooks Git

## 🤝 Communication

### Canaux de Communication
- **JIRA** : Suivi des tâches et bugs
- **GitHub Issues** : Discussions générales
- **Email** : security@gestion-article.com (sécurité)
- **Slack/Discord** : Communication d'équipe

### Réunions
- **Daily Standup** : Mise à jour quotidienne
- **Sprint Planning** : Planification des sprints
- **Sprint Review** : Revue des fonctionnalités
- **Retrospective** : Amélioration continue

## 📚 Ressources

### Documentation
- [README.md](README.md) - Vue d'ensemble du projet
- [SECURITY.md](SECURITY.md) - Politique de sécurité
- [API Documentation](https://gestion-article-api.onrender.com/docs) - Documentation Swagger

### Outils
- [JIRA Dashboard](https://your-jira-instance.com) - Gestion de projet
- [GitHub Repository](https://github.com/your-repo/gestion-article) - Code source
- [Render Dashboard](https://dashboard.render.com) - Déploiement

## 🏆 Reconnaissance

### Types de Contributions
- **Code** : Développement de fonctionnalités
- **Tests** : Amélioration de la couverture
- **Documentation** : Mise à jour de la doc
- **Design** : Amélioration de l'UI/UX
- **Sécurité** : Signalement de vulnérabilités

### Programme de Reconnaissance
- **Contributeur du mois** : Mise en avant mensuelle
- **Badges** : Reconnaissance des contributions
- **Mentions** : Crédits dans les releases
- **Accès** : Accès privilégié aux outils

---

## 📞 Contact

Pour toute question concernant les contributions :

- **Équipe de développement** : dev@gestion-article.com
- **Responsable projet** : project@gestion-article.com
- **Sécurité** : security@gestion-article.com

---

**Merci de contribuer à Gestion-Article !** 🚀

*Dernière mise à jour : Janvier 2024* 