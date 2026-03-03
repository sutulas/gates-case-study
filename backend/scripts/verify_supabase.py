"""Verify Supabase connection, schema, and search function are working."""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from supabase import create_client
from app.config import SUPABASE_URL, SUPABASE_SERVICE_KEY


def main():
    print("Connecting to Supabase...")
    client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    print(f"  URL: {SUPABASE_URL}")

    print("\nChecking who_anc_chunks table...")
    result = client.table("who_anc_chunks").select("id", count="exact").limit(1).execute()
    row_count = result.count if result.count is not None else len(result.data)
    print(f"  Table exists. Row count: {row_count}")

    print("\nChecking match_who_chunks function...")
    # Call with a zero-vector — just verifies the function exists and is callable
    zero_vector = [0.0] * 1536
    result = client.rpc(
        "match_who_chunks",
        {
            "query_embedding": zero_vector,
            "match_threshold": 0.99,
            "match_count": 1,
        },
    ).execute()
    print("  Function exists and is callable.")

    if row_count == 0:
        print("\nSetup complete. Table is empty — run the ingestion script next:")
        print("  python scripts/ingest_who_pdf.py --pdf /path/to/who-anc.pdf")
    else:
        print(f"\nAll checks passed. {row_count} chunks ready for search.")


if __name__ == "__main__":
    main()
