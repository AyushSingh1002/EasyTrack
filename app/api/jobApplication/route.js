import { PrismaClient } from "../../generated/prisma";
import { generateOutreach } from "../../lib/AiTextGenerater";
import { scrapeLinkedInJob } from "../../lib/linkdinScraper";
import { parseResume } from "@/app/lib/pdfParser";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient();

// export async function POST(req) {
//   const body = await req.json();
//   const { company, position, location, notes } = body;

//   let status = "ok"

//   const job = await prisma.job_applications.create({
//     data: { company, position, notes, status },
//   });

//   return Response.json(job, { status: 201 });
// }

export async function GET(req) {
  const cookieStore = cookies(); // get cookie store
  const token = cookieStore.get('token')?.value; // don't await

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const query = `SELECT * FROM resume_job_analysis WHERE resume_id = $1;`;

  try {
    const { rows } = await pool.query(query, [token]); // parameterized query
    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
export async function POST(req) {
  try {
    const { url, file } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "Missing LinkedIn job URL" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
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
    const jobAnalysisClean = extractJSONFromResponse(jobAnalysisRaw);
    const job = JSON.parse(jobAnalysisClean);

    // 3. Save job description to DB
    const insertJobQuery = `
      INSERT INTO job_details (
        responsibilities,
        required_skills_hard,
        required_skills_soft,
        keywords,
        tone,
        industry,
        job_level,
        company_name,
        location
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const jobValues = [
      job.responsibilities || [],
      job.requiredSkills?.hard || [],
      job.requiredSkills?.soft || [],
      job.keywords || [],
      job.tone || null,
      job.industry || null,
      job.jobLevel || null,
      job.company?.name || null,
      job.company?.location || null,
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

    // 5. Resume AI analysis
    const resumePrompt = `
You are an AI assistant helping job seekers improve and understand their resumes.

Your task:
Analyze the following raw resume text and return only a JSON object with these fields:

- fullName
- email
- phone
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
${JSON.stringify(resumeData)}
`.trim();

    const resumeAnalysisRaw = await generateOutreach(resumePrompt);
    const resumeAnalysisClean = extractJSONFromResponse(resumeAnalysisRaw);
    const parsedResume = JSON.parse(resumeAnalysisClean);

    // 6. Save resume to DB
    const insertResumeQuery = `
      INSERT INTO user_profiles (
        full_name,
        email,
        phone,
        summary,
        education,
        experience,
        skills,
        certifications
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const resumeValues = [
      parsedResume.fullName,
      parsedResume.email,
      parsedResume.phone,
      parsedResume.summary,
      JSON.stringify(parsedResume.education),
      JSON.stringify(parsedResume.experience),
      parsedResume.skills || [],
      parsedResume.certifications || [],
    ];

    const { rows: resumeRows } = await pool.query(
      insertResumeQuery,
      resumeValues
    );

    console.log("✅ Resume saved to database.");


    // 7. Match validation
    const matchPrompt = `
Analyze the job description and resume text if its related to the same field and can be compared fairly then return { "match": "ok" } else this { "match": "a mismatch warning" }  . Return a strict JSON object in this format:

{ "match": "ok" }  
OR  
{ "match": "a mismatch warning" }

Instructions:
- Do not explain.
- Return only one of the two JSON objects above.
- Return "mismatch warning" if the resume and job are clearly unrelated.

Job Description:
${job}

Resume Text:
${parsedResume}
`.trim();
console.log("matching resume to job description")

    const matchRaw = await generateOutreach(matchPrompt);
    const matchParsed = JSON.parse(matchRaw);
    console.log("matchParsed", matchParsed)

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
${JSON.stringify(job, null, 2)}

---
Resume:
${JSON.stringify(parsedResume, null, 2)}
`.trim();

console.log("comparing")


    const comparison = await generateOutreach(comparePrompt)
    console.log("compared", typeof comparison)
    const comparisonClean = extractJSONFromRespons(comparison);
    console.log("comparisonClean", typeof comparisonClean)
    // console.log("comparisonClean", comparisonClean)

    
const insertAnalysisQuery = `
  INSERT INTO resume_job_analysis (
    resume_id,
    job_id,
    matching_skills,
    skill_gaps,
    summary_of_fit,
    score,
    improvement_suggestions
  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
`;

const insertAnalysisValues = [
  resumeRows[0].id,
  jobRows[0].id,
  comparisonClean.matching_skills || [], // Ensure matching_skills is an array
  comparisonClean.skill_gaps || [], // Ensure skill_gaps is an array
  comparisonClean.summary_of_fit || "", // Ensure summary_of_fit is a string
  parseFloat(comparisonClean.score) || 0, // Ensure score is a number
  comparisonClean.improvement_suggestions || [],
];

const { rows: analysisRows } = await pool.query(
  insertAnalysisQuery,
  insertAnalysisValues
);
 const res = NextResponse.json({ message: 'Cookie set!' });
  res.cookies.set('token', resumeRows[0].id, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });


    return res
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


