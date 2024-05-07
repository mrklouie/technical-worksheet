import NextAuth from "next-auth";
import { UserModel } from "./lib/models";
import { connectDB } from "./lib/connectDB";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Custom Pages and if something went wrong, our application will be redirected into this paths
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    /// JWT will get triggered first before the session
    // the data you return here will get passed into the session-
    // thats why you can see it in the session that we accept a parameter named token (Look below)

    // async signIn({ user, account }) {
    //   const { email } = user;

    //   await connectDB();

    //   const signingUser = await UserModel.findOne({ email });

    //   if (!signingUser) return false;

    //   return true;
    // },
    async jwt({ token }) {
      return token;
    },

    // We accept token and session as parameter
    async session({ token, session }) {
      return session;
    },
  },
  ...authConfig,
});
