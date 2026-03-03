"""Strands Agent setup with WHO guidelines search and emergency detection tools."""

from strands import Agent, tool
from strands.models.openai import OpenAIModel

from app.config import OPENAI_API_KEY, LLM_MODEL
from app.prompts import PROMPT_VERSIONS, SYSTEM_PROMPT_V2
from app.tools.search_guidelines import search_who_guidelines_fn
from app.tools.emergency_check import detect_emergency


@tool
def search_who_guidelines(query: str) -> str:
    """Search the WHO Antenatal Care guidelines for relevant health information.

    Use this tool when the user asks about pregnancy health topics like:
    - Visit schedules and what to expect at checkups
    - Nutrition and supplements during pregnancy
    - Common symptoms and whether they are normal
    - General antenatal care recommendations

    Args:
        query: A search query describing what information to look for.
    """
    return search_who_guidelines_fn(query)


@tool
def check_emergency(message: str) -> str:
    """Check if a user message contains emergency or danger sign keywords.

    Use this tool when the user describes symptoms that could be urgent.

    Args:
        message: The user's message to check for emergency keywords.
    """
    result = detect_emergency(message)
    if result["is_emergency"]:
        return f"EMERGENCY DETECTED: {', '.join(result['matched_keywords'])}. {result['emergency_response']}"
    return "No emergency detected. Proceed with normal response."


def create_agent(prompt_version: str = "v2") -> Agent:
    """Create and return a configured Strands Agent.

    Args:
        prompt_version: Which system prompt version to use ("v1" or "v2").
    """
    model = OpenAIModel(
        client_args={"api_key": OPENAI_API_KEY},
        model_id=LLM_MODEL,
        params={"max_tokens": 1024, "temperature": 0.3},
    )

    system_prompt = PROMPT_VERSIONS.get(prompt_version, SYSTEM_PROMPT_V2)

    agent = Agent(
        model=model,
        system_prompt=system_prompt,
        tools=[search_who_guidelines, check_emergency],
    )

    return agent
