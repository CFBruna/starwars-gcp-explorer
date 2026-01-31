from dataclasses import dataclass
from typing import Optional


@dataclass
class SearchFilters:
    search: Optional[str] = None
    page: int = 1

    def to_query_params(self) -> dict:
        params = {"page": self.page}
        if self.search:
            params["search"] = self.search
        return params
