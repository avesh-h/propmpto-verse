//Backend end point

// import NextAuth from "next-auth/next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //To see which user is currently online

      console.log("ss", session);

      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.log("session", sessionUser);
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        console.log("profile", profile);

        //check user aleready exist or not
        const userExist = User.findOne({
          email: profile.email,
        });

        //if not , create new user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  // callbacks: {

  // },
});

export { handler as GET, handler as POST };
