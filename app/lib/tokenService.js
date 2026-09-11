import { pool } from "@/app/api/pg";

export async function awardTokens(client, userId, amount) {
  if (!userId || !Number.isInteger(amount) || amount <= 0 || amount > 10000) {
    throw new Error("Invalid token award");
  }

  const db = client || pool;
  const result = await db.query(
    `INSERT INTO subscription (user_id, available_token)
     VALUES ($1, $2)
     ON CONFLICT (user_id)
     DO UPDATE SET available_token = subscription.available_token + EXCLUDED.available_token
     RETURNING available_token`,
    [userId, amount]
  );

  return result.rows[0];
}

export async function deductToken(userId) {
  const result = await pool.query(
    `UPDATE subscription
     SET available_token = available_token - 1
     WHERE user_id = $1 AND available_token > 0
     RETURNING available_token`,
    [userId]
  );
  return result.rows[0] || null;
}
