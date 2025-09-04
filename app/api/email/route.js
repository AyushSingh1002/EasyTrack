// // import OpenAI from "openai";

// // const openai = new OpenAI({
// //   baseURL: "https://openrouter.ai/api/v1",
// //   apiKey: process.env.NEXT_PUBLIC_AI_EMAIL_KEY,
// // });

// // Named export for POST
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { type, candidateName, jobTitle, companyName, tone, highlights } = body;

//     if (!type || !jobTitle || !companyName) {
//       return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
//     }

// const prompt = `
// Generate a ${type === "cold-email" ? "personalized cold email" : "custom cover letter"} 
// from a job seeker applying for the "${jobTitle}" position at "${companyName}".

// The job seeker is ${candidateName ? candidateName : "the candidate"} and is addressing the HR department or hiring manager.

// Use a ${tone || "professional"} tone.
// Focus on these key skills/highlights: ${highlights && highlights.trim() ? highlights : "details inferred from the resume"}.

// Important: Write from the job seeker's perspective, expressing interest in the position and company.

// ${type === "cover-letter" 
//   ? "The cover letter should be 250-300 words, structured with an opening, key value propositions, and a closing call-to-action." 
//   : "The cold email should be concise (under 150 words) and encourage a response."}

// Format the output with clear paragraph breaks and no placeholders.
// `;


//     const response = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1-0528:free",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return new Response(JSON.stringify({ text: response.choices[0].message.content }), { status: 200 });
//   } catch (error) {
//     console.error("API error:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
//   }
// }
// app/api/generate-letter/route.js (for Next.js 13+ App Router)
// or pages/api/generate-letter.js (for Pages Router)

// app/api/generate-letter/route.js (Next.js 13+ App Router)
// or pages/api/generate-letter.js (Pages Router)


import { getSessionUser } from "@/app/helper/sessionManager";
import { Pool } from "pg";
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const user = await getSessionUser()
    const userId = user?.uid
     // 1. Check token availability
     const tokenQuery = `SELECT available_token FROM subscription WHERE user_id = $1`;
     const tokenResult = await pool.query(tokenQuery, [userId]);
     const availableToken = tokenResult.rows[0]?.available_token;
     
     if (availableToken <= 0) {
       console.log("NO TOKEN AVAILABLE");
       return NextResponse.json({ message: "no token available" });
     }
     
    const body = await req.json();
    const { type, jobTitle, companyName, candidateName, tone, highlights } = body;

    if (!type || !jobTitle || !companyName) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const prompt = `
Generate a ${type === "cold-email" ? "personalized cold email" : "custom cover letter"} 
from the job seeker's perspective targeting the position of "${jobTitle}" at "${companyName}".

Address it to ${candidateName ? candidateName : "the hiring manager"}.
Use a ${tone || "professional"} tone.
Focus on these key skills/highlights: ${highlights && highlights.trim() ? highlights : "details inferred from the resume"}.

${type === "cover-letter"
  ? "The cover letter should be 250-300 words, structured with an opening, key value propositions, and a closing call-to-action."
  : "The cold email should be concise (under 150 words) and encourage a response."}

Format the output with clear paragraph breaks and no placeholders.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
// Atomically decrement token count by 1, but only if available_token > 0
const deductTokenQuery = `
  UPDATE subscription
  SET available_token = available_token - 1
  WHERE user_id = $1 AND available_token > 0
  RETURNING available_token;
`;

const { rows: updatedTokenRows } = await pool.query(deductTokenQuery, [userId]);

if (updatedTokenRows.length === 0) {
  console.error("❌ Failed to deduct token — either user not found or no tokens left.");
  return NextResponse.json({ error: "Insufficient tokens" }, { status: 403 });
}

console.log("✅ Token deducted. Remaining:", updatedTokenRows[0].available_token);

    return new Response(JSON.stringify({ text: text }), { status: 200 });
  } catch (error) {
    console.error("Error generating letter:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate letter" }),
      { status: 500 }
    );
  }
}
