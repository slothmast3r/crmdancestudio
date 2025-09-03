import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uniqueIndex,
  index,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { sql } from "drizzle-orm";

export const user_role = pgEnum("user_role", [
  "OWNER",
  "GUARDIAN",
  "INSTRUCTOR",
  "STUDENT",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isOnboarded: boolean("isOnboarded").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const schoolMemberships = pgTable(
  "school_membership",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    schoolId: text("schoolId")
      .notNull()
      .references(() => schools.id, { onDelete: "cascade" }),
    role: user_role("role").notNull(),
    invitedByUserId: text("invitedByUserId").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("createdAt", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .default(sql`now()`),
    isActive: boolean("isActive").notNull().default(true),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.schoolId] }),
    index("membership_user_idx").on(t.userId), // 🔎 Find memberships by userId FAST
    index("membership_school_idx").on(t.schoolId),
    index("membership_role_idx").on(t.role),
  ]
);

export const schools = pgTable("school", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  // optional multi-tenant flags
  isActive: boolean("isActive").notNull().default(true),
});

export const userPersonalDetails = pgTable("user_personal_details", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: text("phone"),
  dateOfBirth: text("dateOfBirth"), // or timestamp/date depending on your needs
  addressLine1: text("addressLine1"),
  addressLine2: text("addressLine2"),
  city: text("city"),
  postalCode: text("postalCode"),
  country: text("country"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
