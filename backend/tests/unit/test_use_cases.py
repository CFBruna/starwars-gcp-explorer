import pytest

from application.ports.swapi_client import SwapiClient
from application.use_cases.get_characters import GetCharacters
from application.use_cases.get_films import GetFilms
from application.use_cases.get_planets import GetPlanets
from application.use_cases.get_starships import GetStarships
from domain.value_objects.filters import SearchFilters


class MockSwapiClient(SwapiClient):
    """Mock implementation of SwapiClient for testing"""

    async def get_characters(self, filters: SearchFilters) -> dict:
        return {
            "count": 1,
            "results": [
                {
                    "name": "Luke Skywalker",
                    "height": "172",
                    "mass": "77",
                    "hair_color": "blond",
                    "skin_color": "fair",
                    "eye_color": "blue",
                    "birth_year": "19BBY",
                    "gender": "male",
                    "homeworld": "https://swapi.dev/api/planets/1/",
                    "url": "https://swapi.dev/api/people/1/",
                }
            ],
        }

    async def get_planets(self, filters: SearchFilters) -> dict:
        return {
            "count": 1,
            "results": [
                {
                    "name": "Tatooine",
                    "rotation_period": "23",
                    "orbital_period": "304",
                    "diameter": "10465",
                    "climate": "arid",
                    "gravity": "1 standard",
                    "terrain": "desert",
                    "surface_water": "1",
                    "population": "200000",
                    "url": "https://swapi.dev/api/planets/1/",
                }
            ],
        }

    async def get_films(self, filters: SearchFilters) -> dict:
        return {
            "count": 1,
            "results": [
                {
                    "title": "A New Hope",
                    "episode_id": 4,
                    "opening_crawl": "It is a period of civil war...",
                    "director": "George Lucas",
                    "producer": "Gary Kurtz",
                    "release_date": "1977-05-25",
                    "url": "https://swapi.dev/api/films/1/",
                }
            ],
        }

    async def get_starships(self, filters: SearchFilters) -> dict:
        return {
            "count": 1,
            "results": [
                {
                    "name": "Millennium Falcon",
                    "model": "YT-1300",
                    "manufacturer": "Corellian",
                    "cost_in_credits": "100000",
                    "length": "34.37",
                    "max_atmosphering_speed": "1050",
                    "crew": "4",
                    "passengers": "6",
                    "cargo_capacity": "100000",
                    "consumables": "2 months",
                    "hyperdrive_rating": "0.5",
                    "starship_class": "Light freighter",
                    "url": "https://swapi.dev/api/starships/10/",
                }
            ],
        }


@pytest.mark.asyncio
class TestGetCharactersUseCase:
    async def test_execute_returns_character_entities(self):
        mock_client = MockSwapiClient()
        use_case = GetCharacters(mock_client)
        filters = SearchFilters(search="Luke")

        result = await use_case.execute(filters)

        assert result["count"] == 1
        assert len(result["results"]) == 1
        assert result["results"][0].name == "Luke Skywalker"


@pytest.mark.asyncio
class TestGetPlanetsUseCase:
    async def test_execute_returns_planet_entities(self):
        mock_client = MockSwapiClient()
        use_case = GetPlanets(mock_client)
        filters = SearchFilters()

        result = await use_case.execute(filters)

        assert result["count"] == 1
        assert len(result["results"]) == 1
        assert result["results"][0].name == "Tatooine"


@pytest.mark.asyncio
class TestGetFilmsUseCase:
    async def test_execute_returns_film_entities(self):
        mock_client = MockSwapiClient()
        use_case = GetFilms(mock_client)
        filters = SearchFilters()

        result = await use_case.execute(filters)

        assert result["count"] == 1
        assert len(result["results"]) == 1
        assert result["results"][0].title == "A New Hope"


@pytest.mark.asyncio
class TestGetStarshipsUseCase:
    async def test_execute_returns_starship_entities(self):
        mock_client = MockSwapiClient()
        use_case = GetStarships(mock_client)
        filters = SearchFilters()

        result = await use_case.execute(filters)

        assert result["count"] == 1
        assert len(result["results"]) == 1
        assert result["results"][0].name == "Millennium Falcon"
