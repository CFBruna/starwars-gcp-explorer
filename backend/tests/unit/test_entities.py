import pytest

from domain.entities.character import Character
from domain.entities.film import Film
from domain.entities.planet import Planet
from domain.entities.starship import Starship
from domain.value_objects.filters import SearchFilters


class TestCharacterEntity:
    def test_character_from_swapi(self):
        swapi_data = {
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

        character = Character.from_swapi(swapi_data)

        assert character.name == "Luke Skywalker"
        assert character.height == "172"
        assert character.gender == "male"


class TestPlanetEntity:
    def test_planet_from_swapi(self):
        swapi_data = {
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

        planet = Planet.from_swapi(swapi_data)

        assert planet.name == "Tatooine"
        assert planet.climate == "arid"
        assert planet.terrain == "desert"


class TestFilmEntity:
    def test_film_from_swapi(self):
        swapi_data = {
            "title": "A New Hope",
            "episode_id": 4,
            "opening_crawl": "It is a period of civil war...",
            "director": "George Lucas",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1977-05-25",
            "url": "https://swapi.dev/api/films/1/",
        }

        film = Film.from_swapi(swapi_data)

        assert film.title == "A New Hope"
        assert film.episode_id == 4
        assert film.director == "George Lucas"


class TestStarshipEntity:
    def test_starship_from_swapi(self):
        swapi_data = {
            "name": "Millennium Falcon",
            "model": "YT-1300 light freighter",
            "manufacturer": "Corellian Engineering Corporation",
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

        starship = Starship.from_swapi(swapi_data)

        assert starship.name == "Millennium Falcon"
        assert starship.hyperdrive_rating == "0.5"
        assert starship.starship_class == "Light freighter"


class TestSearchFilters:
    def test_to_query_params_with_search(self):
        filters = SearchFilters(search="Luke", page=2)
        params = filters.to_query_params()

        assert params == {"search": "Luke", "page": 2}

    def test_to_query_params_without_search(self):
        filters = SearchFilters(page=1)
        params = filters.to_query_params()

        assert params == {"page": 1}
        assert "search" not in params
