from fastapi import APIRouter, Depends, Query, Request

from src.api.dependencies import get_swapi_client
from src.api.middleware.auth import verify_api_key
from src.api.middleware.rate_limit import limiter
from src.application.use_cases.get_planets import GetPlanets
from src.domain.value_objects.filters import SearchFilters
from src.infrastructure.swapi_http_client import SwapiHttpClient

router = APIRouter(prefix="/planets", tags=["planets"])


@router.get("")
@limiter.limit("100/minute")
async def get_planets(
    request: Request,
    search: str | None = Query(None, description="Search planets by name"),
    page: int = Query(1, ge=1, description="Page number"),
    client: SwapiHttpClient = Depends(get_swapi_client),
    _: None = Depends(verify_api_key),
):
    """Get Star Wars planets with optional search filter"""
    filters = SearchFilters(search=search, page=page)
    use_case = GetPlanets(client)
    planets = await use_case.execute(filters)
    return planets
