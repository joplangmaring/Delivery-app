import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user || !user.isVerified) {
            return null; // User does not exist or is not verified
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null; // Incorrect password
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image, // Include user image
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoDB();

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Save new user for social logins
        existingUser = new User({
          name: user.name,
          email: user.email,
          image: user.image, // Save the image
          provider: account.provider,
          isVerified: true, // Assume social accounts are verified
        });
        await existingUser.save();
      }

      if (!existingUser.isVerified) {
        throw new Error("Email is not verified.");
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image; // Add image to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.image; // Include image in the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
