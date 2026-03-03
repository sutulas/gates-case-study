-- Enable pgvector extension (if not already enabled)
create extension if not exists vector with schema extensions;

-- Create the chunks table
create table if not exists who_anc_chunks (
  id bigserial primary key,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding extensions.vector(1536)
);

-- Create the cosine similarity search function
create or replace function match_who_chunks(
  query_embedding extensions.vector(1536),
  match_threshold float default 0.7,
  match_count int default 3
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    who_anc_chunks.id,
    who_anc_chunks.content,
    who_anc_chunks.metadata,
    1 - (who_anc_chunks.embedding <=> query_embedding) as similarity
  from who_anc_chunks
  where 1 - (who_anc_chunks.embedding <=> query_embedding) > match_threshold
  order by who_anc_chunks.embedding <=> query_embedding asc
  limit least(match_count, 200);
$$;

-- Create index for faster search (run after data is inserted)
-- create index on who_anc_chunks using ivfflat (embedding extensions.vector_cosine_ops) with (lists = 100);
