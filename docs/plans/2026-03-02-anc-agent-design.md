# ANC Conversational Agent — Design Document

**Date:** 2026-03-02
**Project:** Gates Foundation AI Fellows Technical Assessment
**Stack:** React (Vite + Tailwind) | Python (FastAPI + Strands Agent SDK) | Supabase pgvector | OpenAI GPT-4o

---

## 1. Architecture Overview

Strands Agent with tool-based RAG. The agent orchestrates response generation and decides when to query the knowledge base. FastAPI serves a single `/chat` endpoint. React frontend provides a mobile-first chat interface.

**Request flow:**
1. User message → FastAPI `/chat` endpoint
2. Pre-LLM emergency keyword check → if triggered, return hardcoded safety response (bypass LLM)
3. If safe → Strands agent with GPT-4o processes message, optionally calling `search_who_guidelines` tool
4. Post-LLM guardrail scan → append safety disclaimer, ensure referral language for danger signs
5. Return response to frontend

## 2. Project Structure

```
gates-case-study/
├── frontend/                    # React app (Vite + Tailwind)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── InputBar.tsx
│   │   │   └── SafetyBanner.tsx
│   │   ├── hooks/useChat.ts
│   │   ├── types.ts
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, CORS, /chat endpoint
│   │   ├── agent.py             # Strands agent setup + system prompt
│   │   ├── tools/
│   │   │   ├── search_guidelines.py
│   │   │   └── emergency_check.py
│   │   ├── guardrails.py        # Post-processing safety checks
│   │   ├── prompts.py           # System prompt v1 and v2
│   │   └── config.py            # Environment config
│   ├── scripts/
│   │   ├── ingest_who_pdf.py    # Chunk + embed WHO PDF → Supabase
│   │   └── evaluate.py          # Automated 10-query evaluation harness
│   ├── requirements.txt
│   └── .env.example
├── docs/
│   ├── plans/
│   └── memo.md                  # Reflection memo (deliverable)
├── CLAUDE.md
└── README.md
```

## 3. Backend Design

### FastAPI App
- POST `/chat` — accepts `{ message, conversation_id? }`, returns `{ response, is_emergency, sources }`
- CORS for frontend origin
- In-memory conversation history (dict keyed by conversation_id)

### Strands Agent
- GPT-4o via OpenAI provider
- System prompt from `prompts.py` (persona, hard rules, response format, WHO grounding)
- Two registered tools:
  - `search_who_guidelines(query: str)` — embed query, cosine search Supabase, return top-3 chunks
  - `check_emergency(message: str)` — keyword match against CDC danger signs, return bool + matched terms

## 4. Frontend Design

- React + Vite + TypeScript + Tailwind CSS
- Mobile-first, high-contrast, lightweight
- Components: SafetyBanner (persistent top), ChatWindow (scrollable), MessageBubble (user/agent styling, emergency red border), InputBar (fixed bottom)
- `useChat` hook manages messages, loading state, conversation ID, API calls
- Error state: network failure → direct-to-health-worker message

## 5. Knowledge Base (Supabase pgvector)

```sql
CREATE TABLE who_anc_chunks (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536)
);
CREATE INDEX ON who_anc_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

- Ingestion: PDF → chunks (~500 tokens, with overlap) → OpenAI text-embedding-3-small → Supabase upsert
- Search: embed query → cosine similarity → top-3 chunks with metadata

## 6. Guardrails (4 Layers)

1. **Pre-LLM Emergency Detection** — keyword match (bleeding, seizure, can't breathe, etc.) → hardcoded urgent response, bypasses LLM
2. **System Prompt Rules** — never diagnose, never prescribe, never shame, structured refusal templates
3. **Post-LLM Safety Check** — scan response for danger signs, ensure referral language, append disclaimer
4. **Off-Topic Redirect** — handled via system prompt instructions

## 7. Evaluation Harness

- 10 test queries from PRD (symptom, schedule, nutrition, emergency, diagnosis refusal, prescription refusal, emotional support, exercise, urgent care, off-topic)
- GPT-4o-as-judge scores each response 1-5 on: Accuracy (25%), Safety (30%), Tone (20%), Completeness (15%), Conciseness (10%)
- CLI: `--version v1` (before), `--version v2` (after), `--compare v1 v2` (generates matplotlib chart)
- Output: JSON report + PNG comparison chart for the reflection memo

## 8. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Strands agent with tools (not simple chain) | Demonstrates agent SDK competence; agent decides when RAG is needed |
| Pre-LLM emergency bypass | Safety-critical: never let the LLM decide whether something is an emergency |
| In-memory conversation history | Prototype scope; no need for persistence |
| GPT-4o | User preference; strong instruction following |
| LLM-as-judge evaluation | Reproducible, scalable scoring; avoids subjective manual grading |
| Tailwind CSS | Fast mobile-responsive styling with minimal effort |
