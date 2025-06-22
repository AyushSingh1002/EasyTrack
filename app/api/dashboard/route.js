// import { getSessionUser } from "@/app/helper/sessionManager";
import { Pool } from "pg";
import { getSessionUser } from "@/app/helper/sessionManager";
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  const user = await getSessionUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const userId = user.uid?.uid;

  const query = `
    SELECT
      j.industry,
      j.job_level,
      j.company_name,
      j.url,
      a.skill_gaps,
      a.score,
      a.improvement_suggestions
    FROM job_details j
    JOIN resume_job_analysis a ON j.id = a.job_id
    WHERE a.resume_id = $1;
  `;

  try {
    const { rows } = await pool.query(query, [userId]);
    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
