#!/bin/bash

# Script de déploiement Docker pour le projet Gestion-Article
# Usage: ./deploy.sh [start|stop|restart|build|logs|clean]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="gestion-article"
COMPOSE_FILE="docker-compose.global.yaml"

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Projet Gestion-Article - Docker${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé. Veuillez l'installer avant de continuer."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose n'est pas installé. Veuillez l'installer avant de continuer."
        exit 1
    fi

    if [ ! -f "$COMPOSE_FILE" ]; then
        print_error "Fichier $COMPOSE_FILE non trouvé. Veuillez vérifier le chemin."
        exit 1
    fi

    print_message "Prérequis vérifiés avec succès"
}

# Fonction pour configurer l'environnement
setup_environment() {
    print_message "Configuration de l'environnement..."

    # Créer le fichier .env s'il n'existe pas
    if [ ! -f "back-office/server/.env" ]; then
        if [ -f "back-office/server/env.template" ]; then
            cp back-office/server/env.template back-office/server/.env
            print_warning "Fichier .env créé à partir de env.template"
            print_warning "Veuillez configurer les variables d'environnement dans back-office/server/.env"
        else
            print_error "Fichier env.template non trouvé"
            exit 1
        fi
    fi

    # Créer le fichier .env s'il n'existe pas
    if [ ! -f "back-office/client/.env" ]; then
        if [ -f "back-office/client/env.exemple" ]; then
            cp back-office/client/env.exemple back-office/client/.env
            print_warning "Fichier .env créé à partir de env.exemple"
            print_warning "Veuillez configurer les variables d'environnement dans back-office/client/.env"
        else
            print_error "Fichier env.exemple non trouvé"
            exit 1
        fi
    fi

    # Créer le fichier .env s'il n'existe pas
    if [ ! -f "front-office/client/.env" ]; then
        if [ -f "front-office/client/env.exemple" ]; then
            cp front-office/client/env.exemple front-office/client/.env
            print_warning "Fichier .env créé à partir de env.exemple"
            print_warning "Veuillez configurer les variables d'environnement dans front-office/client/.env"
        else
            print_error "Fichier env.exemple non trouvé"
            exit 1
        fi
    fi

    # Créer les dossiers nécessaires
    mkdir -p back-office/server/uploads
    mkdir -p nginx/ssl

    print_message "Environnement configuré"
}

# Fonction pour démarrer les services
start_services() {
    print_message "Démarrage des services..."

    check_prerequisites
    setup_environment

    # Démarrer les services
    docker-compose -f $COMPOSE_FILE up -d

    print_message "Services démarrés avec succès"
    print_message "Frontend: http://localhost:5000"
    print_message "Admin: http://localhost:5173"
    print_message "API: http://localhost:3000"
}

# Fonction pour arrêter les services
stop_services() {
    print_message "Arrêt des services..."

    docker-compose -f $COMPOSE_FILE down

    print_message "Services arrêtés"
}

# Fonction pour redémarrer les services
restart_services() {
    print_message "Redémarrage des services..."
    
    stop_services
    start_services

    print_message "Services redémarrés"
}

# Fonction pour afficher les logs
logs() {
    print_message "Affichage des logs..."
    
    docker-compose -f $COMPOSE_FILE logs -f
}

# Fonction pour nettoyer les ressources
clean_up() {
    print_message "Nettoyage des ressources..."
    
    # Arrêter et supprimer les conteneurs
    docker-compose -f $COMPOSE_FILE down -v
    
    # Supprimer les images
    docker rmi $(docker images -q $PROJECT_NAME) 2>/dev/null || true
    
    # Nettoyer les volumes non utilisés
    docker volume prune -f
    
    # Nettoyer les réseaux non utilisés
    docker network prune -f

    print_message "Nettoyage terminé"
}

# Fonction pour vérifier le statut
check_status() {
    print_message "Statut des services..."
    
    docker-compose -f $COMPOSE_FILE ps
    
    echo ""
    print_message "Logs récents:"
    docker-compose -f $COMPOSE_FILE logs --tail=10
}

# Fonction pour sauvegarder MongoDB
backup_postgres() {
    print_message "Sauvegarde de PostgreSQL..."
    
    BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    
    docker exec ${PROJECT_NAME}_postgres pg_dump -U postgres -d gestion_article_db -Fc -f /backup/gestion_article_db.dump
    docker cp ${PROJECT_NAME}_postgres:/backup $BACKUP_DIR
    
    print_message "Sauvegarde terminée: $BACKUP_DIR"
}

# Fonction pour restaurer PostgreSQL
restore_postgres() {
    if [ -z "$1" ]; then
        print_error "Veuillez spécifier le dossier de sauvegarde"
        exit 1
    fi

    print_message "Restauration de PostgreSQL depuis $1..."
    
    docker cp $1 ${PROJECT_NAME}_postgres:/backup
    docker exec ${PROJECT_NAME}_postgres pg_restore -U postgres -d gestion_article_db /backup/gestion_article_db.dump
    
    print_message "Restauration terminée"
}

show_help() {
    print_header
    echo ""
    echo "Usage: $0 [start|stop|restart|build|logs|clean|backup|restore]"
    echo ""
    echo "Commandes disponibles:"
    echo "  start     - Démarrer tous les services"
    echo "  stop      - Arrêter tous les services"
    echo "  restart   - Redémarrer tous les services"
    echo "  build     - Construire les images Docker"
    echo "  logs      - Afficher les logs en temps réel"
    echo "  status    - Vérifier le statut des services"
    echo "  clean     - Nettoyer complètement (conteneurs, images, volumes)"
    echo "  backup    - Sauvegarder la base de données PostgreSQL"
    echo "  restore   - Restaurer la base de données PostgreSQL (usage: $0 restore <backup_dir>)"
    echo "  help      - Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 start"
    echo "  $0 logs"
    echo "  $0 backup"
    echo "  $0 restore ./backups/20240101_120000"
    echo ""
}

# Fonction principale
main() {
    case "${1:-help}" in
        start)
            start_services
            ;;
        stop)
            stop_services
            ;;
        restart)
            restart_services
            ;;
        build)
            build_images
            ;;
        logs)
            logs
            ;;
        status)
            check_status
            ;;
        clean)
            clean_up
            ;;
        backup)
            backup_postgres
            ;;
        restore)
            restore_postgres "$2"
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Commande inconnue: $1"
            show_help
            exit 1
    esac
}

# Exécution du script
main "$@"