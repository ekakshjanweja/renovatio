import { pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";

export const modelEnum = pgEnum("model", [
  "leonardo_kino_xl",
  "leonardo_phoenix",
]);

export const modelNames: Record<MODEL, string> = {
  leonardo_kino_xl: "Leonardo Kino XL",
  leonardo_phoenix: "Leonardo Phoenix",
};

export const modelEnumSchema = z.enum(modelEnum.enumValues);

export type MODEL = z.infer<typeof modelEnumSchema>;
