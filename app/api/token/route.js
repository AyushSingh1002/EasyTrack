import { NextResponse } from "next/server";
import { pool } from "@/app/api/pg";
import { getSessionUser } from "@/app/helper/sessionManager";
import { awardTokens } from "@/app/lib/tokenService";

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Token awards are only processed by verified payments" },
    { status: 403 }
  );
}

export async function GET() {
  try {
    const user = await getSessionUser();
    const { rows } = await pool.query(
      "SELECT available_token FROM subscription WHERE user_id = $1 LIMIT 1",
      [user.uid]
    );
    return NextResponse.json({ success: true, available_token: rows[0]?.available_token ?? 0 });
  } catch {
    return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  }
}

export { awardTokens };
