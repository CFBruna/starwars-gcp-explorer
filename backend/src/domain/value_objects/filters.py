from dataclasses import dataclass
from typing import Any


@dataclass
class SearchFilters:
    search: str | None = None
    page: int = 1
    ordering: str | None = None

    def to_query_params(self) -> dict[str, Any]:
        params: dict[str, Any] = {"page": self.page}
        if self.search:
            params["search"] = self.search
        return params
