"use server";

import { LogInSchema } from "@/types/zod-schema";
import * as z from "zod";

export const login = async (values: z.infer<typeof LogInSchema>) => {
  const validatedFields = LogInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};
