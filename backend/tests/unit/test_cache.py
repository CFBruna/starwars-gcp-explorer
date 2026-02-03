import time
import pytest
import asyncio
from infrastructure.cache import LRUCache, cached, clear_cache

class TestLRUCache:
    def test_cache_stores_and_retrieves_value(self) -> None:
        cache = LRUCache(max_size=2, default_ttl=60)
        cache.set("key1", "value1")

        assert cache.get("key1") == "value1"

    def test_cache_returns_none_for_missing_key(self) -> None:
        cache = LRUCache()
        assert cache.get("nonexistent") is None

    def test_cache_expires_after_ttl(self) -> None:
        cache = LRUCache(default_ttl=1)
        cache.set("key1", "value1", ttl=1)

        assert cache.get("key1") == "value1"
        time.sleep(1.1)
        assert cache.get("key1") is None

    def test_cache_evicts_lru_when_full(self) -> None:
        cache = LRUCache(max_size=2)
        cache.set("key1", "value1")
        cache.set("key2", "value2")
        cache.set("key3", "value3")

        assert cache.get("key1") is None
        assert cache.get("key2") == "value2"
        assert cache.get("key3") == "value3"

    def test_cache_updates_access_order(self) -> None:
        cache = LRUCache(max_size=2)
        cache.set("key1", "value1")
        cache.set("key2", "value2")

        cache.get("key1")

        cache.set("key3", "value3")

        assert cache.get("key1") == "value1"
        assert cache.get("key2") is None
        assert cache.get("key3") == "value3"

    def test_cache_clear_removes_all_entries(self) -> None:
        cache = LRUCache()
        cache.set("key1", "value1")
        cache.set("key2", "value2")

        cache.clear()

        assert cache.get("key1") is None
        assert cache.get("key2") is None


@pytest.mark.asyncio
class TestCachedDecorator:
    async def test_cached_decorator_caches_result(self) -> None:
        call_count = 0

        @cached(ttl=60)
        async def expensive_function(x: int) -> int:
            nonlocal call_count
            call_count += 1
            return x * 2

        clear_cache()

        result1 = await expensive_function(5)
        result2 = await expensive_function(5)

        assert result1 == 10
        assert result2 == 10
        assert call_count == 1

    async def test_cached_decorator_different_args(self) -> None:
        call_count = 0

        @cached(ttl=60)
        async def expensive_function(x: int) -> int:
            nonlocal call_count
            call_count += 1
            return x * 2

        clear_cache()

        result1 = await expensive_function(5)
        result2 = await expensive_function(10)

        assert result1 == 10
        assert result2 == 20
        assert call_count == 2

    async def test_cached_decorator_respects_ttl(self) -> None:
        call_count = 0

        @cached(ttl=1)
        async def expensive_function(x: int) -> int:
            nonlocal call_count
            call_count += 1
            return x * 2

        clear_cache()

        result1 = await expensive_function(5)
        await asyncio.sleep(1.1)
        result2 = await expensive_function(5)

        assert result1 == 10
        assert result2 == 10
        assert call_count == 2
