import { pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";

export const roomTypeEnum = pgEnum("room_type", [
  "kitchen",
  "bedroom",
  "bathroom",
  "living_room",
  "dining_room",
  "facade",
  "study_room",
  "balcony",
  "terrace",
  "garden",
  "garage",
  "storage_room",
  "basement",
  "utility_area",
  "gym",
]);

export const roomTypeNames: Record<ROOM_TYPE, string> = {
  kitchen: "Kitchen",
  bedroom: "Bedroom",
  bathroom: "Bathroom",
  living_room: "Living Room",
  dining_room: "Dining Room",
  facade: "Facade",
  study_room: "Study Room",
  balcony: "Balcony",
  terrace: "Terrace",
  garden: "Garden",
  garage: "Garage",
  storage_room: "Storage Room",
  basement: "Basement",
  utility_area: "Utility Area",
  gym: "Gym",
};

export const roomTypeEnumSchema = z.enum(roomTypeEnum.enumValues);

export type ROOM_TYPE = z.infer<typeof roomTypeEnumSchema>;
