from fastapi import APIRouter, HTTPException
from typing import Optional, List, Dict
from supabase import create_client, Client
import os
import traceback

from dotenv import load_dotenv
from openai import OpenAI

# ---------------------------------------------------------------------
# Environment / config
# ---------------------------------------------------------------------

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials are missing. Check your .env")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is missing. Check your .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
router = APIRouter()

# OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# ---------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------


def build_session_context(row: Dict) -> str:
    """
    Turn one session row into a text block for the LLM context.
    Uses transcript, summary, and medications.
    """
    transcript = row.get("transcript") or ""
    summary = row.get("summary") or ""
    medications = row.get("medications") or []

    med_lines: List[str] = []
    if isinstance(medications, list):
        for m in medications:
            if not isinstance(m, dict):
                continue
            name = m.get("name", "unknown")
            reason = m.get("reason", "")
            med_lines.append(f"- {name}: {reason}")

    meds_block = "\n".join(med_lines) if med_lines else "No medications recorded."

    parts = [
        "=== Session Summary ===",
        summary or "No summary available.",
        "",
        "=== Transcript ===",
        transcript or "No transcript available.",
        "",
        "=== Medications ===",
        meds_block,
    ]

    return "\n".join(parts)


def run_session_chat(
    patient_id: str,
    question: str,
    session_id: Optional[str] = None,
) -> str:
    """
    - Fetch a session for this patient (latest or by session_id)
    - Build context from transcript + summary + medications
    - Ask OpenAI with that context
    - Return plain answer text
    """
    # 1) Select session row from Supabase
    if session_id:
        query = (
            supabase.table("session")
            .select("id, patient_id, transcript, summary, medications, created_at")
            .eq("id", session_id)
            .limit(1)
        )
    else:
        # latest session for this patient
        query = (
            supabase.table("session")
            .select("id, patient_id, transcript, summary, medications, created_at")
            .eq("patient_id", patient_id)
            .order("created_at", desc=True)
            .limit(1)
        )

    result = query.execute()
    rows = result.data or []

    if not rows:
        raise HTTPException(
            status_code=404,
            detail="No session found for this patient (and session_id, if provided).",
        )

    session_row = rows[0]
    context = build_session_context(session_row)

    # 2) Build prompt
    system_prompt = (
        "You are a helpful, empathetic healthcare assistant.\n"
        "You are answering questions about a past medical session based ONLY on the provided context.\n"
        "Do NOT invent diagnoses or treatments.\n"
        "If something is unclear or serious, tell the patient to contact their doctor or emergency services.\n"
    )

    user_prompt = (
        f"Patient question: {question}\n\n"
        f"Here is the context from their last session:\n\n{context}"
    )

    # 3) Call OpenAI directly
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.1,
    )

    answer_text = completion.choices[0].message.content
    return answer_text


# ---------------------------------------------------------------------
# API endpoint: GET /api/chat
# ---------------------------------------------------------------------


@router.get("/chat")
def chat_with_patient_session(
    patient_id: str,
    question: str,
    session_id: Optional[str] = None,
):
    """
    GET /api/chat?patient_id=...&question=...&session_id=optional

    - Does NOT write to the database.
    - Reads `session` table (transcript, summary, medications).
    - Uses OpenAI chat completion to answer based on that context.
    """
    try:
        answer = run_session_chat(
            patient_id=patient_id,
            question=question,
            session_id=session_id,
        )
        return {
            "patient_id": patient_id,
            "question": question,
            "answer": answer,
        }
    except HTTPException:
        traceback.print_exc()
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

