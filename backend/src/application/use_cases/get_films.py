from typing import Any

from src.application.ports.swapi_client import SwapiClient
from src.domain.entities.film import Film
from src.domain.value_objects.filters import SearchFilters


class GetFilms:
    """Use case: Retrieve Star Wars films with optional search"""

    def __init__(self, swapi_client: SwapiClient):
        self.swapi_client = swapi_client

    async def execute(self, filters: SearchFilters) -> dict[str, Any]:
        """
        Execute use case to get films from SWAPI

        Returns dict with: {"count": int, "results": List[Film]}
        """
        response = await self.swapi_client.get_films(filters)
        films = [Film.from_swapi(item) for item in response["results"]]
        return {"count": response["count"], "results": films}
