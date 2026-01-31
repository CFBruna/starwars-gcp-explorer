import time
from functools import wraps
from typing import Any, Callable


class CacheEntry:
    """Cache entry with TTL support"""

    def __init__(self, value: Any, ttl_seconds: int):
        self.value = value
        self.expires_at = time.time() + ttl_seconds

    def is_expired(self) -> bool:
        return time.time() > self.expires_at


class LRUCache:
    """Simple LRU cache with TTL"""

    def __init__(self, max_size: int = 128, default_ttl: int = 3600):
        self.cache: dict[str, CacheEntry] = {}
        self.max_size = max_size
        self.default_ttl = default_ttl
        self.access_order: list[str] = []

    def get(self, key: str) -> Any | None:
        if key not in self.cache:
            return None

        entry = self.cache[key]
        if entry.is_expired():
            self._evict(key)
            return None

        self.access_order.remove(key)
        self.access_order.append(key)
        return entry.value

    def set(self, key: str, value: Any, ttl: int | None = None):
        if key in self.cache:
            self.access_order.remove(key)

        if len(self.cache) >= self.max_size and key not in self.cache:
            lru_key = self.access_order[0]
            self._evict(lru_key)

        ttl_seconds = ttl or self.default_ttl
        self.cache[key] = CacheEntry(value, ttl_seconds)
        self.access_order.append(key)

    def _evict(self, key: str):
        if key in self.cache:
            del self.cache[key]
        if key in self.access_order:
            self.access_order.remove(key)

    def clear(self):
        self.cache.clear()
        self.access_order.clear()


_cache = LRUCache(max_size=128, default_ttl=3600)


def cached(ttl: int | None = None):
    """Decorator to cache async function results"""

    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"

            cached_value = _cache.get(cache_key)
            if cached_value is not None:
                return cached_value

            result = await func(*args, **kwargs)
            _cache.set(cache_key, result, ttl)
            return result

        return wrapper

    return decorator


def clear_cache():
    """Clear all cache entries (useful for testing)"""
    _cache.clear()
