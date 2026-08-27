IMAGE_NAME=souravdebanth/vacuumcare-frontend
IMAGE_TAG=latest
CONTAINER_NAME=vacuumcare-frontend

.PHONY: ps cps logs down build-compose build up-build up restart bash images pull push rebuild clean clean-all all

ps:
	@echo "docker ps"
	@docker ps

cps:
	@echo "docker compose ps"
	@docker compose ps

images:
	@echo "Docker images"
	@docker images

logs:
	@echo "docker compose logs -f"
	@docker compose logs -f

down:
	@echo "docker compose down"
	@echo "Stopping vacuum frontend..."
	@docker compose down

build-compose:
	@echo "docker compose build"
	@echo "Building Docker image..."
	@docker compose build

build:
	@echo "Building Docker vacuum frontend for linux/amd64..."
	@docker compose up --build -d

up:
	@echo "docker compose up -d"
	@echo "Starting vacuum frontend..."
	@docker compose up -d

up-build:
	@echo "Building and starting vacuum frontend..."
	@docker compose up -d --build

restart:
	@echo "Restarting vacuum frontend..."
	@docker restart $(CONTAINER_NAME)

bash:
	@docker exec -it $(CONTAINER_NAME) sh

pull:
	@echo "Pulling $(IMAGE_NAME):$(IMAGE_TAG) from Docker Hub..."
	@docker pull $(IMAGE_NAME):$(IMAGE_TAG)

push:
	@echo "Pushing $(IMAGE_NAME):$(IMAGE_TAG) to Docker Hub..."
	@docker push $(IMAGE_NAME):$(IMAGE_TAG)

rebuild:
	@echo "Rebuilding Docker image without cache..."
	@docker compose build --no-cache
	@docker compose up -d --force-recreate

all: down build up logs

clean:
	@echo "Removing vacuum frontend container..."
	@docker compose down
	@echo "Removing vacuum frontend image..."
	@docker rmi -f $(IMAGE_NAME):$(IMAGE_TAG) 2>/dev/null || true

clean-all:
	@echo "Cleaning Docker resources..."
	@docker compose down --rmi all --volumes --remove-orphans