import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { jobs } from "./job";

export const jobRequirements = pgTable("job_requirements", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  requirement: text("requirement").notNull(),
});
