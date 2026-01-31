import pytest

from domain.value_objects.filters import SearchFilters
from infrastructure.swapi_http_client import SwapiHttpClient


@pytest.fixture
async def swapi_client():
    client = SwapiHttpClient()
    yield client
    await client.close()


@pytest.mark.asyncio
class TestSwapiHttpClient:
    async def test_get_characters_returns_valid_data(self, swapi_client):
        filters = SearchFilters(page=1)
        result = await swapi_client.get_characters(filters)

        assert "count" in result
        assert "results" in result
        assert isinstance(result["results"], list)
        if result["results"]:
            assert "name" in result["results"][0]

    async def test_get_characters_with_search(self, swapi_client):
        filters = SearchFilters(search="Luke", page=1)
        result = await swapi_client.get_characters(filters)

        assert result["count"] > 0
        assert len(result["results"]) > 0
        assert any("luke" in char["name"].lower() for char in result["results"])

    async def test_get_planets_returns_valid_data(self, swapi_client):
        filters = SearchFilters(page=1)
        result = await swapi_client.get_planets(filters)

        assert "count" in result
        assert "results" in result
        assert isinstance(result["results"], list)
        if result["results"]:
            assert "name" in result["results"][0]

    async def test_get_films_returns_valid_data(self, swapi_client):
        filters = SearchFilters(page=1)
        result = await swapi_client.get_films(filters)

        assert "count" in result
        assert "results" in result
        assert isinstance(result["results"], list)
        if result["results"]:
            assert "title" in result["results"][0]

    async def test_get_starships_returns_valid_data(self, swapi_client):
        filters = SearchFilters(page=1)
        result = await swapi_client.get_starships(filters)

        assert "count" in result
        assert "results" in result
        assert isinstance(result["results"], list)
        if result["results"]:
            assert "name" in result["results"][0]
