import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  location: text("location").notNull(),
  area: integer("area").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  images: text("image_model").array().notNull(),
  designerId: text("designer_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  status: text("status").notNull().default("draft"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
