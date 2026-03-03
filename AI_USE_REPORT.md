# AI Use Report — ANC Conversational Agent
## Gates Foundation AI Fellows Technical Assessment

**Author:** Seamus Sutula
**Date:** 2026-03-03
**Project:** Amara — Antenatal Care Conversational Agent

---

## Overview

This document describes how AI tools were used throughout the development of this project — from initial ideation and design through full-stack implementation. AI assistance was used at every layer: refining requirements, generating a structured design document, producing an implementation plan, and executing parallel development sessions. Transparency about this usage is intentional: the ability to effectively direct, decompose, and review AI-generated work is itself a core skill being assessed.

---

## Phase 1: Requirements Refinement via Claude.ai (Web)

Before writing a single line of code, I used Claude on the web (claude.ai) to think through the problem and refine my ideas into a structured design document.

**Starting point:** The raw assessment brief — a PDF outlining the need for a conversational ANC agent targeting adolescent mothers in LMICs, with specific requirements around safety, WHO grounding, and evaluation.

**What I used Claude for:**
- Talking through the architecture tradeoffs (simple RAG chain vs. Strands agent with tools; in-memory vs. persistent conversation history)
- Thinking about the safety layer design — specifically, why emergency detection must bypass the LLM entirely and use hardcoded responses
- Defining the evaluation dimensions and scoring weights (Accuracy 25%, Safety 30%, Tone 20%, Completeness 15%, Conciseness 10%)
- Drafting and iterating on the system prompt persona ("Amara") and tone guidelines for the target audience
- Structuring everything into a coherent Product Requirements Document (PRD) / design doc

**Output:** `docs/plans/2026-03-02-anc-agent-design.md` — a 120-line design document covering architecture, project structure, backend/frontend design, knowledge base schema, 4-layer guardrail system, and evaluation harness design.

This document served as the authoritative spec for all subsequent implementation work.

---

## Phase 2: Implementation Planning via Claude Code

With the design doc in hand, I opened Claude Code (CLI) and used the `superpowers:brainstorming` and `superpowers:writing-plans` skills to produce a detailed, task-level implementation plan.

The brainstorming skill surfaces hidden complexity and clarifies intent before committing to an approach. The writing-plans skill translates design decisions into ordered, dependency-aware implementation tasks.

**Output:** `docs/plans/2026-03-02-anc-agent-implementation.md` — a ~1,994-line implementation plan covering every file, every function signature, and every test case needed to build the full stack.

---

## Phase 3: Parallel Agent Implementation

With a verified plan in place, I used the `superpowers:subagent-driven-development` and `superpowers:dispatching-parallel-agents` skills to decompose the plan and launch multiple Claude Code subagents simultaneously — each responsible for an isolated slice of the system.

### Parallel Sessions (2026-03-02, 20:25 – 21:35)

| Session ID | Scope | Key Output |
|------------|-------|------------|
| `edecf4ff` | Frontend scaffold → redesign → markdown rendering | Full React app: components, hooks, routing, Tailwind theme |
| `46a569d7` | Backend: FastAPI, Strands agent, tools, guardrails, eval | Full Python backend: agent, RAG search, emergency check, evaluation harness |
| `b13c49bf` | Database: Supabase schema and pgvector setup | `who_anc_chunks` table with IVFFLAT index |
| `ffad79d7` | Guardrails: programmatic safety footer | `SAFETY_FOOTER` appended post-generation, not LLM-reliant |
| `9e68fe4d` | Deployment: Render config, CORS | Build/start commands, open CORS for dev |

All five sessions ran concurrently. Each subagent received a focused subset of the implementation plan and operated independently, committing its own work to the repo.

### Post-Implementation Refinements (Session `46a569d7` continuation)

After the parallel build, I ran one continuation session to fix issues discovered during testing and add polish:

- **RAG pipeline debugging** — Identified two root causes of "no results": (1) character-reversed PDF text in the WHO guidelines (detected via word-frequency heuristic, corrected in ingestion), and (2) similarity threshold of 0.7 was too strict for `text-embedding-3-small` which produces ANC-relevant matches in the 0.45–0.65 range. Fixed both.
- **Styled safety footer** — Moved the disclaimer from LLM-generated output to programmatic post-processing (`guardrails.py`), ensuring it always appears and is consistently formatted.
- **WHO in-text citations** — Added system prompt instruction to cite page numbers as HTML anchor links (`<a target="_blank">(p. 42)</a>`).
- **Follow-up question behavior** — Added a system prompt rule to ask one gentle follow-up question when additional context (e.g., gestational age) would materially improve the answer.

### Evaluation Results

| Version | Score | Change |
|---------|-------|--------|
| v1 (baseline) | 4.26 / 5.0 | — |
| v2 (after refinements) | 5.0 / 5.0 | +0.74 |

Scored by GPT-4o-as-judge across 10 test queries on 5 weighted dimensions.

---

## My Role

All architectural decisions were mine. I defined the safety requirements, chose the agent framework, designed the guardrail layers, selected the evaluation dimensions and their weights, and directed every iteration. AI tools executed on the plan I gave them — they did not generate the plan.

Specific contributions that were mine alone:
- The architecture and design decisions, what frameworks to use and how to use them.
- The decision to bypass the LLM entirely for emergency detection (pre-LLM hardcoded response)
- The 4-layer guardrail design (pre-LLM → system prompt → post-LLM → off-topic)
- The choice to use Strands Agent SDK with tools rather than a simple RAG chain
- The "Amara" persona design and tone guidelines for adolescent LMIC users

---

## All Prompts Sent



### Claude Code (CLI) — Session `edecf4ff` (Frontend)

1. `[20:25:57]` — Examine assessment PDF, PRD doc, and RESOURCES.md, then create a comprehensive implementation plan. React frontend, Python/FastAPI/Strands backend, Supabase for vector storage. Write CLAUDE.md files. Use superpower brainstorm, planning, and implementation tools.
2. `[20:44:36]` — Continue with just FRONTEND concerns. Use subagents, prioritize fast development, save all tests/builds/checks until one batch at the end.
3. `[20:49:22]` — Go for it, build, typecheck, lint!
4. `[20:53:08]` — Restyle the frontend to be a cleaner more modern look. It should have a warm inviting theme (reds?) and be a full multi-page site. Model off of Anthropic's Claude interface.
5. `[21:09:04]` — Update the frontend to expect markdown and display appropriately.
6. `[21:34:54]` — `/summarize-session`

---

### Claude Code (CLI) — Session `46a569d7` (Backend)

1. `[20:45:47]` — Examine implementation plan and implement BACKEND concerns using subagents; prioritize fast development; save all tests/builds until one batch at the end; mark off completed items
2. `[20:52:53]` — Install deps, run tests, and evaluations
3. `[21:10:28]` — Update the backend to style the default disclaimer in italics in a smaller font a few lines below the main message; refer back to the WHO doc with link reference; style with markdown; keep it lowkey
4. `[21:15:42]` — Tweak the system prompt to gently ask for more information if it could be useful to answer more thoroughly
5. `[21:17:01]` — Log the response from the WHO search tool; encourage the model to respond in raw markdown (the frontend will format)
6. `[21:18:55]` — Getting no results from the RAG pipeline: `[WHO search] query='nutrition during pregnancy' → no results`, looks like an error in the ingestion.
7. `[21:28:36]` — Include the page number of the WHO reference in the response in in-text citation link form
8. `[21:34:57]` — `/summarize-session`

---

### Claude Code (CLI) — Other Parallel Sessions (2026-03-02)

**Session `b13c49bf` (Database / Supabase):**
- Supabase schema walkthrough and pgvector setup for `who_anc_chunks` table

**Session `ffad79d7` (Guardrails):**
- Append safety footer programmatically (not via LLM)

**Session `9e68fe4d` (Deployment):**
- Render build/deploy commands, CORS open for dev

---

*Total meaningful prompts across all sessions: ~25*
*Total lines added: +5,653 | Lines removed: -67*
*Commits: 8 | Tests passing: 14/14 | Eval score: 5.0/5.0*
