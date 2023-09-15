import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/UserModel";
import { connectToDB } from "@/utils/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("Session:", session);
      const userSession = await User.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("Profile:", profile);
        //connect to DB
        await connectToDB();

        //check if the user already exists
        const existUser = await User.findOne({ email: profile.email });

        //if not, add user to the DB
        if (!existUser) {
          await User.create({
            email: profile.email,
            username: profile.name?.replaceAll(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
