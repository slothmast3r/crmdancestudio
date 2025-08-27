import { NextAuthConfig, User } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export default {
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
    }),
    Google,
  ],
} satisfies NextAuthConfig;
