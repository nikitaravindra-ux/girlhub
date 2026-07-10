import os
from fastapi import APIRouter
from openai import OpenAI

from schemas import ChatRequest, AnalyzeRequest, AffirmationRequest, TarotRequest

router = APIRouter(prefix="/ai", tags=["ai"])

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL = "gpt-4o-mini"


def ask(system: str, user: str) -> str:
    if not os.getenv("OPENAI_API_KEY"):
        return "⚠️ Add OPENAI_API_KEY to backend/.env to enable AI responses."
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    )
    return resp.choices[0].message.content


@router.post("/analyze")
def analyze(req: AnalyzeRequest):
    result = ask(
        "You are a warm, perceptive mood-tracking assistant. Read the journal "
        "entry and respond with 'Mood: <one or two words>' then one short, "
        "kind sentence of reflection.",
        req.text,
    )
    return {"result": result}


@router.post("/affirmations")
def affirmations(req: AffirmationRequest):
    result = ask(
        "You are a gentle affirmations coach. Based on what the user shares, "
        "write 3 short, sincere, personalized affirmations, one per line, no numbering.",
        req.transcript,
    )
    return {"result": result}


@router.post("/tarot")
def tarot(req: TarotRequest):
    prompt = f"Cards drawn: {', '.join(req.cards)}. Question: {req.question or 'general guidance'}"
    result = ask(
        "You are a warm, insightful tarot reader. Interpret the three drawn "
        "cards together as a past-present-future spread in 4-6 sentences, "
        "mystical but grounded tone.",
        prompt,
    )
    return {"result": result}


@router.post("/chat")
def chat(req: ChatRequest):
    result = ask(
        "You are the GirlHub assistant: a warm, encouraging, slightly playful "
        "companion who helps with journaling, mood, and self-care. Keep replies short.",
        req.message,
    )
    return {"result": result}