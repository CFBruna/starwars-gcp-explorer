import json
import logging
from collections.abc import Awaitable, Callable
from pathlib import Path

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.api.middleware.rate_limit import limiter
from src.api.routes import characters, films, planets, starships
from src.core.config import settings

logging.basicConfig(
    level=logging.INFO,
    format='{"time":"%(asctime)s", "level":"%(levelname)s", "msg":"%(message)s"}',
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="API platform for exploring the Star Wars universe",
    openapi_url=f"{settings.API_PREFIX}/openapi.json",
    docs_url=f"{settings.API_PREFIX}/docs",
    redoc_url=f"{settings.API_PREFIX}/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["X-API-Key", "Content-Type", "Authorization"],
)


@app.middleware("http")
async def add_security_headers(
    request: Request, call_next: Callable[[Request], Awaitable[Response]]
) -> Response:
    """Add security headers to all responses"""
    response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

    if settings.ENVIRONMENT == "production":
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "img-src 'self' data: https:; "
            "font-src 'self' data:; "
            "connect-src 'self' https://swapi.dev"
        )
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    return response


app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore[arg-type]

app.include_router(characters.router, prefix=settings.API_PREFIX)
app.include_router(planets.router, prefix=settings.API_PREFIX)
app.include_router(films.router, prefix=settings.API_PREFIX)
app.include_router(starships.router, prefix=settings.API_PREFIX)


@app.get("/health")
def health_check() -> JSONResponse:
    """Health check endpoint for monitoring"""
    return JSONResponse(
        content={
            "status": "healthy",
            "service": "starwars-api",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
        }
    )


FRONTEND_DIR = Path("/app/frontend/dist")
if FRONTEND_DIR.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIR / "assets"), name="assets")

    def get_index_html() -> str:
        """Read and inject runtime configuration into index.html"""
        index_path = FRONTEND_DIR / "index.html"
        if not index_path.exists():
            return ""

        with open(index_path) as f:
            content = f.read()

        config = {
            "API_KEY": settings.API_KEY,
            "BASE_URL": f"{settings.API_PREFIX}",
            "ENVIRONMENT": settings.ENVIRONMENT,
        }

        injection = f"<script>window.__ENV__ = {json.dumps(config)};</script>"
        return content.replace("<script>window.__ENV__ = {};</script>", injection)

    @app.get("/", response_class=HTMLResponse)
    def root() -> Response:
        """Serve React frontend with injected config"""
        logger.info("Serving frontend with runtime config")
        content = get_index_html()
        if content:
            return HTMLResponse(content)
        return JSONResponse(status_code=500, content={"error": "Frontend not found"})

    @app.get("/{full_path:path}")
    def spa_fallback(full_path: str) -> Response:
        """SPA fallback - serve index.html for all non-API routes"""
            if full_path.startswith(("api", "health", "assets")):
            return FileResponse(FRONTEND_DIR / "index.html", status_code=404)

        file_path = FRONTEND_DIR / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)

        content = get_index_html()
        if content:
            return HTMLResponse(content)
        return FileResponse(FRONTEND_DIR / "index.html")

else:

    @app.get("/")
    def root() -> JSONResponse:
        """Root endpoint with API information (frontend not built)"""
        logger.info("Root endpoint accessed (no frontend)")
        return JSONResponse(
            content={
                "message": settings.PROJECT_NAME,
                "version": settings.VERSION,
                "docs": f"{settings.API_PREFIX}/docs",
                "health": "/health",
            }
        )
