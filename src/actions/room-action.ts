"use server";

import db from "@/db";
import { rooms } from "@/db/schema/rooms";
import { Room } from "@/types/interfaces";
import { eq } from "drizzle-orm";

export const createRoom = async (room: Room) => {
  const exstingRoom = (
    await db.select().from(rooms).where(eq(rooms.id, room.id))
  )[0];

  if (exstingRoom) {
    return { error: "Room Already Exists!" };
  }

  await db.insert(rooms).values(room);
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
  images: string[],
  name: string | null
) => {
  const room = (await db.select().from(rooms).where(eq(rooms.id, roomId)))[0];

  if (!room) {
    return { error: "Room Not Found!" };
  }

  const updatedImages = images.concat(room.images);

  await db
    .update(rooms)
    .set({ images: updatedImages, name: name === null ? room.name : name })
    .where(eq(rooms.id, roomId));
};

export const deleteRoom = async (roomId: string) => {
  await db.delete(rooms).where(eq(rooms.id, roomId));
};
