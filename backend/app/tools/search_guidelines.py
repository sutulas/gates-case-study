"""Supabase pgvector search tool for WHO ANC guidelines."""

WHO_GUIDELINES_URL = (
    "https://iris.who.int/server/api/core/bitstreams/"
    "9dccde13-3593-4a22-9237-61abe5a3c6b7/content"
)

from openai import OpenAI
from supabase import create_client

from app.config import (
    OPENAI_API_KEY,
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    EMBEDDING_MODEL,
)

# Module-level clients (initialized once)
_openai_client: OpenAI | None = None
_supabase_client = None


def _get_openai_client() -> OpenAI:
    global _openai_client
    if _openai_client is None:
        _openai_client = OpenAI(api_key=OPENAI_API_KEY)
    return _openai_client


def _get_supabase_client():
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    return _supabase_client


def search_who_guidelines_fn(
    query: str,
    match_count: int = 3,
    match_threshold: float = 0.45,
    openai_client: OpenAI | None = None,
    supabase_client=None,
) -> str:
    """Search WHO ANC guidelines for relevant information.

    Args:
        query: The search query to find relevant guideline content.
        match_count: Number of results to return.
        match_threshold: Minimum similarity threshold.
        openai_client: Optional OpenAI client (for testing).
        supabase_client: Optional Supabase client (for testing).

    Returns:
        Formatted string with relevant guideline excerpts and source info.
    """
    oai = openai_client or _get_openai_client()
    supa = supabase_client or _get_supabase_client()

    # Generate embedding for the query
    embedding_response = oai.embeddings.create(model=EMBEDDING_MODEL, input=query)
    query_embedding = embedding_response.data[0].embedding

    # Search Supabase
    result = supa.rpc(
        "match_who_chunks",
        {
            "query_embedding": query_embedding,
            "match_threshold": match_threshold,
            "match_count": match_count,
        },
    ).execute()

    if not result.data:
        return "I could not find specific information about that in the WHO guidelines. Please consult a health worker for guidance on this topic."

    # Format results
    formatted_chunks = []
    for i, row in enumerate(result.data, 1):
        page = row.get("metadata", {}).get("page", "unknown")
        similarity = row.get("similarity", 0)
        formatted_chunks.append(
            f"[Source {i} — Page {page}, relevance: {similarity:.0%}]\n{row['content']}"
        )

    return "\n\n---\n\n".join(formatted_chunks)
