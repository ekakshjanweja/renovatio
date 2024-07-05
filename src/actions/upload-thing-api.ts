"use server";

import { UTApi } from "uploadthing/server";

export const deleteImageFromUploadThing = async (imageUrl: string) => {
  const utapi = new UTApi();

  const base = "https://utfs.io/f/";

  const url = imageUrl.replace(base, "");

  await utapi.deleteFiles(url);
};
