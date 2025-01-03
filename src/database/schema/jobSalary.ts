import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobSalaries = pgTable("job_salaries", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  minSalary: integer("min_salary"),
  maxSalary: integer("max_salary"),
  currency: varchar("currency", { length: 10 }).default("USD"),
});

export const jobSalaryRelations = relations(jobSalaries, ({ one }) => ({
  job: one(jobs, {
    fields: [jobSalaries.jobId],
    references: [jobs.id],
  }),
}));
