FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || echo "Frontend not ready yet"
COPY frontend/ ./
RUN pnpm build

FROM python:3.12-slim

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY backend/requirements.txt ./
RUN uv pip install --system --no-cache -r requirements.txt

COPY backend/src ./src

COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/health')"

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
