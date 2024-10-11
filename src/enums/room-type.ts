import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const roomTypeEnum = pgEnum('room_type', [
  'kitchen',
  'bedroom',
  'bathroom',
  'living_room',
  'dining_room',
  'facade',
  'study+room',
  'balcony',
  'terrace',
  'garden',
  'garage',
  'storage_room',
  'basement',
  'Uutility_area'
])

export const roomTypeEnumSchema = z.enum(roomTypeEnum.enumValues)
