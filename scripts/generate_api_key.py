#!/usr/bin/env python3
"""
Script to generate a secure API key for production use.
Usage: python scripts/generate_api_key.py
"""
import secrets
import string


def generate_api_key(length: int = 64) -> str:
    """Generate a cryptographically secure API key"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


if __name__ == "__main__":
    api_key = generate_api_key()
    print("=" * 70)
    print("🔐 Generated API Key (save securely):")
    print("=" * 70)
    print(api_key)
    print("=" * 70)
    print("\nFor Cloud Run deployment:")
    print(f"export API_KEY={api_key}")
    print("\nOr set in Cloud Run:")
    print(f"gcloud run services update starwars-api \\")
    print(f"  --update-env-vars API_KEY={api_key}")
    print("=" * 70)
