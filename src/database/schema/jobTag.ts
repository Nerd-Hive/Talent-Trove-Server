import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobTags = pgTable("job_tags", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  tag: varchar("tag_id", { length: 50 }).notNull(),
});

export const jobTagRelations = relations(jobTags, ({ one }) => ({
  job: one(jobs, {
    fields: [jobTags.jobId],
    references: [jobs.id],
  }),
}));
