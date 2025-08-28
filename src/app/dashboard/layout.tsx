import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "../../db";
import { users } from "../../db/schema";
import { sql, eq } from "drizzle-orm";
import { ONBOARDING_STEPS } from "@/lib/roles";

async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id || sql`NULL`))
    .execute();
  if (!user.isOnboarded) {
    redirect(`/onboarding/${ONBOARDING_STEPS[0]}`); // redirect to the first step of onboarding
  }
  return (
    <main>
      session: {JSON.stringify(session)}
      {children}
    </main>
  );
}

export default DashboardLayout;
