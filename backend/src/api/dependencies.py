from infrastructure.swapi_http_client import SwapiHttpClient


def get_swapi_client() -> SwapiHttpClient:
    """Dependency injection for SWAPI client"""
    return SwapiHttpClient()
