import { integer, serial, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const todos: any = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    category: text("category"),
    dependsOn: integer("depends_on").references(
      () => todos.id,
      { onDelete: "set null" }
    ),
    status: integer("status"),
    description: text("description"),
    designerId: text("designer_id").references(() => users.id, {onDelete: "cascade"}),
})

export const todosRelations = relations(todos, ({ one }) => ({
  dependsOnTodo: one(todos, {
    fields: [todos.dependsOn],
    references: [todos.id],
  }),
}));

// Schema for inserting a todo
//const insertTodoSchema = createInsertSchema(todos);

// Schema for selecting a todo
//const selectTodoSchema = createSelectSchema(todos);
