"""Chunk and embed a WHO ANC guidelines PDF into Supabase pgvector."""

import argparse
import sys
import os

# Add parent directory to path so we can import app.config
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pdfplumber
import tiktoken
from openai import OpenAI
from supabase import create_client

from app.config import (
    OPENAI_API_KEY,
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    EMBEDDING_MODEL,
)


_COMMON_ENGLISH = {"the", "and", "for", "that", "with", "from", "are", "this", "have", "not"}
_COMMON_REVERSED = {"eht", "dna", "rof", "taht", "htiw", "morf", "era", "siht", "evah", "ton"}


def _fix_reversed_text(text: str) -> str:
    """Some PDF pages are stored with characters in reverse order.
    Detect by checking whether reversed common-word markers outnumber
    forward ones, and correct by reversing the entire string.
    """
    words = set(text.lower().split())
    if len(words & _COMMON_REVERSED) > len(words & _COMMON_ENGLISH):
        return text[::-1]
    return text


def extract_text_from_pdf(pdf_path: str) -> list[dict]:
    """Extract text from PDF, returning list of {page, text} dicts."""
    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            if text and text.strip():
                text = _fix_reversed_text(text.strip())
                pages.append({"page": i + 1, "text": text})
    return pages


def chunk_text(pages: list[dict], max_tokens: int = 500, overlap_tokens: int = 50) -> list[dict]:
    """Split page text into overlapping chunks of ~max_tokens."""
    enc = tiktoken.encoding_for_model("gpt-4o")
    chunks = []

    for page_data in pages:
        text = page_data["text"]
        tokens = enc.encode(text)

        start = 0
        while start < len(tokens):
            end = min(start + max_tokens, len(tokens))
            chunk_tokens = tokens[start:end]
            chunk_text_str = enc.decode(chunk_tokens)

            chunks.append({
                "content": chunk_text_str,
                "metadata": {
                    "page": page_data["page"],
                    "chunk_index": len(chunks),
                },
            })

            if end >= len(tokens):
                break
            start = end - overlap_tokens

    return chunks


def embed_chunks(chunks: list[dict], client: OpenAI) -> list[dict]:
    """Generate embeddings for each chunk using OpenAI."""
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        texts = [c["content"] for c in batch]
        response = client.embeddings.create(model=EMBEDDING_MODEL, input=texts)
        for j, embedding_data in enumerate(response.data):
            batch[j]["embedding"] = embedding_data.embedding
        print(f"  Embedded {min(i + batch_size, len(chunks))}/{len(chunks)} chunks")
    return chunks


def upsert_to_supabase(chunks: list[dict], supabase_client) -> None:
    """Insert chunks with embeddings into Supabase."""
    for chunk in chunks:
        supabase_client.table("who_anc_chunks").insert({
            "content": chunk["content"],
            "metadata": chunk["metadata"],
            "embedding": chunk["embedding"],
        }).execute()
    print(f"  Inserted {len(chunks)} chunks into Supabase")


def main():
    parser = argparse.ArgumentParser(description="Ingest WHO ANC PDF into Supabase")
    parser.add_argument("--pdf", required=True, help="Path to the WHO ANC guidelines PDF")
    parser.add_argument("--clear", action="store_true", help="Clear existing chunks before ingesting")
    args = parser.parse_args()

    print(f"1. Extracting text from {args.pdf}...")
    pages = extract_text_from_pdf(args.pdf)
    print(f"   Found {len(pages)} pages with text")

    print("2. Chunking text...")
    chunks = chunk_text(pages)
    print(f"   Created {len(chunks)} chunks")

    print("3. Generating embeddings...")
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    chunks = embed_chunks(chunks, openai_client)

    print("4. Uploading to Supabase...")
    supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    if args.clear:
        supabase_client.table("who_anc_chunks").delete().neq("id", 0).execute()
        print("   Cleared existing chunks")
    upsert_to_supabase(chunks, supabase_client)

    print("Done!")


if __name__ == "__main__":
    main()
