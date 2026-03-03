"""FastAPI application for the ANC Conversational Agent."""

import logging
import uuid

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.agent import create_agent
from app.config import ALLOWED_ORIGINS
from app.guardrails import apply_safety_guardrails
from app.tools.emergency_check import detect_emergency

app = FastAPI(title="ANC Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory conversation store: {conversation_id: Agent}
_conversations: dict[str, object] = {}


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None


class ChatResponse(BaseModel):
    response: str
    is_emergency: bool
    conversation_id: str
    sources: list[str] = []


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    conversation_id = request.conversation_id or str(uuid.uuid4())

    # Layer 1: Pre-LLM emergency detection
    emergency_result = detect_emergency(request.message)
    if emergency_result["is_emergency"]:
        return ChatResponse(
            response=emergency_result["emergency_response"],
            is_emergency=True,
            conversation_id=conversation_id,
        )

    # Get or create agent for this conversation
    if conversation_id not in _conversations:
        _conversations[conversation_id] = create_agent("v2")

    agent = _conversations[conversation_id]

    # Layer 2 & 3: Agent processes with system prompt rules, then post-processing
    result = agent(request.message)
    response_text = str(result)

    # Layer 3: Post-processing guardrails
    response_text = apply_safety_guardrails(response_text)

    return ChatResponse(
        response=response_text,
        is_emergency=False,
        conversation_id=conversation_id,
    )
