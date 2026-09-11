
import { pool } from '@/app/api/pg'; // normal pg connection
import { NextResponse } from 'next/server';
import { generateUserId } from '@/app/lib/uid';

export async function POST(req) {
  if (!process.env.NEXTAUTH_SECRET || req.headers.get('x-auth-bootstrap') !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!email || email.length > 320 || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  const existing = await pool.query(
    'SELECT users_id FROM user_profiles WHERE email = $1',
    [email]
  );

  if (existing.rows.length > 0) {
    return NextResponse.json({ uid: existing.rows[0].users_id });
  }

  const uid = generateUserId();
  await updateSubscription(uid);
  await pool.query(
    'INSERT INTO user_profiles (users_id, email, full_name) VALUES ($1, $2, $3)',
    [uid, email, name || '']
  );


  return NextResponse.json({uid});
}

 async function updateSubscription(userid){
     const query = 'SELECT * FROM subscription WHERE user_id = $1';
  const result = await pool.query(query, [userid]);

  if (result.rows.length > 0) {
    return result.rows[0]; // user already exists
  }


  const insertQuery = `
    INSERT INTO subscription (user_id)
    VALUES ($1) RETURNING *;
  `;
  const insertResult = await pool.query(insertQuery, [userid]);
  return insertResult.rows[0];
}


