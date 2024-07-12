"use server";

import db from "@/db";
import { rooms } from "@/db/schema/rooms";
import { Room } from "@/types/interfaces";
import { eq } from "drizzle-orm";
import { deleteImageFromUploadThing } from "./upload-thing-api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createRoom = async (room: Room) => {
  const exstingRoom = (
    await db.select().from(rooms).where(eq(rooms.id, room.id))
  )[0];

  if (exstingRoom) {
    return { error: "Room Already Exists!" };
  }

  await db.insert(rooms).values(room);

  redirect(`/${room.projectId}/${room.id}`);
};

export const getAllRoomsForProject = async (projectId: string) => {
  const fetchedRooms = await db
    .select()
    .from(rooms)
    .where(eq(rooms.projectId, projectId));
  return fetchedRooms;
};

export const getRoomById = async (roomId: string) => {
  const fetchedRooms = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId));

  return fetchedRooms[0];
};

export const updateRoom = async (
  roomId: string,
  images: string[] | null,
  name: string | null,
  desc: string | null
) => {
  const room = (await db.select().from(rooms).where(eq(rooms.id, roomId)))[0];

  if (!room) {
    return { error: "Room Not Found!" };
  }

  const updatedImages: string[] | null =
    images === null ? null : images.concat(room.images);

  await db
    .update(rooms)
    .set({
      images: updatedImages === null ? room.images : updatedImages,
      name: name === null ? room.name : name,
      description: desc === null ? room.description : desc,
    })
    .where(eq(rooms.id, roomId));

  revalidatePath(`/api/${room.projectId}/${roomId}`);
};

export const deleteImageFromRoom = async (roomId: string, imageUrl: string) => {
  const room = (await db.select().from(rooms).where(eq(rooms.id, roomId)))[0];

  if (!room) {
    return { error: "Room Not Found!" };
  }

  const updatedImages = room.images.filter((image) => image !== imageUrl);

  await deleteImageFromUploadThing(imageUrl);

  await db
    .update(rooms)
    .set({ images: updatedImages })
    .where(eq(rooms.id, roomId));

  revalidatePath(`/api/${room.projectId}/${roomId}`);
};

export const addImageForGeneration = async (
  roomId: string,
  imageUrl: string,
  prevImageUrl: string | null
) => {
  const room = (await db.select().from(rooms).where(eq(rooms.id, roomId)))[0];

  if (!room) {
    return { error: "Room Not Found!" };
  }

  if (prevImageUrl != null) {
    await deleteImageFromUploadThing(prevImageUrl);
    await db
      .update(rooms)
      .set({ imageForGeneration: null })
      .where(eq(rooms.id, roomId));
  }

  await db
    .update(rooms)
    .set({ imageForGeneration: imageUrl })
    .where(eq(rooms.id, roomId));

  revalidatePath(`/api/${room.projectId}/${roomId}`);
};

export const deleteRoom = async (roomId: string) => {
  await db.delete(rooms).where(eq(rooms.id, roomId));
};
