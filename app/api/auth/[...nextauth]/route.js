// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          const res = await fetch(`${process.env.SITE_URL}/api/db/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, name: user.name }),
          });
          if (res.ok) {
            const data = await res.json();
            token.uid = data?.uid || null;
          } else {
            token.uid = null;
          }
        } catch (_) {
          token.uid = null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.uid = token.uid || null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
