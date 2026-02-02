.PHONY: help dev test lint format docker-build docker-run clean

help:
	@echo "Star Wars API - Development Commands"
	@echo ""
	@echo "  make dev             - Run backend with hot reload"
	@echo "  make test            - Run backend tests with coverage"
	@echo "  make test-frontend   - Run frontend tests"
	@echo "  make test-all        - Run all tests (backend + frontend)"
	@echo "  make lint            - Run backend linter"
	@echo "  make lint-frontend   - Run frontend linter"
	@echo "  make format          - Format backend code"
	@echo "  make format-frontend - Format frontend code"
	@echo "  make typecheck       - Run mypy type checking"
	@echo "  make docker-build    - Build Docker image"
	@echo "  make docker-run      - Run Docker container locally"
	@echo "  make clean           - Remove generated files"

dev:
	cd backend && ~/.local/bin/uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

test:
	cd backend && ~/.local/bin/uv run pytest --cov --cov-report=term-missing

test-frontend:
	cd frontend && pnpm test:coverage

test-all: test test-frontend

lint:
	cd backend && ~/.local/bin/uv run ruff check .

lint-frontend:
	cd frontend && pnpm lint

format:
	cd backend && ~/.local/bin/uv run ruff format .

format-frontend:
	cd frontend && pnpm lint --fix

typecheck:
	cd backend && ~/.local/bin/uv run mypy src/

docker-build:
	docker build -t starwars-api:latest .

docker-run:
	docker run -p 8080:8080 -e API_KEY=dev-key starwars-api:latest

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name ".coverage" -delete 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
