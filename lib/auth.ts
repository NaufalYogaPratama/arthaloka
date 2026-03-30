import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            id: "guest",
            name: "Guest",
            credentials: {},
            async authorize() {
                // Generate a guest user with a random ID
                const guestId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
                return {
                    id: guestId,
                    name: `Pemain_${Math.floor(Math.random() * 9999)}`,
                    email: null,
                    image: null,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.authProvider = account?.provider === "google" ? "GOOGLE" : "GUEST";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as unknown as Record<string, unknown>).authProvider = token.authProvider;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.AUTH_SECRET,
});
