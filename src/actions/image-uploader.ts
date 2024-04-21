"use server";

import db from "@/db";
import { projects } from "@/db/schema/projects";
import { eq } from "drizzle-orm";

export const uploadProjectThumbnail = async (
  projectId: string,
  imageUrl: string
) => {
  await db
    .update(projects)
    .set({
      thumbnailUrl: imageUrl,
    })
    .where(eq(projects.id, projectId));
};
