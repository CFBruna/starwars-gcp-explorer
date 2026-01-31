from typing import Any

import httpx

from application.ports.swapi_client import SwapiClient
from domain.value_objects.filters import SearchFilters


class SwapiHttpClient(SwapiClient):
    """HTTP client implementation for SWAPI using httpx"""

    BASE_URL = "https://swapi.dev/api"
    TIMEOUT = 10.0

    def __init__(self):
        self.client = httpx.AsyncClient(
            base_url=self.BASE_URL,
            timeout=self.TIMEOUT,
            headers={"User-Agent": "StarWars-GCP-Explorer/1.0"},
        )

    async def _fetch(self, endpoint: str, filters: SearchFilters) -> dict[str, Any]:
        """Generic fetch method for SWAPI endpoints"""
        params = filters.to_query_params()
        response = await self.client.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()

    async def get_characters(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/people/", filters)

    async def get_planets(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/planets/", filters)

    async def get_films(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/films/", filters)

    async def get_starships(self, filters: SearchFilters) -> dict[str, Any]:
        return await self._fetch("/starships/", filters)

    async def close(self):
        await self.client.aclose()
