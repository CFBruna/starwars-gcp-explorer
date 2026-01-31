from typing import List

from application.ports.swapi_client import SwapiClient
from domain.entities.character import Character
from domain.value_objects.filters import SearchFilters


class GetCharacters:
    """Use case: Retrieve Star Wars characters with optional search"""

    def __init__(self, swapi_client: SwapiClient):
        self.swapi_client = swapi_client

    async def execute(self, filters: SearchFilters) -> dict:
        """
        Execute use case to get characters from SWAPI

        Returns dict with: {"count": int, "results": List[Character]}
        """
        response = await self.swapi_client.get_characters(filters)
        characters = [Character.from_swapi(item) for item in response["results"]]
        return {"count": response["count"], "results": characters}
