import { NextResponse } from 'next/server';
import { parseResume } from "@/app/lib/pdfParser"; // assumes pdfParser uses pdf-parse
import { pool } from '../pg';
import { getSessionUser } from '@/app/helper/sessionManager';

// Not needed in App Router anymore – config is for /pages routes.
// export const config = { api: { bodyParser: false } };

export async function POST(req) {
  const user = await getSessionUser()
  const userId = user?.uid?.uid
  try {
    const formData = await req.formData();
    const file = formData.get('resume');

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid or missing file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await parseResume(buffer);

    const text = parsed.rawText;
    // console.log(text)

    const email = parsed.email
    const phone = parsed.phone;
    const linkedIn = "NOT VARIFIED";
    const fullName = parsed.name;

    const query = `SELECT * FROM user_profiles where users_id = $1`
    const values = [userId];
    console.log(userId)
    const dbCall = await pool.query(query, values)

    return NextResponse.json({
      fullName,
      email,
      phone,
      linkedIn,
      skills: dbCall.rows[0].skills,
      summary: dbCall.rows[0].summary,
    });
  } catch (err) {
    console.error('Resume parsing failed:', err);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
  const user = await getSessionUser()
  const uid = user?.uid?.uid
    console.log(uid)

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const query = `SELECT * FROM user_profiles WHERE users_id = $1`;
    const values = [uid];

    const result = await pool.query(query, values);
    const profile = result.rows[0];
    console.log(profile)

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      fullName: profile.full_name,     // adjust column names to match DB
      email: profile.email,
      phone: profile.phone,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      summary: profile.summary,
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
