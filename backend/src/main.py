from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.api.middleware.rate_limit import limiter
from src.api.routes import characters, films, planets, starships
from src.core.config import settings

app = FastAPI(
    title="Star Wars API Platform",
    version="1.0.0",
    description="API platform for exploring the Star Wars universe",
    openapi_url=f"{settings.API_PREFIX}/openapi.json",
    docs_url=f"{settings.API_PREFIX}/docs",
    redoc_url=f"{settings.API_PREFIX}/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore[arg-type]

app.include_router(characters.router, prefix=settings.API_PREFIX)
app.include_router(planets.router, prefix=settings.API_PREFIX)
app.include_router(films.router, prefix=settings.API_PREFIX)
app.include_router(starships.router, prefix=settings.API_PREFIX)


@app.get("/health")
def health_check() -> JSONResponse:
    return JSONResponse(
        content={"status": "healthy", "service": "starwars-api", "version": "1.0.0"}
    )


@app.get("/")
def root() -> JSONResponse:
    return JSONResponse(
        content={
            "message": "Star Wars API Platform",
            "version": "1.0.0",
            "docs": f"{settings.API_PREFIX}/docs",
        }
    )
