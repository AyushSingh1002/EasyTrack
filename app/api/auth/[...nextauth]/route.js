
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: "Ov23limL05mv47VUGnvJ",
      clientSecret: "ee6a16157014b8f0b8b736e5e736ee30091f1061",
    }),
  ],
});

export { handler as GET, handler as POST };