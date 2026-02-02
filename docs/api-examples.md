# 📖 API Usage Examples

Complete guide to using the Star Wars API Platform with practical cURL examples.

## Base URL

```
Local: http://localhost:8000
Production: https://starwars-api-xxxxx.run.app
```

## Authentication

All `/api/v1/*` endpoints require the `X-API-Key` header:

```bash
export API_KEY="your-api-key-here"
```

## Health Check

**No authentication required** - useful for monitoring:

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "starwars-api",
  "version": "1.0.0",
  "environment": "development"
}
```

---

## Characters (People)

### List All Characters

```bash
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/people
```

**Response:**
```json
{
  "count": 82,
  "next": "http://localhost:8000/api/v1/people?page=2",
  "previous": null,
  "results": [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "url": "https://swapi.dev/api/people/1/"
    }
  ]
}
```

### Search Characters

```bash
# Search by name
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?search=Luke"

# Search Skywalker family
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?search=Skywalker"

# Search droids
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?search=C-3PO"
```

### Sort Characters

```bash
# Sort by name A-Z
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=name"

# Sort by name Z-A
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=-name"

# Sort by height (shortest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=height"

# Sort by height (tallest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=-height"

# Sort by mass (lightest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=mass"

# Sort by mass (heaviest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?ordering=-mass"
```

### Pagination

```bash
# Get page 2
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?page=2"

# Combine: Search + Sort + Page
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?search=Darth&ordering=-mass&page=1"
```

---

## Planets

### List All Planets

```bash
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/planets
```

**Response:**
```json
{
  "count": 60,
  "results": [
    {
      "name": "Tatooine",
      "rotation_period": "23",
      "orbital_period": "304",
      "diameter": "10465",
      "climate": "arid",
      "gravity": "1 standard",
      "terrain": "desert",
      "surface_water": "1",
      "population": "200000",
      "url": "https://swapi.dev/api/planets/1/"
    }
  ]
}
```

### Search Planets

```bash
# Search by name
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?search=Tatooine"

# Search by terrain
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?search=forest"

# Search ice planets
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?search=ice"
```

### Sort Planets

```bash
# Sort by name A-Z
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?ordering=name"

# Sort by population (lowest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?ordering=population"

# Sort by population (highest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?ordering=-population"

# Sort by diameter (smallest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?ordering=diameter"

# Sort by diameter (largest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?ordering=-diameter"
```

---

## Films

### List All Films

```bash
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/films
```

**Response:**
```json
{
  "count": 6,
  "results": [
    {
      "title": "A New Hope",
      "episode_id": 4,
      "opening_crawl": "It is a period of civil war...",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25",
      "url": "https://swapi.dev/api/films/1/"
    }
  ]
}
```

### Pagination

```bash
# Films are typically returned in a single page
# But pagination is supported
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/films?page=1"
```

---

## Starships

### List All Starships

```bash
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/starships
```

**Response:**
```json
{
  "count": 36,
  "results": [
    {
      "name": "X-wing",
      "model": "T-65 X-wing",
      "manufacturer": "Incom Corporation",
      "cost_in_credits": "149999",
      "length": "12.5",
      "crew": "1",
      "passengers": "0",
      "cargo_capacity": "110",
      "hyperdrive_rating": "1.0",
      "starship_class": "Starfighter",
      "url": "https://swapi.dev/api/starships/12/"
    }
  ]
}
```

### Search Starships

```bash
# Search by name
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?search=X-wing"

# Search Millennium Falcon
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?search=Millennium"

# Search Star Destroyers
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?search=Destroyer"
```

### Sort Starships

```bash
# Sort by name A-Z
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?ordering=name"

# Sort by crew (smallest crew first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?ordering=crew"

# Sort by crew (largest crew first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?ordering=-crew"

# Sort by passengers (fewest first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?ordering=passengers"

# Sort by passengers (most first)
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?ordering=-passengers"
```

---

## Error Handling

### Missing API Key (401 Unauthorized)

```bash
curl http://localhost:8000/api/v1/people
```

**Response:**
```json
{
  "detail": "Missing API Key"
}
```

### Invalid API Key (401 Unauthorized)

```bash
curl -H "X-API-Key: wrong-key" \
  http://localhost:8000/api/v1/people
```

**Response:**
```json
{
  "detail": "Invalid API Key"
}
```

### Rate Limit Exceeded (429 Too Many Requests)

```bash
# After 100 requests in 1 minute
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/people
```

**Response:**
```json
{
  "error": "Rate limit exceeded: 100 per 1 minute"
}
```

### Not Found (404)

```bash
curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/invalid-endpoint
```

**Response:**
```json
{
  "detail": "Not Found"
}
```

---

## Advanced Examples

### Combine Search + Sort + Pagination

```bash
# Find tall characters, sorted by height
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/people?search=tall&ordering=-height&page=1"

# Find desert planets, sorted by population
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/planets?search=desert&ordering=-population"

# Find starfighters, sorted by name
curl -H "X-API-Key: $API_KEY" \
  "http://localhost:8000/api/v1/starships?search=fighter&ordering=name"
```

### Performance Testing

```bash
# Test cache performance (run twice - first is slow, second is fast)
time curl -H "X-API-Key: $API_KEY" \
  http://localhost:8000/api/v1/people

# First run: ~200ms (SWAPI call)
# Second run: ~5ms (cached)
```

### Batch Requests (Shell Script)

```bash
#!/bin/bash
API_KEY="your-key"
BASE_URL="http://localhost:8000/api/v1"

# Fetch all resource types
echo "Fetching characters..."
curl -s -H "X-API-Key: $API_KEY" "$BASE_URL/people" | jq '.results[].name'

echo "Fetching planets..."
curl -s -H "X-API-Key: $API_KEY" "$BASE_URL/planets" | jq '.results[].name'

echo "Fetching films..."
curl -s -H "X-API-Key: $API_KEY" "$BASE_URL/films" | jq '.results[].title'

echo "Fetching starships..."
curl -s -H "X-API-Key: $API_KEY" "$BASE_URL/starships" | jq '.results[].name'
```

---

## Using with Other Tools

### HTTPie

```bash
http GET http://localhost:8000/api/v1/people \
  X-API-Key:$API_KEY \
  search==Luke
```

### Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Star Wars API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Characters",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "X-API-Key",
            "value": "{{API_KEY}}"
          }
        ],
        "url": {
          "raw": "{{BASE_URL}}/api/v1/people",
          "host": ["{{BASE_URL}}"],
          "path": ["api", "v1", "people"]
        }
      }
    }
  ]
}
```

### Python Requests

```python
import requests

API_KEY = "your-api-key"
BASE_URL = "http://localhost:8000"
headers = {"X-API-Key": API_KEY}

# Get characters
response = requests.get(f"{BASE_URL}/api/v1/people", headers=headers)
characters = response.json()

# Search and sort
params = {"search": "Skywalker", "ordering": "name"}
response = requests.get(f"{BASE_URL}/api/v1/people", headers=headers, params=params)
results = response.json()["results"]
```

### JavaScript Fetch

```javascript
const API_KEY = "your-api-key";
const BASE_URL = "http://localhost:8000";

// Get characters
fetch(`${BASE_URL}/api/v1/people`, {
  headers: { "X-API-Key": API_KEY }
})
  .then(res => res.json())
  .then(data => console.log(data.results));

// Search with params
const params = new URLSearchParams({
  search: "Luke",
  ordering: "name"
});

fetch(`${BASE_URL}/api/v1/people?${params}`, {
  headers: { "X-API-Key": API_KEY }
})
  .then(res => res.json())
  .then(data => console.log(data.results));
```

---

## Interactive API Documentation

Visit the auto-generated Swagger UI for interactive testing:

```
http://localhost:8000/api/v1/docs
```

Features:
- Try endpoints directly in browser
- View request/response schemas
- Generate code samples
- No API key required in dev mode (for docs only)

---

**Related Documentation:**
- [Architecture](architecture.md)
- [Deployment Guide](deployment.md)
- [README](../README.md)
