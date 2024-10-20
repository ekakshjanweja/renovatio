"use server";

import db from "@/db";
import { todos } from "@/db/schema/todos";
import { users } from "@/db/schema/users";
import { getUserByEmail } from "@/actions/user-action";
import { TodoSchema } from "@/types/zod-schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { diffObject } from "@/lib/utils";

export const createTodo = async (
  values: z.infer<typeof TodoSchema>,
  designerId: string
) => {
  const validatedFields = TodoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  try {
    await db.insert(todos).values({
      title: values.title,
      category: values.category,
      dependsOn: values.dependsOn,
      status: values.status,
      description: values.description,
      designerId: designerId,
    });
    return { success: "The todo has been created" };
  } catch (e) {
    return { fail: "Todo creation failed" };
  }
};

export const getAllTodos = async (userId: string, isDes = false) => {
  // gets all todos of that designer

  const res: (z.infer<typeof TodoSchema> & {
    id: number;
    designerId: number;
  })[] = (await db
    // @ts-ignore
    .select()
    .from(todos)
    // if i am designer, i want to see all todos relevant to just ME
    .where(
      eq(todos.designerId, userId)
    )) as unknown as (z.infer<typeof TodoSchema> & {
    id: number;
    designerId: number;
  })[];

  console.log("res is: ");
  console.log(res);
  return res;
};

export const updateTodo = async (todo: any, changed: any) => {
  // update the stuff

  const update = diffObject(todo, changed);
  // @ts-ignore
  Object.keys(update).forEach(
    (key) => update[key] === undefined && delete update[key]
  );

  if (Object.keys(update).length > 0) {
    console.log("update is: ");
    console.log(update);
    await db.update(todos).set(update).where(eq(todo.id, todos.id));
    return 204;
  } else {
    // NO UPDATES
    return 304;
  }
};
