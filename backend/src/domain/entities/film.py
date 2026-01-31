from dataclasses import dataclass
from typing import Any


@dataclass
class Film:
    title: str
    episode_id: int
    opening_crawl: str
    director: str
    producer: str
    release_date: str
    url: str

    @classmethod
    def from_swapi(cls, data: dict[str, Any]) -> "Film":
        return cls(
            title=data["title"],
            episode_id=data["episode_id"],
            opening_crawl=data["opening_crawl"],
            director=data["director"],
            producer=data["producer"],
            release_date=data["release_date"],
            url=data["url"],
        )
