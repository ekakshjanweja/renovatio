import db from "@/db";
import { projects } from "@/db/schema/projects";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user-service";

export const getAllProjectsForCurrentUser = async () => {
  const user = await getCurrentUser();

  const allProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id) || eq(projects.designerId, user.id));
};

export const getProjectById = async (projectId: string) => {
  const project = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  return project[0];
};
