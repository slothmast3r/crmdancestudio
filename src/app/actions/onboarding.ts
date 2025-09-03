"use server";

import { db } from "@/db"; // your Drizzle client
import { eq } from "drizzle-orm";
import {
  schools,
  schoolMemberships,
  users,
  userPersonalDetails,
} from "@/db/schema";
import { z } from "zod";
import { auth } from "@/auth";

// If you use NextAuth, expose a helper that returns the session

const formSchema = z.object({
  schoolName: z.string().min(1),
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().min(9),
});

export async function createSchoolAction(raw: unknown) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parse = formSchema.safeParse(raw);
  if (!parse.success) {
    return { error: "Invalid input", issues: parse.error.flatten() };
  }

  const { schoolName } = parse.data;

  try {
    const result = await db.transaction(async (tx) => {
      // Create school
      const [school] = await tx
        .insert(schools)
        .values({
          name: schoolName,
        })
        .returning();

      // Link current user as OWNER
      if (!session?.user?.id) throw new Error("No user ID in session");

      await tx.insert(schoolMemberships).values({
        userId: session.user.id,
        schoolId: school.id,
        role: "OWNER",
      });

      const [user_personal_details] = await tx
        .insert(userPersonalDetails)
        .values({
          userId: session.user.id,
          firstName: parse.data.name || null,
          lastName: parse.data.surname || null,
          phone: parse.data.phone,
        })
        .onConflictDoUpdate({
          target: userPersonalDetails.userId,
          set: {
            firstName: parse.data.name || null,
            lastName: parse.data.surname || null,
            phone: parse.data.phone,
            updatedAt: new Date(),
          },
        })
        .returning();
      await tx
        .update(users)
        .set({ isOnboarded: true, updatedAt: new Date() })
        .where(eq(users.id, session.user.id));

      return { school, user_personal_details };
    });

    return {
      ok: true,
      school: result.school,
      userPersonalDetails: result.user_personal_details,
    };
  } catch (err: any) {
    return { error: "Wystąpił błąd podczas zapisu." };
  }
}
