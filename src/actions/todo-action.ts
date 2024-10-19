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

  const clientUser = await getUserByEmail(values.clientEmail);

  try {
    await db.insert(todos).values({
      item: values.item,
      category: values.category,
      status: values.status,
      amount: values.amount.toString(),
      clientId: clientUser.id,
      designerId: designerId,
    });
    return { success: "The todo has been created" };
  } catch (e) {
    return { fail: "Todo creation failed" };
  }
};

export const getAllTodos = async (userId: string, isDes = false) => {
  // gets all todos of that designer
  /*
   *
   * this returns user uid, i want the user name
   *
  if(isDes)
    res = await db.select().from(todos).where(eq(todos.designerId, userId))
  else
    res = await db.select().from(todos).where(eq(todos.clientId, userId))
  */
  const res: (z.infer<typeof TodoSchema> & {
    userName: string;
    userEmail: string;
    id: string;
  })[] = (await db
    // @ts-ignore
    .select({ userName: users.name, userEmail: users.email, ...todos })
    .from(users)
    // if i am designer, i want to see client name, and vice versa
    .innerJoin(todos, eq(isDes ? todos.clientId : todos.designerId, users.id))

    // if i am designer, i want to see all todos relevant to just ME
    .where(
      eq(isDes ? todos.designerId : todos.clientId, userId)
    )) as unknown as (z.infer<typeof TodoSchema> & {
    userName: string;
    userEmail: string;
    id: string;
  })[];

  //console.log("res is: ");
  //console.log(res);
  return res;
};

export const updateTodo = async (invoice: any, changed: any) => {
  // update the stuff

  const update = diffObject(invoice, changed);
  // @ts-ignore
  Object.keys(update).forEach(
    (key) => update[key] === undefined && delete update[key]
  );

  if (Object.keys(update).length > 0) {
    console.log("update is: ");
    console.log(update);
    await db.update(todos).set(update).where(eq(invoice.id, todos.id));
    return 204;
  } else {
    // NO UPDATES
    return 304;
  }
};
