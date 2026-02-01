# Star Wars API Platform

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

A serverless API platform built on Google Cloud Run that integrates with SWAPI (Star Wars API) to deliver an interactive web experience for exploring the Star Wars universe.

## 🎯 Overview

This project provides a comprehensive API and frontend application enabling users to explore detailed information about Star Wars characters, planets, starships, and films. Built with modern technologies and following Clean Architecture principles.

## 🏗️ Architecture

**Modular Monolith** approach combining backend API and frontend SPA in a single Cloud Run deployment:

- **Backend:** FastAPI (Python 3.12) with Clean Architecture (Domain/Application/Infrastructure layers)
- **Frontend:** React 18 SPA with TypeScript and TailwindCSS
- **Deployment:** Google Cloud Run (serverless container)
- **Caching:** LRU in-memory cache (3600s TTL)
- **Security:** API Key authentication + Rate limiting (100 req/min)

## 🚀 Tech Stack

### Backend
- **Runtime:** Python 3.12
- **Framework:** FastAPI 0.110+
- **HTTP Client:** httpx (async)
- **Validation:** Pydantic 2.0
- **Testing:** pytest + pytest-asyncio + coverage
- **Code Quality:** ruff (linter) + mypy (type checking)
- **Dependency Management:** uv (Astral)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 6
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 4
- **HTTP Client:** Axios
- **Testing:** Vitest + Testing Library

### DevOps
- **Containerization:** Docker (multi-stage build)
- **CI/CD:** GitHub Actions
- **Registry:** Google Artifact Registry
- **Deployment:** Google Cloud Run

## 📁 Project Structure

```
starwars-gcp-explorer/
├── backend/
│   ├── src/
│   │   ├── domain/           # Business entities and rules
│   │   ├── application/      # Use cases and ports
│   │   ├── infrastructure/   # External adapters (SWAPI client, cache)
│   │   ├── api/              # FastAPI controllers and middleware
│   │   └── core/             # Configuration and settings
│   ├── tests/
│   │   ├── unit/             # Unit tests
│   │   └── integration/      # API integration tests
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API client
│   │   └── types/            # TypeScript interfaces
│   ├── vite.config.ts
│   └── package.json
├── docs/
│   ├── architecture.md       # Architecture diagrams (Mermaid)
│   └── api-examples.md       # API usage examples
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # CI/CD pipeline
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Python 3.12+
- Node.js 20+
- Docker
- Google Cloud SDK (for deployment)

### Local Development

**Backend:**
```bash
cd backend
uv sync
uv run uvicorn src.main:app --reload
```

**Frontend:**
```bash
cd frontend
pnpm install
pnpm dev
```

**Docker (Full Stack):**
```bash
docker build -t starwars-api .
docker run -p 8080:8080 -e API_KEY=your-key-here starwars-api
```

Access:
- Frontend: http://localhost:8080
- API Docs: http://localhost:8080/api/v1/docs

## 🧪 Testing

```bash
# Backend tests
cd backend
uv run pytest --cov --cov-report=term-missing

# Frontend tests
cd frontend
pnpm test
```

## 📊 API Endpoints

| Endpoint | Method | Description | Query Params |
|----------|--------|-------------|--------------|
| `/api/v1/people` | GET | List Star Wars characters | `search`, `page`, `ordering` |
| `/api/v1/planets` | GET | List Star Wars planets | `search`, `page`, `ordering` |
| `/api/v1/films` | GET | List Star Wars films | `page` |
| `/api/v1/starships` | GET | List Star Wars starships | `search`, `page`, `ordering` |
| `/health` | GET | Health check endpoint | N/A (no auth) |

**Authentication:** All `/api/v1/*` endpoints require `X-API-Key` header.

**Ordering:** Use `?ordering=field` for ascending or `?ordering=-field` for descending order.
- Example: `/api/v1/people?ordering=name` (A-Z)
- Example: `/api/v1/people?ordering=-height` (tallest first)

**Common fields:** `name`, `height`, `mass`, `climate`, `population`, etc.

## 🚀 Deployment

Deployed on **Google Cloud Run**. See [deployment guide](docs/deployment.md) for detailed instructions.

## 📚 Documentation

- [Architecture & Design Decisions](docs/architecture.md)
- [API Usage Examples](docs/api-examples.md)
- [SWAPI Documentation](https://swapi.dev/documentation)

## 🏆 Project Highlights

- ✅ **Clean Architecture** implementation (domain-driven design)
- ✅ **80%+ test coverage** (backend unit + integration tests)
- ✅ **API Key authentication** + Rate limiting
- ✅ **TypeScript** strict mode
- ✅ **CI/CD pipeline** with automated testing and deployment
- ✅ **Serverless deployment** on Google Cloud Run

---

**Developed by:** [Bruna Menezes](https://github.com/CFBruna)  
**License:** MIT
