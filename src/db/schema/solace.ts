import {
  modelEnum,
  modelEnumSchema,
  roomTypeEnum,
  roomTypeEnumSchema,
  styleEnum,
  styleEnumSchema
} from '@/lib/enums'
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { users } from './users'

interface Variation {
  iid: string
  url: string
  seed: string
}

export const solace = pgTable('solace', {
  id: uuid('id').defaultRandom().primaryKey(),
  prompt: text('prompt').notNull(),
  model: modelEnum('model')
    .notNull()
    .default(modelEnumSchema.Enum.leonardo_kino_xl),
  coverUrl: text('cover_url').notNull(),
  contextualImageUrl: text('contextual_image_url'),
  style: styleEnum('style').notNull().default(styleEnumSchema.Enum.minimalist),
  roomType: roomTypeEnum('room_type')
    .notNull()
    .default(roomTypeEnumSchema.Enum.kitchen),
  numberOfImages: integer('number_of_images').notNull().default(1),
  isEnhanced: boolean('is_enhanced').notNull().default(false),
  variations: jsonb('variations').notNull().$type<Variation[]>(),
  generatedBy: text('generated_by').references(() => users.id, {
    onDelete: 'cascade'
  }),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export type SolaceSelect = typeof solace.$inferSelect
export type SolaceInsert = typeof solace.$inferInsert
