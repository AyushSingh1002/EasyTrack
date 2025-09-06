// app/api/token/route.js
import { pool } from "@/app/api/pg"
import { NextResponse } from 'next/server';
import { getSessionUser } from "@/app/helper/sessionManager";

export async function POST(req) {


  const { tokensToAdd, userId } = await req.json();


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

export async function GET() {
  try {
    const user = await getSessionUser()
    const userId = user?.uid

    if (!userId) {
      return NextResponse.json({ success: true, available_token: 0 });
    }

    const { rows } = await pool.query(
      "SELECT available_token FROM subscription WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    const available = rows?.[0]?.available_token ?? 0;
    return NextResponse.json({ success: true, available_token: available });
  } catch (err) {
    console.error('❌ DB error (GET /api/token):', err);
    return NextResponse.json({ success: false, available_token: 0 }, { status: 500 });
  }
}
