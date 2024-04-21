import db from "@/db";
import { projects } from "@/db/schema/projects";
import { getCurrentUser } from "@/services/user-service";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  projectThumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await getCurrentUser();

      return {
        user: user,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { fileUrl: file.url };
    }),

  projectImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const user = await getCurrentUser();

      return { user: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db

        .update(projects)
        .set({
          imageModel: [file.url],
        })
        .where(eq(projects.designerId, metadata.user.id));

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
