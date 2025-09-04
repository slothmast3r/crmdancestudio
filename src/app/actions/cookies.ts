// app/actions/set-selected-school.ts
"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { schoolMemberships } from "@/db/schema";
import { auth } from "@/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function setSelectedSchool(schoolId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  // Verify membership (text ids!)
  const [membership] = await db
    .select({ userId: schoolMemberships.userId })
    .from(schoolMemberships)
    .where(
      and(
        eq(schoolMemberships.userId, session.user.id),
        eq(schoolMemberships.schoolId, schoolId),
        eq(schoolMemberships.isActive, true)
      )
    );

  if (!membership) throw new Error("Not a member of that school");

  // Persist in cookie (string)
  (
    await // Persist in cookie (string)
    cookies()
  ).set("selectedSchoolId", schoolId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  // or DB-based:
  // await db.update(users).set({ defaultSchoolId: schoolId })
  //   .where(eq(users.id, session.user.id));

  revalidatePath("/(dashboard)", "layout");
  revalidatePath("/dashboard");
}
