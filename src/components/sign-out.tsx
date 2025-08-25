"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

function SignOut() {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}

export default SignOut;
