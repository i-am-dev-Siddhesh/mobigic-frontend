import AuthService from "@/services/Auth";
import UserService from "@/services/User";
import { errorFormatter, makeId } from "@/utils/helper";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "684021141022-24c3f3p83fi3em60itm62u2a46fgekcd.apps.googleusercontent.com",
      clientSecret: "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",
    }),

    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const resp = await AuthService.loginUser({
          email: credentials?.email as string,
          password: credentials?.password as string,
        }).catch((err) => {
          return { type: "err", error: err };
        });

        if (resp?.type === "err") {
          const error = resp.error;
          const message =
            typeof error === "string"
              ? error
              : errorFormatter(error) || "Login failed";

          throw new Error(message);
        }

        return resp?.data;
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const resp: any = await UserService.verfiyUserEmail({
          email: profile?.email as string,
        }).catch((err) => {
          return {
            type: "error",
            error: err?.response?.data?.message,
          };
        });
        if (resp?.type === "error") {
          await UserService.registerUser({
            name: profile.name!,
            email: profile.email!,
            password: `${makeId(10)}$@#!@3#2LM23`,
          });
        }

        return profile.email_verified && profile?.email?.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.id = user.id;
      }
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "sigin",
  },
});
