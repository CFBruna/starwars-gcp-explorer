from dataclasses import dataclass
from typing import Any


@dataclass
class Starship:
    name: str
    model: str
    manufacturer: str
    cost_in_credits: str
    length: str
    max_atmosphering_speed: str
    crew: str
    passengers: str
    cargo_capacity: str
    consumables: str
    hyperdrive_rating: str
    starship_class: str
    url: str

    @classmethod
    def from_swapi(cls, data: dict[str, Any]) -> "Starship":
        return cls(
            name=data["name"],
            model=data["model"],
            manufacturer=data["manufacturer"],
            cost_in_credits=data["cost_in_credits"],
            length=data["length"],
            max_atmosphering_speed=data["max_atmosphering_speed"],
            crew=data["crew"],
            passengers=data["passengers"],
            cargo_capacity=data["cargo_capacity"],
            consumables=data["consumables"],
            hyperdrive_rating=data["hyperdrive_rating"],
            starship_class=data["starship_class"],
            url=data["url"],
        )
