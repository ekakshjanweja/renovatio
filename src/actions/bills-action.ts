"use server"

import db from "@/db";
import { bills } from "@/db/schema/bills";
import { getUserByEmail } from "@/services/user-service";
import { BillSchema } from "@/types/zod-schema";
import { z } from "zod";

export const createBill = async (values: z.infer<typeof BillSchema>, designerId: string) => {
    // create bill server action to make a bill in the database
  const validatedFields = BillSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  
  const clientUser = await getUserByEmail(values.clientEmail);
  await db.insert(bills).values({
    item: values.item,
    category: values.category,
    status: values.status,
    amount: values.amount.toString(),
    clientId: clientUser.id,
    designerId: designerId,
  });
  
  return {success: "The bill has been created"}
}