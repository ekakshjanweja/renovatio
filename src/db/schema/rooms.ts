import { pgTable, text } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const rooms = pgTable("rooms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  images: text("image_model").array().notNull(),

  projectId: text("projectid")
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .notNull(),
});
