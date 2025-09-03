import { relations } from "drizzle-orm/relations";
import { user, account, authenticator, session, userPersonalDetails } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	userPersonalDetails: many(userPersonalDetails),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userPersonalDetailsRelations = relations(userPersonalDetails, ({one}) => ({
	user: one(user, {
		fields: [userPersonalDetails.userId],
		references: [user.id]
	}),
}));