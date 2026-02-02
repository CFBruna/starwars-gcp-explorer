import sys
from pathlib import Path

from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from src.main import app  # noqa: E402

client = TestClient(app)
API_KEY = "dev-api-key-change-in-production"


class TestAuthentication:
    def test_request_without_api_key_returns_401(self):
        response = client.get("/api/v1/people")
        assert response.status_code == 401
        assert response.json()["detail"] == "Missing API Key"

    def test_request_with_invalid_api_key_returns_401(self):
        response = client.get("/api/v1/people", headers={"X-API-Key": "wrong-key"})
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid API Key"

    def test_request_with_valid_api_key_returns_200(self):
        response = client.get("/api/v1/people", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200


class TestCharactersEndpoint:
    def test_get_characters_returns_valid_data(self):
        response = client.get("/api/v1/people", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert "results" in data
        assert len(data["results"]) > 0

    def test_get_characters_with_search_filter(self):
        response = client.get("/api/v1/people?search=Luke", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert any("luke" in r["name"].lower() for r in data["results"])

    def test_get_characters_with_pagination(self):
        response = client.get("/api/v1/people?page=2", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200


class TestPlanetsEndpoint:
    def test_get_planets_returns_valid_data(self):
        response = client.get("/api/v1/planets", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert "results" in data

    def test_get_planets_with_search_filter(self):
        response = client.get("/api/v1/planets?search=Tatooine", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200


class TestFilmsEndpoint:
    def test_get_films_returns_valid_data(self):
        response = client.get("/api/v1/films", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert "results" in data


class TestStarshipsEndpoint:
    def test_get_starships_returns_valid_data(self):
        response = client.get("/api/v1/starships", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert "results" in data

    def test_get_starships_with_search_filter(self):
        response = client.get("/api/v1/starships?search=X-wing", headers={"X-API-Key": API_KEY})
        assert response.status_code == 200
