import NextAuth from "next-auth";
import { UserModel } from "./lib/models";
import { connectDB } from "./lib/connectDB";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Custom Pages and if something went wrong, our application will be redirected into this paths
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  providers: [
    Credentials({
      // This authorize() will get triggered when we successfully-
      // Authenticated from the Login

      // This will also return an object or a piece of data to the client-
      // such as id, token, email, name, and avatar/image/profile

      // The credentials in this parameter is the input data from the form of login
      async authorize(credentials): Promise<any> {
        try {
          const { email } = credentials;

          // We must return an object, doesn't matter what is inside the object
          // as long as it is an object then it is fine
          return { email };
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /// JWT will get triggered first before the session
    // the data you return here will get passed into the session-
    // thats why you can see it in the session that we accept a parameter named token (Look below)
    async signIn({ user, account }) {
      const { email } = user;

      await connectDB();

      const signingUser = await UserModel.findOne({ email });

      if (!signingUser) return false;

      return true;
    },
    async jwt({ token }) {
      return token;
    },

    // We accept token and session as parameter
    async session({ token, session }) {
      return session;
    },
  },
});
