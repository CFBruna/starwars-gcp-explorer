from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    API_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Star Wars API Platform"
    VERSION: str = "1.0.0"

    API_KEY: str = "dev-api-key-change-in-production"

    SWAPI_BASE_URL: str = "https://swapi.dev/api"
    CACHE_TTL_SECONDS: int = 3600

    RATE_LIMIT: str = "100/minute"


settings = Settings()
