import { auth } from "@/auth";
import { SignInForm } from "@/components/sign-in-form";
import { redirect } from "next/navigation";
import React from "react";

async function SignIn() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SignInForm></SignInForm>
    </div>
  );
}

export default SignIn;
