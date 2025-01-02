import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobSalaries = pgTable("job_salaries", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  minSalary: serial("min_salary").notNull(),
  maxSalary: serial("max_salary").notNull(),
  currency: varchar("currency", { length: 10 }).default("USD"),
});
