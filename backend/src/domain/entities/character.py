from dataclasses import dataclass
from typing import Any


@dataclass
class Character:
    name: str
    height: str
    mass: str
    hair_color: str
    skin_color: str
    eye_color: str
    birth_year: str
    gender: str
    homeworld: str
    url: str

    @classmethod
    def from_swapi(cls, data: dict[str, Any]) -> "Character":
        return cls(
            name=data["name"],
            height=data["height"],
            mass=data["mass"],
            hair_color=data["hair_color"],
            skin_color=data["skin_color"],
            eye_color=data["eye_color"],
            birth_year=data["birth_year"],
            gender=data["gender"],
            homeworld=data["homeworld"],
            url=data["url"],
        )
