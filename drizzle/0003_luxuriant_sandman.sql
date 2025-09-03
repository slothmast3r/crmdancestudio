CREATE TABLE "school_membership" (
	"userId" text NOT NULL,
	"schoolId" text NOT NULL,
	"role" "user_role" NOT NULL,
	"invitedByUserId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "school_membership_userId_schoolId_pk" PRIMARY KEY("userId","schoolId")
);
--> statement-breakpoint
CREATE TABLE "school" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_personal_details" (
	"userId" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"phone" text,
	"dateOfBirth" text,
	"addressLine1" text,
	"addressLine2" text,
	"city" text,
	"postalCode" text,
	"country" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "school_membership" ADD CONSTRAINT "school_membership_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_membership" ADD CONSTRAINT "school_membership_schoolId_school_id_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."school"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_membership" ADD CONSTRAINT "school_membership_invitedByUserId_user_id_fk" FOREIGN KEY ("invitedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_personal_details" ADD CONSTRAINT "user_personal_details_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "membership_user_idx" ON "school_membership" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "membership_school_idx" ON "school_membership" USING btree ("schoolId");--> statement-breakpoint
CREATE INDEX "membership_role_idx" ON "school_membership" USING btree ("role");--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "role";