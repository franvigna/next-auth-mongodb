import { connectDB } from "@/libs/mongodb";
import User from "../../../models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        //El usuario existe
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        //si no existe
        if (!userFound) throw new Error("Invalid credentials");

        //Compara la contraseña
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        
        //Si la contraseña es incorrecta
        if (!passwordMatch) throw new Error("Invalid credentials");

        console.log(userFound);

        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    // Definir el types de session.user
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };