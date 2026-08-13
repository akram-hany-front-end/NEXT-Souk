import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
                nationalId: {
                    label: "National ID",
                    type: "text",
                },
            },
async authorize(credentials) {
    console.log("CREDENTIALS:", credentials);

    if (!credentials) {
        console.log("NO CREDENTIALS");
        return null;
    }

    await connectDB();

    console.log("MONGOOSE CONNECTED");

    const email = String(credentials.email ?? "")
        .trim()
        .toLowerCase();

    const password = String(credentials.password ?? "");

    const nationalId = String(credentials.nationalId ?? "")
        .trim();

    console.log("SEARCH EMAIL:", JSON.stringify(email));
    console.log("SEARCH NATIONAL ID:", JSON.stringify(nationalId));

    if (!email || !password || !nationalId) {
        console.log("MISSING DATA");
        return null;
    }

    console.log("BEFORE USER FIND");

    const user = await User.findOne({
        email,
        nationalId,
    });

    console.log("AFTER USER FIND");
    console.log("USER FOUND:", !!user);

    if (!user) {
        console.log("USER NOT FOUND");
        return null;
    }

    console.log("USER EMAIL:", user.email);
    console.log("USER ROLE:", user.role);
    console.log("PASSWORD HASH EXISTS:", !!user.password);

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    console.log("PASSWORD CORRECT:", isPasswordCorrect);

    if (!isPasswordCorrect) {
        console.log("WRONG PASSWORD");
        return null;
    }

    console.log("LOGIN SUCCESS");

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        nationalId: user.nationalId,
    };
}
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.nationalId = user.nationalId;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.nationalId =
                    token.nationalId as string;
            }

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);