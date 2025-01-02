import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 50 }).notNull(),
});
