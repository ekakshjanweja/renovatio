"use server";

import db from "@/db";
import { waitlist } from "@/db/schema/waitlist";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const addToWaitlist = async (email: string) => {
  const id = nanoid();
  await db.insert(waitlist).values({ email, id });
  revalidatePath("/landing");
};
