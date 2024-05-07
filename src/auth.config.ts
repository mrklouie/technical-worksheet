import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
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
} satisfies NextAuthConfig;
