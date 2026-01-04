#!/bin/bash

# Deploy Helper Script for Ameba Frontend
# Facilita el deployment local y testing de imágenes Docker

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
REGISTRY="ghcr.io"
IMAGE_NAME="ameba-bcn/ameba-frontend"
FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}"

# Functions
print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  Ameba Frontend - Deploy Helper${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

check_requirements() {
    print_info "Checking requirements..."

    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker is installed"

    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    print_success "Docker Compose is installed"
}

build_local() {
    print_info "Building Docker image locally..."
    cd "$(dirname "$0")/../../"
    docker build -t "${FULL_IMAGE}:local" .
    print_success "Image built: ${FULL_IMAGE}:local"
}

pull_image() {
    local TAG=${1:-latest}
    print_info "Pulling image from GHCR: ${FULL_IMAGE}:${TAG}..."

    if ! docker pull "${FULL_IMAGE}:${TAG}"; then
        print_error "Failed to pull image. Make sure you're logged in to GHCR:"
        echo ""
        echo "  docker login ghcr.io -u <USERNAME>"
        echo ""
        exit 1
    fi

    print_success "Image pulled successfully"
}

login_ghcr() {
    print_info "Logging in to GitHub Container Registry..."
    echo ""
    echo "You'll need a Personal Access Token (PAT) with read:packages permission"
    echo "Create one at: https://github.com/settings/tokens"
    echo ""

    read -p "GitHub Username: " username
    read -sp "GitHub PAT: " token
    echo ""

    echo "$token" | docker login ghcr.io -u "$username" --password-stdin
    print_success "Logged in successfully"
}

list_tags() {
    print_info "Available tags in GHCR:"
    echo ""
    print_warning "Note: You need to use GitHub API or check the GitHub Packages page"
    echo "https://github.com/orgs/ameba-bcn/packages/container/ameba-frontend/versions"
    echo ""
    echo "Common tags:"
    echo "  - latest (default branch)"
    echo "  - master"
    echo "  - dev"
    echo "  - staging"
    echo "  - master-<sha>"
}

test_image() {
    local TAG=${1:-latest}
    local IMAGE="${FULL_IMAGE}:${TAG}"

    print_info "Testing image: ${IMAGE}..."

    # Test 1: Image exists
    if ! docker image inspect "${IMAGE}" &> /dev/null; then
        print_error "Image not found locally. Pull it first with:"
        echo "  $0 pull ${TAG}"
        exit 1
    fi
    print_success "Image exists locally"

    # Test 2: Check /build directory exists
    if docker run --rm "${IMAGE}" sh -c "ls /build" &> /dev/null; then
        print_success "/build directory exists"
    else
        print_error "/build directory not found in image"
        exit 1
    fi

    # Test 3: Check index.html exists
    if docker run --rm "${IMAGE}" sh -c "ls /build/index.html" &> /dev/null; then
        print_success "index.html found"
    else
        print_error "index.html not found in /build"
        exit 1
    fi

    # Test 4: Check file count
    FILE_COUNT=$(docker run --rm "${IMAGE}" sh -c "ls -1 /build | wc -l")
    print_info "Files in /build: ${FILE_COUNT}"

    if [ "$FILE_COUNT" -lt 5 ]; then
        print_warning "Build directory seems incomplete (less than 5 files)"
    else
        print_success "Build directory looks good"
    fi

    echo ""
    print_success "All tests passed!"
}

deploy_local() {
    local TAG=${1:-latest}

    print_info "Deploying with docker-compose..."
    cd "$(dirname "$0")/../../../"  # Go to devops root

    # Update .env or docker-compose to use the tag
    print_warning "Make sure your docker-compose.yml uses: ${FULL_IMAGE}:${TAG}"
    echo ""
    read -p "Continue with deployment? (y/n) " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose pull ameba-frontend
        docker-compose up -d ameba-frontend
        print_success "Frontend deployed!"
        echo ""
        print_info "Check status with: docker-compose ps"
        print_info "View logs with: docker-compose logs -f ameba-frontend"
    else
        print_warning "Deployment cancelled"
    fi
}

show_help() {
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  build              Build image locally"
    echo "  pull [tag]         Pull image from GHCR (default: latest)"
    echo "  login              Login to GitHub Container Registry"
    echo "  tags               List available tags"
    echo "  test [tag]         Test image (default: latest)"
    echo "  deploy [tag]       Deploy with docker-compose (default: latest)"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  $0 pull latest"
    echo "  $0 pull master-abc123"
    echo "  $0 test latest"
    echo "  $0 deploy dev"
    echo ""
}

# Main script
print_header

case "${1:-help}" in
    build)
        check_requirements
        build_local
        ;;
    pull)
        check_requirements
        pull_image "${2:-latest}"
        ;;
    login)
        login_ghcr
        ;;
    tags)
        list_tags
        ;;
    test)
        check_requirements
        test_image "${2:-latest}"
        ;;
    deploy)
        check_requirements
        deploy_local "${2:-latest}"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

echo ""
print_success "Done!"
