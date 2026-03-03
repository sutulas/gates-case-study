"""Post-processing safety guardrails for agent responses."""

import re

_WHO_GUIDELINES_URL = (
    "https://iris.who.int/server/api/core/bitstreams/"
    "9dccde13-3593-4a22-9237-61abe5a3c6b7/content"
)

SAFETY_FOOTER = (
    "\n\n---\n\n"
    "<small>*This is general health information, not medical advice. "
    "For guidance specific to your situation, please speak with a health worker. "
    f'· <a href="{_WHO_GUIDELINES_URL}" target="_blank" rel="noopener noreferrer">WHO ANC Guidelines</a>*</small>'
)

DANGER_SIGN_PATTERNS = [
    r"\bbleeding\b",
    r"\bseizure\b",
    r"\bsevere\s+headache\b",
    r"\bvision\s+change\b",
    r"\bchest\s+pain\b",
    r"\bdifficulty\s+breathing\b",
    r"\bno\s+(fetal\s+)?movement\b",
    r"\bbaby.*not\s+mov(e|ing)\b",
    r"\bsevere\s+(belly|abdominal)\s+pain\b",
    r"\bsudden\s+swelling\b",
    r"\bpreeclampsia\b",
    r"\beclampsia\b",
    r"\bhigh\s+blood\s+pressure\b",
]

REFERRAL_NUDGE = (
    "\n\nIf you experience any concerning symptoms, please don't hesitate to "
    "visit your nearest health facility or contact a health worker right away."
)


def _contains_danger_sign(text: str) -> bool:
    text_lower = text.lower()
    return any(re.search(p, text_lower) for p in DANGER_SIGN_PATTERNS)


def _contains_referral_language(text: str) -> bool:
    text_lower = text.lower()
    referral_phrases = [
        "seek care",
        "health facility",
        "health worker",
        "emergency services",
        "go to",
        "visit a",
        "contact a",
    ]
    return any(phrase in text_lower for phrase in referral_phrases)


def apply_safety_guardrails(response: str) -> str:
    """Apply post-processing safety checks to an agent response.

    1. If the response mentions danger signs but lacks referral language, add it.
    2. Always append the safety footer (not relying on the LLM to include it).
    """
    result = response

    # Check for danger signs without referral language
    if _contains_danger_sign(result) and not _contains_referral_language(result):
        result = result.rstrip() + REFERRAL_NUDGE

    # Always append the footer
    result = result.rstrip() + SAFETY_FOOTER

    return result
