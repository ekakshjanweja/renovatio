"use server";

import db from "@/db";
import { projects } from "@/db/schema/projects";
import { getCurrentUser } from "@/services/user-service";
import { CreateProjectSchema } from "@/types/zod-schema";
import * as z from "zod";

interface ProjectModel {
  id: string;
  name: string;
  thumbnailUrl?: string;
  location: string;
  area: number;
  description: string;
  category: string;
  imageModel: string[];
  designerId: string;
  userId: string;
}

export const createProject = async (
  values: z.infer<typeof CreateProjectSchema>
) => {
  const validatedFields = CreateProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const user = await getCurrentUser();

  const insertProject = async (project: ProjectModel) => {
    await db.insert(projects).values({
      id: project.id,
      name: project.name,
      thumbnailUrl: project.thumbnailUrl,
      location: project.location,
      area: project.area,
      description: project.description,
      category: project.category,
      imageModel: project.imageModel,
      designerId: project.designerId,
      userId: project.userId,
    });
  };

  insertProject({
    id: "1",
    name: values.name,
    thumbnailUrl: "",
    location: values.location,
    area: parseInt(values.area),
    description: values.description,
    category: values.category,
    imageModel: [],
    designerId: user.id,
    userId: user.id,
  });

  return { success: "Project added!" };
};
