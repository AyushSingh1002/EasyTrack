import { NextResponse } from 'next/server';
import { parseResume } from "@/app/lib/pdfParser";
import { pool } from '../pg';
import { getSessionUser } from '@/app/helper/sessionManager';

export async function POST(req) {
  const user = await getSessionUser();
  const userId = user?.uid;
  
  try {
    const formData = await req.formData();
    const file = formData.get('resume');

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid or missing file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parsed = await parseResume(buffer);

    const query = `SELECT * FROM user_profiles where users_id = $1`;
    const values = [userId];
    const dbCall = await pool.query(query, values);

    // Ensure skills is always an array
    const skills = dbCall.rows[0]?.skills;
    const skillsArray = Array.isArray(skills) ? skills : 
                       (typeof skills === 'string' ? skills.split(',') : []);

    return NextResponse.json({
      fullName: parsed.name || 'N/A',
      email: parsed.email || 'N/A',
      phone: parsed.phone || 'N/A',
      linkedIn: "NOT VERIFIED",
      skills: skillsArray,
      summary: dbCall.rows[0]?.summary || 'N/A',
    });
  } catch (err) {
    console.error('Resume parsing failed:', err);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const user = await getSessionUser();
    const uid = user?.uid; // Fixed: removed duplicate .uid

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const query = `SELECT * FROM user_profiles WHERE users_id = $1`;
    const values = [uid];
    const result = await pool.query(query, values);
    const profile = result.rows[0];

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Ensure skills is always an array
    const skills = profile.skills;
    const skillsArray = Array.isArray(skills) ? skills : 
                       (typeof skills === 'string' ? skills.split(',') : []);

    return NextResponse.json({
      fullName: profile.full_name || 'N/A',
      email: profile.email || 'N/A',
      phone: profile.phone || 'N/A',
      linkedIn: profile.linkedin || 'N/A',
      skills: skillsArray,
      summary: profile.summary || 'N/A',
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}