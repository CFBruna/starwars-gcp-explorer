from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    API_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Star Wars API Platform"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    API_KEY: str = "dev-api-key-change-in-production"

    SWAPI_BASE_URL: str = "https://swapi.dev/api"
    CACHE_TTL_SECONDS: int = 3600

    RATE_LIMIT: str = "100/minute"
    
    CORS_ORIGINS: str = "*"

    @property
    def cors_origins_list(self) -> list[str]:
        """Convert comma-separated CORS origins to list"""
        if self.CORS_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


settings = Settings()
