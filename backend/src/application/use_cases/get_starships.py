from typing import List

from application.ports.swapi_client import SwapiClient
from domain.entities.starship import Starship
from domain.value_objects.filters import SearchFilters


class GetStarships:
    """Use case: Retrieve Star Wars starships with optional search"""

    def __init__(self, swapi_client: SwapiClient):
        self.swapi_client = swapi_client

    async def execute(self, filters: SearchFilters) -> dict:
        """
        Execute use case to get starships from SWAPI

        Returns dict with: {"count": int, "results": List[Starship]}
        """
        response = await self.swapi_client.get_starships(filters)
        starships = [Starship.from_swapi(item) for item in response["results"]]
        return {"count": response["count"], "results": starships}
