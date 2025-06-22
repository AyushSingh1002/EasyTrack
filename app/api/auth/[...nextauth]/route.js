// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/db/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: user.name }),
        });
        const data = await res.json();
        token.uid = data;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.uid = token.uid;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
