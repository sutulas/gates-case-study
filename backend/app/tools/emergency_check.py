"""Pre-LLM emergency keyword detection based on CDC Urgent Maternal Warning Signs."""

import re

EMERGENCY_PATTERNS: list[dict] = [
    {"keyword": "bleeding", "pattern": r"\bbleed(ing|s)?\b"},
    {"keyword": "seizure", "pattern": r"\bseizures?\b"},
    {"keyword": "unconscious", "pattern": r"\bunconscious\b|\bpassed\s+out\b|\bfaint(ed|ing)?\b"},
    {"keyword": "breathing difficulty", "pattern": r"\bcan'?t\s+breathe?\b|\btrouble\s+breath(ing|e)\b|\bdifficulty\s+breath(ing|e)\b|\bshortness\s+of\s+breath\b"},
    {"keyword": "chest pain", "pattern": r"\bchest\s+pain\b"},
    {"keyword": "severe headache", "pattern": r"\bsevere\s+headache\b|\bworst\s+headache\b|\bheadache.*won'?t\s+(go\s+away|stop)\b"},
    {"keyword": "vision changes", "pattern": r"\bvision\s+(change|blur|problem)\w*\b|\bblurr(y|ed)\s+vision\b|\bsee(ing)?\s+spots\b|\bflash(es|ing)\s+(of\s+)?light\b"},
    {"keyword": "no fetal movement", "pattern": r"\b(baby|fetus)\s+(not|hasn'?t|stopped)\s+mov(e|ed|ing)\b|\bhaven'?t\s+felt\s+(the\s+)?baby\s+move\b|\bno\s+(fetal\s+)?movement\b|\bbaby'?s?\s+movements?\s+(slow|stop|less)\w*\b"},
    {"keyword": "severe abdominal pain", "pattern": r"\bsevere\s+(belly|abdominal|stomach|abdomen)\s+pain\b"},
    {"keyword": "sudden swelling", "pattern": r"\bsudden\s+swell(ing|ed)\b|\bface\s+swell(ing|ed)\b|\bhands?\s+swell(ing|ed)\b"},
    {"keyword": "high fever", "pattern": r"\bhigh\s+fever\b|\bfever\s+over\s+(38|39|40|100|101|102|103|104)\b"},
    {"keyword": "severe vomiting", "pattern": r"\bcan'?t\s+keep\s+(anything|food|water)\s+down\b|\bsevere\s+vomit(ing|s)?\b|\bvomit(ing|s)?\s+(blood|constantly)\b"},
]

EMERGENCY_RESPONSE = (
    "This sounds like it could be urgent. Please go to your nearest health facility "
    "or call emergency services right away. Do not wait.\n\n"
    "If you are in crisis, please contact your local emergency number or go to the "
    "nearest hospital immediately.\n\n"
    "Your safety and your baby's safety come first. A health worker can help you right now."
)


def detect_emergency(message: str) -> dict:
    """Check a user message for emergency/danger-sign keywords.

    Returns:
        dict with keys:
            is_emergency (bool): True if any danger sign detected
            matched_keywords (list[str]): which danger signs matched
            emergency_response (str | None): hardcoded response if emergency
    """
    message_lower = message.lower()
    matched = []

    for entry in EMERGENCY_PATTERNS:
        if re.search(entry["pattern"], message_lower):
            matched.append(entry["keyword"])

    return {
        "is_emergency": len(matched) > 0,
        "matched_keywords": matched,
        "emergency_response": EMERGENCY_RESPONSE if matched else None,
    }
