import { numeric, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const todos = pgTable("todos", {
    id: uuid("id").defaultRandom(),
    item: text("item"),
    category: text("category"),
    status: integer("status"),
    description: text("description"),
    designerId: text("designer_id").references(() => users.id, {onDelete: "cascade"}),
})
