import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
  emailVerified: boolean("email_verified").default(false),
  phone: text("phone").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const designers = pgTable("designers", {
  userId: integer("user_id").references(() => users.id),
});

export const usersRelations = relations(users, ({ one }) => ({
  designers: one(designers),
}));

export const designersRelations = relations(designers, ({ one }) => ({
  user: one(users, { fields: [designers.userId], references: [users.id] }),
}));
