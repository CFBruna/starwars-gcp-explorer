from typing import Any

from src.application.ports.swapi_client import SwapiClient
from src.domain.entities.character import Character
from src.domain.value_objects.filters import SearchFilters


class GetCharacters:
    """Use case: Retrieve Star Wars characters with optional search"""

    def __init__(self, swapi_client: SwapiClient):
        self.swapi_client = swapi_client

    async def execute(self, filters: SearchFilters) -> dict[str, Any]:
        """
        Execute use case to get characters from SWAPI

        Returns dict with: {"count": int, "results": List[Character]}
        """
        response = await self.swapi_client.get_characters(filters)
        characters = [Character.from_swapi(item) for item in response["results"]]
        return {"count": response["count"], "results": characters}
