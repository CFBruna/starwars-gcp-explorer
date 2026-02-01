from typing import Any

import httpx

from src.application.ports.swapi_client import SwapiClient
from src.domain.value_objects.filters import SearchFilters
from src.infrastructure.cache import cached


class SwapiHttpClient(SwapiClient):
    """HTTP client implementation for SWAPI using httpx"""

    BASE_URL = "https://swapi.dev/api"
    TIMEOUT = 10.0

    def __init__(self) -> None:
        self.client = httpx.AsyncClient(
            base_url=self.BASE_URL,
            timeout=self.TIMEOUT,
            headers={"User-Agent": "StarWars-GCP-Explorer/1.0"},
        )

    @cached(ttl=300)  # Cache for 5 minutes  # type: ignore[misc]
    async def _fetch(self, endpoint: str, filters: SearchFilters) -> dict[str, Any]:
        """Generic fetch method for SWAPI endpoints"""
        params = filters.to_query_params()
        response = await self.client.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()  # type: ignore[no-any-return]

    async def get_characters(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/people/", filters)  # type: ignore[no-any-return]

    async def get_planets(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/planets/", filters)  # type: ignore[no-any-return]

    async def get_films(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/films/", filters)  # type: ignore[no-any-return]

    async def get_starships(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/starships/", filters)  # type: ignore[no-any-return]

    async def close(self) -> None:
        await self.client.aclose()
