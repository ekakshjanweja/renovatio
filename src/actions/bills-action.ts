"use server"

import db from "@/db";
import { bills } from "@/db/schema/bills";
import { users } from "@/db/schema/users";
import { getUserByEmail } from "@/services/user-service";
import { BillSchema } from "@/types/zod-schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { diffObject } from "@/lib/utils";

export const createBill = async (values: z.infer<typeof BillSchema>, designerId: string) => {
    // create bill server action to make a bill in the database
  const validatedFields = BillSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  
  const clientUser = await getUserByEmail(values.clientEmail);

  try {
  await db.insert(bills).values({
    item: values.item,
    category: values.category,
    status: values.status,
    amount: values.amount.toString(),
    clientId: clientUser.id,
    designerId: designerId,
  });
  return {success: "The bill has been created"}

  } catch(e) {
  return {fail: "Bill creation failed"}
  }
  
  
}

export const getAllBills = async (userId: string, isDes = false) => {
  // gets all bills of that designer
  /*
   *
   * this returns user uid, i want the user name
   *
  if(isDes)
    res = await db.select().from(bills).where(eq(bills.designerId, userId))
  else
    res = await db.select().from(bills).where(eq(bills.clientId, userId))
  */
  const res: (z.infer<typeof BillSchema> & {userName: string; userEmail: string; id: string;})[] = (await db
    // @ts-ignore
    .select({userName: users.name, userEmail: users.email, ...bills})
    .from(users)
      // if i am designer, i want to see client name, and vice versa
    .innerJoin(bills, eq(isDes ? bills.clientId : bills.designerId, users.id))

      // if i am designer, i want to see all bills relevant to just ME
    .where(eq(isDes ? bills.designerId : bills.clientId, userId))) as unknown as (z.infer<typeof BillSchema> & {userName: string; userEmail: string; id: string;})[];

  //console.log("res is: ");
  //console.log(res);
  return res;
}


export const updateBill = async (invoice: any, changed: any) => {
  // update the stuff

  const update = diffObject(invoice, changed);
  // @ts-ignore
  Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

  if(Object.keys(update).length > 0) {
    console.log("update is: ");
    console.log(update);
    await db.update(bills)
      .set(update)
      .where(eq(invoice.id, bills.id))
    return 204
  } else {
    // NO UPDATES
    return 304;
  }
}
