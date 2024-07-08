import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull(),
});
