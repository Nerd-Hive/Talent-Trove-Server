import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { jobs } from "./job";
import { users } from "./user";

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  jobId: serial("job_id")
    .notNull()
    .references(() => jobs.id),
  coverLetter: text("cover_letter").notNull(),
  applicationStatus: varchar("application_status", { length: 50 }).default(
    "applied",
  ),
  appliedAt: timestamp("applied_at").defaultNow(),
});
