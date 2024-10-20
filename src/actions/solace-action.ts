"use server";

import db from "@/db";
import { solace, SolaceInsert, SolaceSelect } from "@/db/schema/solace";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user-action";
import { revalidatePath } from "next/cache";

export const getSolaceHistory = async () => {
  const user = await getCurrentUser();

  const history = await db
    .select()
    .from(solace)
    .where(eq(solace.generatedBy, user.id));

  return {
    history: history as SolaceSelect[],
  };
};

export const saveSolaceHistory = async (image: SolaceInsert) => {
  if (image.id === undefined || image.id === null) {
    return { error: "Image ID is required!" };
  }

  const existingImage = (
    await db.select().from(solace).where(eq(solace.id, image.id!))
  )[0];

  if (existingImage) {
    return { error: "Image Already Exists!" };
  }

  await db.insert(solace).values(image);

  revalidatePath("/dashboard");
};
