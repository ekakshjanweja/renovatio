"use server";

import db from "@/db";
import { solace, SolaceInsert, SolaceSelect } from "@/db/schema/solace";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user-action";

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
  console.log(1);

  if (image.id === undefined || image.id === null) {
    return { error: "Image ID is required!" };
  }

  const existingImage = (
    await db.select().from(solace).where(eq(solace.id, image.id!))
  )[0];

  console.log(2);

  if (existingImage) {
    return { error: "Image Already Exists!" };
  }

  console.log(3);

  await db.insert(solace).values(image);

  console.log(4);

  //TODO: revalidatePath
};
