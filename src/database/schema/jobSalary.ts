import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobSalaries = pgTable("job_salaries", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  minSalary: serial("min_salary"),
  maxSalary: serial("max_salary"),
  currency: varchar("currency", { length: 10 }).default("USD"),
});

export const jobSalaryRelations = relations(jobSalaries, ({ one }) => ({
  job: one(jobs),
}));
