import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  return <main>{children}</main>;
}

export default DashboardLayout;
