import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "972976989450-8bkr1sgv6idud5flshproe8o0g5pujlf.apps.googleusercontent.com",
      clientSecret: "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",
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role; 

      return session;

    },
    async signIn({  profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          try {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              password: profile.at_hash,
              image: profile.picture,
            });
          } catch (error) {
            console.error("Error creating user:", error.message);
          }
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})
export { handler as GET, handler as POST }