from abc import ABC, abstractmethod
from typing import List

from domain.entities.character import Character
from domain.entities.film import Film
from domain.entities.planet import Planet
from domain.entities.starship import Starship
from domain.value_objects.filters import SearchFilters


class SwapiClient(ABC):
    """Abstract interface for SWAPI data source (Port in Clean Architecture)"""

    @abstractmethod
    async def get_characters(self, filters: SearchFilters) -> dict:
        """Fetch characters from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_planets(self, filters: SearchFilters) -> dict:
        """Fetch planets from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_films(self, filters: SearchFilters) -> dict:
        """Fetch films from SWAPI with pagination"""
        pass

    @abstractmethod
    async def get_starships(self, filters: SearchFilters) -> dict:
        """Fetch starships from SWAPI with pagination"""
        pass
