import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const modelEnum = pgEnum('model', [
  'leonardo_kino_xl',
  'leonardo_phoenix'
])

export const modelEnumSchema = z.enum(modelEnum.enumValues)

export const styleEnum = pgEnum('style', [
  'minimalist',
  'modern',
  'traditional'
])

export const styleEnumSchema = z.enum(styleEnum.enumValues)

export const roomTypeEnum = pgEnum('room_type', [
  'kitchen',
  'bedroom',
  'bathroom',
  'living_room',
  'dining_room',
  'facade',
  'study_room',
  'balcony',
  'terrace',
  'garden',
  'garage',
  'storage_room',
  'basement',
  'utility_area',
  'gym'
])

export const roomTypeEnumSchema = z.enum(roomTypeEnum.enumValues)
