import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobTags = pgTable("job_tags", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  tag: varchar("tag", { length: 50 }).notNull(),
});
