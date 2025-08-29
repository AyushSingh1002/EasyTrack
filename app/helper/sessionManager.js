// app/lib/getSessionUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export async function getSessionUser() {
  const session = await getServerSession(authOptions);


  if ( !session.user?.uid || typeof session.user.uid !== 'string') {
    throw new Error("Unauthorized");
  }
  return session.user; // includes uid, email, etc.
}
