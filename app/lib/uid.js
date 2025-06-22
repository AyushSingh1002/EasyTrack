
import { v4 as uuidv4 } from "uuid"




export const generateUserId = () => {
    const userid = uuidv4().replace(/-/g, "").slice(0, 12); 
    return `userId_${userid}`
}
export const generateJobId = () => {
    const jobId = uuidv4().replace(/-/g, "").slice(0, 12); 
    return `jobId_${jobId}`
}

export async function getOrCreateUserWithUID(email, name) {
  const query = 'SELECT * FROM user_profiles WHERE email = $1';
  const result = await pool.query(query, [email]);

  if (result.rows.length > 0) {
    return result.rows[0]; // user already exists
  }

  const uid = uuidv4();
  const insertQuery = `
    INSERT INTO user_profiles (uid, email, full_name)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const insertResult = await pool.query(insertQuery, [uid, email, name ?? '']);
  return insertResult.rows[0];
}

