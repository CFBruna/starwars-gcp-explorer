from typing import Any

from src.application.ports.swapi_client import SwapiClient
from src.domain.entities.planet import Planet
from src.domain.value_objects.filters import SearchFilters


class GetPlanets:
    """Use case: Retrieve Star Wars planets with optional search"""

    def __init__(self, swapi_client: SwapiClient):
        self.swapi_client = swapi_client

    async def execute(self, filters: SearchFilters) -> dict[str, Any]:
        """
        Execute use case to get planets from SWAPI

        Returns dict with: {"count": int, "results": List[Planet]}
        """
        response = await self.swapi_client.get_planets(filters)
        planets = [Planet.from_swapi(item) for item in response["results"]]
        return {"count": response["count"], "results": planets}
