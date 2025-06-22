import { generateOutreach } from "../../lib/AiTextGenerater";
import { scrapeLinkedInJob } from "../../lib/linkdinScraper";
import { parseResume } from "@/app/lib/pdfParser";
import { NextResponse } from 'next/server';
import { generateJobId } from "@/app/lib/uid";
import { getSessionUser } from "@/app/helper/sessionManager";
import { Pool } from "pg";
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export async function GET(req) {
const user = await getSessionUser()
const userId = user?.uid?.uid
  if(!user){
    return;
  }

  
  
  const query = `SELECT * FROM resume_job_analysis WHERE resume_id = $1;`;
  
  try {
    const { rows } = await pool.query(query, [userId]); // parameterized query
    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
export async function POST(req) {
const user = await getSessionUser()
const userId = user?.uid?.uid
  try {
 const jobId = generateJobId();
let body;
try {
  body = await req.json();
} catch (err) {
  console.error("❌ Invalid JSON body:", err.message);
  return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

const { url, file } = body;

if (typeof url !== "string" || !url.startsWith("http")) {
  return new Response(JSON.stringify({ error: "Invalid job URL" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

if (file && typeof file !== "string") {
  return new Response(JSON.stringify({ error: "Invalid resume file data" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


// 1. Check token availability
const tokenQuery = `SELECT available_token FROM subscription WHERE user_id = $1`;
const result = await pool.query(tokenQuery, [userId]);
const availableToken = result.rows[0]?.available_token;

if (availableToken <= 0) {
  console.log("NO TOKEN AVAILABLE");
  return NextResponse.json({ message: "no token available" });
}

// 2. Check for existing analysis (AFTER confirming token availability)
const existingQuery = `
  SELECT * FROM resume_job_analysis WHERE resume_id = $1 and resume_url = $2
`;
const { rows: existingRows } = await pool.query(existingQuery, [userId, url]);

if (existingRows.length > 0) {
  console.log("✅ Found existing resume-job analysis. Returning cached result.");
  return NextResponse.json({
    reused: true,
    analysis: existingRows[0],
  });
}


    // 1. Scrape job description
    console.log("🔍 Scraping LinkedIn job description...");
    const scrapedText = await scrapeLinkedInJob(url);
    console.log("✅ Job description scraped successfully.");

    // 2. AI job analysis
    console.log("🧠 Analyzing job description with AI...");
    const jobPrompt = `
You are an AI assistant helping job seekers understand job descriptions.

Your task is to analyze the following job description and return only a valid JSON object in this format:

{
  "responsibilities": [ "..." ],
  "requiredSkills": {
    "hard": [ "..." ],
    "soft": [ "..." ]
  },
  "keywords": [ "..." ],
  "tone": "Brief tone description",
  "industry": "Industry or sector",
  "jobLevel": "Entry-level | Mid-level | Senior-level",
  "company": {
    "name": "Company Name",
    "location": "Job Location"
  }
}

Important:
- Output only the raw JSON. No explanations, markdown, or code blocks.
- If a field is missing, leave it empty or null.
- Use double quotes for all keys and string values.

Job Description:
${scrapedText.jobDescription || scrapedText}`.trim();

    const jobAnalysisRaw = await generateOutreach(jobPrompt);
    const jobAnalysisClean = extractJSONFromRespons(jobAnalysisRaw);


    // 3. Save job description to DB
const insertJobQuery = `
  INSERT INTO job_details (
    id,
    responsibilities,
    required_skills_hard,
    required_skills_soft,
    keywords,
    tone,
    industry,
    job_level,
    company_name,
    location,
    url
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING *;
`;

const jobValues = [
  jobId,
  jobAnalysisClean.responsibilities || [],
  jobAnalysisClean.requiredSkills?.hard || [],
  jobAnalysisClean.requiredSkills?.soft || [],
  jobAnalysisClean.keywords || [],
  jobAnalysisClean.tone || null,
  jobAnalysisClean.industry || null,
  jobAnalysisClean.jobLevel || null,
  jobAnalysisClean.company?.name || null,
  jobAnalysisClean.company?.location || null,
  url // add this
];


    const { rows: jobRows } = await pool.query(insertJobQuery, jobValues);


    // 4. Resume parsing
    let resumeData = null;
    if (file) {
      console.log("📄 Parsing resume...");
      const buffer = Buffer.from(file, "base64");
      resumeData = await parseResume(buffer);
      console.log("✅ Resume parsed.");
    }
    const safeResume = redactPII(resumeData)
    // console.log(safeResume)

    // 5. Resume AI analysis
    const resumePrompt = `
You are an AI assistant helping job seekers improve and understand their resumes.

Your task:
Analyze the following raw resume text and return only a JSON object with these fields:

- summary
- education (array of { degree, institution, year })
- experience (array of { role, company, duration, description })
- skills (array)
- certifications (array)

Instructions:
- Clean up grammar and make the content concise.
- Do NOT copy-paste or return raw resume text.
- Output must be raw, valid JSON only.
- No markdown, no backticks.

Resume Text:
${JSON.stringify(safeResume)}
`.trim();

    const resumeAnalysisRaw = await generateOutreach(resumePrompt);
    const resumeAnalysisClean = extractJSONFromRespons(resumeAnalysisRaw);
// try {

// } catch (err) {
//   console.error("❌ Failed to parse job JSON:", resumeAnalysisClean);
//   console.log("errpr", err.message, err)
//   return new Response(JSON.stringify({
//     error: "Failed to parse AI output1q",
//     details: err.message
//   }), {
//     status: 500,
//     headers: { "Content-Type": "application/json" }
//   });
// }


  // Save resume to DB
  const insertResumeQuery = `
    UPDATE user_profiles
    SET
      phone = $2,
      summary = $3,
      education = $4,
      experience = $5,
      skills = $6,
      certifications = $7
    WHERE users_id = $1
    RETURNING *;
  `;

  const resumeValues = [
    userId,
    resumeData.phone || "unknown",
    resumeAnalysisClean.summary || "unknown",
    JSON.stringify(resumeData.education || []),
    JSON.stringify(resumeData.experience || []),
    resumeAnalysisClean.skills || [],
    resumeAnalysisClean.certifications || [],
  ];

  const { rows: resumeRows } = await pool.query(insertResumeQuery, resumeValues);

  // Optional: return or log inserted data
  // console.log("Inserted Resume:", resumeRows[0]);






//     // 7. Match validation
//     const matchPrompt = `
// Analyze the job description and resume text if its related to the same field and can be compared fairly then return { "match": "ok" } else this { "match": "a mismatch warning" }  . Return a strict JSON object in this format:

// { "match": "ok" }  
// OR  
// { "match": "a mismatch warning" }

// Instructions:
// - Do not explain.
// - Return only one of the two JSON objects above.
// - Return "mismatch warning" if the resume and job are clearly unrelated.

// Job Description:
// ${jobAnalysisClean}

// Resume Text:
// ${resumeAnalysisClean}
// `.trim();
// console.log("matching resume to job description")

//     const matchRaw = await generateOutreach(matchPrompt);
//     const matchParsed = JSON.parse(matchRaw);
//     console.log("matchParsed", matchParsed)

    // if (matchParsed.match === "a mismatch warning") {
    //   console.warn("⚠️ MISMATCH WARNING: Resume and job description do not match.");
    //   return new Response(
    //     JSON.stringify({
    //       error:
    //         "⚠️ MISMATCH WARNING: The resume appears unrelated to the job description.",
    //     }),
    //     {
    //       status: 400,
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // }
    console.log("matching")

    // 8. Comparison & feedback
const comparePrompt = `
You are a career coach and resume analyst.

Compare the resume and job description below, and provide your analysis in strict JSON format using the following schema:

{
  "matching_skills": [ "List", "Of", "Matching", "Skills" ],
  "skill_gaps": [ "List", "Of", "Missing", "Skills" ],
  "summary_of_fit": "Concise 2-4 sentence summary evaluating how well the resume matches the job.",
  "score": "Numeric match score as a percentage (e.g. 78%)",
  "improvement_suggestions": [ "Suggestion 1", "Suggestion 2", "Suggestion 3" ]
}

Your response must only include valid JSON, with no commentary or extra formatting. Do not repeat any fields. Do not wrap the JSON in code blocks or add Markdown.

---
Job Description:
${JSON.stringify(jobAnalysisClean, null, 2)}

---
Resume:
${JSON.stringify(resumeAnalysisClean, null, 2)}
`.trim();

// console.log("comparing")


    const comparison = await generateOutreach(comparePrompt)
    // console.log("compared", typeof comparison)
    const comparisonClean = extractJSONFromRespons(comparison);
    // console.log("comparisonClean", typeof comparisonClean, comparisonClean.matching_skills)
    // console.log("comparisonClean", comparisonClean)

const queryforAnalyses = `SELECT * FROM resume_job_analysis WHERE resume_id = $1 AND resume_url = $2`;
const checkIfAnalysesExists = await pool.query(queryforAnalyses, [userId, url]);

if (checkIfAnalysesExists.rowCount !== 1) {
  const insertAnalysisQuery = `
    INSERT INTO resume_job_analysis (
      resume_id,
      job_id,
      matching_skills,
      skill_gaps,
      summary_of_fit,
      score,
      improvement_suggestions,
      resume_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const insertAnalysisValues = [
    userId,
    jobId,
    comparisonClean.matching_skills || [],
    comparisonClean.skill_gaps || [],
    comparisonClean.summary_of_fit || "",
    parseFloat(comparisonClean.score) || 0,
    comparisonClean.improvement_suggestions || [],
    url
  ];

  const { rows: analysisRows } = await pool.query(insertAnalysisQuery, insertAnalysisValues);
  console.log("Analysis inserted successfully.");
} else {
  console.log("Analysis already exists.");
}
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


const res = NextResponse.json({ message: 'done' });

return res;

  } catch (error) {
    console.error("❌ POST error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Something went wrong during processing",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function extractJSONFromResponse(str) {
  return str.replace(/```(?:json)?|```/g, "").trim();
}
function extractJSONFromRespons(response) {
  try {
    const match = response.match(/{[\s\S]*}/); // Match the first JSON block
    if (match) {
      return JSON.parse(match[0]); // Convert to JS object
    }
  } catch (err) {
    console.error("JSON parsing error:", err.message);
  }
  return null;
}
function redactPII(data) {
  if (typeof data !== "object" || data === null) return {};

  const redactEducation = (education) => {
    return (education || []).map(() => ({
      year: null,
      degree: null,
      institution: null
    }));
  };

  const redactExperience = (experience) => {
    return (experience || []).map(() => ({
      role: null,
      company: null,
      duration: null,
      description: null
    }));
  };

  return {
    ...data,
    name: null,
    email: null,
    phone: null,
    summary: null,
    education: redactEducation(data.education),
    experience: redactExperience(data.experience)
  };
}


