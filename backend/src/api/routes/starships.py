from typing import Any

from fastapi import APIRouter, Depends, Query, Request

from src.api.dependencies import get_swapi_client
from src.api.middleware.auth import verify_api_key
from src.api.middleware.rate_limit import limiter
from src.application.use_cases.get_starships import GetStarships
from src.domain.value_objects.filters import SearchFilters
from src.infrastructure.swapi_http_client import SwapiHttpClient

router = APIRouter(prefix="/starships", tags=["starships"])


@router.get("")
@limiter.limit("100/minute")
async def get_starships(
    request: Request,
    search: str | None = Query(None, description="Search starships by name"),
    page: int = Query(1, ge=1, description="Page number"),
    client: SwapiHttpClient = Depends(get_swapi_client),
    _: None = Depends(verify_api_key),
) -> Any:
    """Get Star Wars starships with optional search filter"""
    filters = SearchFilters(search=search, page=page)
    use_case = GetStarships(client)
    starships = await use_case.execute(filters)
    return starships
