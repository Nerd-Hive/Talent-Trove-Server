import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { address } from "./address";
import { educations } from "./education";
import { experiences } from "./experience";
import { socialLinks } from "./socialLink";
import { users } from "./user";

export const jobSeekerProfiles = pgTable("job_seeker_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  resumeUrl: text("resume_url"),
  socialLink: integer("social_link").references(() => socialLinks.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  portfolioUrl: text("portfolio_url"),
  experience: integer("experience").references(() => experiences.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  education: integer("education").references(() => educations.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  address: integer("address").references(() => address.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  gender: text("gender"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jobSeekerProfileRelations = relations(
  jobSeekerProfiles,
  ({ one }) => ({
    user: one(users, {
      fields: [jobSeekerProfiles.userId],
      references: [users.id],
    }),
  }),
);
