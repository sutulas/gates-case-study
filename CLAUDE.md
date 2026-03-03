# ANC Conversational Agent — Gates Foundation AI Fellows Assessment

## Project Overview
Conversational AI agent for antenatal care (ANC) information, targeting adolescent mothers (16-19) in LMICs. Built as a technical assessment for the Gates Foundation AI Fellows Program.

## Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Python 3.11+ + FastAPI + Strands Agent SDK
- **LLM:** OpenAI GPT-4o
- **Embeddings:** OpenAI text-embedding-3-small (1536 dims)
- **Vector Store:** Supabase with pgvector extension
- **Knowledge Base:** WHO ANC Guidelines (PDF → chunked → embedded)

## Project Structure
- `frontend/` — React chat UI (Vite + Tailwind)
- `backend/app/` — FastAPI server + Strands agent + tools
- `backend/scripts/` — Ingestion and evaluation scripts
- `docs/` — Design docs and reflection memo

## Key Commands
```bash
# Backend
cd backend && pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend && npm install && npm run dev

# Ingest WHO guidelines
cd backend && python scripts/ingest_who_pdf.py --pdf path/to/who-anc.pdf

# Run evaluation
cd backend && python scripts/evaluate.py --version v1
cd backend && python scripts/evaluate.py --version v2
cd backend && python scripts/evaluate.py --compare v1 v2
```

## Architecture
- Strands Agent with tool-based RAG (Approach A from design doc)
- Agent has two tools: `search_who_guidelines` and `check_emergency`
- 4-layer guardrail system: pre-LLM emergency detection → system prompt rules → post-LLM safety scan → off-topic redirect
- In-memory conversation history (prototype scope)

## Environment Variables
```
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

## Safety Rules
- NEVER let the agent diagnose conditions or prescribe medications
- Emergency keywords ALWAYS bypass the LLM and return hardcoded safety responses
- Every agent response MUST end with a safety disclaimer
- The agent must NEVER shame or judge the user

## Evaluation
- 10 test queries scored on 5 dimensions (Accuracy, Safety, Tone, Completeness, Conciseness)
- GPT-4o-as-judge for automated scoring
- Before/after comparison with prompt refinement (v1 → v2)

## Design Doc
See `docs/plans/2026-03-02-anc-agent-design.md` for full architecture details.
