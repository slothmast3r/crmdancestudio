import { pgTable, text, timestamp, unique, boolean, foreignKey, integer, uniqueIndex, varchar, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['OWNER', 'GUARDIAN', 'INSTRUCTOR', 'STUDENT'])


export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	isOnboarded: boolean().default(false).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	image: text(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const school = pgTable("school", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	subdomain: varchar({ length: 63 }).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	isActive: boolean().default(true).notNull(),
}, (table) => [
	uniqueIndex("school_subdomain_unique").using("btree", table.subdomain.asc().nullsLast().op("text_ops")),
]);

export const userPersonalDetails = pgTable("user_personal_details", {
	userId: text().primaryKey().notNull(),
	firstName: text(),
	lastName: text(),
	phone: text(),
	dateOfBirth: text(),
	addressLine1: text(),
	addressLine2: text(),
	city: text(),
	postalCode: text(),
	country: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "user_personal_details_userId_user_id_fk"
		}).onDelete("cascade"),
]);
