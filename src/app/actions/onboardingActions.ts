"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { roleKeys, type RoleKey } from "@/lib/roles";

export async function setRole(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/sign-in");

  const role = formData.get("role");
  if (typeof role !== "string" || !roleKeys.has(role)) {
    throw new Error("Invalid role");
  }

  await db
    .update(users)
    .set({ role: role as RoleKey, updatedAt: new Date() })
    .where(eq(users.id, session.user.id));

  redirect("/dashboard");
}
