# 🔒 Politique de Sécurité - Gestion-Article

## 📋 Vue d'ensemble

La sécurité est une priorité absolue pour le projet Gestion-Article. Ce document décrit nos politiques de sécurité, les procédures de signalement des vulnérabilités, et les mesures de sécurité mises en place.

## 🚨 Signalement de Vulnérabilités

### Comment signaler une vulnérabilité

Si vous découvrez une vulnérabilité de sécurité dans Gestion-Article, nous vous demandons de :

1. **NE PAS** créer d'issue publique sur GitHub
2. **NE PAS** discuter de la vulnérabilité publiquement
3. **Contacter directement** l'équipe de sécurité via email

### Contact Sécurité

- **Email de sécurité :** security@gestion-article.com
- **Temps de réponse :** 48-72 heures
- **Format attendu :** Description détaillée avec étapes de reproduction

### Informations à inclure dans votre rapport

```
Sujet: [SECURITY] Vulnérabilité - [Type de vulnérabilité]

Description:
- Type de vulnérabilité (XSS, CSRF, Injection SQL, etc.)
- Composant affecté (Frontend, Backend, API, etc.)
- Étapes de reproduction détaillées
- Impact potentiel
- Suggestions de correction (optionnel)

Environnement:
- Version du navigateur
- Version de l'application
- Configuration système
```

## 🛡️ Mesures de Sécurité Actuelles

### Authentification et Autorisation

- ✅ **JWT (JSON Web Tokens)** pour l'authentification
- ✅ **Hachage bcrypt** pour les mots de passe
- ✅ **Gestion des rôles** (admin, auteur, lecteur)
- ✅ **Guards NestJS** pour protéger les routes
- ✅ **Validation des données** avec class-validator
- ✅ **Expiration automatique** des tokens

### Protection des Données

- ✅ **Validation des types de fichiers** (images, PDF)
- ✅ **Limitation de taille** des uploads
- ✅ **Noms de fichiers uniques** pour éviter les conflits
- ✅ **Séparation des dossiers** par type de média
- ✅ **Validation côté serveur** de toutes les données

### Sécurité de l'API

- ✅ **Rate limiting** sur les endpoints sensibles
- ✅ **Validation des entrées** avec class-validator
- ✅ **Sanitisation des données** avant stockage
- ✅ **Headers de sécurité** (CORS, CSP, etc.)
- ✅ **Logs de sécurité** pour le monitoring

### Sécurité Frontend

- ✅ **Validation côté client** avec React Hook Form
- ✅ **Protection XSS** avec React
- ✅ **Gestion sécurisée** des tokens d'authentification
- ✅ **Validation des formulaires** en temps réel
- ✅ **Gestion des erreurs** sans exposition d'informations sensibles

## 🔍 Vulnérabilités Connues

### Vulnérabilités Résolues

| Date | Vulnérabilité | Statut | Version | Ticket JIRA |
|------|---------------|--------|---------|-------------|
| 2024-01-15 | Authentification JWT sans expiration | ✅ Résolu | v1.0.0 | SEC-001 |
| 2024-01-10 | Upload de fichiers sans validation | ✅ Résolu | v0.9.5 | SEC-002 |
| 2024-01-05 | Injection SQL dans la recherche | ✅ Résolu | v0.9.0 | SEC-003 |

### Vulnérabilités en Cours d'Investigation

| Date | Vulnérabilité | Priorité | Statut | Ticket JIRA |
|------|---------------|----------|--------|-------------|
| - | Aucune vulnérabilité en cours | - | - | - |

## 🚀 Bonnes Pratiques de Sécurité

### Pour les Développeurs

1. **Validation des Données**
   - Toujours valider les entrées côté serveur
   - Utiliser class-validator pour la validation
   - Sanitiser les données avant stockage

2. **Gestion des Fichiers**
   - Valider le type MIME des fichiers
   - Limiter la taille des uploads
   - Générer des noms de fichiers uniques
   - Stocker les fichiers hors du répertoire web

3. **Authentification**
   - Utiliser des mots de passe forts
   - Implémenter l'expiration des tokens
   - Logout automatique après inactivité
   - Protection contre les attaques par force brute

4. **Base de Données**
   - Utiliser des requêtes préparées
   - Éviter les injections SQL
   - Limiter les permissions de l'utilisateur DB
   - Chiffrer les données sensibles

### Pour les Utilisateurs

1. **Mots de Passe**
   - Utiliser des mots de passe forts et uniques
   - Ne pas partager vos identifiants
   - Changer régulièrement vos mots de passe
   - Activer l'authentification à deux facteurs si disponible

2. **Sécurité des Sessions**
   - Se déconnecter après utilisation
   - Ne pas partager votre session
   - Utiliser des connexions sécurisées (HTTPS)
   - Surveiller l'activité de votre compte

## 🔧 Configuration de Sécurité

### Variables d'Environnement Sécurisées

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=24h

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=gestion_article_user
DB_PASSWORD=secure_password
DB_DATABASE=gestion_article_db

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif
ALLOWED_DOCUMENT_TYPES=application/pdf

# Security Headers
CORS_ORIGIN=https://gestion-article-frontoffice.onrender.com
CSP_POLICY="default-src 'self'; script-src 'self' 'unsafe-inline'"
```

### Headers de Sécurité

```typescript
// Headers de sécurité recommandés
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 📊 Monitoring et Audit

### Logs de Sécurité

- **Authentification** : Tentatives de connexion, échecs, succès
- **Upload de fichiers** : Types, tailles, sources
- **Accès API** : Endpoints, utilisateurs, timestamps
- **Erreurs système** : Stack traces, contextes

### Alertes Automatiques

- Tentatives de connexion échouées multiples
- Upload de fichiers suspects
- Accès à des endpoints sensibles
- Erreurs de validation critiques

## 🔄 Mises à Jour de Sécurité

### Processus de Mise à Jour

1. **Détection** : Identification de la vulnérabilité
2. **Évaluation** : Analyse de l'impact et de la priorité
3. **Création de ticket JIRA** : Suivi de la vulnérabilité
4. **Correction** : Développement du correctif
5. **Test** : Validation de la correction
6. **Déploiement** : Mise en production
7. **Communication** : Notification aux utilisateurs
8. **Fermeture du ticket** : Documentation de la résolution

### Calendrier de Mises à Jour

- **Critiques** : Déploiement immédiat (< 24h)
- **Élevées** : Déploiement sous 72h
- **Moyennes** : Déploiement sous 1 semaine
- **Faibles** : Déploiement lors de la prochaine version

## 📞 Contact et Support

### Équipe de Sécurité

- **Responsable Sécurité** : security@gestion-article.com
- **Urgences** : +33 1 23 45 67 89 (24/7)
- **Support Général** : support@gestion-article.com
- **Suivi JIRA** : Tous les incidents de sécurité sont tracés dans JIRA

### Ressources Additionnelles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/authentication)
- [React Security Guidelines](https://reactjs.org/docs/security.html)

---

**Dernière mise à jour :** Janvier 2024  
**Version :** 1.0.0  
**Prochaine révision :** Avril 2024 