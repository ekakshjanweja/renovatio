"use server";

import { utapi } from "@/lib/uploadthing";

export const deleteImageFromUploadThing = async (imageUrl: string) => {
  const base = "https://utfs.io/f/";

  const url = imageUrl.replace(base, "");

  await utapi.deleteFiles(url);
};
