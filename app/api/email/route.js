// app/api/generate-letter/route.js

import { getSessionUser } from "@/app/helper/sessionManager";
import { Pool } from "pg";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ============================================================
// DATABASE
// ============================================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ============================================================
// GEMINI
// ============================================================

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY1;

const ai = GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    })
  : null;

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.6-flash";

// ============================================================
// HELPERS
// ============================================================

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status });
}

function cleanString(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

// ============================================================
// POST
// ============================================================

export async function POST(req) {
  let tokenReserved = false;
  let userId = null;

  try {
    // ----------------------------------------------------------
    // 1. AUTHENTICATION
    // ----------------------------------------------------------

    const user = await getSessionUser();

    if (!user?.uid) {
      return jsonResponse(
        { message: "Authentication required" },
        401
      );
    }

    userId = user.uid;

    // ----------------------------------------------------------
    // 2. AI CONFIGURATION
    // ----------------------------------------------------------

    if (!ai) {
      console.error("Gemini API key is not configured.");

      return jsonResponse(
        { message: "AI service is not configured" },
        503
      );
    }

    // ----------------------------------------------------------
    // 3. PARSE REQUEST
    // ----------------------------------------------------------

    let body;

    try {
      body = await req.json();
    } catch {
      return jsonResponse(
        { message: "Invalid JSON request body" },
        400
      );
    }

    const {
      type,
      jobTitle,
      companyName,
      candidateName,
      tone,
      highlights,
    } = body;

    // ----------------------------------------------------------
    // 4. VALIDATION
    // ----------------------------------------------------------

    const cleanType = cleanString(type, 50);
    const cleanJobTitle = cleanString(jobTitle, 200);
    const cleanCompanyName = cleanString(companyName, 200);
    const cleanCandidateName = cleanString(candidateName, 150);
    const cleanTone = cleanString(tone, 100);
    const cleanHighlights = cleanString(highlights, 5000);

    if (!cleanType || !cleanJobTitle || !cleanCompanyName) {
      return jsonResponse(
        {
          message:
            "type, jobTitle and companyName are required",
        },
        400
      );
    }

    if (
      cleanType !== "cold-email" &&
      cleanType !== "cover-letter"
    ) {
      return jsonResponse(
        {
          message:
            "Invalid type. Expected cold-email or cover-letter.",
        },
        400
      );
    }

    // ----------------------------------------------------------
    // 5. RESERVE TOKEN
    // ----------------------------------------------------------

    const { rows: reservedRows } = await pool.query(
      `
      UPDATE subscription
      SET available_token = available_token - 1
      WHERE user_id = $1
        AND available_token > 0
      RETURNING available_token
      `,
      [userId]
    );

    if (reservedRows.length === 0) {
      return jsonResponse(
        {
          message: "No AI tokens available",
          code: "NO_TOKENS",
        },
        403
      );
    }

    tokenReserved = true;

    // ----------------------------------------------------------
    // 6. BUILD PROMPT
    // ----------------------------------------------------------

    const isCoverLetter = cleanType === "cover-letter";

    const prompt = `
You are an expert career-writing assistant helping a job seeker.

Generate a ${
      isCoverLetter
        ? "personalized cover letter"
        : "professional cold outreach email"
    } for the following opportunity.

JOB TITLE:
${cleanJobTitle}

COMPANY:
${cleanCompanyName}

CANDIDATE:
${cleanCandidateName || "The candidate"}

TONE:
${cleanTone || "Professional, confident, and natural"}

CANDIDATE HIGHLIGHTS:
${
  cleanHighlights ||
  "No specific highlights were provided. Do not invent qualifications."
}

IMPORTANT RULES:

- Write from the candidate's perspective.
- Do not invent experience, skills, achievements, education,
  projects, qualifications, or results.
- Only use information explicitly provided in the candidate
  highlights.
- Make the writing relevant to the specific job title.
- Avoid generic AI-sounding language.
- Avoid exaggerated claims.
- Do not use placeholders.
- Do not add explanations before or after the output.
- Do not mention that you are an AI.
- Keep the writing natural and human.

${
  isCoverLetter
    ? `
COVER LETTER:

- 250-300 words.
- Strong opening.
- Explain genuine interest in the role.
- Connect relevant qualifications to the position.
- Clearly communicate the candidate's value.
- End with a professional call to action.
- Use clear paragraphs.
- Do not include a subject line.
`
    : `
COLD EMAIL:

- Maximum 150 words.
- Start with a concise subject line.
- Introduce the candidate naturally.
- Explain why they are reaching out.
- Mention the most relevant skills/highlights.
- End with a simple call to action.
- Keep the email easy to scan.
`
}

Return ONLY the final ${
      isCoverLetter ? "cover letter" : "email"
    }.
`;

    // ----------------------------------------------------------
    // 7. GENERATE
    // ----------------------------------------------------------

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const text = response?.text?.trim();

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    // ----------------------------------------------------------
    // 8. SUCCESS
    // ----------------------------------------------------------

    return jsonResponse({
      text,
      type: cleanType,
    });
  } catch (error) {
    console.error("Generate letter error:", {
      message: error?.message,
      status: error?.status,
      userId,
    });

    // ----------------------------------------------------------
    // 9. REFUND TOKEN
    // ----------------------------------------------------------

    if (tokenReserved && userId) {
      try {
        await pool.query(
          `
          UPDATE subscription
          SET available_token = available_token + 1
          WHERE user_id = $1
          `,
          [userId]
        );

      } catch (refundError) {
        console.error(
          "CRITICAL: AI token refund failed:",
          refundError?.message
        );
      }
    }

    // ----------------------------------------------------------
    // 10. CLIENT ERROR
    // ----------------------------------------------------------

    const providerMessage = error?.message || "";
    const status = /API_KEY_INVALID|API key not valid|invalid api key/i.test(providerMessage)
      ? 503
      : 500;

    return jsonResponse(
      {
        message:
          status === 503
            ? "AI service credentials are invalid or expired. Please contact support."
            : "Unable to generate content right now. Please try again.",
      },
      status
    );
  }
}