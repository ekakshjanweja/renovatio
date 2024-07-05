import { numeric, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const bills = pgTable("bills", {
    id: uuid("id").defaultRandom(),
    item: text("item"),
    category: text("category"),
    status: integer("status"),
    amount: numeric("amount"),
    designerId: text("designer_id").references(() => users.id, {onDelete: "cascade"}),
    clientId: text("client_id").references(() => users.id, {onDelete: "cascade"})
})