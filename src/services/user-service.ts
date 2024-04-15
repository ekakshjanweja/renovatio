import { auth } from "@/auth";
import db from "@/db/index";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth();

  const userId = session?.user.id || "";

  const user = await db.select().from(users).where(eq(users.id, userId));

  return user[0];
};
