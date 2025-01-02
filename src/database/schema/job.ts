import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { companies } from "./company";
import { users } from "./user";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  employmentType: varchar("employment_type", { length: 50 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  applicationDeadline: date("application_deadline").notNull(),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`,
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(
    sql`now()`,
  ),
});
