from fastapi import APIRouter, Depends, Query

from api.dependencies import get_swapi_client
from api.middleware.auth import verify_api_key
from api.middleware.rate_limit import limiter
from application.use_cases.get_films import GetFilms
from domain.value_objects.filters import SearchFilters
from infrastructure.swapi_http_client import SwapiHttpClient

router = APIRouter(prefix="/films", tags=["films"])


@router.get("")
@limiter.limit("100/minute")
async def get_films(
    page: int = Query(1, ge=1, description="Page number"),
    client: SwapiHttpClient = Depends(get_swapi_client),
    _: None = Depends(verify_api_key),
):
    """Get Star Wars films"""
    filters = SearchFilters(page=page)
    use_case = GetFilms(client)
    films = await use_case.execute(filters)
    return films
