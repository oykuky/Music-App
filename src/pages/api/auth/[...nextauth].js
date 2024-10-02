import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/lib/utils";
import User from "@/lib/model";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });
    
    if (!user) throw new Error("Wrong credentials user not found!");
    if (credentials.password !== user.password) throw new Error("Wrong credentials(password)!");
    
    return user;
  } catch (err) {
    console.log('Login Error:', err.message);
    throw new Error("Failed to login!");
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user ? {
            id: user._id.toString(),
            username: user.username,
            email: user.email
          } : null;
        } catch (error) {
          console.log("Authorize Error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  }
};

export default NextAuth(authOptions);