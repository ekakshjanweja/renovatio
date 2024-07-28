import db from "@/db";
import { projects } from "@/db/schema/projects";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../actions/user-action";

export const getAllProjectsForCurrentUser = async () => {
  const user = await getCurrentUser();

  const projectsWithUserAsClient = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id));

  const projectsWithUserAsDesigner = await db
    .select()
    .from(projects)
    .where(eq(projects.designerId, user.id));

  const allProjects = [
    ...projectsWithUserAsClient,
    ...projectsWithUserAsDesigner,
  ];

  return allProjects;
};

export const getProjectById = async (projectId: string) => {
  const project = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  return project[0];
};
