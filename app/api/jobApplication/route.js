

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
  const user = await getSessionUser();
  const userId = user.uid;


  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const query = `SELECT * FROM resume_job_analysis WHERE resume_id = $1`;
  
  try {
    const { rows } = await pool.query(query, [userId]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(req) {
  const user = await getSessionUser();
  const userId = user.uid;

  try {
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { url } = body;
    const file = body.file || '';

    if (typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid job URL" }, { status: 400 });
    }

    // Check token availability
    const tokenQuery = `SELECT available_token FROM subscription WHERE user_id = $1`;
    const tokenResult = await pool.query(tokenQuery, [userId]);
    const availableToken = tokenResult.rows[0]?.available_token || 0;

    if (availableToken <= 0) {
      return NextResponse.json({ message: "No tokens available" }, { status: 403 });
    }

    // Check for existing analysis
    const existingQuery = `SELECT * FROM resume_job_analysis WHERE resume_id = $1 AND resume_url = $2`;
    const existingResult = await pool.query(existingQuery, [userId, url]);

    if (existingResult.rows.length > 0) {
      return NextResponse.json({
        reused: true,
        analysis: existingResult.rows[0],
      });
    }

    const jobId = generateJobId();

    // Scrape job description
    const scrapedText = await scrapeLinkedInJob(url);
    
    // AI job analysis
    const jobPrompt = `You are an AI assistant helping job seekers understand job descriptions.

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
${scrapedText.jobDescription || scrapedText}`; // Your job prompt here

    const jobAnalysisRaw = await generateOutreach(jobPrompt);
    const jobAnalysisClean = extractJSONFromResponse(jobAnalysisRaw);

    // Save job description to DB
    const insertJobQuery = `
      INSERT INTO job_details (
        id, responsibilities, required_skills_hard, required_skills_soft,
        keywords, tone, industry, job_level, company_name, location, url
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
      url
    ];

    await pool.query(insertJobQuery, jobValues);

    // Resume parsing
    let resumeData = null;
    if (file && typeof file === 'string' && file.trim() !== '') {
      try {
        const base64 = file.startsWith('data:') ? file.split(',')[1] : file;
        const buffer = Buffer.from(base64, 'base64');
        resumeData = await parseResume(buffer);
      } catch (err) {
        console.error("Failed to parse resume:", err.message);
      }
    }

    let resumeAnalysisClean = {};
    if (resumeData) {
      const safeResume = redactPII(resumeData);
      const resumePrompt = `You are an AI assistant helping job seekers improve and understand their resumes.

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
${JSON.stringify(safeResume)}`; // Your resume prompt here
      
      const resumeAnalysisRaw = await generateOutreach(resumePrompt);
      resumeAnalysisClean = extractJSONFromResponse(resumeAnalysisRaw) || {};

      // Save resume to DB
      const insertResumeQuery = `
        UPDATE user_profiles
        SET phone = $2, summary = $3, education = $4,
            experience = $5, skills = $6, certifications = $7
        WHERE users_id = $1
        RETURNING *;
      `;

      const resumeValues = [
        userId,
        resumeData.phone || "unknown",
        resumeAnalysisClean.summary || "unknown",
        JSON.stringify(resumeData.education || []),
        JSON.stringify(resumeData.experience || []),
        Array.isArray(resumeAnalysisClean.skills) ? resumeAnalysisClean.skills : [],
        resumeAnalysisClean.certifications || [],
      ];

      await pool.query(insertResumeQuery, resumeValues);
    }

    // Comparison & feedback
    const comparePrompt = `You are a career coach and resume analyst.

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
`; // Your comparison prompt here

    const comparison = await generateOutreach(comparePrompt);
    const comparisonClean = extractJSONFromResponse(comparison) || {};

    // Save analysis
    const insertAnalysisQuery = `
      INSERT INTO resume_job_analysis (
        resume_id, job_id, matching_skills, skill_gaps,
        summary_of_fit, score, improvement_suggestions, resume_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const insertAnalysisValues = [
      userId,
      jobId,
      Array.isArray(comparisonClean.matching_skills) ? comparisonClean.matching_skills : [],
      Array.isArray(comparisonClean.skill_gaps) ? comparisonClean.skill_gaps : [],
      comparisonClean.summary_of_fit || "",
      parseFloat(comparisonClean.score) || 0,
      Array.isArray(comparisonClean.improvement_suggestions) ? comparisonClean.improvement_suggestions : [],
      url
    ];

    await pool.query(insertAnalysisQuery, insertAnalysisValues);

    // Deduct token
    const deductTokenQuery = `
      UPDATE subscription
      SET available_token = available_token - 1
      WHERE user_id = $1 AND available_token > 0
      RETURNING available_token;
    `;

    await pool.query(deductTokenQuery, [userId]);

    return NextResponse.json({ message: 'Analysis completed successfully' });
  } catch (error) {
    console.error("POST error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong during processing" },
      { status: 500 }
    );
  }
}

function extractJSONFromResponse(response) {
  try {
    // Remove code blocks first
    const cleanedResponse = response.replace(/```(?:json)?|```/g, "").trim();
    const match = cleanedResponse.match(/{[\s\S]*}/);
    return match ? JSON.parse(match[0]) : null;
  } catch (err) {
    console.error("JSON parsing error:", err.message);
    return null;
  }
}

function redactPII(data) {
  if (typeof data !== "object" || data === null) return {};

  return {
    ...data,
    name: null,
    email: null,
    phone: null,
    summary: null,
    education: (data.education || []).map(() => ({
      year: null,
      degree: null,
      institution: null
    })),
    experience: (data.experience || []).map(() => ({
      role: null,
      company: null,
      duration: null,
      description: null
    }))
  };
}