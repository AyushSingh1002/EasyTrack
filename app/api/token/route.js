// app/api/token/route.js
import { pool } from "@/app/api/pg"
import { NextResponse } from 'next/server';
import { getSessionUser } from "@/app/helper/sessionManager";

export async function POST(req) {
    const user = await getSessionUser();
const userId = user.uid;

  const { tokensToAdd } = await req.json();

  if (!userId || typeof tokensToAdd !== 'number' || tokensToAdd <= 0) {
    console.log("something went wrong", userId, tokensToAdd)
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const upsertQuery = `
    INSERT INTO subscription (user_id, available_token)
    VALUES ($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET available_token = subscription.available_token + EXCLUDED.available_token
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(upsertQuery, [userId, tokensToAdd]);
    return NextResponse.json({ success: true, subscription: rows[0] });
  } catch (err) {
    console.error('❌ DB error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
