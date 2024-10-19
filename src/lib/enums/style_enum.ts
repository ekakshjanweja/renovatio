import { pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";

export const styleEnum = pgEnum("style", [
  "minimalist",
  "modern",
  "traditional",
]);

export const styleNames: Record<STYLE, string> = {
  minimalist: "Minimalist",
  modern: "Modern",
  traditional: "Traditional",
};

export const styleEnumSchema = z.enum(styleEnum.enumValues);

export type STYLE = z.infer<typeof styleEnumSchema>;
