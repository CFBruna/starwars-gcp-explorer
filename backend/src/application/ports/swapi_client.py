from abc import ABC, abstractmethod
from typing import Any

from src.domain.value_objects.filters import SearchFilters


class SwapiClient(ABC):
    """Abstract interface for SWAPI data source (Port in Clean Architecture)"""

    @abstractmethod
    async def get_characters(self, filters: SearchFilters) -> dict[str, Any]:
        """Fetch characters from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_planets(self, filters: SearchFilters) -> dict[str, Any]:
        """Fetch planets from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_films(self, filters: SearchFilters) -> dict[str, Any]:
        """Fetch films from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_starships(self, filters: SearchFilters) -> dict[str, Any]:
        """Fetch starships from SWAPI with pagination"""
        pass
