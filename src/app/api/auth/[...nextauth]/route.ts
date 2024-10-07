import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { urlApi } from "../../ApiUrl";

const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(`${urlApi}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }

    const data = await response.json();

    if (data.user && data.access_token) {
      return {
        id: data.user._id,
        email: data.user.email,
        username: data.user.username,
        name: data.user.name,
        phone: data.user.phone,
        accessToken: data.access_token,
      };
    }
    throw new Error("User data is incomplete");
  } catch (error: unknown) {
    console.error("Failed to authenticate user: ", error);
    return null;
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await authenticateUser(
          credentials.username,
          credentials.password
        );
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.accessToken;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.phone = token.phone as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret-key",
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };