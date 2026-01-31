from dataclasses import dataclass
from typing import Any


@dataclass
class Planet:
    name: str
    rotation_period: str
    orbital_period: str
    diameter: str
    climate: str
    gravity: str
    terrain: str
    surface_water: str
    population: str
    url: str

    @classmethod
    def from_swapi(cls, data: dict[str, Any]) -> "Planet":
        return cls(
            name=data["name"],
            rotation_period=data["rotation_period"],
            orbital_period=data["orbital_period"],
            diameter=data["diameter"],
            climate=data["climate"],
            gravity=data["gravity"],
            terrain=data["terrain"],
            surface_water=data["surface_water"],
            population=data["population"],
            url=data["url"],
        )
