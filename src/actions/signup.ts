"use server";

import { SignUpSchema } from "@/types/zod-schema";
import * as z from "zod";

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};
