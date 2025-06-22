// app/lib/getSessionUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.uid) {
    throw new Error("Unauthorized");
  }
  return session.user; // includes uid, email, etc.
}
