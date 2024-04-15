import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const designers = pgTable("designers", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  phone: text("phone").notNull(),
  image: text("image").notNull(),
  instagram: text("instagram"),

  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
