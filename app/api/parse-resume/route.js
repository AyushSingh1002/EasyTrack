import { NextResponse } from 'next/server';
import { parseResume } from "@/app/lib/pdfParser"; // assumes pdfParser uses pdf-parse

// Not needed in App Router anymore – config is for /pages routes.
// export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume');

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid or missing file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await parseResume(buffer);
    console.log(parsed)
    const text = parsed.rawText;
    console.log(text)

    const email = parsed.email
    const phone = parsed.phone;
    const linkedIn = "NOT VARIFIED";
    const fullName = parsed.name;

    return NextResponse.json({
      fullName,
      email,
      phone,
      linkedIn,
    });
  } catch (err) {
    console.error('Resume parsing failed:', err);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}
