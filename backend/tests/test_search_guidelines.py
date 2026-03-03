"""Tests for the WHO guidelines search tool.

Note: These test the search function logic with mocked Supabase/OpenAI calls.
Integration testing requires a populated Supabase instance.
"""
from unittest.mock import MagicMock, patch


def test_search_returns_formatted_results():
    """Test that search results are formatted correctly."""
    from app.tools.search_guidelines import search_who_guidelines_fn

    mock_openai = MagicMock()
    mock_openai.embeddings.create.return_value = MagicMock(
        data=[MagicMock(embedding=[0.1] * 1536)]
    )

    mock_supabase = MagicMock()
    mock_supabase.rpc.return_value.execute.return_value = MagicMock(
        data=[
            {
                "id": 1,
                "content": "WHO recommends a minimum of 8 ANC contacts.",
                "metadata": {"page": 10, "chunk_index": 5},
                "similarity": 0.92,
            },
            {
                "id": 2,
                "content": "Iron supplementation is recommended for all pregnant women.",
                "metadata": {"page": 25, "chunk_index": 12},
                "similarity": 0.85,
            },
        ]
    )

    result = search_who_guidelines_fn(
        "how many visits do I need",
        openai_client=mock_openai,
        supabase_client=mock_supabase,
    )

    assert "8 ANC contacts" in result
    assert "Iron supplementation" in result
    assert "Page 10" in result


def test_search_returns_no_results_message():
    """Test graceful handling when no results found."""
    from app.tools.search_guidelines import search_who_guidelines_fn

    mock_openai = MagicMock()
    mock_openai.embeddings.create.return_value = MagicMock(
        data=[MagicMock(embedding=[0.1] * 1536)]
    )

    mock_supabase = MagicMock()
    mock_supabase.rpc.return_value.execute.return_value = MagicMock(data=[])

    result = search_who_guidelines_fn(
        "unrelated query",
        openai_client=mock_openai,
        supabase_client=mock_supabase,
    )

    assert "no specific information" in result.lower() or "could not find" in result.lower()
