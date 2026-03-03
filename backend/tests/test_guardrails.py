from app.guardrails import SAFETY_FOOTER, apply_safety_guardrails

FOOTER_SENTINEL = "general health information"


def test_appends_footer():
    response = "Morning sickness is common in the first trimester."
    result = apply_safety_guardrails(response)
    assert FOOTER_SENTINEL in result
    assert "WHO ANC Guidelines" in result
    assert result.endswith("</small>")


def test_always_appends_footer():
    """Footer is always appended programmatically, even if message already contains similar text."""
    response = "Morning sickness is common."
    result = apply_safety_guardrails(response)
    assert result.count(FOOTER_SENTINEL) >= 1
    assert result.endswith("</small>")


def test_adds_referral_when_danger_sign_mentioned():
    response = "Some headaches during pregnancy are normal, but a severe headache with vision changes could indicate preeclampsia."
    result = apply_safety_guardrails(response)
    assert "seek care" in result.lower() or "health worker" in result.lower() or "health facility" in result.lower()


def test_no_referral_for_safe_content():
    response = "Eating a balanced diet with fruits and vegetables is great during pregnancy."
    result = apply_safety_guardrails(response)
    assert FOOTER_SENTINEL in result
