from app.tools.emergency_check import detect_emergency


def test_detects_bleeding():
    result = detect_emergency("I'm bleeding heavily")
    assert result["is_emergency"] is True
    assert "bleeding" in result["matched_keywords"]


def test_detects_no_fetal_movement():
    result = detect_emergency("I haven't felt the baby move today")
    assert result["is_emergency"] is True


def test_safe_message():
    result = detect_emergency("I feel nauseous in the morning")
    assert result["is_emergency"] is False
    assert result["matched_keywords"] == []


def test_detects_seizure():
    result = detect_emergency("I had a seizure")
    assert result["is_emergency"] is True


def test_detects_vision_changes():
    result = detect_emergency("my vision is blurry and I see spots")
    assert result["is_emergency"] is True


def test_detects_severe_headache():
    result = detect_emergency("I have a really severe headache that won't go away")
    assert result["is_emergency"] is True


def test_detects_chest_pain():
    result = detect_emergency("I'm having chest pain")
    assert result["is_emergency"] is True


def test_case_insensitive():
    result = detect_emergency("I'M BLEEDING A LOT")
    assert result["is_emergency"] is True
