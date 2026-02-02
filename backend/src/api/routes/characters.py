from typing import Any

from fastapi import APIRouter, Depends, Query, Request

from src.api.dependencies import get_swapi_client
from src.api.middleware.auth import verify_api_key
from src.api.middleware.rate_limit import limiter
from src.application.use_cases.get_characters import GetCharacters
from src.domain.value_objects.filters import SearchFilters
from src.infrastructure.swapi_http_client import SwapiHttpClient

router = APIRouter(prefix="/people", tags=["characters"])


@router.get("")
@limiter.limit("100/minute")
async def get_characters(
    request: Request,
    search: str | None = Query(None, description="Search characters by name"),
    page: int = Query(1, ge=1, description="Page number"),
    ordering: str | None = Query(
        None, description="Order by field (name, height, mass). Prefix with - for descending"
    ),
    client: SwapiHttpClient = Depends(get_swapi_client),
    _: None = Depends(verify_api_key),
) -> Any:
    """Get Star Wars characters with optional search filter and ordering"""
    filters = SearchFilters(search=search, page=page, ordering=ordering)
    use_case = GetCharacters(client)
    result = await use_case.execute(filters)

    if ordering and isinstance(result, dict) and "results" in result:
        reverse = ordering.startswith("-")
        field = ordering.lstrip("-").strip().lower()

        try:
            def sort_key(item: Any) -> Any:
                value = getattr(item, field, None) if hasattr(item, field) else item.get(field, "")

                if field in ["height", "mass"]:
                    if not value or str(value).lower() in ["unknown", "n/a", "none"]:
                        return float("inf") if not reverse else float("-inf")
                    try:
                        clean_value = str(value).replace(",", "")
                        return float(clean_value)
                    except ValueError:
                        return float("inf")
                
                return str(value).lower() if value else ""

            result["results"] = sorted(result["results"], key=sort_key, reverse=reverse)
        except (KeyError, TypeError, AttributeError):
            pass

    return result
