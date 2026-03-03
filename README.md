# Amara — ANC Conversational Agent

Conversational AI agent for antenatal care (ANC) information, targeting adolescent mothers (16–19) in LMICs. Built as a technical assessment for the Gates Foundation AI Fellows Program.

**Stack:** React + Vite + TypeScript | Python 3.12 + FastAPI + Strands Agent SDK | OpenAI GPT-4o | Supabase pgvector

---

## Prerequisites

- Python 3.12
- Node.js 18+
- A Supabase project with the `pgvector` extension enabled
- OpenAI API key

---

## 1. Clone & Configure Environment

```bash
git clone <repo-url>
cd gates-case-study
```

### Backend env

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
```

### Frontend env

The frontend proxies API requests to `localhost:8000` by default via Vite config — no `.env` changes needed for local dev. If you're pointing at a remote backend, set:

```bash
# frontend/.env
VITE_API_URL=https://your-backend-url
```

---

## 2. Supabase Setup

In the Supabase SQL editor, run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE who_anc_chunks (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536)
);

CREATE INDEX ON who_anc_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

---

## 3. Ingest the WHO Guidelines PDF

```bash
cd backend
pip install -r requirements.txt
python scripts/ingest_who_pdf.py --pdf path/to/who-anc-guidelines.pdf
```

This chunks the PDF into ~500-token segments, embeds each chunk with `text-embedding-3-small`, and upserts into Supabase. Expect ~10–15 minutes for the full WHO ANC guidelines document.

> **Note:** If you have the PDF at `9789241549912-eng.pdf` in the repo root, use:
> ```bash
> python scripts/ingest_who_pdf.py --pdf ../9789241549912-eng.pdf
> ```

---

## 4. Run the Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Health check: `GET /health`.

---

## 5. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 6. Run Evaluations (Optional)

```bash
cd backend

# Run baseline evaluation
python scripts/evaluate.py --version v1

# Run refined evaluation
python scripts/evaluate.py --version v2

# Compare versions (generates a chart)
python scripts/evaluate.py --compare v1 v2
```

Results are saved as JSON in `backend/scripts/eval_results/` and a PNG comparison chart is generated.

---

## 7. Run Tests

```bash
cd backend
pytest tests/ -v
```

All 14 unit tests should pass covering emergency detection, guardrails, and search tool behavior.

---

## Project Structure

```
gates-case-study/
├── frontend/               # React app (Vite + Tailwind)
│   └── src/
│       ├── components/     # ChatWindow, MessageBubble, InputBar, Sidebar
│       ├── hooks/          # useChat — state management & API calls
│       ├── pages/          # About, Resources, Safety pages
│       └── types.ts
├── backend/
│   ├── app/
│   │   ├── main.py         # FastAPI app + /chat endpoint
│   │   ├── agent.py        # Strands agent setup
│   │   ├── prompts.py      # System prompt (v1 and v2)
│   │   ├── guardrails.py   # Post-processing safety checks + footer
│   │   ├── config.py       # Environment config
│   │   └── tools/
│   │       ├── search_guidelines.py   # RAG search tool
│   │       └── emergency_check.py     # Emergency keyword detection
│   ├── scripts/
│   │   ├── ingest_who_pdf.py          # PDF → embeddings → Supabase
│   │   └── evaluate.py                # LLM-as-judge evaluation harness
│   └── tests/
├── docs/plans/             # Design doc and implementation plan
├── CLAUDE.md               # Project instructions for Claude Code
├── AI_USE_REPORT.md        # AI usage transparency report
└── README.md
```
